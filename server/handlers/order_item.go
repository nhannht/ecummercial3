package handlers

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/models"
)

type CreateOrderItemInput struct {
	OrderID   uint ` binding:"required"`
	ProductID uint ` binding:"required"`
}

func CreateOrderItem(c *gin.Context) {
	var input CreateOrderItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	orderItem := models.OrderItem{OrderID: input.OrderID,
		ProductID: input.ProductID,
	}
	result := db.DB.Create(&orderItem)
	if result.Error != nil {
		log.Printf("Error creating record: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orderItem})
}

func GetOrderItems(c *gin.Context) {
	var orderItems []models.OrderItem
	result := db.DB.Find(&orderItems)
	if result.Error != nil {
		log.Printf("Error fetching records: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orderItems})
}

func GetOrderItem(c *gin.Context) {
	var orderItem models.OrderItem
	if err := db.DB.Where("id = ?", c.Param("id")).First(&orderItem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orderItem})
}

func UpdateOrderItem(c *gin.Context) {
	var orderItem models.OrderItem
	if err := db.DB.Where("id = ?", c.Param("id")).First(&orderItem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var input CreateOrderItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Model(&orderItem).Updates(input).Error; err != nil {
		log.Printf("Error updating record: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orderItem})
}

func DeleteOrderItem(c *gin.Context) {
	var orderItem models.OrderItem
	if err := db.DB.Where("id = ?", c.Param("id")).First(&orderItem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	if err := db.DB.Delete(&orderItem).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": true})
}
