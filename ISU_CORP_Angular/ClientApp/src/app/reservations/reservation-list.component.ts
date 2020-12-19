import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './reservation-list.component.html'
})
export class ReservationListComponent {
  public _http: HttpClient
  public _baseUrl: string;
  public reservations: Reservation[];
  public page: number = 1;
  public pageSize: number = 10;
  public listTotal: number = 0;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._http = http;
    this._baseUrl = baseUrl;
    this.getList(this.page, this.pageSize);
  }

  getList(page, size) {
    this._http.get<any>(this._baseUrl + 'api/reservations?page=' + page + "&size=" + size)
      .subscribe(result => {
        this.reservations = result.list;
        this.listTotal = result.count;
    }, error => console.error(error));
  }

  onChangePage($event) {
    console.log($event);
  }

  loadPage() {
    this.getList(this.page, this.pageSize);
  }

}

interface Reservation {
  name: string
}
