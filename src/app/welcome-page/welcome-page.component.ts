/**
 * A component representing the welcome page of the application.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  constructor(
    private navbarService: NavbarService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

    /**
   * Lifecycle hook runs when the component is initialised.
   * Checks if a user is authenticated and navigates to the movies page if authenticated.
   * Hides the navigation bar.
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) this.router.navigate(['movies']);
    this.navbarService.hide();
  }

 /**
   * Lifecycly hook which runs when the component is destroyed.
   * Displays the navigation bar.
   */
  ngOnDestroy(): void {
    this.navbarService.display();
  }

   /**
   * Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  
    /**
   * Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}