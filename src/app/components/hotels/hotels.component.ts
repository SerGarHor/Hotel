import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hotel } from 'src/app/models/hotels.interface';
import { HotelService } from 'src/app/services/hotel.service';
import { DialogHotelComponent } from '../dialog-hotel/dialog-hotel.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent {

  listHotels: Array<Hotel> = []
  isLoading: boolean = false

  constructor(
    private service: HotelService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData()
    this.service.data$.subscribe((nuevosDatos) => {
      this.listHotels = nuevosDatos;
    });
  }

  loadData(){
    this.isLoading = true
    this.service.getAllHotels().subscribe({
      next: (res: Hotel[]) => {
        if (res && res.length > 0) {
          this.listHotels = res
          this.isLoading = false
        } else {
        }
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      }
    });

  }

  updateHotel(hotel: Hotel) {
    const dialogRef = this.dialog.open(DialogHotelComponent, {
      data: {
        fullData: hotel,
        title: 'Editar hotel',
        isUpdate: true
      },
      height: '80%',
      width: '80%',
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadData()
      }

    });
  }

  deleteHotel(hotel: Hotel) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      height: '30%',
      width: '30%',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteHotel(hotel.id).subscribe(res => {
          if(res){
            this.snack.open('Eliminado con exito!', 'x');
            this.loadData()
        } else {
          this.snack.open('Hubo un error eliminando', 'x');
        }
        });
      }
    });

  }


}
