package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/models"
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
	db.DB.Find(&reviews)

	c.JSON(http.StatusOK, gin.H{"data": reviews})
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
