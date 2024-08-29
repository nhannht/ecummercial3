package handlers

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/models"
	"time"
)

type GetOrderAnalyticOutput struct {
	TotalOrders       int64
	LastHourOrders    int64
	TotalUsers        int64
	LastWeekUsers     int64
	TotalRevenues     float64
	LastMonthRevenues float64
}

func GetAnalyticData(c *gin.Context) {
	var lastHourOrdersCount int64
	var totalOrdersCount int64
	var totalUsersCount int64
	var lastWeekUsersCount int64
	var totalRevenues float64
	var lastMonthRevenues float64

	// Get current time and time one hour ago
	now := time.Now()
	lastHour := now.Add(-1 * time.Hour)
	lastWeek := now.Add(-1 * time.Hour * 24 * 7)
	lastMonth := now.Add(-1 * time.Hour * 24 * 30)

	// Count orders in the last hour
	result := db.DB.Model(&models.Order{}).Where("created_at >= ?", lastHour).Count(&lastHourOrdersCount)
	if result.Error != nil {
		log.Printf("Error counting last hours orders: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// Count total orders of all time

	if err := db.DB.Model(&models.Order{}).Count(&totalOrdersCount).Error; err != nil {
		log.Printf("Error counting total orders: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return

	}

	// Count total users
	if err := db.DB.Model(&models.User{}).Count(&totalUsersCount).Error; err != nil {
		log.Printf("Error counting total users: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// count users in the last week
	if err := db.DB.Model(&models.User{}).Where("created_at >=?", lastWeek).Count(&lastWeekUsersCount).Error; err != nil {
		log.Printf("Error counting last week users: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Count total revenues
	if err := db.DB.Model(&models.Order{}).Select("SUM(total_cost)").Scan(&totalRevenues).Error; err != nil {
		log.Printf("Error counting total revenues: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Count last month's revenues
	if err := db.DB.Model(&models.Order{}).Select("SUM(total_cost)").Where("created_at >= ?", lastMonth).Scan(&lastMonthRevenues).Error; err != nil {
		log.Printf("Error counting last month's revenues: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dataResponse := GetOrderAnalyticOutput{
		TotalOrders:       totalOrdersCount,
		LastHourOrders:    lastHourOrdersCount,
		TotalUsers:        totalUsersCount,
		TotalRevenues:     totalRevenues,
		LastMonthRevenues: lastMonthRevenues,
		LastWeekUsers:     lastWeekUsersCount,
	}

	c.JSON(http.StatusOK, gin.H{
		"data": dataResponse,
	})
}
