import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-navbarfor-organization',
  templateUrl: './navbarfor-organization.component.html',
  styleUrls: ['./navbarfor-organization.component.css'],
})
export class NavbarforOrganizationComponent {
  constructor(private logout: CommonService) {}

  logoutAccount() {
    let value = confirm('Are you sure to logout?');

    if (value) {
      this.logout.logoutService();
    }
  }
}
