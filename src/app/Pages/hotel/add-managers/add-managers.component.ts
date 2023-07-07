import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-add-managers',
  templateUrl: './add-managers.component.html',
  styleUrls: ['./add-managers.component.css']
})
export class AddManagersComponent implements OnInit {

  constructor(private router:Router, private msg:MessageService) { }
  hotel_id:any
  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

  }

}
