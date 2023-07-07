import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel_flip_approve',
  templateUrl: './hotel_flip_approve.component.html',
  styleUrls: ['./hotel_flip_approve.component.css']
})
export class Hotel_flip_approveComponent implements OnInit {

  constructor( private activatedRoute:ActivatedRoute, private router:Router,private msg:MessageService, private dataServe:DataService) { }
  hotel_id:any
  url=environment.api_url
  getFlipData:any
  getFlipImg:any
  approval_flag:any
  id:any
  preview_url:any
  emailData:any
  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
    this.id=atob(this.activatedRoute.snapshot.params['id'])
    this.getFlip()
  }
  go_to_previous(){
    this.router.navigate(['hotel/hotel_flip',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

  }

  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  getFlip(){
    this.dataServe.global_service(0,'/flip_book',`id=${this.id}`).subscribe(data=>{
      console.log(data)
      this.getFlipData=data
      
      this.getFlipImg=this.getFlipData.msg[0].img
      this.getFlipData=this.getFlipData.msg[0]
      this.preview_url=this.getFlipData.flip_url
     
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  preview(){
    window.open('http://localhost:54269/'+this.preview_url,'_blank')
  }
  approve(v:any){
    var dt={
      id:this.id,
      flag:v,
      user:localStorage.getItem('Email')
    }
    this.dataServe.global_service(1,'/flip_approve',dt).subscribe(data=>{
      console.log(data)
      this.approval_flag=data;
      if(this.approval_flag.suc>0)
     {  this.msg.globalSuccess('Action successful!')
       this.getFlip()
     }
     else{
      this.msg.globalError('Action failed!')

     }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  send_email(){
    var dt={
      id:this.id,
      user:localStorage.getItem('Email')
    }
    this.dataServe.global_service(1,'/flip_send',dt).subscribe(data=>{
      console.log(data)
      this.emailData=data
      if(this.emailData.suc>0){
        this.msg.successMsg('Flip book URL sent successfully!')
        this.getFlip()
      }
      else{
        this.msg.errorMsg('Error sending the URL!')
      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
}

