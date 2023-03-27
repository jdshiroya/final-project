import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AdduserComponent } from 'src/app/modals/adduser/adduser.component';
import { request } from 'src/app/models/data-model.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private users : UserServiceService,
    private dailog : MatDialog,
    private toast :NgToastService
  ){ 
  }
  userId : any;
  userDetail : any;
  requset : request = new request();
  Card : boolean = true;
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.getuser()
  }

isCard(){
  return this.Card;
}

getuser(){
  this.users.SearchUserbyid(this.userId).subscribe((data)=>{
    console.log(data);
    this.userDetail = data;
    if(data[0].card = false){
      this.Card = true;
    }
    else{
      this.Card = false;
    }
  })
}

update(userId : number){
  let num = userId.toString();
  localStorage.setItem('userId',num);
  localStorage.setItem('userTask','update');
  this.dailog.open(AdduserComponent);
}

card(userId : number){
  this.requset.userId = userId;
  this.requset.status = true;
  this.users.requestcard(this.requset).subscribe((res)=>{
    this.toast.success({detail:"success Message",summary:res.message,duration:5000});
  });
  this.users.addcard(this.userId).subscribe((res)=>{
    this.toast.success({detail:"success Message",summary:"card added successfully..!",duration:5000})
  })
}

}
