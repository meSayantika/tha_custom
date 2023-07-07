import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-hotel-progress',
  templateUrl: './hotel-progress.component.html',
  styleUrls: ['./hotel-progress.component.css']
})
export class HotelProgressComponent implements OnInit {

  constructor(private router:Router, private msg:MessageService,private dataServe:DataService) { }
  hotel_id:any
  getVenuesRest:any
  getVenues:any
  guestRoomService:any
  getVenuesServe:any
  rest_dir_flag:any
  serve_dir_flag:any
  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
    this.getCat()
  }
  getCat(){
    // localStorage.setItem('VIPFlag','Y')
    // this.getVIPFlag=localStorage.getItem('VIPFlag')
    this.dataServe.global_service(0,'/cust_menu_list',`hotel_id=${this.hotel_id}`).subscribe((data:any)=>{
      // console.log(data,this.category);
      console.log(data)
      this.getVenues=data;
      // if(this.category=='R'){
        this.getVenuesRest=this.getVenues.msg.restaurant
        this.rest_dir_flag=this.getVenuesRest.findIndex((e:any)=>e.live_dir_flag=='Y')
        this.guestRoomService=this.getVenues.msg.restaurant.filter((e:any)=>e.hotel_type=='S')[0]
      // }
      // else{
        this.getVenuesServe=this.getVenues.msg.service
        this.serve_dir_flag=this.getVenuesServe.findIndex((e:any)=>e.live_dir_flag=='Y')
      console.log(this.serve_dir_flag,this.rest_dir_flag)
      // }
      // this.mncdata=this.getVenues.msg[0].id; //to be changed
  
      // this.putdata(this.getVenues.msg);
    }
  ,error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)}
    
    )
  

}
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

  }
}
