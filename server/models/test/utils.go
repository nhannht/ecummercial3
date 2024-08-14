package test

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"nhannht.kute/ecummercial/server/models"
)

func SetupTestDB() *gorm.DB {
	db, dbConnectErr := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if dbConnectErr != nil {
		panic("failed to connect to test database")
	}
	dbMigrateErr := db.
		Migrator().
		AutoMigrate(&models.User{},
			&models.Order{},
			&models.OrderItem{},
			&models.Product{},
			&models.Category{},
			&models.Review{},
			&models.Payment{})
	if dbMigrateErr != nil {
		return nil
	}
	return db
}
