import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvailableOffersComponent} from './available-offers/available-offers.component';
import {AvailableOffersService} from '../services/available-offers.service';
import {HttpClientModule} from '@angular/common/http';
import {ReferenceDataService} from '../services/referenceData.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatInputModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {MatTableModule} from '@angular/material/table';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

const appRoutes: Routes = [
  {path: 'available-offers', component: AvailableOffersComponent},
  {path: '', redirectTo: '/available-offers', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    AvailableOffersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [
    AvailableOffersService,
    ReferenceDataService,
    MatDatepickerModule,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
  ,
})
export class AppModule { }
