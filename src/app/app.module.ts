import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerminalComponent } from './components/terminal/terminal.component';
import { FetchService } from './services/fetch.service';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    FetchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
