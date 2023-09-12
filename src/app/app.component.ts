import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WatchList';
  constructor(
    private router: Router) { }

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
