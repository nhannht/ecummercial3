package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/db"
	"nhannht.kute/ecummercial/models"
)

type CreateCategoryInput struct {
	CategoryName string `json:"category_name" binding:"required"`
}

func CreateCategory(c *gin.Context) {
	var input CreateCategoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category := models.Category{CategoryName: input.CategoryName}
	db.DB.Create(&category)

	c.JSON(http.StatusOK, gin.H{"data": category})
}

func GetCategories(c *gin.Context) {
	var categories []models.Category
	db.DB.Find(&categories)

	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func GetCategory(c *gin.Context) {
	var category models.Category
	if err := db.DB.Where("id = ?", c.Param("id")).First(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": category})
}

func UpdateCategory(c *gin.Context) {
	var category models.Category
	if err := db.DB.Where("id = ?", c.Param("id")).First(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var input CreateCategoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.DB.Model(&category).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": category})
}

func DeleteCategory(c *gin.Context) {
	var category models.Category
	if err := db.DB.Where("id = ?", c.Param("id")).First(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.DB.Delete(&category)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
