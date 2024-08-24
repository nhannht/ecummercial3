package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/models"
)

type ValidateOrderCheckoutInput struct {
	OrderItems []models.OrderItem ` binding:"required"`
}

func ValidateOrder(c *gin.Context) {
	var input ValidateOrderCheckoutInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	subtotal := 0.0
	var validOrderItems []models.OrderItem

	for _, item := range input.OrderItems {
		var product models.Product
		if err := db.DB.First(&product, item.ProductID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
			return
		}
		item.Product = product

		// Assuming you have a ProductName field in OrderItem
		subtotal += product.Price
		validOrderItems = append(validOrderItems, item)
	}

	total := subtotal

	tempOrder := models.Order{}
	tempOrder.OrderItems = validOrderItems
	tempOrder.TotalCost = total

	c.JSON(http.StatusOK, gin.H{"tempOrder": tempOrder})
}

type CreateOrderInput struct {
	OrderItems []models.OrderItem `form:"order_items" binding:"required"`
	TotalCost  float64            `form:"total_cost" binding:"required"`
}

func CreateOrder(c *gin.Context) {
	var input CreateOrderInput
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var shippingInfo models.ShippingInfo

	shippingInfo.City = c.PostForm("City")
	shippingInfo.State = c.PostForm("State")
	shippingInfo.Address = c.PostForm("Address")
	shippingInfo.Phone = c.PostForm("Phone")
	shippingInfo.Note = c.PostForm("Note")
	shippingInfo.Sex = c.PostForm("Gender")

	var order models.Order
	order.OrderItems = input.OrderItems

	subtotal := 0.0

	for _, item := range input.OrderItems {
		var product models.Product
		if err := db.DB.First(&product, item.ProductID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
			return
		}
		item.Product = product

		// Assuming you have a ProductName field in OrderItem
		subtotal += product.Price
	}

	order.TotalCost = subtotal
	order.Status = "pending"

	if err := db.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

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
