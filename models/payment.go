package models

import "gorm.io/gorm"

type Payment struct {
	gorm.Model
	OrderID       uint    `faker:"-"`
	Order         Order   `faker:"-"`
	PaymentDate   string  `faker:"date"`
	Amount        float64 `faker:"unique"`
	PaymentMethod string  `faker:"oneof:cash,card,paypal"`
	Status        string  `faker:"oneof:pending,completed"`
}
