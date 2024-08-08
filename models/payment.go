package models

import "gorm.io/gorm"

type Payment struct {
	gorm.Model
	OrderID       uint
	Order         Order
	PaymentDate   string
	Amount        float64
	PaymentMethod string
}
