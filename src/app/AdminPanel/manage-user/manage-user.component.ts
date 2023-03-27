import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  User:any;

  constructor(
    private ads : AdminServiceService,
    private toast : NgToastService
  ) { }

  ngOnInit(): void {
    this.getgame();
  }

  getgame(){
    this.ads.getalluser().subscribe((res) =>{
      this.User = res;
      console.log(this.User);
    })
  }
  deleteuser(id : any){
    alert(id);
    this.ads.deleteuser(id).subscribe((res)=>{
      this.toast.success({detail:"success Message",summary:"User Deleted Successfull..!",duration:5000});
      this.getgame();
    })
  }

}
