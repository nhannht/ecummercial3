package models

import (
	"gorm.io/gorm"
)

type ShippingInfo struct {
	gorm.Model `faker:"-"`
	Address    string `faker:"oneof:StreetA,StreetB,StreetC,StreetD,StreetE,StreetF,StreetG,StreetH,StreetI,StreetJ"`
	City       string `faker:"oneof:ProvinceA,ProvinceB,ProvinceC,ProvinceD,ProvinceE,ProvinceF"`
	State      string `faker:"oneof:StateA,StateB,StateC,StateD,State"`
	OrderID    uint   `faker:"-"`

	Phone string `faker:"phone_number"`
	Sex   string `faker:"oneof:male,female"`
	Note  string `faker:"paragraph"`
}

func (s *ShippingInfo) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(s); err != nil {
		return err
	}

	return nil
}
