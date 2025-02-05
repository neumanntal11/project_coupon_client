import { Category } from "./Category";
import { Company } from "./Company";

//Coupon model

export class Coupon{
    id:number;
    company:Company;
    category:Category;
    title:string;
    description:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    price:number;
    image:string;

constructor(id:number, company:Company, category:Category, title:string, description:string, startDate:Date, endDate:Date, amount:number, price:number, image:string){
    this.id = id;
    this.company = company;
    this.category = category;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.price = price;
    this.image = image;
}

public setCompany(company:Company){
    this.company = company
}
}