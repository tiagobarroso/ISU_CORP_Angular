import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  public contacts: any[];
  public _http: HttpClient;
  public _baseUrl: string;
  public page: number = 1;
  public pageSize: number = 10;
  public sortBy: string = null;
  public listTotal: number = 0;

  /**
   * Constructor
   * @param http
   * @param baseUrl
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this._http = http;
    this._baseUrl = baseUrl;

    // initial load
    this.getList(this.page, this.pageSize, this.sortBy);
  }

  /**
   * Search
   * @param page
   * @param size
   * @param sortBy
   */
  getList(page, size, sortBy) {

    // build url
    let url = new URL(this._baseUrl + 'api/contacts');
    url.searchParams.append('page', page);
    url.searchParams.append('size', size);

    if (sortBy) {
      url.searchParams.append('sortBy', sortBy);
    }

    // hhtp get call
    this._http.get<any>(url.toString())
      .subscribe(result => {

        // update values
        this.contacts = result.list;
        this.listTotal = result.count;
    }, error => console.error(error));
  }

  /**
   * Load page click event
   * @param page
   * @param sortBy
   */
  loadPage(page, sortBy) {
    this.sortBy = sortBy;
    this.getList(this.page, this.pageSize, this.sortBy);
  }

  /**
   * Delete contact button event
   * @param id
   */
  delete(id) {

    // http call
    this._http.delete<any>(this._baseUrl + 'api/contacts/' + id).subscribe(result => {
      
      // update the current list
      this.contacts = this.contacts.filter(c => c.contactId != id);
    }, error => {

      // TODO: improve this message
      console.error(error)
    });
  }
}

