package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	UserID      uint
	User        User
	OrderDate   string
	TotalAmount float64
	OrderItems  []OrderItem
	Payments    []Payment
}
