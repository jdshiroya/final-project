import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TransService } from 'src/app/services/trans.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/UserPanel/profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  
  @Output() sideNavToggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  stateLog : boolean = false;
  small : boolean = false;
  uid : string  ;
  users : any;
  username : string;

  constructor(
                public ss : TransService,
                public user : UserServiceService,
                private router : Router,
                private dailog : MatDialog
              ){
                this.uid = localStorage.getItem('userId');
              }
  
  ngOnInit(): void {
    // this.dailog.open(ProfileComponent);
  }

  
  sidenavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggle.emit(this.menuStatus);
    this.small = !this.small;
    this.ss.display = this.small
  }

  refresh(){
    if(this.ss.name){
      alert('helo');
      this.user.SearchUserbyid(this.uid).subscribe((data)=>{
        this.users = data;
        this.username = this.users[0].userFname;
      });
    }
  }

  logout(){
    this.ss.logginStatus = false;
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.router.navigate([""]);
  }

  profile(){
    this.dailog.open(ProfileComponent);
  }

}

