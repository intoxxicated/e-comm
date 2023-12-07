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
import {FooterComponent} from "../footer/footer.component";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";

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
    NgForOf,
    FooterComponent,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers:[SellerProductService]
})
export class HeaderComponent implements OnInit{
 menuType="default";
 sellerName="";
 searchResult:undefined|Product[];
 userName= "";
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
        else if(localStorage.getItem('user')){
          this.menuType="user";
          if(localStorage.getItem('user')){
            let userDataStore=localStorage.getItem('user')
            let userData=userDataStore && JSON.parse(userDataStore)[0];
            this.userName=userData.name;
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

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])
  }
  openTnC(){
    const dialogRef = this.dialog.open(TermsConditionComponent);

  }

    redirectToDetail(id:number) {
        this.route.navigate(['/details/'+id])
    }
    userLogout()
    {
      const dialogRef=this.dialog.open(SellerLogoutDialogComponent,{
        width:'400px'
      })
      dialogRef.afterClosed().subscribe((res)=>{
        if(res==='Yes'){
          localStorage.removeItem('user');
          this.route.navigate(['user-auth']);
        }
      })
    }
}
