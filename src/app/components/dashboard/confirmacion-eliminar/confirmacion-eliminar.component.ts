import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirmacion-eliminar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './confirmacion-eliminar.component.html',
  styleUrl: './confirmacion-eliminar.component.css'
})
export class ConfirmacionEliminarComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
