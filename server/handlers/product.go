package handlers

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/models"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

func ServeProductImage(c *gin.Context) {
	imageName := c.Param("imageName")
	imagePath := filepath.Join("upload/products", imageName)
	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		// If the file does not exist, serve the placeholder image
		log.Printf("Image not found: %s, fallback to placeholder", imageName)
		imagePath = "upload/placeholder.svg"
	}

	// Serve the file
	c.File(imagePath)
}

func UploadOtherImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No image file is received"})
		return
	}

	// Sanitize and hash the file name
	sanitizedFileName := sanitizeFileName(file.Filename)
	hashedFileName := hashFileName(sanitizedFileName) + filepath.Ext(sanitizedFileName)
	imagePath := fmt.Sprintf("upload/others/%s", hashedFileName)

	// Create the directory if it doesn't exist
	if err := os.MkdirAll(filepath.Dir(imagePath), os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create directory"})
		return
	}

	// Save the uploaded file to the specified path
	if err := c.SaveUploadedFile(file, imagePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	// Return the path of the uploaded image
	c.JSON(http.StatusOK, gin.H{"imagePath": imagePath})
}

func ServeOtherImage(c *gin.Context) {
	imageName := c.Param("imageName")
	imagePath := filepath.Join("upload/others", imageName)
	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		// If the file does not exist, serve the placeholder image
		log.Printf("Image not found: %s, fallback to placeholder", imageName)
		imagePath = "upload/placeholder.svg"
	}

	// Serve the file
	c.File(imagePath)
}

func sanitizeFileName(fileName string) string {
	// Remove any path information and get the file name
	fileName = filepath.Base(fileName)
	// Replace spaces with underscores
	fileName = strings.ReplaceAll(fileName, " ", "_")
	// Remove any other potentially problematic characters
	fileName = strings.Map(func(r rune) rune {
		if r == '.' || r == '_' || r == '-' || ('0' <= r && r <= '9') || ('a' <= r && r <= 'z') || ('A' <= r && r <= 'Z') {
			return r
		}
		return -1
	}, fileName)
	return fileName
}

func hashFileName(fileName string) string {
	hasher := sha256.New()
	hasher.Write([]byte(fileName + time.Now().String()))
	return hex.EncodeToString(hasher.Sum(nil))
}

type CreateProductInput struct {
	Name        string  ` binding:"required"`
	Description string  ` binding:"required"`
	Price       float64 ` binding:"required"`
	Stock       int     ` binding:"required"`
}

