import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hotel } from 'src/app/models/hotels.interface';
import { DialogHotelComponent } from '../dialog-hotel/dialog-hotel.component';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  filtro: string = '';

  constructor(
    public dialog: MatDialog,
    private service: HotelService
  ){
    
  }

  createHotel(){
    const dialogRef = this.dialog.open(DialogHotelComponent, {
      data: {
        title: 'Crear hotel'
      },
      height: '80%',
      width: '80%',
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  filtrar(){
    this.service.getFilter(this.filtro).subscribe(res =>{
      console.log('res',res)
    })
  }

}
