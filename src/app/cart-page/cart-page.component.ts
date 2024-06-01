import {Component, OnInit} from '@angular/core';
import {cart, priceSummary} from "../data-types";
import {SellerProductService} from "../services/seller-product.service";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  providers:[SellerProductService]
})
export class CartPageComponent implements OnInit{
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: SellerProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails()

  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
      .subscribe((result)=>{
        this.loadDetails();
      })
  }

  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

      if(!this.cartData.length){
        this.router.navigate(['/'])
      }

    })
  }




  checkout() {
    this.router.navigate(['/checkout'])
  }

}
