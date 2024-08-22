package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/models"
	"strconv"
)

type CreateReviewInput struct {
	UserID     uint   `json:"user_id" binding:"required"`
	ProductID  uint   `json:"product_id" binding:"required"`
	Rating     int    `json:"rating" binding:"required"`
	Comment    string `json:"comment" binding:"required"`
	ReviewDate string `json:"review_date" binding:"required"`
}

func CreateReview(c *gin.Context) {
	var input CreateReviewInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	review := models.Review{UserID: input.UserID, ProductID: input.ProductID, Rating: input.Rating, Comment: input.Comment, ReviewDate: input.ReviewDate}
	db.DB.Create(&review)

	c.JSON(http.StatusOK, gin.H{"data": review})
}

func GetReviews(c *gin.Context) {
	var reviews []models.Review

	// Get query parameters for pagination
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	// Calculate offset and limit
	offset := (page - 1) * pageSize

	// Get query parameters for filtering
	rating := c.Query("rating")
	productID := c.Query("productID")
	userID := c.Query("userID")

	// Get query parameters for sorting
	sortBy := c.DefaultQuery("sortBy", "updated_at") // Default sort by updated_at
	sortOrder := c.DefaultQuery("sortOrder", "asc")  // Default sort order ascending

	// Build the query
	query := db.DB.Model(&models.Review{})

	if rating != "" {
		query = query.Where("rating = ?", rating)
	}
	if productID != "" {
		query = query.Where("product_id = ?", productID)
	}
	if userID != "" {
		query = query.Where("user_id = ?", userID)
	}

	// Apply sorting
	if sortBy == "rating" || sortBy == "updated_at" {
		query = query.Order(fmt.Sprintf("%s %s", sortBy, sortOrder))
	} else {
		// Default to sorting by updated_at if an invalid sortBy value is provided
		query = query.Order("updated_at asc")
	}

	// Get the total count of reviews after applying filters
	var totalCount int64
	query.Count(&totalCount)

	// Fetch the reviews with pagination and filters
	query.Offset(offset).Limit(pageSize).Find(&reviews)

	// Return the reviews along with pagination and sorting metadata
	c.JSON(http.StatusOK, gin.H{
		"data":       reviews,
		"totalCount": totalCount,
		"page":       page,
		"pageSize":   pageSize,
		"sortBy":     sortBy,
		"sortOrder":  sortOrder,
	})
}
func GetReview(c *gin.Context) {
	var review models.Review
	if err := db.DB.Where("id = ?", c.Param("id")).First(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": review})
}

func UpdateReview(c *gin.Context) {
	var review models.Review
	if err := db.DB.Where("id = ?", c.Param("id")).First(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var input CreateReviewInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.DB.Model(&review).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": review})
}

func DeleteReview(c *gin.Context) {
	var review models.Review
	if err := db.DB.Where("id = ?", c.Param("id")).First(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.DB.Delete(&review)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
