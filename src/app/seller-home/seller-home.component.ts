import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SellerProductService} from "../services/seller-product.service";
import {Product} from "../data-types";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {
  SellerProductDeleteDialogComponent
} from "../seller-product-delete-dialog/seller-product-delete-dialog.component";
import {RouterLink} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [
    MatIconModule,
    NgForOf,
    NgOptimizedImage,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
  ],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
  providers:[SellerProductService]
})
export class SellerHomeComponent implements OnInit, AfterViewInit{
@ViewChild(MatPaginator) paginator!:MatPaginator
  productList:Product[]|undefined;
  productMessage: undefined|string;
  displayedColumns: string[] = ['image', 'name', 'price', 'color', 'category', 'description', 'actions'];
  dataSource:any;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  ngOnInit(): void {
    this.list();

  }
  constructor(private product:SellerProductService, private dialog:MatDialog) {
  }

  ngAfterViewInit(): void {
this.dataSource.paginator=this.paginator
    }
  deleteProduct(id: number) {
    const dialogRef=this.dialog.open(SellerProductDeleteDialogComponent,{
      width:'400px',
      data:{id}
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res==='Yes')
      {
        this.product.deleteProduct(id).subscribe((result) => {
          if (result) {
            this.productMessage = 'Product is deleted';

            this.list();
          }
        });
        setTimeout(() => {
          this.productMessage = undefined;
        }, 3000);
      }
    })

  }
  list(){
    this.product.productList().subscribe((result)=>{
      this.productList =result ;
      this.dataSource=new MatTableDataSource<Product>(this.productList);

    })
  }



}
