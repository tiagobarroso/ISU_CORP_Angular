import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})

export class ReservationListComponent {
  public _http: HttpClient
  public _baseUrl: string;
  public reservations: Reservation[];
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

    // get list on load
    this.getList(this.page, this.pageSize, this.sortBy);
  }

  /**
   * Get reservation list on load
   * @param page
   * @param size
   */
  getList(page, size, sortBy) {

    const url = new URL(this._baseUrl + 'api/reservations');

    url.searchParams.append('page', page);
    url.searchParams.append('size', size);

    if (sortBy) {
      url.searchParams.append('sortBy', sortBy);
    }

    this._http.get<any>(url.toString())
      .subscribe(result => {
        this.reservations = result.list;
        this.listTotal = result.count;
    }, error => console.error(error));
  }

  /**
   * Load page
   * @param page
   * @param sortBy
   */
  loadPage(page, sortBy) {
    this.sortBy = sortBy;
    this.getList(this.page, this.pageSize, this.sortBy);
  }

}

interface Reservation {
  name: string
}
