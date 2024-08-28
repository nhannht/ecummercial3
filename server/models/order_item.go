package models

import (
	"gorm.io/gorm"
)

type OrderItem struct {
	gorm.Model `faker:"-"`
	Name       string  `faker:"word"`
	OrderID    uint    `faker:"-"`
	Order      Order   `faker:"-"`
	ProductID  uint    `faker:"-"`
	Product    Product `faker:"-"`
}

func (o *OrderItem) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(o); err != nil {
		return err
	}

	return nil
}
