import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  // Show SweetAlert2 Alert (Optional)
  showCustomPopup(
    type: "success" | "error" | "warning" | "info",
    message: string
  ): void {
    Swal.fire({
      icon: type,
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
      },
    });
  }
}
