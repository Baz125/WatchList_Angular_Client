import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDataApisService } from '../services/movie-data-apis.service'
import { UserDataApisService } from '../services/user-data-apis.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    private router: Router,
    public fetchApiData: MovieDataApisService,
    public dialog: MatDialog,
    public getUserData: UserDataApisService  ) { }


  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) this.router.navigate(['/welcome']);
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
        return this.movies;
      });
  }
  

  onGenreClick(name: string, description: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: name,
      content: description,
    }

    this.dialog.open(MovieInfoComponent, dialogConfig);
  };

  onDirectorClick(name: string, description: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: name,
      content: description,
    }

    this.dialog.open(MovieInfoComponent, dialogConfig);
  };

  onSynopsisClick(name: string, description: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: name,
      content: description,
    }

    this.dialog.open(MovieInfoComponent, dialogConfig);
  };

  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  addFavorite(movieID: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUserData.addFavorite(user.Username, movieID).subscribe((response: any) => {
      localStorage.setItem('user', JSON.stringify(response));
    })
  }

  removeFavorite(movieID: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUserData.deleteFavorite(user.Username, movieID).subscribe((response: any) => {
      localStorage.setItem('user', JSON.stringify(response));
    })
  }
}