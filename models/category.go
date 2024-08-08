package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	CategoryName string
	Products     []Product `gorm:"many2many:product_categories;"`
}
