import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/en-ie';
import { EditUserApisService } from '../services/edit-user-apis.service';

@Component({
  selector: 'app-edit-user-component',
  templateUrl: './edit-user-component.component.html',
  styleUrls: ['./edit-user-component.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-ie' },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
]
})

/**
* Represents the component for editing user data.
*/
export class EditUserComponentComponent implements OnInit {
  /** Input property for user data. */
  @Input() userData = { Username: '', Email: '', Birthday: '' };
  
  /**Output event emitter for when the dialog is closed */
  @Output() dialogClosed = new EventEmitter<void>();

  constructor(
    public editUserApi: EditUserApisService,
    public dialogRef: MatDialogRef<EditUserComponentComponent>,
    public snackBar: MatSnackBar) { }
  
  /**
  * Retrieves user data from local storage if available.
  */
  ngOnInit(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString !== null) {
      this.userData = JSON.parse(userDataString);
    }
  }

  /**
   * Sends the edited user data to the backend for processing.
   * Handles success and error responses accordingly.
   */
  editUser(): void {
    this.editUserApi.editUser(localStorage.getItem('username'), this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.dialogRef.close(); //Closes modal on success
      this.dialogClosed.emit(); //emits event to let profile-page know to reinitialize
      this.snackBar.open('Success!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}