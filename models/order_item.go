package models

import "gorm.io/gorm"

type OrderItem struct {
	gorm.Model
	OrderID   uint    `faker:"-"`
	Order     Order   `faker:"-"`
	ProductID uint    `faker:"-"`
	Product   Product `faker:"-"`
	Quantity  int     `faker:"oneof:1,2,3,4,5"`
	Price     float64 `faker:"amount"`
}
