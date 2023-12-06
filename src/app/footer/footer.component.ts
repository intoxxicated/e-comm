import { Component } from '@angular/core';
import {TermsConditionComponent} from "../terms-condition/terms-condition.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

constructor(public dialog: MatDialog) {
}

  openTnC(){
    const dialogRef = this.dialog.open(TermsConditionComponent);

  }
}