func CreateProduct(c *gin.Context) {
	var input CreateProductInput
	err := c.ShouldBind(&input)
	if err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	file, getMainImageErr := c.FormFile("Image")
	var mainImagePath string
	if getMainImageErr != nil {
		log.Printf("There is no main image provided")
	} else {
		mainImagePath, err = saveOrReuseImage(file)
		if err != nil {
			if err.Error() == "file size exceeds the 10 MB limit" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "File size exceeds the 10 MB limit"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			}
			return
		}
	}

	form, err := c.MultipartForm()
	if err != nil {
		log.Printf("Error parsing multipart form: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form"})
		return
	}

	otherImagesFiles := form.File["OtherImages[]"]
	var otherImagePaths []string

	if otherImagesFiles != nil {
		log.Printf("There are %d other images provided", len(otherImagesFiles))
		for _, otherImageFile := range otherImagesFiles {
			otherImagePath, err := saveOrReuseImage(otherImageFile)
			if err != nil {
				if err.Error() == "file size exceeds the 10 MB limit" {
					c.JSON(http.StatusBadRequest, gin.H{"error": "File size exceeds the 10 MB limit"})
				} else {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
				}
				return
			}
			otherImagePaths = append(otherImagePaths, otherImagePath)
		}
	} else {
		log.Printf("There are no other images provided")
	}

	categoryIDs := c.PostFormArray("Categories[]")
	var categories []models.Category
	for _, categoryID := range categoryIDs {
		var category models.Category
		if err := db.DB.Where("id = ?", categoryID).First(&category).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
			return
		}
		categories = append(categories, category)
	}

	product := models.Product{
		Name:        input.Name,
		Description: input.Description,
		Price:       input.Price,
		Stock:       input.Stock,
		Image:       mainImagePath, // Save the image path in the product
		OtherImages: otherImagePaths,
		Categories:  categories,
	}
	result := db.DB.Create(&product)
	if result.Error != nil {
		log.Printf("Error when creating product: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"data": product})
}

func saveOrReuseImage(file *multipart.FileHeader) (string, error) {

	// Define the maximum file size (10 MB)
	const maxFileSize = 10 * 1024 * 1024 // 10 MB

	// Check the file size
	if file.Size > maxFileSize {
		return "", fmt.Errorf("file size exceeds the 10 MB limit")
	}

	// Open the file
	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	// Read the file content
	fileContent, err := io.ReadAll(src)
	if err != nil {
		return "", err
	}

	// Hash the file content
	hasher := sha256.New()
	hasher.Write(fileContent)
	hashedFileName := hex.EncodeToString(hasher.Sum(nil)) + filepath.Ext(file.Filename)

	// Check if the file already exists
	imagePath := fmt.Sprintf("uploads/products/%s", hashedFileName)
	if _, err := os.Stat(imagePath); err == nil {
		// File already exists, reuse it
		return imagePath, nil
	}

	// Save the new file
	if err := os.MkdirAll(filepath.Dir(imagePath), os.ModePerm); err != nil {
		return "", err
	}
	if err := os.WriteFile(imagePath, fileContent, os.ModePerm); err != nil {
		return "", err
	}

	return imagePath, nil
}

func GetProducts(c *gin.Context) {
	var products []models.Product

	// Get query parameters for pagination
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	// Calculate offset and limit
	offset := (page - 1) * pageSize

	// Get query parameters for filtering
	minPrice := c.Query("minPrice")
	maxPrice := c.Query("maxPrice")
	categories := c.QueryArray("categories")
	//log.Printf("Categories: %v", categories)

	sortBy := c.QueryArray("sortBy")
	sortOrder := c.QueryArray("sortOrder")

	preload := c.QueryArray("preload")

	// Build the query
	query := db.DB.Model(&models.Product{})

	// Get query parameters for preloading

	for _, p := range preload {
		query.Preload(p)
	}

	for sortByI, sortByV := range sortBy {
		query = query.Order(fmt.Sprintf("%s %s", sortByV, sortOrder[sortByI]))
	}

	if minPrice != "" {
		query = query.Where("price >= ?", minPrice)
	}
	if maxPrice != "" {
		query = query.Where("price <= ?", maxPrice)
	}
	if len(categories) > 0 {
		query = query.Joins("JOIN product_categories ON product_categories.product_id = products.id").
			Joins("JOIN categories ON categories.id = product_categories.category_id").
			Where("categories.category_name IN ?", categories).
			Group("products.id")
	}

	// Get the total count of products after applying filters
	var totalCount int64
	query.Count(&totalCount)

	// Fetch the products with pagination and filters
	query.Offset(offset).Limit(pageSize).Find(&products)

	// Return the products along with pagination and sorting metadata
	c.JSON(http.StatusOK, gin.H{
		"data":       products,
		"totalCount": totalCount,
		"page":       page,
		"pageSize":   pageSize,
		"sortBy":     sortBy,
		"sortOrder":  sortOrder,
	})
}
func GetProduct(c *gin.Context) {
	var product models.Product
	query := db.DB.Model(&models.Product{})
	query.Preload("Categories").Preload("Reviews.User").Preload("OrderItems")

	if err := query.Where("id = ?", c.Param("id")).First(&product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": product})
}

func UpdateProduct(c *gin.Context) {
	var product models.Product
	if err := db.DB.Where("id = ?", c.Param("id")).First(&product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var input CreateProductInput
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Printf("Error when binding JSON: %v", err)
		log.Printf("Input: %+v", input)
		return
	}
	file, getMainImageErr := c.FormFile("image")

	// handle main image
	var mainImagePath string
	var hashedFileName string
	if getMainImageErr != nil {
		log.Printf("There is no main image provided")
	} else {
		sanitizedFileName := sanitizeFileName(file.Filename)
		hashedFileName = hashFileName(sanitizedFileName) + filepath.Ext(sanitizedFileName)

		if err := c.SaveUploadedFile(file, mainImagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}
		mainImagePath = fmt.Sprintf("uploads/products/%s", hashedFileName)
	}

	// handle other images
	form, _ := c.MultipartForm()

	otherImagesFiles := form.File["otherImages"]
	var otherImagePaths []string

	if otherImagesFiles != nil {
		for _, otherImageFile := range otherImagesFiles {
			sanitizedFileName := sanitizeFileName(otherImageFile.Filename)
			hashedOtherImageFileName := hashFileName(sanitizedFileName) + filepath.Ext(sanitizedFileName)

			otherImagePath := fmt.Sprintf("uploads/products/%s", hashedOtherImageFileName)
			if err := c.SaveUploadedFile(otherImageFile, otherImagePath); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
				return
			}
			otherImagePaths = append(otherImagePaths, hashedOtherImageFileName)
		}
	}
	newProduct := models.Product{
		Name:        input.Name,
		Description: input.Description,
		Price:       input.Price,
		Stock:       input.Stock,
		Image:       mainImagePath, // Save the image path in the product
		OtherImages: otherImagePaths,
	}

	result := db.DB.Model(&product).Updates(newProduct)
	if result.Error != nil {
		log.Printf("Cannot update product: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"data": product})
}

func DeleteProduct(c *gin.Context) {
	var product models.Product
	if err := db.DB.Where("id = ?", c.Param("id")).First(&product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.DB.Delete(&product)

	c.JSON(http.StatusOK, gin.H{"data": true})
}

func GetMinMaxPrice(c *gin.Context) {
	var minPrice, maxPrice float64

	// Query to get the minimum price
	if err := db.DB.Model(&models.Product{}).Select("MIN(price)").Scan(&minPrice).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get minimum price"})
		return
	}

	// Query to get the maximum price
	if err := db.DB.Model(&models.Product{}).Select("MAX(price)").Scan(&maxPrice).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get maximum price"})
		return
	}

	// Return the min and max prices
	c.JSON(http.StatusOK, gin.H{
		"minPrice": minPrice,
		"maxPrice": maxPrice,
	})
}
