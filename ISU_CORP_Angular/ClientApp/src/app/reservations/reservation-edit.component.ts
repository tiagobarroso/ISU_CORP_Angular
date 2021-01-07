import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './reservation-edit.component.html'
})
export class ReservationEditComponent implements OnInit {

  @ViewChild('template', { static: false }) private template;
  public _http: HttpClient
  public _baseUrl: string;
  public _modalService: BsModalService;
  public _modalRef: BsModalRef;
  public reservation: Reservation;
  public newReservation: boolean = true;
  public message: string = '';

  // build form
  public reservationForm: FormGroup = new FormGroup(
    {
      reservationId: new FormControl(0),
      description: new FormControl(""),
      contactId: new FormControl(0),
      contact: new FormControl(),
      date: new FormControl(),
    });

  public _validContactForm: boolean = false;

  /**
   * Constructor
   * @param http
   * @param baseUrl
   * @param route
   * @param router
   * @param modalService
   */
  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService) {

    this._http = http;
    this._baseUrl = baseUrl;
    this._modalService = modalService;
  }

  ngOnInit(): void {

    // initial load
    this.loadReservation();
  }

  /*
   * Load Reservations
   * */
  private loadReservation() {

    // is there an id on url?
    let reservationId = this.route.snapshot.paramMap.get('id');

    // is it a new reservation?
    if (reservationId != 'new') {

      this.newReservation = false;

      // http get call
      this._http.get<any>(this._baseUrl + 'api/reservations/' + reservationId)
        .subscribe(result => {

          if (!result) {
            this.message = 'Error loading Reservation!';
            this._modalRef = this.modalService.show(this.template);
            this.router.navigate(['/reservations']);
          }

          // update results
          this.reservation = result;
          this.reservation.contactId = result.contact.contactId;
          this.reservationForm.patchValue(this.reservation);
        }, error => {

            this.message = 'Error loading Reservation!';
            this._modalRef = this.modalService.show(this.template);
            this.router.navigate(['/reservations']);
        });
    } else {

      // start a new empty one
      this.reservation = { contactId: 0, description: "", contact: null, date: new Date() };
      this.reservationForm.patchValue(this.reservation);
    }
  }

  /**
   * Persist
   * */
  private save() {
    
    // validations
    if (!this.reservationForm.get('description').value) {
      this.message = 'Description field cannot be empty!';
      this._modalRef = this.modalService.show(this.template);
      return;
    }

    if (!this.reservationForm.get('contactId').value) {

      let contact = this.reservationForm.get('contact').value;

      if (!contact || !contact.name) {
        this.message = 'Contact name field cannot be empty!';
        this._modalRef = this.modalService.show(this.template);
        return;
      }      
    }

    if (this.reservationForm.get('contact').value && !this._validContactForm) {
      this.message = 'Please afill all the required contact fields!';
      this._modalRef = this.modalService.show(this.template);
      return;
    }

    // http patch call
    this._http.patch<any>(this._baseUrl + 'api/reservations',
      this.reservationForm.value)
      .subscribe(() => {

        this.message = 'The Reservation was saved!';
        this._modalRef = this.modalService.show(this.template);

        // navigates on modal close
        this._modalRef.onHide.subscribe(() => {
          this.router.navigate(['/reservations']);
        });
      }, error => {
          this.message = `Error saving Reservation! ${error}`;
          this._modalRef = this.modalService.show(this.template);
      });
  }

  /**
   * Receives message from Contact child component
   * @param $event
   */
  receiveMessage($event) {

    if ($event) {
      
      if ($event.contact && $event.contact.contactId) {
        this.reservationForm.patchValue({ contactId: $event.contact.contactId, contact: null });
      } else{
        this.reservationForm.patchValue({ contact: $event.contact });
        
        this._validContactForm = $event.valid;
      }
    }
  }

  get f() { return this.reservationForm.controls; }
}

interface Reservation {
  description: string,
  contactId: number,
  contact: any,
  date: Date
}


