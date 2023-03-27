import { Component, Input, OnInit } from '@angular/core';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
 @Input() sideNavStatus: boolean = false;
 
 constructor(
              public ss : TransService

              ){}
   
  
    list = [
      {
        number:  '1',
        name: 'Home',
        icon: 'bi-solid bi-house',
        link: ''
      },
      {
        number:  '2',
        name: 'Games',
        icon: 'bi bi-controller',
        link: 'User/Games'
      },
      {
        number:  '3',
        name: 'Tournaments',
        icon: 'bi-solid bi-trophy',
        link: 'Tournament'
      },
      {
        number:  '4',
        name: 'About Us',
        icon: 'bi bi-info-circle',
        link: 'AboutUs'
      },
      {
        number:  '5',
        name: 'Contact Us',
        icon: 'bi bi-telephone',
        link: 'ContactUs'
      },
    ]
  
  admin = [
    {
      number:  '1',
      name: 'Home',
      icon: 'bi-solid bi-house',
      link: 'Admin/Home'
    },
    {
      number:  '2',
      name: 'Manage User',
      icon: 'bi bi-people',
      link: 'Admin/Manage-User'
    },
    {
      number:  '3',
      name: 'Manage Games',
      icon: 'bi bi-controller',
      link: 'Admin/Manage-Games'
    },
    {
      number:  '4',
      name: 'Card Requests',
      icon: 'bi bi-credit-card',
      link: 'Admin/Manage-Card'
    },
    {
      number:  '5',
      name: 'Review Control',
      icon: 'bi bi-star-half',
      link: 'Admin/Review-Control'
    },
    {
      number:  '6',
      name: 'Manage-Tournament',
      icon: 'bi-solid bi-trophy',
      link: 'Admin/Manage-Tournament'
    }
  ]
  
  ngOnInit(): void {
  }


}
