import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ActiveInputComponent} from './components/active-input/active-input.component';
import {FilterComponent} from './components/filters/filter.component';
import {ActiveSelectComponent} from './components/active-select/active-select.component';
import {CheckboxFilterComponent} from './components/filters/checkbox-filter/checkbox-filter.component';
import {RangeFilterComponent} from './components/filters/range-filter/range-filter.component';
import {DateRangeFilterComponent} from './components/filters/date-range-filter/date-range-filter.component';
import {StatisticsComponent} from './components/statistics/statistics.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ActiveInputComponent,
        ActiveSelectComponent,
        CheckboxFilterComponent,
        FilterComponent,
        RangeFilterComponent,
        DateRangeFilterComponent,
        StatisticsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
