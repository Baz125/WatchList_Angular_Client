import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataApisService } from '../services/user-data-apis.service';
import { EditUserApisService } from '../services/edit-user-apis.service';
import { MovieDataApisService } from '../services/movie-data-apis.service';
import { EditUserComponentComponent } from '../edit-user-component/edit-user-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any = {};

  favoriteMovies: any[] = [];

  @Input() userData = { username: '', email: '', birthday: '' };

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    public getUserData: UserDataApisService,
    public editUserData: EditUserApisService,
    public getMovieData: MovieDataApisService,
    public dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   * Checks if a user is authenticated using a token in local storage.
   * Redirects to the 'welcome' route if the token is not found.
   * Retrieves user data and a list of movies.
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) this.router.navigate(['welcome']);
    this.getUser();
    this.getMovies();
  }

  /**
   * Opens the edit user dialog.
   */
  openEditUserDialog(): void {
    const dialogRef = this.dialog.open(EditUserComponentComponent, {
      width: '280px',
    });
    const editUserComponent = dialogRef.componentInstance;
    editUserComponent.dialogClosed.subscribe(() => {
      this.onDialogClosed();
    });
  }

  /**
   * Handles actions after the dialog is closed.
   * Typically used for refreshing user data.
   */
  onDialogClosed(): void {
    this.getUser();
  }

  /**
   * Retrieves user data from local storage and populates the user object.
   */
  getUser(): void {
    const userDataJSON = localStorage.getItem('user');

    if (userDataJSON !== null) {
      this.user = JSON.parse(userDataJSON);
      this.userData.username = this.user.Username;
      this.userData.email = this.user.Email;
      this.userData.birthday = moment(this.user.Birthday).format('MMMM Do Y');
    } else {
      console.error('User data not found in local storage.');
    }
  }

  /**
   * Retrieves a list of favorite movies for the user.
   */
  getMovies(): void {
    this.getMovieData.getAllMovies().subscribe((response: any) => {
      this.favoriteMovies = response.filter(
        (m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0
      );
    });
  }

  /**
   * Handles the click event when the user wants to delete their account.
   * Prompts the user with a confirmation dialog and deletes the account on confirmation.
   */
  onDeleteClick(): void {
    if (confirm('Are you sure you want to to delete')) {
      this.editUserData.deleteUser(localStorage.getItem('username')).subscribe(
        (result) => {
          this.snackBar.open('See you later aligator!', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open(result, 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }
}
