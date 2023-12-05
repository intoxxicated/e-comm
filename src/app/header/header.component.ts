import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDialog} from "@angular/material/dialog";
import {TermsConditionComponent} from "../terms-condition/terms-condition.component";
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {
  SellerProductDeleteDialogComponent
} from "../seller-product-delete-dialog/seller-product-delete-dialog.component";
import {SellerLogoutDialogComponent} from "../seller-logout-dialog/seller-logout-dialog.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    UpperCasePipe,
    TitleCasePipe,
    MatIconModule,
    MatInputModule,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers:[SellerProductService]
})
export class HeaderComponent implements OnInit{
 menuType="default";
 sellerName="";
 searchResult:undefined|Product[];
  constructor(private route:Router,public dialog: MatDialog,private product:SellerProductService) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&& val.url.includes('seller')){
          this.menuType="seller";
          if(localStorage.getItem('seller')){
            let sellerDataStore=localStorage.getItem('seller')
            let sellerData=sellerDataStore && JSON.parse(sellerDataStore)[0];
            this.sellerName=sellerData.name;
          }
        }
        else {
          this.menuType="default";
        }
      }
    })
  }
  logout(){
    const dialogRef=this.dialog.open(SellerLogoutDialogComponent,{
      width:'400px'
    })
    dialogRef.afterClosed().subscribe((res)=>{
      if(res==='Yes'){
        localStorage.removeItem('seller');
        this.route.navigate(['/']);
      }
    })


  }
  openTnC(){
    const dialogRef = this.dialog.open(TermsConditionComponent);

  }

  searchProduct(query: KeyboardEvent) {
    if(query){
      const elements=query.target as HTMLInputElement;
      this.product.searchProduct(elements.value).subscribe((result)=>
      {
        if(result.length>5){
          result.length=5;
        }

        this.searchResult=result;
      })
    }

  }

    hideSearch() {
        this.searchResult=undefined;
    }
}
