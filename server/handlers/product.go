package handlers

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/models"
	"os"
	"path/filepath"
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
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
	Stock       int     `json:"stock" binding:"required"`
}

func CreateProduct(c *gin.Context) {
	var input CreateProductInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	file, err := c.FormFile("image")
	var imagePath string
	var hashedFileName string
	if err != nil {
		log.Printf("Error retrieving image: %v, fallback using placeholder image", err)
		hashedFileName = "placeholder.svg"
	} else {
		sanitizedFileName := sanitizeFileName(file.Filename)
		hashedFileName = hashFileName(sanitizedFileName) + filepath.Ext(sanitizedFileName)
		imagePath = fmt.Sprintf("uploads/%s", hashedFileName)
		if err := c.SaveUploadedFile(file, imagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}

	}

	product := models.Product{
		Name:        input.Name,
		Description: input.Description,
		Price:       input.Price,
		Stock:       input.Stock,
		Image:       hashedFileName, // Save the image path in the product
	}
	db.DB.Create(&product)

	c.JSON(http.StatusOK, gin.H{"data": product})
}

func GetProducts(c *gin.Context) {
	var products []models.Product
	db.DB.Find(&products)

	c.JSON(http.StatusOK, gin.H{"data": products})
}

func GetProduct(c *gin.Context) {
	var product models.Product
	if err := db.DB.Where("id = ?", c.Param("id")).First(&product).Error; err != nil {
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
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	file, err := c.FormFile("image")
	var imagePath string
	var hashedFileName string
	if err != nil {
		log.Printf("Error retrieving image: %v, fallback using placeholder image", err)
		hashedFileName = "placeholder.svg"
	} else {
		sanitizedFileName := sanitizeFileName(file.Filename)
		hashedFileName = hashFileName(sanitizedFileName) + filepath.Ext(sanitizedFileName)

		imagePath = fmt.Sprintf("uploads/%s", file.Filename)
		if err := c.SaveUploadedFile(file, imagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}
	}

	db.DB.Model(&product).Updates(input)

	product = models.Product{
		Name:        input.Name,
		Description: input.Description,
		Price:       input.Price,
		Stock:       input.Stock,
		Image:       hashedFileName, // Save the image path in the product
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
