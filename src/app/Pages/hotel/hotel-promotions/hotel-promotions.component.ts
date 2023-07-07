import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-hotel-promotions',
  templateUrl: './hotel-promotions.component.html',
  styleUrls: ['./hotel-promotions.component.css']
})
export class HotelPromotionsComponent implements OnInit {

  constructor(private router:Router,private msg:MessageService, private dataServe:DataService) { }
  hotel_id:any
  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  go_to_pages(e:any){
    
    if(e=='promo'){
      this.router.navigate(['hotel/hotel_promo_dash',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
    
     }
     else if(e=='photo'){
      this.router.navigate(['hotel/hotel_photo',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
    
     }
     else if(e=='flip'){
      this.router.navigate(['hotel/hotel_flip',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
    
     }
  }
  go_to_previous(){
    this.router.navigate(['hotel/hotel_promo',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

  }
  viewInfo(){
    this.dataServe.showInfo.next({data:'hotel_promo',flag:true,heading:'FAQ'})
  }
}
