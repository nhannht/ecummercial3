package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/db"
	"nhannht.kute/ecummercial/models"
)

type CreateOrderItemInput struct {
	OrderID   uint    `json:"order_id" binding:"required"`
	ProductID uint    `json:"product_id" binding:"required"`
	Quantity  int     `json:"quantity" binding:"required"`
	Price     float64 `json:"price" binding:"required"`
}

func CreateOrderItem(c *gin.Context) {
	var input CreateOrderItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	orderItem := models.OrderItem{OrderID: input.OrderID, ProductID: input.ProductID, Quantity: input.Quantity, Price: input.Price}
	db.DB.Create(&orderItem)

	c.JSON(http.StatusOK, gin.H{"data": orderItem})
}

func GetOrderItems(c *gin.Context) {
	var orderItems []models.OrderItem
	db.DB.Find(&orderItems)

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

	db.DB.Model(&orderItem).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": orderItem})
}

func DeleteOrderItem(c *gin.Context) {
	var orderItem models.OrderItem
	if err := db.DB.Where("id = ?", c.Param("id")).First(&orderItem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.DB.Delete(&orderItem)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
