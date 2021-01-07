import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  @Output() messageEvent = new EventEmitter<any>();

  public _http: HttpClient
  public _baseUrl: string;

  public contactForm: FormGroup;
  public contact: Contact;
  public contacts: Contact[];
  public contactTypes: any[];
  public keyword = 'name';
  public submitted = false;
  public loaded = false;

  /**
   * Constructor
   * @param http
   * @param baseUrl
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._http = http;
    this._baseUrl = baseUrl;
    
    this.loadContactTypes();

    this.contactForm = new FormGroup(
      {
        contactId: new FormControl(),
        name: new FormControl('', Validators.required),
        contactTypeId: new FormControl({ required: true, disabled: this.isEdition || true }, Validators.required),
        phone: new FormControl({ disabled: this.isEdition || true }, Validators.required),
        birth: new FormControl({ disabled: this.isEdition || true }, Validators.required),
      });

    this.contactForm.valueChanges.subscribe(x => {

      if (!this.contactForm.get("contactId").value || this.isEdition) {
        this.messageEvent.emit({ contact: x, valid: this.contactForm.valid });
      }
        
    });
  }

  // basic load
  private loadContact() {

    // validates if it is a new one
    if (!this.contactId) {
      this.contact = { contactId: 0, name: "", phone: "", birth: "", contactTypeId: null }
      this.contactForm.patchValue(this.contact);
      this.contactForm.enable();
      this.loaded = true;
      return;
    }

    // http get call
    this._http.get<any>(this._baseUrl + 'api/contacts/' + this.contactId)
      .subscribe(result => {

        if (!result) {
          return;
        }

        this.contact = result;
        this.contact.birth = formatDate(this.contact.birth, 'yyyy-MM-dd', 'en');
        this.contactForm.patchValue(this.contact);
        this.messageEvent.emit({ contact: this.contact });

        if (!this.isEdition) {
          this.contactForm.disable();
        }
        
        this.contactForm.get('name').enable();

        this.loaded = true;

      }, error => {
          alert("Error loading Contact.");
      });
  }

  // load types
  private loadContactTypes() {
    this._http.get<any>(this._baseUrl + 'api/contacts/contacttype/all')
      .subscribe(result => {

        this.contactTypes = result;

      }, error => console.error(error));    
  }

  ngOnInit() {
    this.loadContact();
  }

  // select contact item event
  selectEvent(item) {

    if (this.contactId != item.contactId) {
      this.contactId = item.contactId;
      this.loadContact();
    }     
  }

  // search on type event
  onChangeSearch(val: string) {

    //http call
    // TODO: apply limit not to bring all
    this._http.get<any>(this._baseUrl + 'api/contacts?search=' + val)
      .subscribe(result => {
        this.contacts = result.list || [];

      }, error => console.error(error));
  }

  // contact input clear event
  inputCleared() {
    this.contactForm.reset();
    this.contactForm.enable();
    this.contactForm.patchValue({contactId : 0})
    this.messageEvent.emit({ contact: this.contactForm.value, valid: false});
  }

  get f() { return this.contactForm.controls; }
}

interface Contact {
  contactId: number,
  name: string,
  birth: string,
  contactTypeId: number;
  phone: string;
}
