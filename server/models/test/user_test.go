package test

import (
	"github.com/stretchr/testify/assert"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"nhannht.kute/ecummercial/server/models"
	"os"
	"testing"
)

func setupTestDB() *gorm.DB {
	db, dbConnectErr := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if dbConnectErr != nil {
		panic("failed to connect to test database")
	}
	dbMigrateErr := db.Migrator().AutoMigrate(&models.User{})
	if dbMigrateErr != nil {
		return nil
	}
	dbErr := os.Setenv("environment", "test")
	if dbErr != nil {
		log.Fatalf("Set env err %v", dbErr)
	}
	return db
}
func TestCreateUser(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	result := db.Create(&user)

	assert.Nil(t, result.Error)
	assert.NotZero(t, user.ID)
}

func TestGetUser(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	var fetchedUser models.User
	result := db.First(&fetchedUser, user.ID)

	assert.Nil(t, result.Error)
	assert.Equal(t, user.Name, fetchedUser.Name)
	assert.Equal(t, user.Email, fetchedUser.Email)
}

func TestUpdateUser(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	updatedData := models.User{Name: "Jane Doe", Email: "jane@example.com"}
	db.Model(&user).Updates(updatedData)

	var updatedUser models.User
	db.First(&updatedUser, user.ID)

	assert.Equal(t, "Jane Doe", updatedUser.Name)
	assert.Equal(t, "jane@example.com", updatedUser.Email)
}

func TestDeleteUser(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	db.Delete(&user)

	var deletedUser models.User
	result := db.First(&deletedUser, user.ID)

	assert.NotNil(t, result.Error)
	assert.Equal(t, gorm.ErrRecordNotFound, result.Error)
}

func TestCreateUserWithMissingFields(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe"}
	result := db.Create(&user)

	assert.NotNil(t, result.Error)
}

func TestUniqueEmailConstraint(t *testing.T) {
	db := setupTestDB()

	user1 := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user1)

	user2 := models.User{Name: "Jane Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	result := db.Create(&user2)

	assert.NotNil(t, result.Error)
}

func TestPasswordHashing(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	var fetchedUser models.User
	db.First(&fetchedUser, user.ID)

	assert.NotEqual(t, "password123", fetchedUser.Password)
	assert.NotZero(t, fetchedUser.Password)
}

func TestUpdateUserPassword(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.Create(&user)

	// Update the password
	newPassword := "newpassword123"
	user.Password = newPassword
	db.Save(&user)

	var updatedUser models.User
	db.First(&updatedUser, user.ID)

	// Ensure the password is hashed
	assert.NotEqual(t, newPassword, updatedUser.Password)
	assert.NotZero(t, updatedUser.Password)

	// Ensure the hashed password matches the new password
	err := bcrypt.CompareHashAndPassword([]byte(updatedUser.Password), []byte(newPassword))
	assert.Nil(t, err)
}

func TestInvalidEmailFormat(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe", Email: "invalid-email", Password: "password123", Role: "user"}
	result := db.Create(&user)

	assert.NotNil(t, result.Error)
}

func TestUserRoleDefault(t *testing.T) {
	db := setupTestDB()

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123"}
	db.Create(&user)

	var fetchedUser models.User
	db.First(&fetchedUser, user.ID)

	assert.Equal(t, "user", fetchedUser.Role)
}

func TestUserAddresses(t *testing.T) {
	db := setupTestDB()

	addresses := "123 Main St, Anytown, USA"
	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user", Addresses: addresses}
	db.Create(&user)

	var fetchedUser models.User
	db.First(&fetchedUser, user.ID)

	assert.Equal(t, addresses, fetchedUser.Addresses)
}
