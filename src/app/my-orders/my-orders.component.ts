import {Component, OnInit} from '@angular/core';
import {order} from "../data-types";
import {SellerProductService} from "../services/seller-product.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
  providers:[SellerProductService]
})
export class MyOrdersComponent implements OnInit{
  orderData:order[]|undefined
  constructor(private product:SellerProductService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

}
