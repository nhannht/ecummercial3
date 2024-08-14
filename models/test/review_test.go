package test

import (
	"nhannht.kute/ecummercial/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateReview(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	product := models.Product{
		Name:        "Laptop",
		Description: "A high-end gaming laptop",
		Price:       1500.00,
		Stock:       10,
	}
	db.Create(&product)

	review := models.Review{
		UserID:     user.ID,
		ProductID:  product.ID,
		Rating:     5,
		Comment:    "Excellent product!",
		ReviewDate: "2023-10-01",
	}
	result := db.Create(&review)

	assert.Nil(t, result.Error)
	assert.NotZero(t, review.ID)
	assert.Equal(t, user.ID, review.UserID)
	assert.Equal(t, product.ID, review.ProductID)
	assert.Equal(t, 5, review.Rating)
	assert.Equal(t, "Excellent product!", review.Comment)
	assert.Equal(t, "2023-10-01", review.ReviewDate)
}

func TestGetReview(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	product := models.Product{
		Name:        "Laptop",
		Description: "A high-end gaming laptop",
		Price:       1500.00,
		Stock:       10,
	}
	db.Create(&product)

	review := models.Review{
		UserID:     user.ID,
		ProductID:  product.ID,
		Rating:     5,
		Comment:    "Excellent product!",
		ReviewDate: "2023-10-01",
	}
	db.Create(&review)

	var fetchedReview models.Review
	result := db.First(&fetchedReview, review.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, review.Rating, fetchedReview.Rating)
	assert.Equal(t, review.Comment, fetchedReview.Comment)
	assert.Equal(t, review.ReviewDate, fetchedReview.ReviewDate)
}

func TestUpdateReview(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	product := models.Product{
		Name:        "Laptop",
		Description: "A high-end gaming laptop",
		Price:       1500.00,
		Stock:       10,
	}
	db.Create(&product)

	review := models.Review{
		UserID:     user.ID,
		ProductID:  product.ID,
		Rating:     5,
		Comment:    "Excellent product!",
		ReviewDate: "2023-10-01",
	}
	db.Create(&review)

	updatedData := models.Review{
		Rating:     4,
		Comment:    "Very good product!",
		ReviewDate: "2023-10-02",
	}
	db.Model(&review).Updates(updatedData)

	var updatedReview models.Review
	db.First(&updatedReview, review.ID)

	assert.Equal(t, 4, updatedReview.Rating)
	assert.Equal(t, "Very good product!", updatedReview.Comment)
	assert.Equal(t, "2023-10-02", updatedReview.ReviewDate)
}

func TestDeleteReview(t *testing.T) {
	db := SetupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	product := models.Product{
		Name:        "Laptop",
		Description: "A high-end gaming laptop",
		Price:       1500.00,
		Stock:       10,
	}
	db.Create(&product)

	review := models.Review{
		UserID:     user.ID,
		ProductID:  product.ID,
		Rating:     5,
		Comment:    "Excellent product!",
		ReviewDate: "2023-10-01",
	}
	db.Create(&review)

	db.Delete(&review)

	var deletedReview models.Review
	result := db.First(&deletedReview, review.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}
