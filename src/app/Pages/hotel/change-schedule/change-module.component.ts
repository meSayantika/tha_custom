import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
@Component({
  selector: 'app-change-module',
  templateUrl: './change-module.component.html',
  styleUrls: ['./change-module.component.css']
})
export class ChangeModuleComponent implements OnInit {
  hotel_id:any
  id:any
  dayData:any
  endDiv:any
  startDiv:any
  saveScheduleData:any
  empCode:any
  isChecked=false
  statusDiv:any
  constructor(private activatedRoute:ActivatedRoute, private dataServe:DataService,private msg:MessageService) { }
  dayFields = [
    {id: 0, day: 'Monday', code:1, active_flag: false, off_on: false, start: '', end: '',status:false},
    {id: 0, day: 'Tuesday', code:2, active_flag: false, off_on: false, start: '', end: '',status:false},
    {id: 0, day: 'Wednesday', code:3, active_flag: false, off_on: false, start: '', end: '',status:false},
    {id: 0, day: 'Thursday', code:4, active_flag: false, off_on: false, start: '', end: '',status:false},
    {id: 0, day: 'Friday', code:5, active_flag: false, off_on: false, start: '', end: '',status:false},
    {id: 0, day: 'Saturday', code:6, active_flag: false, off_on: false, start: '', end: '',status:false},
    {id: 0, day: 'Sunday', code:7, active_flag: false, off_on: false, start: '', end: '',status:false},
  ]
  ngOnInit() {
    this.hotel_id=this.activatedRoute.snapshot.params['hotel_id']
    this.hotel_id=atob(this.hotel_id)
    this.id=this.activatedRoute.snapshot.params['id']
    this.id=atob(this.id)
    this.dataServe.global_service(0,'/dept_user_dtls',`hotel_id=${this.hotel_id}&id=${this.id}`).subscribe(data=>{
      console.log(data)
      this.dayData=data
      this.empCode=this.dayData.msg[0].emp_code
      for(let i=0;i<this.dayData.msg[0].day_dt.length;i++){
        this.dayFields[this.dayData.msg[0].day_dt[i].day_dt-1].active_flag=this.dayData.msg[0].day_dt[i].date_on_off=='N'?true:false
        this.dayFields[this.dayData.msg[0].day_dt[i].day_dt-1].start=this.dayData.msg[0].day_dt[i].start_time=='00:00:00' && this.dayData.msg[0].day_dt[i].date_on_off=='Y'?'':this.dayData.msg[0].day_dt[i].start_time
        this.dayFields[this.dayData.msg[0].day_dt[i].day_dt-1].end=this.dayData.msg[0].day_dt[i].end_time=='00:00:00' && this.dayData.msg[0].day_dt[i].date_on_off=='Y'?'':this.dayData.msg[0].day_dt[i].end_time
        this.dayFields[this.dayData.msg[0].day_dt[i].day_dt-1].status=this.dayData.msg[0].day_dt[i].status=='A'?true:false
      // console.log(this.dayData.msg[0].day_dt[i])
      }
     
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
checkDay(e:any,index:any){
  if(e.target.checked)
  {
   this.startDiv=document.getElementById('start_'+index)
   this.startDiv.value="00:00"
   this.startDiv=document.getElementById('end_'+index)
   this.startDiv.value="23:59"
   this.dayFields[index].start="00:00"
   this.dayFields[index].end="23:59"
  }
  else{
    this.startDiv=document.getElementById('start_'+index)
   this.startDiv.value=""
   this.startDiv=document.getElementById('end_'+index)
   this.startDiv.value=""
   this.dayFields[index].start=""
   this.dayFields[index].end=""
  }
}
updateSchedule(){
  console.log(this.dayFields)
  debugger;
  var dt={
    "emp_id":localStorage.getItem('id'),
    "hotel_id":this.dayData.msg[0].hotel_id,
    "day_dt":this.dayFields,
    "msg_type":'E',
    "user":localStorage.getItem("email"),
    "emp_code":this.empCode
  }
  this.dataServe.global_service(1,'/dept_user_schedule_update',dt).subscribe(data=>{
    console.log(data)
    this.saveScheduleData=data
    if(this.saveScheduleData.suc>0){
      this.msg.successMsg('SU')
    }
    else
     this.msg.errorMsg('EU')
    
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
changeStatus(i:any,e:any){
   this.statusDiv=document.getElementById('status_'+i)
   console.log(this.statusDiv,e,this.dayData.msg[0].day_dt[i].id)
   this.dayFields[i].status=e.checked
   var dt={
    // "user":localStorage.getItem('email'),
    "user":"somnath.thakur16@gmail.com",
    "id":this.dayData.msg[0].day_dt[i].id,
    "status":e.checked
   }
   this.dataServe.global_service(1,'/dept_schedule_update',dt).subscribe(data=>{
    console.log(data)
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
}
