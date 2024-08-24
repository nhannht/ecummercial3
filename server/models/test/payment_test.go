package test

import (
	"nhannht.kute/ecummercial/server/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreatePayment(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	result := db.Create(&payment)

	assert.Nil(t, result.Error)
	assert.NotZero(t, payment.ID)
	assert.Equal(t, order.ID, payment.OrderID)
}

func TestGetPayment(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	var fetchedPayment models.Payment
	result := db.First(&fetchedPayment, payment.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, payment.PaymentDate, fetchedPayment.PaymentDate)
	assert.Equal(t, payment.Amount, fetchedPayment.Amount)
}

func TestUpdatePayment(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	updatedData := models.Payment{
		PaymentDate:   "2023-10-03",
		Amount:        150.75,
		PaymentMethod: "PayPal",
	}
	db.Model(&payment).Updates(updatedData)

	var updatedPayment models.Payment
	db.First(&updatedPayment, payment.ID)

	assert.Equal(t, "2023-10-03", updatedPayment.PaymentDate)
	assert.Equal(t, 150.75, updatedPayment.Amount)
	assert.Equal(t, "PayPal", updatedPayment.PaymentMethod)
}

func TestDeletePayment(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	db.Delete(&payment)

	var deletedPayment models.Payment
	result := db.First(&deletedPayment, payment.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}

func TestCreatePaymentWithInvalidOrderID(t *testing.T) {
	db := SetupTestDB()

	payment := models.Payment{
		OrderID:       9999, // Non-existent OrderID
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	result := db.Create(&payment)

	assert.NotNil(t, result.Error)
}

func TestGetNonExistentPayment(t *testing.T) {
	db := SetupTestDB()

	var fetchedPayment models.Payment
	result := db.First(&fetchedPayment, 9999) // Non-existent PaymentID

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}

func TestCreatePaymentWithZeroAmount(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        0.00, // Zero amount
		PaymentMethod: "Credit Card",
	}
	result := db.Create(&payment)

	assert.Nil(t, result.Error)
	assert.NotZero(t, payment.ID)
	assert.Equal(t, 0.00, payment.Amount)
}

func TestCreatePaymentWithNegativeAmount(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        -50.00, // Negative amount
		PaymentMethod: "Credit Card",
	}
	result := db.Create(&payment)

	assert.NotNil(t, result.Error)
}

func TestCreatePaymentWithFutureDate(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2025-10-02", // Future date
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	result := db.Create(&payment)

	assert.Nil(t, result.Error)
	assert.NotZero(t, payment.ID)
	assert.Equal(t, "2025-10-02", payment.PaymentDate)
}

func TestCreatePaymentWithPastDate(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2020-10-02", // Past date
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	result := db.Create(&payment)

	assert.Nil(t, result.Error)
	assert.NotZero(t, payment.ID)
	assert.Equal(t, "2020-10-02", payment.PaymentDate)
}

func TestUpdatePaymentAmountToZero(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	updatedData := models.Payment{
		Amount: 0.00, // Update amount to zero
	}
	db.Model(&payment).Updates(updatedData)

	var updatedPayment models.Payment
	db.First(&updatedPayment, payment.ID)

	assert.Equal(t, 0.00, updatedPayment.Amount)
}

func TestUpdatePaymentAmountToNegative(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	updatedData := models.Payment{
		Amount: -50.00, // Update amount to negative
	}
	result := db.Model(&payment).Updates(updatedData)

	assert.NotNil(t, result.Error)
}

func TestUpdatePaymentMethod(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	updatedData := models.Payment{
		PaymentMethod: "Bank Transfer", // Update payment method
	}
	db.Model(&payment).Updates(updatedData)

	var updatedPayment models.Payment
	db.First(&updatedPayment, payment.ID)

	assert.Equal(t, "Bank Transfer", updatedPayment.PaymentMethod)
}

func TestDeletePaymentAndCheckOrder(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	db.Delete(&payment)

	var deletedPayment models.Payment
	result := db.First(&deletedPayment, payment.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)

	var fetchedOrder models.Order
	db.First(&fetchedOrder, order.ID)

	assert.NotNil(t, fetchedOrder)
	assert.Equal(t, order.ID, fetchedOrder.ID)
}

func TestCreatePaymentWithInvalidMethod(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "InvalidMethod", // Invalid payment method
	}
	result := db.Create(&payment)

	assert.NotNil(t, result.Error)
}

func TestCreatePaymentWithEmptyMethod(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "", // Empty payment method
	}
	result := db.Create(&payment)

	assert.NotNil(t, result.Error)
}

func TestCreatePaymentWithNullMethod(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := models.Order{
		UserID:    user.ID,
		OrderDate: "2023-10-01",
		TotalCost: 100.50,
	}
	db.Create(&order)

	payment := models.Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "", // Null payment method
	}
	result := db.Create(&payment)

	assert.NotNil(t, result.Error)
}
