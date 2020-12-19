import { FormGroup, FormControl } from '@angular/forms';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-contact-header',
  templateUrl: './contact-header.component.html',
  styleUrls: ['./contact-header.component.css']
})
export class ContactHeaderComponent implements OnInit {
    
  @Input("contactId") contactId: string;
  @Input("isEdition") isEdition: boolean;
  @Output() messageEvent = new EventEmitter<{contactId}>();

  public _http: HttpClient
  public _baseUrl: string;

  public contactForm: FormGroup;
  public contact: Contact;
  public contacts: Contact[];
  public contactTypes: any[];
  public keyword = 'name';
  public submitted = false;
  public loaded = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._http = http;
    this._baseUrl = baseUrl;
    
    this.loadContactTypes();

    this.contactForm = new FormGroup(
      {
        contactId: new FormControl(),
        name: new FormControl(),
        contactTypeId: new FormControl({ disabled: this.isEdition || true }),
        phone: new FormControl({ disabled: this.isEdition || true }),
        birth: new FormControl({ disabled: this.isEdition || true }),
      });

    this.contactForm.valueChanges.subscribe(x => {

      if (!this.contactForm.get("contactId").value || this.isEdition) {
        this.messageEvent.emit(x);
      }
        
    });
  }

  get f() { return this.contactForm.controls; }

  private loadContact() {
    
    if (!this.contactId) {
      this.contact = { contactId: 0, name: "", phone: "", birth: "", contactTypeId: null }
      this.contactForm.patchValue(this.contact);
      this.contactForm.enable();
      this.loaded = true;
      return;
    }

    this._http.get<any>(this._baseUrl + 'api/contacts/' + this.contactId)
      .subscribe(result => {
        this.contact = result;
        this.contact.birth = formatDate(this.contact.birth, 'yyyy-MM-dd', 'en');
        this.contactForm.patchValue(this.contact);
        this.messageEvent.emit(this.contact);

        if (!this.isEdition) {
          this.contactForm.disable();
        }
        
        this.contactForm.get('name').enable();
        this.loaded = true;

    }, error => console.error(error));
  }

  private loadContactTypes() {
    this._http.get<any>(this._baseUrl + 'api/contacts/contacttype/all')
      .subscribe(result => {

        this.contactTypes = result;

      }, error => console.error(error));    
  }

  ngOnInit() {
    this.loadContact();
  }

  selectEvent(item) {

    if (this.contactId != item.contactId) {
      this.contactId = item.contactId;
      this.loadContact();
    }     
  }

  onChangeSearch(val: string) {
    this._http.get<any>(this._baseUrl + 'api/contacts?search=' + val)
      .subscribe(result => {
        this.contacts = result;

      }, error => console.error(error));
  }

  onFocused(e) {
    
  }

  inputCleared() {
    this.contactForm.reset();
    this.contactForm.enable();
    this.contactForm.patchValue({contactId : 0})
    this.messageEvent.emit(this.contactForm.value);
  }
}
interface Contact {
  contactId: number,
  name: string,
  birth: string,
  contactTypeId: number;
  phone: string;
}
