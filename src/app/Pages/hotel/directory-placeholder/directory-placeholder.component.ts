import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-directory-placeholder',
  templateUrl: './directory-placeholder.component.html',
  styleUrls: ['./directory-placeholder.component.css']
})
export class DirectoryPlaceholderComponent implements OnInit {

  constructor(private msg:MessageService,private router:Router) { }
 hotel_id:any
  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
}
