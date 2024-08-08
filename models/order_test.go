package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateOrder(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	result := db.Create(&order)

	assert.Nil(t, result.Error)
	assert.NotZero(t, order.ID)
	assert.Equal(t, user.ID, order.UserID)
}

func TestGetOrder(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	var fetchedOrder Order
	result := db.First(&fetchedOrder, order.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, order.OrderDate, fetchedOrder.OrderDate)
	assert.Equal(t, order.TotalAmount, fetchedOrder.TotalAmount)
}

func TestUpdateOrder(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	updatedData := Order{
		OrderDate:   "2023-10-02",
		TotalAmount: 150.75,
	}
	db.Model(&order).Updates(updatedData)

	var updatedOrder Order
	db.First(&updatedOrder, order.ID)

	assert.Equal(t, "2023-10-02", updatedOrder.OrderDate)
	assert.Equal(t, 150.75, updatedOrder.TotalAmount)
}

func TestDeleteOrder(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	db.Delete(&order)

	var deletedOrder Order
	result := db.First(&deletedOrder, order.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}
