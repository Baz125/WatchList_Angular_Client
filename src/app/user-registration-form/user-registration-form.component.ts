
/**
 * A component representing the user registration form.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WelcomeScreenApis } from '../services/fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/en-ie';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-ie' },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
]
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: WelcomeScreenApis,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Sends user registration form inputs to the backend for registration.
   *
   * @returns {void}
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); //Closes modal on success
      this.snackBar.open('Success!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('Success!', 'OK', {
        duration: 2000
      });
    });
  }
}
