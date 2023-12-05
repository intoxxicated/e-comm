import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule} from "@angular/forms";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-seller-add-product',
  standalone:true,
  imports: [
    FormsModule,
    MatTableModule
  ],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
  providers:[SellerProductService]
})
export class SellerAddProductComponent  implements OnInit{
  productMessage:string|undefined;
  submit(data:Product){
    this.sellerProduct.addProduct(data).subscribe((result:any)=>{
      if(result){
        this.productMessage="Product is successfully Added"
      }
      setTimeout(()=>this.productMessage=undefined,3000);

    })

  }

  constructor(private sellerProduct:SellerProductService) {
  }

  ngOnInit(): void {
  }
}
