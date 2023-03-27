import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddgameComponent } from 'src/app/Modals/addgame/addgame.component';
import { TransService } from 'src/app/services/trans.service';


@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit{
  
  constructor(
    public dialog: MatDialog,
    public trns : TransService
    ){}

  small : boolean = this.trns.disply();
  ngOnInit(): void {
    
  }
  openDialog() {
    this.dialog.open(AddgameComponent);
  }
  

}
