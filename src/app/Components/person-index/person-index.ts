import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import {PersonDTO} from '../../Models/person-dto';
import {PersonService} from '../../Services/person-service';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {PersonModal} from '../person-modal/person-modal';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-index',
  imports: [
    MatCardModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  standalone: true,
  templateUrl: './person-index.html',
  styleUrl: './person-index.css',
})
export class PersonIndex implements AfterViewInit {

  displayedColumns: string[] = ['name', 'email'];
  dataSource: MatTableDataSource<PersonDTO>;
  isLoading: boolean = false;
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: Router, private personService: PersonService, private dialog: MatDialog, private snackBar: MatSnackBar)
  {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() : void
  {
    this.IndexPersons();
  }

  IndexPersons(): void
  {
    this.isLoading = true;
    this.personService.GetPerson().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) =>
      {
        this.isLoading = false;
        this.errorMessage = error.message;
        this.dataSource.data = [];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.snackBar.open(this.errorMessage, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['toast-warning']
        });
      }
    });
  }

  OpenDialog():void
  {
    const dialogRef = this.dialog.open(PersonModal,{
      width: '500px',
      maxHeight: '90vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
      {
        this.IndexPersons();
      }
    });
  }

  ApplyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
  }
}
