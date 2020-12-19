import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './reservation-edit.component.html'
})
export class ReservationEditComponent implements OnInit {
  public _http: HttpClient
  public _baseUrl: string;
  public reservation: Reservation;
  public newReservation: boolean = true;
  public reservationForm: FormGroup = new FormGroup(
    {
      reservationId: new FormControl(0),
      description: new FormControl(""),
      contactId: new FormControl(0),
      contact: new FormControl(),
      date: new FormControl(),
    });

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router) {
    this._http = http;
    this._baseUrl = baseUrl;
  }
    ngOnInit(): void {
      this.loadReservations();
    }

  private loadReservations() {

    let reservationId = this.route.snapshot.paramMap.get('id');

    if (reservationId != 'new') {
      this.newReservation = false;
      this._http.get<any>(this._baseUrl + 'api/reservations/' + reservationId)
        .subscribe(result => {
          this.reservation = result;
          this.reservation.contactId = result.contact.contactId;
          this.reservationForm.patchValue(this.reservation);
        }, error => console.error(error));
    } else {

      this.reservation = { contactId: 0, description: "", contact: null, date: new Date() };
      this.reservationForm.patchValue(this.reservation);
    }
  }

  private save() {
    this._http.patch<any>(this._baseUrl + 'api/reservations/' + this.route.snapshot.paramMap.get('id'),
      this.reservationForm.value)
      .subscribe(result => {
        alert("Saved!");
        this.router.navigate(['/reservations']);
      }, error => {
          console.error(error);
          alert("Error :(");
      });
  }

  receiveMessage($event) {
    
    if ($event) {
      console.log($event)
      if ($event.contactId) {
        this.reservationForm.patchValue({ contactId: $event.contactId, contact: null });
      } else{
        this.reservationForm.patchValue({ contact: $event });
      }
      
    }
  }
}
interface Reservation {
  description: string,
  contactId: number,
  contact: any,
  date: Date
}
