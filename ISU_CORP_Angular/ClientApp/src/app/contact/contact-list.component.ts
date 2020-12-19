import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent {
  public contacts: any[];
  public _http: HttpClient;
  public _baseUrl: string;
  public page: number = 1;
  public pageSize: number = 10;
  public listTotal: number = 0;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this._http = http;
    this._baseUrl = baseUrl;

    this.getList(this.page, this.pageSize);
  }

  getList(page, size) {
    this._http.get<any>(this._baseUrl + 'api/contacts?page=' + page + "&size=" + size)
      .subscribe(result => {
        this.contacts = result.list;
        this.listTotal = result.count;
    }, error => console.error(error));
  }

  loadPage() {
    this.getList(this.page, this.pageSize);
  }

  delete(id) {
    this._http.delete<any>(this._baseUrl + 'api/contacts/' + id).subscribe(result => {
      alert("deleted");
      this.contacts = this.contacts.filter(c => c.contactId != id);
    }, error => console.error(error));
  }
}

