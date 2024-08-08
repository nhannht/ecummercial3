package models

import (
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
	"testing"
)

func TestCreateUser(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	result := db.Create(&user)

	assert.Nil(t, result.Error)
	assert.NotZero(t, user.ID)
}

func TestGetUser(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	var fetchedUser User
	result := db.First(&fetchedUser, user.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, user.Name, fetchedUser.Name)
	assert.Equal(t, user.Email, fetchedUser.Email)
}

func TestUpdateUser(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	updatedData := User{Name: "Jane Doe", Email: "jane@example.com"}
	db.Model(&user).Updates(updatedData)

	var updatedUser User
	db.First(&updatedUser, user.ID)

	assert.Equal(t, "Jane Doe", updatedUser.Name)
	assert.Equal(t, "jane@example.com", updatedUser.Email)
}

func TestDeleteUser(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	db.Delete(&user)

	var deletedUser User
	result := db.First(&deletedUser, user.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}
