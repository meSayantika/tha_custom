import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  providers:[DatePipe]
})
export class TrainingComponent implements OnInit {
  trainingForm!: FormGroup;
  trainingData:any
  constructor(private datePipe:DatePipe, private dataServe:DataService, private router:Router,private activatedRoute:ActivatedRoute,private msg:MessageService,private formBuilder: FormBuilder) { }
  hotel_id:any;
  user_type:any;
  sch_dt=''
  id:any
  postTrainingMsg:any
  date:any
  date2:any
  date3:any
  ngOnInit() {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.user_type=localStorage.getItem('user_type')
    console.log(this.user_type)
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.trainingForm=this.formBuilder.group({
      date_1:[''],
      date_2:[''],
      date_3:[''],
      schedule:[''],
      acc:[''],
      ground:[''],
      air:[''],
      comp_date:[''],
      notes:['']
    })
  if(this.user_type=='A'){
    console.log(this.user_type)
    this.trainingForm.controls.date_1.disable()
    this.trainingForm.controls.date_2.disable()
    this.trainingForm.controls.date_3.disable()
    this.trainingForm.controls.comp_date.disable()
    this.trainingForm.controls.air.disable()
   
  }
  if(this.user_type=='H'){
    console.log(this.user_type)
    this.trainingForm.controls.schedule.disable()
    this.trainingForm.controls.acc.disable()
    this.trainingForm.controls.ground.disable()
    this.trainingForm.controls.air.disable()

  }
  this.getTrainingData()
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  ngAfterViewInit(){
    this.trainingForm.controls.date_1.valueChanges.subscribe(e=>{
      this.date2=new Date(new Date(e).getTime()+(24*60*60*1000))
      this.date2 = this.datePipe.transform(this.date2, 'yyyy-MM-dd');
    })
    this.trainingForm.controls.date_2.valueChanges.subscribe(e1=>{
      this.date3=new Date(new Date(e1).getTime()+(24*60*60*1000))
      this.date3 = this.datePipe.transform(this.date3, 'yyyy-MM-dd');
   
    })
  }
  getTrainingData(){
    this.dataServe.global_service(0,'/training',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.trainingData=data
      this.trainingData=this.trainingData.msg[0]
      this.id=this.trainingData?.id
      if(this.trainingData?.conf_approve_flag=='Y'){
        this.trainingForm.disable()
        this.trainingForm.controls.notes.enable()
        this.trainingForm.controls.air.enable()
      }
      console.log(this.id)
      this.trainingForm.patchValue({
        date_1:this.trainingData?.training_dt_1?.substr(0,10),
        date_2:this.trainingData?.training_dt_2?.substr(0,10),
        date_3:this.trainingData?.training_dt_3?.substr(0,10),
        schedule:this.trainingData?.shedule_dt?.substr(0,10),
        acc:this.trainingData?.accom_conf,
        ground:this.trainingData?.ground_conf,
        air:this.trainingData?.air_conf,
        comp_date:this.trainingData?.training_comp_dt?.substr(0,10),
        notes:this.trainingData?.note
      })
      if(this.trainingData.shedule_dt){
        this.trainingForm.controls.date_1.disable()
        this.trainingForm.controls.date_2.disable()
        this.trainingForm.controls.date_3.disable()
      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
 }

 postTrainingData(flag:any){
  var dt={
    "id":this.id?this.id:0,
    "hotel_id":this.hotel_id,
    "tr_dt_1":  this.trainingForm.controls.date_1.value,
    "tr_dt_2":  this.trainingForm.controls.date_2.value,
    "tr_dt_3":  this.trainingForm.controls.date_3.value,
    "shedule_dt":this.trainingForm.controls.schedule.value,
    "accom_conf":this.trainingForm.controls.acc.value,
    "comp_dt":this.trainingForm.controls.comp_date.value,
    "ground_conf":this.trainingForm.controls.ground.value,
    "air_conf":this.trainingForm.controls.air.value,
    "note":this.trainingForm.controls.notes.value,
    "appr_flag":flag=='S'?this.trainingData?.conf_approve_flag:flag,
    "user":localStorage.getItem('Email')?localStorage.getItem('Email'):'admin@gmail.com'
  }
  this.dataServe.global_service(1,'/training',dt).subscribe(data=>{
    console.log(data)
    this.postTrainingMsg=data
    if(this.postTrainingMsg.suc>0){
    if(flag=='S')
     this.msg.successMsg('SS')
    else{
      if(flag=='Y')
      this.msg.globalSuccess('Approved successfully!')
      else
      this.msg.globalSuccess('Rejection Successful!')

    }
    this.getTrainingData()
    }
    else{
      if(flag=='S')
      this.msg.errorMsg('ES')
      else{
      if(flag=='Y')
      this.msg.globalError('Approve failed!')
      else
      this.msg.globalSuccess('Rejection failed!')
      }
    }
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
 }
}
