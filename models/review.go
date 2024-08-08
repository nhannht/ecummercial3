package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	UserID     uint
	User       User
	ProductID  uint
	Product    Product
	Rating     int
	Comment    string
	ReviewDate string
}
