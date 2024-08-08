package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func SetupTestDB() *gorm.DB {
	db, dbConnectErr := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if dbConnectErr != nil {
		panic("failed to connect to test database")
	}
	dbMigrateErr := db.Migrator().AutoMigrate(&User{}, &Order{}, &OrderItem{}, &Product{}, &Category{}, &Review{}, &Payment{}, &Address{})
	if dbMigrateErr != nil {
		return nil
	}
	return db
}
