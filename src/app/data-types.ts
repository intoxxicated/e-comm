export interface SignUpType {
  name:string,
  email:string,
  pass:string
}
export interface LoginType {
  email:string,
  password:string
}
export interface Product {
  name:string,
  price:number,
  category:string,
  color:string,
  description:string,
  image:string
  id:number
  quantity:number|undefined
}

export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number| undefined,
  quantity:undefined | number,
  productId:number,
  userId:number
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:string,
  id:number|undefined
}
