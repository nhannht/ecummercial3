package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name      string   `gorm:"unique" binding:"required" faker:"username,unique"`
	Email     string   `gorm:"unique" binding:"required" faker:"email,unique"`
	Password  string   `binding:"required" faker:"oneof: password"`
	Addresses string   `faker:"sentence"`
	Orders    []Order  `faker:"-"`
	Reviews   []Review `faker:"-"`
	Role      string   `binding:"required" faker:"oneof:user"`
}
