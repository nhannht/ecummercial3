package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateAddress(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	address := Address{
		UserID:       user.ID,
		AddressLine1: "123 Main St",
		AddressLine2: "Apt 4B",
		City:         "Anytown",
		State:        "Anystate",
		ZipCode:      "12345",
		Country:      "USA",
		AddressType:  "Home",
	}
	result := db.Create(&address)

	assert.Nil(t, result.Error)
	assert.NotZero(t, address.ID)
	assert.Equal(t, user.ID, address.UserID)
}

func TestGetAddress(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	address := Address{
		UserID:       user.ID,
		AddressLine1: "123 Main St",
		AddressLine2: "Apt 4B",
		City:         "Anytown",
		State:        "Anystate",
		ZipCode:      "12345",
		Country:      "USA",
		AddressType:  "Home",
	}
	db.Create(&address)

	var fetchedAddress Address
	result := db.First(&fetchedAddress, address.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, address.AddressLine1, fetchedAddress.AddressLine1)
	assert.Equal(t, address.City, fetchedAddress.City)
}

func TestUpdateAddress(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	address := Address{
		UserID:       user.ID,
		AddressLine1: "123 Main St",
		AddressLine2: "Apt 4B",
		City:         "Anytown",
		State:        "Anystate",
		ZipCode:      "12345",
		Country:      "USA",
		AddressType:  "Home",
	}
	db.Create(&address)

	updatedData := Address{
		AddressLine1: "456 Elm St",
		City:         "Othertown",
	}
	db.Model(&address).Updates(updatedData)

	var updatedAddress Address
	db.First(&updatedAddress, address.ID)

	assert.Equal(t, "456 Elm St", updatedAddress.AddressLine1)
	assert.Equal(t, "Othertown", updatedAddress.City)
}

func TestDeleteAddress(t *testing.T) {
	db := SetupTestDB()

	user := User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	address := Address{
		UserID:       user.ID,
		AddressLine1: "123 Main St",
		AddressLine2: "Apt 4B",
		City:         "Anytown",
		State:        "Anystate",
		ZipCode:      "12345",
		Country:      "USA",
		AddressType:  "Home",
	}
	db.Create(&address)

	db.Delete(&address)

	var deletedAddress Address
	result := db.First(&deletedAddress, address.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}
