import { UserServiceService } from 'src/app/services/user-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HeaderComponent } from '../header/header.component';
import { TransService } from 'src/app/services/trans.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from 'src/app/modals/adduser/adduser.component';
import { currentuser } from 'src/app/models/data-model.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  @Output() IsLoggedin = new EventEmitter<boolean>();

  usermodel : currentuser = new currentuser();
  
  loginForm!: FormGroup;
  constructor(
              private fb: FormBuilder,
              private ss : UserServiceService , 
              private tss : TransService, 
              private toast : NgToastService,
              private router : Router,
              public dialog : MatDialog,
            ){}


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  Login(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid)
    {
      this.ss.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.updatemodel(res.user);
          this.toast.success({detail:"success Message",summary:res.message,duration:5000});
          this.tss.logginStatus = true;
          localStorage.setItem('userId',res.userId);
          localStorage.setItem('isLoggedIn','true');
          localStorage.setItem('role',res.role);
          this.route(res.role);
          this.loginForm.reset();
        },
        error:(err)=>{
          this.toast.error({detail:"Error Message",summary:err?.error.message,duration:5000});
          localStorage.setItem('isLoggedIn','false');
          this.tss.logginStatus = false;
          this.loginForm.reset();
        }
      })
    }
    else{
      alert("invalid form");  
    }
  }

  signup(){
    localStorage.setItem('userTask','add')
    this.dialog.open(AdduserComponent)
  }

  route(role:string){
    if(role == 'admin'){
      this.router.navigate(['admin/Home']);
    }
    else if(role == 'user'){
      this.router.navigate(['user/Home']);
    }
  }


updatemodel(users : any){
  this.usermodel.userId = users.userId
  this.usermodel.userFname = users.userFname
  this.usermodel.userLname = users.userLname
  this.usermodel.dob = users.dob
  this.usermodel.email = users.email
  this.usermodel.mobileNumber = users.mobileNumber
  this.usermodel.userName = users.userName
  this.usermodel.password = users.password
  this.usermodel.userImage = users.userImage
  this.usermodel.role = users.role
  this.usermodel.card = users.card
}


}
