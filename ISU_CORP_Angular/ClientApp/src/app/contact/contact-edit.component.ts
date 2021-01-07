import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html'
})

export class ContactEditComponent {

  @ViewChild('template', { static: false }) private template;
  public _http: HttpClient
  public _baseUrl: string;
  public contactId: string;
  public contact: Contact;
  public newContact: boolean = true;
  public _modalService: BsModalService;
  private _validContactForm: boolean = false;
  public _modalRef: BsModalRef;
  public message: string;

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private route: ActivatedRoute,
    private router: Router,
    modalService: BsModalService) {

    this._http = http;
    this._baseUrl = baseUrl;
    this._modalService = modalService;

    let id = this.route.snapshot.paramMap.get('id');

    if (id != 'new') {
      this.contactId = id;
    }
  }

  /**
   * Persist
   * */
  private save() {

    // simple validation
    if (!this._validContactForm) {
      
      this.message = 'Please afill all the required contact fields!';
      this._modalRef = this._modalService.show(this.template);
      return;
    }

    // http call
    this._http.patch<any>(this._baseUrl + 'api/contacts',
      this.contact)
      .subscribe(result => {
        this.message = 'The Contact was saved!';
        this._modalRef = this._modalService.show(this.template);

        this._modalRef.onHide.subscribe(() => {
          this.router.navigate(['/contacts']);
        });
        
      }, error => {
          this.message = `Error saving Contact! ${JSON.stringify(error)}`;
          this._modalRef = this._modalService.show(this.template);
      });
  }

  // receives message from contact child component
  receiveMessage($event) {

    // validates if the form is correctly filled
    if ($event) {
      this.contact = $event.contact;

      this._validContactForm = $event.valid;
    }
  }
}

interface Contact {
  contactId: number,
  name: string,
  birth: string,
  contactTypeId: number;
  phone: string;
}
