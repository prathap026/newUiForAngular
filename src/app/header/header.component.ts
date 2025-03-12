import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  @Input() sidebarActive = false;
  @Output() toggleSidebar = new EventEmitter();

  constructor(private route:Router){}


  logout(){
  
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  // home(){
  //   this.route.navigate(['/main'])
  // }
  
}

