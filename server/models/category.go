package models

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model   `faker:"-"`
	CategoryName string    `gorm:"unique" validate:"required"    binding:"required" faker:"unique,oneof: Electronics, Books, Clothing, Home & Kitchen, Sports & Outdoors, Health & Personal Care, Toys & Games, Automotive, Beauty, Grocery, Office Products, Pet Supplies, Garden & Outdoor, Tools & Home Improvement, Baby, Jewelry, Musical Instruments, Industrial & Scientific, Luggage & Travel Gear, Software,Category 20"`
	Products     []Product `gorm:"many2many:product_categories;" faker:"-"`
}

//func (c *Category) BeforeCreate(tx *gorm.DB) (err error) {
//	if err = validate.Struct(c); err != nil {
//		return err
//	}
//	return nil
//}

func (c *Category) BeforeCreate(tx *gorm.DB) (err error) {
	err = validate.Struct(c)
	if err != nil {
		return err
	}
	//var count int64
	//tx.Model(&Category{}).Where("category_name = ?", c.CategoryName).Count(&count)
	//if count > 0 {
	//	return fmt.Errorf("category name must be unique")
	//}
	err = validate.Struct(c)
	if err != nil {
		return err
	}
	return nil
}
