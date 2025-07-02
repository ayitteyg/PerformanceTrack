import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import iziToast from 'izitoast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  
  constructor(private snackBar: MatSnackBar) {
    iziToast.settings({
      timeout: 3000,
      position: 'topRight'
    });
  }



 success(message: string, title: string = 'Success') {
    iziToast.success({ title, message });
  }

  error(message: string, title: string = 'Error') {
    iziToast.error({ title, message });
  }

  info(message: string, title: string = 'Info') {
    iziToast.info({ title, message });
  }

  warning(message: string, title: string = 'Warning') {
    iziToast.warning({ title, message });
  }


}
