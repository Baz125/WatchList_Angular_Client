import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WatchList';

    /**
   * Creates an instance of the `AppComponent`.
   *
   * @param {Router} router - The Angular Router service used for navigation.
   */
  constructor(
    private router: Router) { }
}
