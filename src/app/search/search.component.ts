import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  providers:[SellerProductService]
})
export class SearchComponent implements OnInit{
  searchResult:undefined|Product[]
  constructor(private activeRoute: ActivatedRoute, private product:SellerProductService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchResult=result;

    })
  }

}
