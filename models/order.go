package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	UserID      uint        `faker:"-"`
	User        User        `faker:"-"`
	OrderDate   string      `faker:"date"`
	TotalAmount float64     `faker:"amount"`
	OrderItems  []OrderItem `faker:"-"`
	Payments    []Payment   `faker:"-"`
	Status      string      `faker:"oneof:pending,shipped,delivered"`
}
