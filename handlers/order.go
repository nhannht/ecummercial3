package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/db"
	"nhannht.kute/ecummercial/models"
)

type CreateOrderInput struct {
	UserID      uint    `json:"user_id" binding:"required"`
	OrderDate   string  `json:"order_date" binding:"required"`
	TotalAmount float64 `json:"total_amount" binding:"required"`
}

func CreateOrder(c *gin.Context) {
	var input CreateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	order := models.Order{UserID: input.UserID, OrderDate: input.OrderDate, TotalAmount: input.TotalAmount}
	db.DB.Create(&order)

	c.JSON(http.StatusOK, gin.H{"data": order})
}

func GetOrders(c *gin.Context) {
	var orders []models.Order
	db.DB.Find(&orders)

	c.JSON(http.StatusOK, gin.H{"data": orders})
}

func GetOrder(c *gin.Context) {
	var order models.Order
	if err := db.DB.Where("id = ?", c.Param("id")).First(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}

func UpdateOrder(c *gin.Context) {
	var order models.Order
	if err := db.DB.Where("id = ?", c.Param("id")).First(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var input CreateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.DB.Model(&order).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": order})
}

func DeleteOrder(c *gin.Context) {
	var order models.Order
	if err := db.DB.Where("id = ?", c.Param("id")).First(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.DB.Delete(&order)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
