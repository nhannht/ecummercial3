package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/models"
	"strconv"
)

type CreateUserInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required" validate:"email"`
	Password string `json:"password" binding:"required"`
}

func CreateUser(c *gin.Context) {
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{Name: input.Name, Email: input.Email, Password: input.Password}
	fmt.Printf("db is %v", db.DB)
	fmt.Printf("user is %v", user)
	result := db.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func GetUsers(c *gin.Context) {
	var users []models.User

	// Get query parameters for pagination
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	// Calculate offset and limit
	offset := (page - 1) * pageSize

	sortBy := c.QueryArray("sortBy")
	sortOrder := c.QueryArray("sortOrder")

	preload := c.QueryArray("preload")

	query := db.DB.Model(&models.User{})

	for _, p := range preload {
		query.Preload(p)
	}

	for sortByI, sortByV := range sortBy {
		query = query.Order(fmt.Sprintf("%s %s", sortByV, sortOrder[sortByI]))
	}

	var totalCount int64
	query.Count(&totalCount)

	// Fetch the products with pagination and filters
	query.Offset(offset).Limit(pageSize).Find(&users)

	c.JSON(http.StatusOK, gin.H{
		"data":       users,
		"totalCount": totalCount,
		"page":       page,
		"pageSize":   pageSize,
		"sortBy":     sortBy,
		"sortOrder":  sortOrder,
	})
}

func GetUser(c *gin.Context) {
	var user models.User
	if err := db.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func UpdateUser(c *gin.Context) {
	var user models.User
	if err := db.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.DB.Model(&user).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func DeleteUser(c *gin.Context) {
	var user models.User
	if err := db.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.DB.Delete(&user)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
