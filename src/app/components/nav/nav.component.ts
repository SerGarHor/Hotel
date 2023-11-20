import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hotel } from 'src/app/models/hotels.interface';
import { DialogHotelComponent } from '../dialog-hotel/dialog-hotel.component';
import { HotelService } from 'src/app/services/hotel.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  filtro: string = '';

  constructor(
    public dialog: MatDialog,
    private service: HotelService,
    private location: Location,
    private router: Router
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
      if(result){
        this.router.navigateByUrl('/home').then(() => {
          this.router.navigate([this.router.url]);
        });
      }
    });
  }

  filtrar(){
    this.service.getFilter(this.filtro)
  }

}
