import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private logout: CommonService) {}

  logoutAccount() {
    let value = confirm('Are you sure to logout?');

    if (value) {
      this.logout.logoutService();
    }
  }
}
