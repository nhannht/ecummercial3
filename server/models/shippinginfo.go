package models

import (
	"gorm.io/gorm"
)

type ShippingInfo struct {
	gorm.Model `faker:"-"`
	Street     string `faker:"oneof:StreetA,StreetB,StreetC,StreetD,StreetE,StreetF,StreetG,StreetH,StreetI,StreetJ"`
	Province   string `faker:"oneof:ProvinceA,ProvinceB,ProvinceC,ProvinceD,ProvinceE,ProvinceF"`
	OrderID    uint   `faker:"-"`
	Phone      string `faker:"phone_number"`
	Identify   string `faker:"oneof:he,she"`
	Note       string `faker:"paragraph"`
}

func (s *ShippingInfo) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(s); err != nil {
		return err
	}

	return nil
}
