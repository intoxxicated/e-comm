import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-seller-product-delete-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatDialogClose
  ],
  templateUrl: './seller-product-delete-dialog.component.html',
  styleUrl: './seller-product-delete-dialog.component.css'
})

export class SellerProductDeleteDialogComponent {
constructor(public DialogRef:MatDialogRef<SellerProductDeleteDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data:any){


}
}
