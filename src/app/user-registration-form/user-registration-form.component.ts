import { Component, OnInit, Input } from '@angular/core';
// use this to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//brings in the API calls we created in 6.2
import { WelcomeScreenApis } from '../fetch-api-data.service';
//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: WelcomeScreenApis,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This is the function responsible for
  // sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
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
