import { Component, Inject, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel, HotelFormEnum } from 'src/app/models/hotels.interface';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-dialog-hotel',
  templateUrl: './dialog-hotel.component.html',
  styleUrls: ['./dialog-hotel.component.scss']
})
export class DialogHotelComponent implements OnInit {

  form!: FormGroup; 
  formField = HotelFormEnum
  fullData: any = ''
  isUpdate: boolean = false
  isLoading: boolean = false

  hotel = {
    id: null,
    name_hotel: '',
    addres_hotel: '',
    country: '',
    description_hotel: '',
    phone_number: '',
    email: '',
    img: '',
    stars: null
  };


  title: string = ''

  constructor(
    private dialogRef: MatDialogRef<DialogHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, fullData: [], isUpdate: boolean},
    private service: HotelService,
    private snack: MatSnackBar
  ){
    this.title = data.title
    this.fullData = data.fullData
    this.isUpdate = data.isUpdate
    console.log('fullData',this.fullData)
    console.log('isUpdate',this.isUpdate)
    console.log('fullDatitleta',this.title)
  }

  ngOnInit(): void {
    this.buildForm()
    this.loadData()
  }

  buildForm(){
    this.form = this.service.buildForm()
  }

  loadData() {
    if (this.isUpdate) {
        this.patchValue(this.fullData)
    }
}


  patchValue(data: any) {
    this.form.patchValue({
        [HotelFormEnum.id]: data.id,
        [HotelFormEnum.name_hotel]: data.name_hotel,
        [HotelFormEnum.addres_hotel]: data.addres_hotel,
        [HotelFormEnum.country]: data.country,
        [HotelFormEnum.description_hotel]: data.description_hotel,
        [HotelFormEnum.phone_number]: data.phone_number,
        [HotelFormEnum.email]: data.email,
        [HotelFormEnum.img]: data.img,
        [HotelFormEnum.stars]: data.stars
    })
    this.isLoading = false
}

  save() {
    let data = this.form.getRawValue()
    if(data.id == null){
      this.service.createHotel(data).subscribe(res => {
        console.log('res',res)
        if(res){
            this.snack.open('Guardado con exito!', 'x');
        }
      });
    } else {
      this.service.updateHotel(data).subscribe(res => {
        
      })
    }
  }


  close(){
    this.dialogRef.close({
  })
  }
}
