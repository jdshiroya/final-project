import { Injectable } from '@angular/core';
import { currentuser, usermodel } from '../models/data-model.model';

@Injectable({
  providedIn: 'root'
})
export class TransService {

  constructor() { }
  logginStatus:boolean;
  updateid : number ;
  userid : number; 
  curuser : currentuser = new currentuser();
  isLogin(){
   let lg = localStorage.getItem("isLoggedIn");
   if(lg == "true"){
    return true
   }
   else{
    return false
   }
  }

  Role(){
    let rl = localStorage.getItem('role');
    if(rl == "admin")
    {
      return true
    }
    else{
      return false
    }
  }

  display:boolean
  disply(){
    let ds = this.display
    if(ds == true){
      return true
    }
    else{
      return false
    }
  }

  name(){
    let ch = localStorage.getItem('userId');
    this.userid = parseInt(ch);
    if(this.userid >= 0){
      return true
    }
    else{
      return false
    }
  }
}
