import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{
  Games: any;

  constructor(private ads : AdminServiceService){
    
    this.ads.getgame().subscribe((data)=>{
      this.Games = data;
      console.log(this.Games);
    });

  }

  ngOnInit(): void {
    
  }

}
