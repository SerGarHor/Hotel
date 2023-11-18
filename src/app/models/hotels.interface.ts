export interface Hotel {
    id: number
    name_hotel : string 
    addres_hotel : string 
    country : string 
    description_hotel : string
    phone_number : string
    email : string
    img : string
    stars : number 
}

export enum HotelFormEnum{
    id = "id",
    name_hotel = "name_hotel",
    addres_hotel = "addres_hotel",
    country = "country",
    description_hotel = "description_hotel",
    phone_number = "phone_number",
    email = "email",
    img = "img",
    stars = "stars"
}