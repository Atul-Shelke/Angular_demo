import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  

  constructor(private route : Router) { }

  ngOnInit(): void {
   
    
  }

  logOut(){
    
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      
      this.route.navigate(['auth'])


    
  }
}
