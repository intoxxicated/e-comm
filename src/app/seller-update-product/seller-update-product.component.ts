import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
  providers:[SellerProductService]
})
export class SellerUpdateProductComponent implements OnInit {
  productData:undefined|Product;
  productMessage:undefined|string;
  constructor(private route: ActivatedRoute, private product: SellerProductService,private router:Router) {
  }

  submit(data: Product) {
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has been Updated !!.....Redirecting..."
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
