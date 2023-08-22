import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { WelcomeScreenApis } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
 @Input() userData = { username: '', password: '' };

constructor(
    public fetchApiData: WelcomeScreenApis,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

ngOnInit(): void { }

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((data) => {
  // Logic for a successful user login goes here! (To be implemented)
      
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token);
      localStorage.setItem('Username', data.user.Username)
      
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("We're in!", 'OK', {
        duration: 2000
     });
      this.router.navigate(['movies']);
    }, () => {
      this.snackBar.open("Something went wrong", 'OK', {
        duration: 2000
      });
    });
  }

  }
