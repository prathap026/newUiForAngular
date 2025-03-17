import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css'],
})
export class InviteDialogComponent implements OnInit {
  emails: { email: string; role: string }[] = []; // Store emails & roles
  newEmail: string = ''; // Email input
  newRole: string = 'Admin'; // Default role
  roles: string[] = ['EMPLOYEE', 'SECURITY', 'DEPT_ADMIN', 'ADMIN']; // Role options

  dataCodeResult: any[] = []; // Already invited emails
  emailExists: boolean = false; // Flag for duplicate email

  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonapi: CommonService,
    private cdr: ChangeDetectorRef,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.getInvitiationHistory(); // Fetch already invited emails
  }

  checkEmailExists() {
    const trimmedEmail = this.newEmail.trim();

    // Find the invited email in API response
    const invitedEmail = this.dataCodeResult.find((invited) => {
      console.log(invited.email); // Debugging
      return invited.email === trimmedEmail;
    });

    if (invitedEmail) {
      console.log(invitedEmail); // Debugging

      // If Invite_Success is 1 (already invited successfully), block re-invite
      this.emailExists = invitedEmail.Invite_Success === 1;

      if (this.emailExists) {
        this.alert.showCustomPopup(
          'error',
          'This email has already been invited successfully.'
        );
      }
    } else {
      this.emailExists = false;
    }

    // Ensure UI updates
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 10);
  }

  // ✅ Add new email & role
  addEmail() {
    if (!this.newEmail.trim() || !this.newRole) return; // Prevent empty input

    // Check if email already exists
    this.checkEmailExists();
    if (this.emailExists) {
      this.alert.showCustomPopup('error', 'Email Already Invited'); // 🔥 Show error alert
      return;
    }

    this.emails.push({ email: this.newEmail.trim(), role: this.newRole });
    this.newEmail = ''; // Reset input
    this.emailExists = false; // Reset error flag
  }

  // ✅ Remove an email from the list
  removeEmail(index: number) {
    this.emails.splice(index, 1);
  }

  // ✅ Submit invites
  submit() {
    const orgId = localStorage.getItem('orgId');
    if (!orgId) {
      alert('Organization ID not found in localStorage.');
      return;
    }

    const invitations = this.emails.map((email) => ({
      ...email,
      orgId: +orgId, // Convert orgId to number if needed
    }));

    this.dialogRef.close(invitations); // Send data back
  }

  // ✅ Cancel and close dialog
  cancel() {
    this.dialogRef.close();
  }

  // ✅ Fetch already invited emails from API
  getInvitiationHistory() {
    const req = {
      dataCode: 'GET_INVITIATION_HISTORY_BY_ORGID',
      placeholderKeyValueMap: {
        orgId: localStorage.getItem('orgId'),
      },
    };
    this.commonapi.commonData(req).subscribe((res) => {
      if (res.statusCode == 0) {
        this.dataCodeResult = res.responseContent; // Store invited emails
      } else {
        this.dataCodeResult = [];
      }
    });
  }
}
