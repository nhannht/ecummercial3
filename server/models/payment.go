package models

import (
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model    `faker:"-"`
	OrderID       uint    `faker:"-"`
	PaymentDate   string  `faker:"date"`
	Amount        float64 `faker:"unique"`
	PaymentMethod string  `faker:"oneof:cash,card,paypal"`
	Status        string  `faker:"oneof:pending,completed"`
}

func (p *Payment) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(p); err != nil {
		return err
	}

	return nil
}
