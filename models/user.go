package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name      string `gorm:"unique" binding:"required"`
	Email     string `gorm:"unique" binding:"required"`
	Password  string `binding:"required"`
	Addresses []Address
	Orders    []Order
	Reviews   []Review
	Role      string `binding:"required"`
}
