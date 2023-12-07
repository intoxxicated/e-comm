import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        MatTableModule,
        NgbCarousel,
        NgbSlide,
        NgForOf,
        NgIf,
        MatIconModule,
        RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[SellerProductService]
})
export class HomeComponent implements OnInit{
  popularProducts:undefined|Product[];
  trendyProducts:undefined | Product[];
  image=['https://img.freepik.com/free-vector/black-friday-wide-orange-sale-grunge-banner_1017-34783.jpg?size=626&ext=jpg&ga=GA1.1.1969400973.1701778210&semt=sph',
  'https://img.freepik.com/free-vector/shopping-day-sale-design-with-3d-lettering-party-balloon-special-offer-illustration_1314-3340.jpg?size=626&ext=jpg&ga=GA1.1.1969400973.1701778210&semt=sph',
  'https://img.freepik.com/free-vector/winter-season-sale-horizontal-banner-template_23-2149933853.jpg?size=626&ext=jpg&ga=GA1.1.1969400973.1701778210&semt=sph',
  'https://img.freepik.com/free-vector/summer-season-sale-fifty-percent-off-lettering_1262-12130.jpg?size=626&ext=jpg&ga=GA1.1.1969400973.1701778210&semt=sph'];
  constructor(private product:SellerProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }

}
