package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreatePayment(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	payment := Payment{
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

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	payment := Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	var fetchedPayment Payment
	result := db.First(&fetchedPayment, payment.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, payment.PaymentDate, fetchedPayment.PaymentDate)
	assert.Equal(t, payment.Amount, fetchedPayment.Amount)
}

func TestUpdatePayment(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	payment := Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	updatedData := Payment{
		PaymentDate:   "2023-10-03",
		Amount:        150.75,
		PaymentMethod: "PayPal",
	}
	db.Model(&payment).Updates(updatedData)

	var updatedPayment Payment
	db.First(&updatedPayment, payment.ID)

	assert.Equal(t, "2023-10-03", updatedPayment.PaymentDate)
	assert.Equal(t, 150.75, updatedPayment.Amount)
	assert.Equal(t, "PayPal", updatedPayment.PaymentMethod)
}

func TestDeletePayment(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	order := Order{
		UserID:      user.ID,
		OrderDate:   "2023-10-01",
		TotalAmount: 100.50,
	}
	db.Create(&order)

	payment := Payment{
		OrderID:       order.ID,
		PaymentDate:   "2023-10-02",
		Amount:        100.50,
		PaymentMethod: "Credit Card",
	}
	db.Create(&payment)

	db.Delete(&payment)

	var deletedPayment Payment
	result := db.First(&deletedPayment, payment.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}
