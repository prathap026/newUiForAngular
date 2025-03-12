import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  sidebarActive = false;
  showWelcomeMessage = true;

  isAuthenticated(): boolean {
    return !!localStorage.getItem('Token');
  }

  onRouteChange(){
    this.showWelcomeMessage = false;
  }
}
