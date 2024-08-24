package test

import (
	"fmt"
	"nhannht.kute/ecummercial/server/lib"
	"nhannht.kute/ecummercial/server/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestGetOrder(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	db.Create(&order)

	var fetchedOrder models.Order
	result := db.First(&fetchedOrder, order.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, order.OrderDate, fetchedOrder.OrderDate)
	assert.Equal(t, order.TotalCost, fetchedOrder.TotalCost)
	assert.Equal(t, order.Status, fetchedOrder.Status)
}

func TestUpdateOrder(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	db.Create(&order)

	updatedData := models.Order{
		OrderDate: "2023-10-02",
		TotalCost: 150.75,
		Status:    "shipped",
	}
	db.Model(&order).Updates(updatedData)

	var updatedOrder models.Order
	db.First(&updatedOrder, order.ID)

	assert.Equal(t, "2023-10-02", updatedOrder.OrderDate)
	assert.Equal(t, 150.75, updatedOrder.TotalCost)
	assert.Equal(t, "shipped", updatedOrder.Status)
}

func TestDeleteOrder(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	db.Create(&order)

	db.Delete(&order)

	var deletedOrder models.Order
	result := db.First(&deletedOrder, order.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}

func TestOrderRelationships(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.Create(&product)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	db.Create(&order)

	orderItem := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product.ID,
		Quantity:  1,
		Price:     1000.00,
	}
	db.Create(&orderItem)

	var fetchedOrder models.Order
	db.Preload("OrderItems").First(&fetchedOrder, order.ID)

	assert.Equal(t, 1, len(fetchedOrder.OrderItems))
	assert.Equal(t, orderItem.ID, fetchedOrder.OrderItems[0].ID)
	assert.Equal(t, product.ID, fetchedOrder.OrderItems[0].ProductID)
}

func TestOrderValidations(t *testing.T) {
	db := SetupTestDB()

	order := models.Order{
		OrderDate: "2023-10-01",
		TotalCost: -100.50,          // Invalid total amount
		Status:    "invalid_status", // Invalid status
	}
	result := db.Create(&order)

	assert.NotNil(t, result.Error)
}

func TestCreateOrderWithoutUser(t *testing.T) {
	db := SetupTestDB()

	order := models.Order{
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	result := db.Create(&order)
	//fmt.Printf("%v", result.Error)

	assert.NotNil(t, result.Error)
}

func TestCreateOrderWithInvalidDate(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "invalid-date",
		TotalCost: 100.50,
		Status:    "pending",
	}
	result := db.Create(&order)

	assert.NotNil(t, result.Error)
}

func TestCreateOrderWithZeroTotalAmount(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "1997-10-01",
		TotalCost: 0.00,
		Status:    "pending",
	}
	result := db.Create(&order)

	fmt.Printf("%v", result.Error)
	lib.PrettyPrintObject(order)

	assert.Nil(t, result.Error)
	assert.NotZero(t, order.ID)
}

func TestCreateOrderWithNegativeTotalAmount(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: -100.50,
		Status:    "pending",
	}
	result := db.Create(&order)

	assert.NotNil(t, result.Error)
}

func TestUpdateOrderStatus(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	db.Create(&order)

	db.Model(&order).Update("Status", "shipped")

	var updatedOrder models.Order
	db.First(&updatedOrder, order.ID)

	assert.Equal(t, "shipped", updatedOrder.Status)
}

func TestDeleteNonExistentOrder(t *testing.T) {
	db := SetupTestDB()

	result := db.Delete(&models.Order{}, 999)

	assert.Equal(t, int64(0), result.RowsAffected)
}

func TestGetNonExistentOrder(t *testing.T) {
	db := SetupTestDB()

	var order models.Order
	result := db.First(&order, 999)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}

func TestCreateOrderWithMultipleItems(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	product1 := models.Product{Name: "Laptop", Price: 1000.00}
	product2 := models.Product{Name: "Mouse", Price: 50.00}
	db.Create(&product1)
	db.Create(&product2)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 1050.50,
		Status:    "pending",
	}
	db.Create(&order)

	orderItem1 := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product1.ID,
		Quantity:  1,
		Price:     1000.00,
	}
	orderItem2 := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product2.ID,
		Quantity:  1,
		Price:     50.00,
	}
	db.Create(&orderItem1)
	db.Create(&orderItem2)

	var fetchedOrder models.Order
	db.Preload("OrderItems").First(&fetchedOrder, order.ID)

	assert.Equal(t, 2, len(fetchedOrder.OrderItems))
}

func TestOrderTotalAmountCalculation(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	product1 := models.Product{Name: "Laptop", Price: 1000.00}
	product2 := models.Product{Name: "Mouse", Price: 50.00}
	db.Create(&product1)
	db.Create(&product2)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 0.00,
		Status:    "pending",
	}
	db.Create(&order)

	orderItem1 := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product1.ID,
		Quantity:  1,
		Price:     1000.00,
	}
	orderItem2 := models.OrderItem{
		OrderID:   order.ID,
		ProductID: product2.ID,
		Quantity:  1,
		Price:     50.00,
	}
	db.Create(&orderItem1)
	db.Create(&orderItem2)

	var fetchedOrder models.Order
	db.Preload("OrderItems").First(&fetchedOrder, order.ID)

	totalAmount := 0.0
	for _, item := range fetchedOrder.OrderItems {
		totalAmount += item.Price * float64(item.Quantity)
	}

	assert.Equal(t, 1050.00, totalAmount)
}

func TestOrderWithNoItems(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	db.Create(&order)

	var fetchedOrder models.Order
	db.Preload("OrderItems").First(&fetchedOrder, order.ID)

	assert.Equal(t, 0, len(fetchedOrder.OrderItems))
}

func TestOrderWithMultipleStatuses(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	db.Create(&order)

	statuses := []string{"pending", "shipped", "delivered"}
	for _, status := range statuses {
		db.Model(&order).Update("Status", status)
		var updatedOrder models.Order
		db.First(&updatedOrder, order.ID)
		assert.Equal(t, status, updatedOrder.Status)
	}
}

func TestOrderWithInvalidUserID(t *testing.T) {
	db := SetupTestDB()

	order := models.Order{
		UserID:    999, // Non-existent user ID
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	result := db.Create(&order)

	assert.NotNil(t, result.Error)
}

func TestOrderWithDuplicateID(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order1 := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pending",
	}
	db.Create(&order1)

	order2 := models.Order{
		Model:     gorm.Model{ID: order1.ID},
		UserID:    user.ID,
		OrderDate: "2023-10-02",
		TotalCost: 200.75,
		Status:    "shipped",
	}
	result := db.Create(&order2)

	assert.NotNil(t, result.Error)
}

func TestOrderWithNullFields(t *testing.T) {
	db := SetupTestDB()

	order := models.Order{}
	result := db.Create(&order)

	assert.NotNil(t, result.Error)
}

func TestOrderWithLongOrderDate(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01T00:00:00Z",
		TotalCost: 100.50,
		Status:    "pending",
	}
	result := db.Create(&order)

	assert.Nil(t, result.Error)
	assert.NotZero(t, order.ID)
}

func TestOrderWithSpecialCharactersInStatus(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
		Status:    "pend!ng",
	}
	result := db.Create(&order)

	assert.NotNil(t, result.Error)
}
