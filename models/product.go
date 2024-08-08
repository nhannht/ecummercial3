package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name        string
	Description string
	Price       float64
	Stock       int
	Categories  []Category `gorm:"many2many:product_categories;"`
	Reviews     []Review
	OrderItems  []OrderItem
	Image       string
}
