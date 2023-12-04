import {Component, OnInit} from '@angular/core';
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [
    MatIconModule,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
  providers:[SellerProductService]
})
export class SellerHomeComponent implements OnInit{
  productList:undefined|Product[];
  productMessage: undefined|string;
  ngOnInit(): void {
    this.list();
  }
  constructor(private product:SellerProductService) {
  }
  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product '+id+' is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
  list(){
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result
    })
  }
}
