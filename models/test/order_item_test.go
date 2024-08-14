package test

import (
	"nhannht.kute/ecummercial/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateOrderItem(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.Create(&product)

	orderItem := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product.ID,
		Quantity:  1,
		Price:     1000.00,
	}
	result := db.Create(&orderItem)

	//fmt.Printf("%v\n", result.Error)
	//fmt.Printf("userid of order of order item %v\n", orderItem.Order.UserID)
	//fmt.Printf("%v\n", orderItem)

	assert.Nil(t, result.Error)
	assert.NotZero(t, orderItem.ID)
	assert.Equal(t, order.ID, orderItem.OrderID)
	assert.Equal(t, product.ID, orderItem.ProductID)
}

func TestGetOrderItem(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.Create(&product)

	orderItem := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product.ID,
		Quantity:  1,
		Price:     1000.00,
	}
	db.Create(&orderItem)

	var fetchedOrderItem models.OrderItem
	result := db.First(&fetchedOrderItem, orderItem.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, orderItem.Quantity, fetchedOrderItem.Quantity)
	assert.Equal(t, orderItem.Price, fetchedOrderItem.Price)
}

func TestUpdateOrderItem(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.Create(&product)

	orderItem := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product.ID,
		Quantity:  1,
		Price:     1000.00,
	}
	db.Create(&orderItem)

	updatedData := models.OrderItem{
		Quantity: 2,
		Price:    2000.00,
	}
	db.Model(&orderItem).Updates(updatedData)

	var updatedOrderItem models.OrderItem
	db.First(&updatedOrderItem, orderItem.ID)

	assert.Equal(t, 2, updatedOrderItem.Quantity)
	assert.Equal(t, 2000.00, updatedOrderItem.Price)
}

func TestDeleteOrderItem(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.Create(&product)

	orderItem := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product.ID,
		Quantity:  1,
		Price:     1000.00,
	}
	db.Create(&orderItem)

	db.Delete(&orderItem)

	var deletedOrderItem models.OrderItem
	result := db.First(&deletedOrderItem, orderItem.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}
