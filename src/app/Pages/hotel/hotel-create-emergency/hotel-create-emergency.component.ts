import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/Services/message.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-hotel-create-emergency',
  templateUrl: './hotel-create-emergency.component.html',
  styleUrls: ['./hotel-create-emergency.component.css'],
  providers:[DatePipe]
})
export class HotelCreateEmergencyComponent implements OnInit {

  constructor(private datePipe:DatePipe, private activatedRoute:ActivatedRoute,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }
  emForm!: FormGroup;
  hotel_id:any
  id:any;
  emData:any
  msg_body=''
  msg_action=''
  getEmData:any
  getUserData:any
  date:any

  ngOnInit() {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  console.log(this.date);
  
    this.hotel_id=this.activatedRoute.snapshot.params['hotel_id'];
    this.hotel_id=atob(this.hotel_id);
    this.id=this.activatedRoute.snapshot.params['id'],
    this.id=atob(this.id)
    this.emForm=this.formBuilder.group({
      record_date:[this.date], 
      guest_group_id:[''], 
      message_body:[''], 
      repo_status:[''], 
      action_taken:[''], 
    })
    console.log(this.date,this.emForm.controls.record_date.value)
    // this.emForm.patchValue({
    //   record_date:this.date
    // })
    if(this.id!='0')
    this.getEmergency()
    this.getGuestGroupUserList()

  }
  get e(){
    return this.emForm.controls
  }
  getGuestGroupUserList(){
    this.dataServe.global_service(0,'/get_emer_user_list', `hotel_id=${this.hotel_id}&flag=V`).subscribe(data =>{
      console.log(data);
      this.getUserData=data;
      this.getUserData=this.getUserData.msg;
    })
  }
  getEmergency(){
    console.log(this.id)
    this.dataServe.global_service(0,'/emergency_repo',`id=${this.id}`).subscribe(data=>{
      console.log(data)
      this.getEmData=data;
      console.log(this.date)
      this.emForm.patchValue({
        record_date:this.getEmData.msg[0].record_date.substr(0,10),
        // record_date:this.date,
        guest_group_id:this.getEmData.msg[0]?.guest_group_id,
        message_body:this.getEmData.msg[0]?.message_body,
        action_taken:this.getEmData.msg[0]?.action_taken,
        repo_status:this.getEmData.msg[0]?.repo_status
      })
      this.emForm.controls.guest_group_id.disable()
    } ,error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  submit_emergency(){
    var dt={
      id:this.id,
      hotel_id:this.hotel_id,
      record_date:this.e.record_date.value,
      guest_group_id:this.e.guest_group_id.value,
      message_body:this.e.message_body.value,
      action_taken:this.e.action_taken.value,
      repo_status:this.e.repo_status.value
    }
    console.log(dt)
    this.dataServe.global_service(1,'/emergency_repo',dt).subscribe(data=>{
      console.log(data)
      this.emData=data;
      if(this.emData.suc>0){
        if(this.id=='0')
       this.msg.successMsg('SS')
       else
       this.msg.successMsg('SU')
       this.router.navigate(['hotel/hotel_emergency_report',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

       
      }
      else{
        if(this.id=='0')
       this.msg.errorMsg('ES')
       else
        this.msg.errorMsg('EU')
         
      }
        },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
  go_prev_page(){
    this.router.navigate(['hotel/hotel_emergency_report',btoa(this.hotel_id)]).catch(data=>{
      this.msg.globalError(data);
    })
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
}
