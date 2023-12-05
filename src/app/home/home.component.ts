import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    NgbCarousel,
    NgbSlide,
    NgForOf,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[SellerProductService]
})
export class HomeComponent implements OnInit{
  popularProducts:undefined|Product[];
  trendyProducts:undefined | Product[];
  image=['https://img.freepik.com/free-vector/commercial-banner-big-sale-lettering-with-thirty-fifty-percentage-discount_24877-57620.jpg?size=626&ext=jpg&ga=GA1.1.1969400973.1701778210&semt=sph',
  'https://img.freepik.com/free-vector/stylish-yellow-red-black-friday-sale-memphis-style-banner_1017-34704.jpg?size=626&ext=jpg&ga=GA1.1.1969400973.1701778210&semt=sph',
  'https://img.freepik.com/free-photo/purchase-bags-with-word-sale_1156-140.jpg?size=626&ext=jpg&ga=GA1.1.1969400973.1701778210&semt=sph'];
  constructor(private product:SellerProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.warn(data)
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }

}
