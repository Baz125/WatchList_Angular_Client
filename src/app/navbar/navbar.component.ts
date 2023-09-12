import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  showNavbar: boolean = true;
  subscription: Subscription;
  constructor(
    private navbarService: NavbarService,
    private router: Router,
    ) { 
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

    /**
   * wipes all data from local storage and navigates to login
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
