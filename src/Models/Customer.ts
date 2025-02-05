import { Coupon } from "./Coupon";

//Customer model

export class Customer{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    coupons:Set<Coupon>;

constructor(id:number, firstName:string, lastName:string, email:string, password:string, coupons:Set<Coupon>){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.coupons = coupons;
}

toString(): string {
    // const couponsList = Array.from(this.coupons).map(coupon => coupon.toString()).join(", ");
    return `Customer {
id: ${this.id},
firstName: ${this.firstName},
lastName: ${this.lastName},
email: ${this.email},
password: ${this.password},
}`;
}
}