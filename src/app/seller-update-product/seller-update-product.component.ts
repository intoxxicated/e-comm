import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
  providers:[SellerProductService]
})
export class SellerUpdateProductComponent implements OnInit {
  @ViewChild('addProduct') addProduct!: NgForm;
  productData:undefined|Product;
  productMessage:undefined|string;
  spinner=false;
  constructor(private route: ActivatedRoute, private product: SellerProductService,private router:Router) {
  }

  submit(data: Product) {
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has been Updated !!.....Redirecting..."
        this.addProduct.form.disable()
        this.spinner=!this.spinner
      }
    });
    setTimeout(()=>{
      this.productMessage=undefined;
      this.router.navigate(['seller-home']);

    },2000)


  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((data)=>{
      this.productData=data;
    })
  }
}
