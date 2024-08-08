package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/db"
	"nhannht.kute/ecummercial/models"
)

type CreateAddressInput struct {
	UserID       uint   `json:"user_id" binding:"required"`
	AddressLine1 string `json:"address_line1" binding:"required"`
	AddressLine2 string `json:"address_line2"`
	City         string `json:"city" binding:"required"`
	State        string `json:"state" binding:"required"`
	ZipCode      string `json:"zip_code" binding:"required"`
	Country      string `json:"country" binding:"required"`
	AddressType  string `json:"address_type" binding:"required"`
}

func CreateAddress(c *gin.Context) {
	var input CreateAddressInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	address := models.Address{UserID: input.UserID, AddressLine1: input.AddressLine1, AddressLine2: input.AddressLine2, City: input.City, State: input.State, ZipCode: input.ZipCode, Country: input.Country, AddressType: input.AddressType}
	db.DB.Create(&address)

	c.JSON(http.StatusOK, gin.H{"data": address})
}

func GetAddresses(c *gin.Context) {
	var addresses []models.Address
	db.DB.Find(&addresses)

	c.JSON(http.StatusOK, gin.H{"data": addresses})
}

func GetAddress(c *gin.Context) {
	var address models.Address
	if err := db.DB.Where("id = ?", c.Param("id")).First(&address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": address})
}

func UpdateAddress(c *gin.Context) {
	var address models.Address
	if err := db.DB.Where("id = ?", c.Param("id")).First(&address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var input CreateAddressInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.DB.Model(&address).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": address})
}

func DeleteAddress(c *gin.Context) {
	var address models.Address
	if err := db.DB.Where("id = ?", c.Param("id")).First(&address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.DB.Delete(&address)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
