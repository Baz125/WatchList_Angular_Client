import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/en-ie';
import { EditUserApisService } from '../services/edit-user-apis.service';

@Component({
  selector: 'app-edit-user-component',
  templateUrl: './edit-user-component.component.html',
  styleUrls: ['./edit-user-component.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-ie' },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
]
})
  
export class EditUserComponentComponent implements OnInit {
  @Input() userData = { Username: '', Email: '', Birthday: '' };

  constructor(
    public editUserApi: EditUserApisService,
    public dialogRef: MatDialogRef<EditUserComponentComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString !== null) {
      this.userData = JSON.parse(userDataString);
    }
  }

  // This is the function responsible for
  // sending the form inputs to the backend
  editUser(): void {
    this.editUserApi.editUser(localStorage.getItem('username'), this.userData).subscribe((result) => {
      console.log(result);
      this.dialogRef.close(); //Closes modal on success
      this.snackBar.open('Success!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}