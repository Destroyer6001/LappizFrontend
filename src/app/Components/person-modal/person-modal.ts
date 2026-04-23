import { Component, inject } from '@angular/core';
import {MatDialogModule, MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {PersonDTO} from '../../Models/person-dto';
import {PersonService} from '../../Services/person-service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-person-modal',
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './person-modal.html',
  styleUrl: './person-modal.css',
})
export class PersonModal {

  formContact: FormGroup;
  messageError: string = "";

  constructor(private personService: PersonService, private dialogRef: MatDialogRef<PersonModal>, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.formContact = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  CloseModal(): void
  {
    this.dialogRef.close(false);
  }

  GetValidationErrors(): string[]
  {
    const errors: string[] = [];

    Object.keys(this.formContact.controls).forEach((field) => {

      const controlErrors = this.formContact.get(field)?.errors;

      if (controlErrors)
      {
        Object.keys(controlErrors).forEach((fieldError) => {

          switch (fieldError)
          {
            case 'required':
              errors.push(`el campo ${field} es obligatorio`);
              break;

            case 'email':
              errors.push(`el campo ${field} debe ser de tipo email`);
              break;

            case 'minLength':
              const requiredLength = controlErrors[fieldError].requiredLength;
              errors.push(`el campo ${field} no puede tener menos de ${requiredLength} caracteres`);
          }
        });
      }
    });

    return errors;
  }

  SaveContact():void
  {
    if (this.formContact.valid)
    {
      const Person : PersonDTO = {
        name: this.formContact.value.name,
        email: this.formContact.value.email,
      };

      this.personService.CreatePerson(Person).subscribe({
        next: (data) => {

          this.snackBar.open('Se ha creado con exito el registro del cliente', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['toast-warning']
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.messageError = error.message;
          this.snackBar.open(this.messageError, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['toast-warning']
          });
        }
      })
    }
    else
    {
      const errors = this.GetValidationErrors();
      this.messageError = errors[0];
      this.snackBar.open(this.messageError, 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['toast-warning']
      });
    }
  }

  protected readonly close = close;
}
