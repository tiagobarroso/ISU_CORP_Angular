import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ReservationListComponent } from './reservations/reservation-list.component';
import { ReservationEditComponent } from './reservations/reservation-edit.component';
import { ContactHeaderComponent } from './contact/contact-header.component';
import { ContactListComponent } from './contact/contact-list.component';
import { ContactEditComponent } from './contact/contact-edit.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ReservationListComponent,
    ReservationEditComponent,
    ContactHeaderComponent,
    ContactEditComponent,
    ContactListComponent    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AutocompleteLibModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ReservationListComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'reservations', component: ReservationListComponent },
      { path: 'reservations/:id', component: ReservationEditComponent },
      { path: 'contacts', component: ContactListComponent },
      { path: 'contacts/:id', component: ContactEditComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
