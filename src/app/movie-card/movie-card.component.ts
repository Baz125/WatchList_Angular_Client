import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDataApisService } from '../services/movie-data-apis.service'
import { UserDataApisService } from '../services/user-data-apis.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

/**
 * Represents a component for displaying an individual movie
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

    /**
   * Constructs a new `MovieCardComponent` instance.
   * @param router - The Angular router service.
   * @param fetchApiData - The service for fetching movie data.
   * @param dialog - The Angular Material dialog service.
   * @param getUserData - The service for getting user data.
   */
  constructor(
    private router: Router,
    public fetchApiData: MovieDataApisService,
    public dialog: MatDialog,
    public getUserData: UserDataApisService  ) { }

  /**
   * Lifecycle hook called after component initialization.
   * Checks if a user is authenticated, and if not, redirects to the welcome page.
   * Retrieves and populates the list of movies.
   */
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
  
/**
 * Handles the click event when a genre is clicked.
 * Opens a dialog displaying information about the genre.
 *
 * @param name - The name of the genre.
 * @param description - The description or additional information about the genre.
 */
  onGenreClick(name: string, description: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: name,
      content: description,
    }

    this.dialog.open(MovieInfoComponent, dialogConfig);
  };

/**
 * Handles the click event when a director is clicked.
 * Opens a dialog displaying information about the director.
 *
 * @param name - The name of the director.
 * @param description - The description or additional information about the director.
 */
  onDirectorClick(name: string, description: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: name,
      content: description,
    }

    this.dialog.open(MovieInfoComponent, dialogConfig);
  };


  /**
 * Handles the click event when a synopsis is clicked.
 * Opens a dialog displaying information about the synopsis.
 *
 * @param name - The name of the synopsis.
 * @param description - The description or additional information about the synopsis.
 */
  onSynopsisClick(name: string, description: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: name,
      content: description,
    }

    this.dialog.open(MovieInfoComponent, dialogConfig);
  };
/**
 * Checks if a movie is in the user's list of favorite movies.
 *
 * @param movieID - The ID of the movie to check.
 * @returns `true` if the movie is a favorite, `false` otherwise.
 */
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }
/**
 * Adds a movie to the user's list of favorite movies.
 *
 * @param movieID - The ID of the movie to add to favorites.
 */
  addFavorite(movieID: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUserData.addFavorite(user.Username, movieID).subscribe((response: any) => {
      localStorage.setItem('user', JSON.stringify(response));
    })
  }
/**
 * Removes a movie from the user's list of favorite movies.
 *
 * @param movieID - The ID of the movie to remove from favorites.
 */
  removeFavorite(movieID: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUserData.deleteFavorite(user.Username, movieID).subscribe((response: any) => {
      localStorage.setItem('user', JSON.stringify(response));
    })
  }
}