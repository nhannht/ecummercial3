package models

import (
	"gorm.io/gorm"
)

type OrderItem struct {
	gorm.Model `faker:"-"`
	OrderID    uint    `faker:"-"`
	ProductID  uint    `faker:"-"`
	Quantity   int     `faker:"oneof:1,2,3,4,5"`
	Price      float64 `faker:"amount"`
}

func (o *OrderItem) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(o); err != nil {
		return err
	}

	return nil
}
