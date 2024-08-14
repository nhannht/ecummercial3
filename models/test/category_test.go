package test

import (
	"nhannht.kute/ecummercial/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateCategory(t *testing.T) {

	db := SetupTestDB()

	category := models.Category{CategoryName: "Electronics"}
	result := db.Create(&category)

	assert.Nil(t, result.Error)
	assert.NotZero(t, category.ID)
}

func TestGetCategory(t *testing.T) {
	db := SetupTestDB()

	category := models.Category{CategoryName: "Electronics"}
	db.Create(&category)

	var fetchedCategory models.Category
	result := db.First(&fetchedCategory, category.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, category.CategoryName, fetchedCategory.CategoryName)
}

func TestUpdateCategory(t *testing.T) {
	db := SetupTestDB()

	category := models.Category{CategoryName: "Electronics"}
	db.Create(&category)

	updatedData := models.Category{CategoryName: "Home Appliances"}
	db.Model(&category).Updates(updatedData)

	var updatedCategory models.Category
	db.First(&updatedCategory, category.ID)

	assert.Equal(t, "Home Appliances", updatedCategory.CategoryName)
}

func TestDeleteCategory(t *testing.T) {
	db := SetupTestDB()

	category := models.Category{CategoryName: "Electronics"}
	db.Create(&category)

	db.Delete(&category)

	var deletedCategory models.Category
	result := db.First(&deletedCategory, category.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}
