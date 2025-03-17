import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from '../invite-dialog/invite-dialog.component';
import { CompanyService } from '../../services/company.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-userinvite',
  templateUrl: './userinvite.component.html',
  styleUrls: ['./userinvite.component.css'],
})
export class UserinviteComponent implements OnInit {
  dataCodeResult: any[] = [];

  // Pagination properties
  p: number = 1; // Current page
  itemsPerPage: number = 7;
  constructor(
    public dialog: MatDialog,
    private company: CompanyService,
    private commonapi: CommonService
  ) {}
  ngOnInit(): void {
    this.getInvitiationHistory();
  }

  // Function to open the invite dialog
  openInviteModal() {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      width: '400px',
    });

    // Handle the result when the dialog is closed
    dialogRef
      .afterClosed()
      .subscribe((emails: { email: string; role: string; orgId: string }[]) => {
        if (emails && emails.length > 0) {
          console.log('Invites sent to:', emails);

          // Wrap the list inside an object
          const requestBody = { invitations: emails };

          this.company
            .sendEmailInvite(
              '/organization/sendInvitiationForUsers',
              requestBody
            )
            .subscribe((response) => {

              this.getInvitiationHistory();
              console.log('Invite response:', response);
            });
        }
      });
  }

  getInvitiationHistory() {
    const req = {
      dataCode: 'GET_INVITIATION_HISTORY_BY_ORGID',
      placeholderKeyValueMap: {
        orgId: localStorage.getItem('orgId'),
      },
    };
    this.commonapi.commonData(req).subscribe((res) => {
      if (res.statusCode == 0) {
        this.dataCodeResult = res.responseContent;
        console.log(this.dataCodeResult);
      } else {
        this.dataCodeResult = [];
      }
    });
  }
}
