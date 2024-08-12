package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	UserID     uint    `faker:"-"`
	User       User    `faker:"-"`
	ProductID  uint    `faker:"-"`
	Product    Product `faker:"-"`
	Rating     int     `faker:"oneof: 1,2,3,4,5"`
	Comment    string  `faker:"paragraph"`
	ReviewDate string  `faker:"date"`
}
