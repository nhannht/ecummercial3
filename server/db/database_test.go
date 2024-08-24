package db

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"nhannht.kute/ecummercial/server/models"
)

func TestConnectAndMigrateDatabase(t *testing.T) {
	// Call the function to connect and migrate the database
	setEnvErr := os.Setenv("MODE", "test")
	if setEnvErr != nil {
		return
	}
	ConnectAndMigrateDatabase()

	// Check if the DB variable is not nil
	assert.NotNil(t, DB)

	// Check if the tables were created successfully
	tables := []interface{}{
		&models.User{},
		&models.Category{},
		&models.Address{},
		&models.Order{},
		&models.OrderItem{},
		&models.Payment{},
		&models.Product{},
		&models.Review{},
	}

	for _, table := range tables {
		assert.True(t, DB.Migrator().HasTable(table))
	}
}

func TestDatabaseOperations(t *testing.T) {
	ConnectAndMigrateDatabase()

	// Test creating a user
	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	result := DB.Create(&user)
	assert.Nil(t, result.Error)
	assert.NotZero(t, user.ID)

	// Test creating a product
	product := models.Product{Name: "Test Product", Description: "Test Description", Price: 10.0, Stock: 100}
	result = DB.Create(&product)
	assert.Nil(t, result.Error)
	assert.NotZero(t, product.ID)

	// Test creating an order
	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalCost: 100.50}
	result = DB.Create(&order)
	assert.Nil(t, result.Error)
	assert.NotZero(t, order.ID)

	// Test creating a payment
	payment := models.Payment{OrderID: order.ID, PaymentDate: "2023-10-02", Amount: 100.50, PaymentMethod: "Credit Card"}
	result = DB.Create(&payment)
	assert.Nil(t, result.Error)
	assert.NotZero(t, payment.ID)

	// Test creating a review
	review := models.Review{UserID: user.ID, ProductID: product.ID, Rating: 5, Comment: "Great product!", ReviewDate: "2023-10-03"}
	result = DB.Create(&review)
	assert.Nil(t, result.Error)
	assert.NotZero(t, review.ID)
}
