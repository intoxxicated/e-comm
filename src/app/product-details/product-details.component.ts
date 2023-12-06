import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-product-details',
  standalone: true,
    imports: [
        NgIf,
        MatButtonModule
    ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
    providers:[SellerProductService]
})
export class ProductDetailsComponent implements OnInit{
  productData:undefined|Product
    productQuantity: number=1;
  constructor(private activeRoute:ActivatedRoute,private product:SellerProductService) {
  }
  ngOnInit(): void {
    let productId=this.activeRoute.snapshot.paramMap.get('productId');
      console.warn(productId)
      productId && this.product.getProduct(productId).subscribe((result)=>{
          console.warn(result)
          this.productData=result;
      });
  }

    handleQuantity(val: string) {
    if(this.productQuantity<20 && val=='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val=='min'){
            this.productQuantity-=1;
        }

    }
}
