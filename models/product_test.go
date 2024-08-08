package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateProduct(t *testing.T) {
	db := SetupTestDB()

	product := Product{
		Name:        "Laptop",
		Description: "A high-end gaming laptop",
		Price:       1500.00,
		Stock:       10,
	}
	result := db.Create(&product)

	assert.Nil(t, result.Error)
	assert.NotZero(t, product.ID)
	assert.Equal(t, "Laptop", product.Name)
	assert.Equal(t, "A high-end gaming laptop", product.Description)
	assert.Equal(t, 1500.00, product.Price)
	assert.Equal(t, 10, product.Stock)
}

func TestGetProduct(t *testing.T) {
	db := SetupTestDB()

	product := Product{
		Name:        "Laptop",
		Description: "A high-end gaming laptop",
		Price:       1500.00,
		Stock:       10,
	}
	db.Create(&product)

	var fetchedProduct Product
	result := db.First(&fetchedProduct, product.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, product.Name, fetchedProduct.Name)
	assert.Equal(t, product.Description, fetchedProduct.Description)
	assert.Equal(t, product.Price, fetchedProduct.Price)
	assert.Equal(t, product.Stock, fetchedProduct.Stock)
}

func TestUpdateProduct(t *testing.T) {
	db := SetupTestDB()

	product := Product{
		Name:        "Laptop",
		Description: "A high-end gaming laptop",
		Price:       1500.00,
		Stock:       10,
	}
	db.Create(&product)

	updatedData := Product{
		Name:        "Gaming Laptop",
		Description: "An updated high-end gaming laptop",
		Price:       1600.00,
		Stock:       8,
	}
	db.Model(&product).Updates(updatedData)

	var updatedProduct Product
	db.First(&updatedProduct, product.ID)

	assert.Equal(t, "Gaming Laptop", updatedProduct.Name)
	assert.Equal(t, "An updated high-end gaming laptop", updatedProduct.Description)
	assert.Equal(t, 1600.00, updatedProduct.Price)
	assert.Equal(t, 8, updatedProduct.Stock)
}

func TestDeleteProduct(t *testing.T) {
	db := SetupTestDB()

	product := Product{
		Name:        "Laptop",
		Description: "A high-end gaming laptop",
		Price:       1500.00,
		Stock:       10,
	}
	db.Create(&product)

	db.Delete(&product)

	var deletedProduct Product
	result := db.First(&deletedProduct, product.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}
