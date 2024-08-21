export type CategoryData = {
    ID:string,
    CategoryName: string
}
export type ProductData = {
    ID:string,
    Name: string,
    Description: string,
    Price: number,
    Image:string,
    Stock:number,
    Categories: CategoryData[]

}