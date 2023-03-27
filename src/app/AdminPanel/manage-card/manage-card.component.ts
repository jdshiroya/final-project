import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-card',
  templateUrl: './manage-card.component.html',
  styleUrls: ['./manage-card.component.css']
})
export class ManageCardComponent implements OnInit {

  constructor() { }

  cards = [
    {
      ReqId : 1,
      UserId : 1,
      UserName : "jaymeen",
      type : "pending"
    }
  ]

  ngOnInit(): void {
  }

  deleteuser(Id : any){
    alert("request accept for =>"+Id);
  }

}
