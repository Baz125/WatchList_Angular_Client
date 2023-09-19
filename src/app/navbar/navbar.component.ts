import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
  
  /**
 * The `NavbarComponent` represents the navigation bar component of the application.
 * It provides functionality for displaying and hiding the navigation bar.
 */
  
export class NavbarComponent implements OnDestroy {
  showNavbar: boolean = true;
  subscription: Subscription;
  constructor(
    private navbarService: NavbarService,
    private router: Router,
  ) { 
        /**
     * Subscribes to the `showNavbar` subject from `navbarService` to update the `showNavbar` property.
     * This determines whether the navigation bar should be displayed.
     *
     * @param {boolean} value - The new value of the `showNavbar` flag.
     */
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

   /**
   * deletes user, username and token data from local storage and navigates to login
   * 
   * @remarks
   * This function utilizes the Angular Router to perform the navigation.
   * 
   * @throws {Error} If the Angular Router is not properly injected into the component.
   *
   * @returns {void}
   * This function does not return a value.
   */
    onLogout(): void {
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      this.router.navigate(['welcome']);
    };
  
    onProfileClick(): void {
      this.router.navigate(['profile']);
    }
  
    onHomeClick(): void {
      this.router.navigate(['/']);
    }

}
