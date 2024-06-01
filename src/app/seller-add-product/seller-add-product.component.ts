import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormsModule, NgForm} from "@angular/forms";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-seller-add-product',
  standalone:true,
  imports: [
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
  providers:[SellerProductService]
})
export class SellerAddProductComponent  implements OnInit{
  @ViewChild('addProduct') addProduct!: NgForm;
  productMessage:string|undefined;
  submit(data:Product){
    this.sellerProduct.addProduct(data).subscribe((result:any)=>{
      if(result){
        this.productMessage="Product is successfully Added"
      }
      setTimeout(()=>this.productMessage=undefined,3000);
      this.addProduct.resetForm();


    })

  }

  constructor(private sellerProduct:SellerProductService) {
  }

  ngOnInit(): void {
  }
}
