package models

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model   `faker:"-"`
	UserID       uint         `faker:"-" validate:"required"`
	TotalCost    float64      `faker:"amount" validate:"gte=0"`
	OrderItems   []OrderItem  `faker:"-"`
	Payments     []Payment    `faker:"-"`
	Status       string       `faker:"oneof:pending,shipped,delivered"`
	ShippingInfo ShippingInfo `faker:"-"`
	User         User         `faker:"-"`
}

func (o *Order) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(o); err != nil {
		return err
	}

	return nil
}
