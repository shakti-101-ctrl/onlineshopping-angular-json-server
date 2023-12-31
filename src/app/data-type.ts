export interface SignUp{
    name:string,
    password:string,
    email:string
}
export interface Login{
   
    password:string,
    email:string
}
export interface Product{
   name:string,
   price:number,
   category:string,
   color:string,
   description:string,
   url:string,
   id:number,
   quantity : undefined | number
}
export interface Cart{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    url:string,
    id:number | undefined,
    quantity : undefined | number,
    userId : number,
    productId : number
 }