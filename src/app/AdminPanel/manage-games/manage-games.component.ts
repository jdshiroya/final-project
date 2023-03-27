import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AddgameComponent } from 'src/app/Modals/addgame/addgame.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-manage-games',
  templateUrl: './manage-games.component.html',
  styleUrls: ['./manage-games.component.css']
})
export class ManageGamesComponent implements OnInit {

  gameForm!: FormGroup;
  imageSrc:string="../assets/img/new2/BASKET BALL.jpg";
  Games: any;
  constructor(
                private fb: FormBuilder,    
                private toast : NgToastService, 
                public dialog : MatDialog,
                private ads : AdminServiceService,
                private trans : TransService
              ){
                this.ads.getgame().subscribe((data)=>{
                  this.Games = data;
                  console.log(this.Games);
                });
                
              }

  ngOnInit(): void {
    this.gatall();
  }

  gatall(){
    this.ads.getgame().subscribe((data)=>{
      this.Games = data;
      console.log(this.Games);
    });
    // setInterval(() => {
    // }, 10000);
  }
  ondelete(g_Id : any){
    this.ads.DelGame(g_Id).subscribe((data)=>{
      console.log(data);
      this.toast.success({detail:"success Message",summary:"game delete successfull..!",duration:5000});
      this.gatall();
    });
  }

  openDialog(){
    localStorage.setItem('task','addgame')
    this.dialog.open(AddgameComponent);
  }

  openmanage(){
    this.dialog.open(AddgameComponent);
    localStorage.setItem('task','managegame');
    
  }

  // callMeLater() {
  //   console.log('Calling myself after 10 seconds...');
  //   setTimeout(10000); // Call the function again after 10 seconds (10000 milliseconds)
  // }
  
  onupdate(id : number){
    alert(id);
    this.trans.updateid = id;
    this.openmanage();
  }
  

}
