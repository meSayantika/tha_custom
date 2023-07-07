import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-hotel-emergency-rep',
  templateUrl: './hotel-emergency-rep.component.html',
  styleUrls: ['./hotel-emergency-rep.component.css']
})
export class HotelEmergencyRepComponent implements OnInit {

  constructor(private router:Router,private msg:MessageService) { }
  hotel_id:any
  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
  }
go_home(){
  this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

}
}
