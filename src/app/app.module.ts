/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {RequestInterceptorService} from '../app/globalservice/request.interceptor';
import {GlobalformService} from '../app/globalservice/globalform.service';
import {HttpService} from '../app/globalservice/http.service';
import { FormsModule } from './pages/forms/forms.module';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiSwitchModule,
    CalendarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxWidgetGridModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  bootstrap: [AppComponent],
  providers: [
    GlobalformService,
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
