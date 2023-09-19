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
 * Edit user information.
 * @remarks This method updates user data through an API call.
 * @remarks If the update is successful, it closes the modal, emits an event to signal profile-page reinitialization, and displays a success snackbar.
 * @remarks If the update fails, it displays an error snackbar.
 */
  editUser(): void {
    this.editUserApi.editUser(localStorage.getItem('username'), this.userData).subscribe((result) => {
      //Update local storage with new user data
      localStorage.setItem('user', JSON.stringify(result));

      //Close the modal on success
      this.dialogRef.close(); 

      //emits event to let profile-page know to reinitialize
      this.dialogClosed.emit(); 

      // Display a success snackbar
      this.snackBar.open('Success!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      //Display an error snackbar on failure
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}