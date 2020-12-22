import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html'
})

export class ContactEditComponent {
  public _http: HttpClient
  public _baseUrl: string;
  public contactId: string;
  public contact: Contact;
  public newContact: boolean = true;
  private _validContactForm: boolean = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router) {
    this._http = http;
    this._baseUrl = baseUrl;

    let id = this.route.snapshot.paramMap.get('id');

    if (id != 'new') {
      this.contactId = id;
    }
  }

  private save() {

    if (!this._validContactForm) {
      alert("Please afill all the required contact fields");

      return;
    }

    this._http.patch<any>(this._baseUrl + 'api/contacts',
      this.contact)
      .subscribe(result => {
        alert('Saved!');
        this.router.navigate(['/contacts']);
      }, error => console.error(error));
  }

  receiveMessage($event) {

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
