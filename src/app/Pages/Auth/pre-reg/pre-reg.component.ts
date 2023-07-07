import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-pre-reg',
  templateUrl: './pre-reg.component.html',
  styleUrls: ['./pre-reg.component.css']
})
export class PreRegComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,private datServe:DataService, private msg:MessageService) { }
  preRegForm!:FormGroup
  hotel_id:any
  user_type:any
  preRegData:any
  gethotel:any
  hotel_name:any
  date: any;
  now: any;
  display:any
  inter: any;
  timeLeft: number = 10;
  otpShow = false
  tiShow = false
  reShow = false
  othField = true
  // timeLeft: number = 60;
  
  selected_st_time:any
  selected_end_time:any
  ngOnInit() {
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.user_type=atob(this.activatedRoute.snapshot.params['user_type'])
    this.preRegForm=this.formBuilder.group({
      reg_phone:['',[Validators.required]],
      reg_name:['',[Validators.required]],
      reg_check_in:['',[Validators.required]],
      reg_check_out:['',[Validators.required]],
      reg_email:[''],
    })
    console.log(this.preRegForm.invalid)
    // console.log(this.timeLeft);

    this.get_hotel_name();
    // this. showTime();
    
  }
 
  preRegSubmit(){
    var dt={
      'hotel_id':this.hotel_id,
      'user_name':this.preRegForm.controls.reg_name.value,
      'email_id':this.preRegForm.controls.reg_email.value,
      'user_type':this.user_type,
      'mobile_no':this.preRegForm.controls.reg_phone.value,
      'user':this.preRegForm.controls.reg_name.value,
      'check_in':this.preRegForm.controls.reg_check_in.value,
      'check_out':this.preRegForm.controls.reg_check_out.value
    }
    this.datServe.global_service(1,'/pre_reg',dt).subscribe(data=>{
     console.log(data)
     this.preRegData=data
     if(this.preRegData.suc>0){
       this.msg.successMsg('SS')
       this.preRegForm.reset()
     }
     else
      this.msg.errorMsg('ES')
    }) 
  }

  get_hotel_name(){
    this.datServe.global_service(0,'/res_dtls_custom',`id=${this.hotel_id}`).subscribe(data=>{console.log(data)
    this.gethotel=data;
    this.gethotel=this.gethotel.msg;
    this.hotel_name=this.gethotel[0].restaurant_name
    console.log(this.hotel_name);
    
    })
  }
 
  showTime() {
    let dateTime= new Date();
    let time = dateTime.toLocaleTimeString();
    console.log(time)
    this.display = setInterval(this.showTime, 5000);
   console.log(this.display)
  }

  showTimer(){
    this.otpShow = true
    this.tiShow = true
    this.inter = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
      } else {
        this.timeLeft = 80;
        this.tiShow = false
        this.reShow = true
        // alert("Your timer has been excided");
        clearInterval(this.inter);
        // this.showHome = 0;
      }
    }, 1000);
  }

  resendOtp(){
    this.tiShow = true
    this.reShow = false
    this.inter = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
      } else {
        this.timeLeft = 80;
        this.tiShow = false
        this.reShow = true
        // alert("Your timer has been excided");
        clearInterval(this.inter);
        // this.showHome = 0;
      }
    }, 1000);
  }
  verifyOtp(otp:any){
    console.log(otp);
    
    if(otp == 1234){
      this.othField = false
      this.otpShow = false
      clearInterval(this.inter);
    }
    else{
      alert("You are entered wrong OTP");
    }
  }

}
