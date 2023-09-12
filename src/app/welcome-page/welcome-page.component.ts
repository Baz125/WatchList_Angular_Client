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
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) this.router.navigate(['movies']);
    this.navbarService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.display();
  }
  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}