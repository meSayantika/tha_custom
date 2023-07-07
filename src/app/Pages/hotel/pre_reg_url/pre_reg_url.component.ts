import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../../../environments/environment'
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
@Component({
  selector: 'app-pre_reg_url',
  templateUrl: './pre_reg_url.component.html',
  styleUrls: ['./pre_reg_url.component.css']
})
export class Pre_reg_urlComponent implements OnInit {

  constructor(private msg:MessageService, private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,private datServe:DataService) { }
  preReg!:FormGroup
  hotel_id:any
 emailData:any
  ngOnInit() {
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.preReg=this.formBuilder.group({
      pre_email:[''],
      pre_name:[''],
      pre_url:[environment.routeUrl+'auth/pre_reg/'+encodeURIComponent(btoa(this.hotel_id))+'/'+encodeURIComponent(btoa('N'))]
    })
  }
  go_home(){history.back()}
  savePreReg(){
    var dt={
      'email':this.preReg.controls.pre_email.value,
      'user_name':this.preReg.controls.pre_name.value,
      'reg_url':this.preReg.controls.pre_url.value
    }
    this.datServe.global_service(1,'/pre_reg_email',dt).subscribe(data=>{
      this.emailData=data
      if(this.emailData.suc>0){
        this.msg.globalSuccess('Email sent successfully!')
      }
      else{
        this.msg.globalError('Error sending email!')
      }
    })
  }
}
