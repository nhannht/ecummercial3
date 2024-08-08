package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/db"
	"nhannht.kute/ecummercial/models"
)

type CreatePaymentInput struct {
	OrderID       uint    `json:"order_id" binding:"required"`
	PaymentDate   string  `json:"payment_date" binding:"required"`
	Amount        float64 `json:"amount" binding:"required"`
	PaymentMethod string  `json:"payment_method" binding:"required"`
}

func CreatePayment(c *gin.Context) {
	var input CreatePaymentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payment := models.Payment{OrderID: input.OrderID, PaymentDate: input.PaymentDate, Amount: input.Amount, PaymentMethod: input.PaymentMethod}
	db.DB.Create(&payment)

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func GetPayments(c *gin.Context) {
	var payments []models.Payment
	db.DB.Find(&payments)

	c.JSON(http.StatusOK, gin.H{"data": payments})
}

func GetPayment(c *gin.Context) {
	var payment models.Payment
	if err := db.DB.Where("id = ?", c.Param("id")).First(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func UpdatePayment(c *gin.Context) {
	var payment models.Payment
	if err := db.DB.Where("id = ?", c.Param("id")).First(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var input CreatePaymentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.DB.Model(&payment).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func DeletePayment(c *gin.Context) {
	var payment models.Payment
	if err := db.DB.Where("id = ?", c.Param("id")).First(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.DB.Delete(&payment)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
