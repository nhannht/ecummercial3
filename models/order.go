package models

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	UserID       uint         `faker:"-" validate:"required"`
	OrderDate    string       `faker:"date" validate:"datetime=2006-01-02"`
	TotalAmount  float64      `faker:"amount" validate:"gte=0"`
	OrderItems   []OrderItem  `faker:"-"`
	Payments     []Payment    `faker:"-"`
	Status       string       `faker:"oneof:pending,shipped,delivered"`
	ShippingInfo ShippingInfo `faker:"-"`
}

func (o *Order) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(o); err != nil {
		return err
	}

	return nil
}
