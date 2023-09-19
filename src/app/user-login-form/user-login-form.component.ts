/**
 * A component representing the user login form.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WelcomeScreenApis } from '../services/fetch-api-data.service';
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

/**
 * sends login inputs to the backend
 * 
 * @param {object} userData - User login credentials including username and password.
 * @returns {void}
 * @throws {Error} If the login attempt fails.
 * @remarks This function handles user authentication by sending login credentials to the backend API.
 */
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((data) => {
  
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token);
      localStorage.setItem('username', data.user.Username)
      
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("We're in!", 'OK', {
        duration: 2000
     });
      this.router.navigate(['movies']);
    },
      
      /**
       * logic for unsuccessful login
       */
      () => {
      this.snackBar.open("Something went wrong", 'OK', {
        duration: 2000
      });
    });
  }

  }
