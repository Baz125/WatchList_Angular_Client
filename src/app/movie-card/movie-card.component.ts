import { Component, OnInit } from '@angular/core';
import { MovieDataApisService } from '../services/movie-data-apis.service'
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: MovieDataApisService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        return this.movies;
      });
    }

  onGenreClick(): void {
    this.dialog.open(GenreDialogComponent {
      width: '280px'
    });
  };

}