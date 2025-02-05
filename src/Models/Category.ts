import { Coupon } from "./Coupon";

//Category model

export class Category{
    id:number;
    name:string;
    coupons:Coupon[];

constructor(id:number, name:string, coupons:Coupon[]){
    this.id = id;
    this.name = name;
    this.coupons = coupons;
}
}