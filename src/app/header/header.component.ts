import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgIf, NgSwitch, NgSwitchCase, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

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
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
 menuType="default";
 sellerName="";
  constructor(private route:Router) {
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
          console.warn(this.menuType);
        }
        else {
          this.menuType="default";
          console.warn(this.menuType);
        }
      }
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);

  }

}
