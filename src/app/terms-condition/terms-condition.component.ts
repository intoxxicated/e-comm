import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-terms-condition',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    MatDialogTitle,
    MatListModule
  ],
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.css'
})
export class TermsConditionComponent {

}
