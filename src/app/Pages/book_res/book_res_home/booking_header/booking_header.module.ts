import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking_headerComponent } from './booking_header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    OverlayModule
  ],
  exports:[Booking_headerComponent],
  declarations: [Booking_headerComponent]
})
export class Booking_headerModule { }
