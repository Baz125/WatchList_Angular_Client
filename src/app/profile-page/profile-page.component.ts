import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataApisService } from '../services/user-data-apis.service';
import { EditUserApisService } from '../services/edit-user-apis.service';
import { MovieDataApisService } from '../services/movie-data-apis.service';
import { EditUserComponentComponent } from '../edit-user-component/edit-user-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from "moment";



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  
  user: any = {};

  favoriteMovies: any[] = [];

  @Input() userData = { username: '', email: '', birthday: '', };


  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    public getUserData: UserDataApisService,
    public editUserData: EditUserApisService,
    public getMovieData: MovieDataApisService,
    public dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) this.router.navigate(['welcome']);
    this.getUser();
    this.getMovies();
  }

  openEditUserDialog(): void {
    this.dialog.open(EditUserComponentComponent, {
      width: '280px'
    });
  }
  //get user data from local storage
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
  };

//get user data from API
  // getUser(): void {
  //   this.getUserData.getUser().subscribe((response: any) => {
  //     this.user = response;
  //     this.userData.username = this.user.Username;
  //     this.userData.email = this.user.Email;
  //     this.userData.birthday = moment(this.user.Birthday).format('MMMM Do Y');

      // this.getMovieData.getAllMovies().subscribe((response: any) => {
      //   console.log(response);
      //   this.favoriteMovies = response.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0)
      // });
  //   });
  // };
  getMovies(): void {
      this.getMovieData.getAllMovies().subscribe((response: any) => {
        console.log(response);
        this.favoriteMovies = response.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0)
      })
  }  
  onDeleteClick(): void {
    if(confirm("Are you sure you want to to delete")) {
      this.editUserData.deleteUser(localStorage.getItem('username')).subscribe((result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        console.log(result);
        this.snackBar.open('See you later aligator!', 'OK', {
          duration: 2000
        });
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  }
  
}
