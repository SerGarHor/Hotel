import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel, HotelFormEnum } from '../models/hotels.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url = 'https://localhost:7019/api/';
  private dataSubject = new BehaviorSubject<Hotel[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
      ) { }

  getAllHotels() {
    return this.http.get<Hotel[]>(this.url + 'Hotels');
  }

  getFilter(filter: string) {
    this.http.get<Hotel[]>(`${this.url}Hotels/${filter}`).subscribe(res => {
      this.dataSubject.next(res)
    })
  }

  createHotel(hotel: Hotel): Observable<any> {
    return this.http.post(`${this.url}Hotels`, hotel)
}

updateHotel(hotel: Hotel): Observable<any> {
    return this.http.put(`${this.url}Hotels`, hotel)
}

deleteHotel(id: number): Observable<any> {
    return this.http.delete(`${this.url}Hotels?id=${id}`)
}




  buildForm(): FormGroup {
        return this.fb.group({
            [HotelFormEnum.id]: new FormControl({ value: null, disabled: true }, []),
            [HotelFormEnum.name_hotel]: new FormControl({ value: null, disabled: false }, []),
            [HotelFormEnum.addres_hotel]: new FormControl({ value: null, disabled: false }, []),
            [HotelFormEnum.country]: new FormControl({ value: null, disabled: false }, []),
            [HotelFormEnum.description_hotel]: new FormControl({ value: null, disabled: false }, []),
            [HotelFormEnum.phone_number]: new FormControl({ value: null, disabled: false }, []),
            [HotelFormEnum.email]: new FormControl({ value: null, disabled: false }, []),
            [HotelFormEnum.img]: new FormControl({ value: null, disabled: false }, []),
            [HotelFormEnum.stars]: new FormControl({ value: null, disabled: false }, []),
        })

  }
}




