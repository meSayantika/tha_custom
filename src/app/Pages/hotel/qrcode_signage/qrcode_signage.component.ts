import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qrcode_signage',
  templateUrl: './qrcode_signage.component.html',
  styleUrls: ['./qrcode_signage.component.css']
})
export class Qrcode_signageComponent implements OnInit {
  mncdata: any;
  
  getimageDynamic=environment.api_url+'/';
  getimageVCard=environment.api_url+'/';

  constructor(private dataServe:DataService, private router:Router,private msg:MessageService) { }
  hotel_id:any
  category:any
  getVenues:any
  menu_url_data:any
  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }

  getCat(){
    
    this.dataServe.global_service(0,'/cust_menu_list',`hotel_id=${this.hotel_id}`).subscribe((data:any)=>{
      console.log(data,this.category);
      this.getVenues=data;
      if(this.category=='R'){
        this.getVenues=this.getVenues.msg.restaurant
      }
      else{
        this.getVenues=this.getVenues.msg.service

      }
      // this.mncdata=this.getVenues.msg[0].id; //to be changed
  
      // this.putdata(this.getVenues.msg);
    }
  ,error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)}
    
    )
 

}
open_venue(id:any){
  this.dataServe.global_service(0,'/get_url',`id=${this.hotel_id}&venue_id=${id}&srv_res_flag=${this.category}&srv_res_id=${id}`).subscribe(data=>{console.log(data)

    this.menu_url_data=data;
    this.menu_url_data=this.menu_url_data.msg;
    // console.log(this.menu_url_data[0].image);
    this.getimageDynamic=this.menu_url_data[0]?.dynamic_img? this.getimageDynamic+this.menu_url_data[0]?.dynamic_img : this.getimageDynamic;
    this.getimageVCard=this.menu_url_data[0]?.v_card_img? this.getimageVCard+this.menu_url_data[0]?.v_card_img : this.getimageVCard;
    // this.getimageLagunaFun=this.menu_url_data[0]?.fun_directory_img? this.getimageLagunaFun+this.menu_url_data[0]?.fun_directory_img : this.getimageLagunaFun;
    // console.log(this.getimagepath+" "+this.getimageDynamic+" "+this.getimageVCard+" "+this.getimageLagunaFun)
})
}

}
