import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
@Component({
  selector: 'app-change-emp-sch',
  templateUrl: './change-emp-sch.component.html',
  styleUrls: ['./change-emp-sch.component.css']
})
export class ChangeEmpSchComponent implements OnInit {
  dayData:any
  endDiv:any
  startDiv:any
  saveScheduleData:any
  empCode:any
  hotel_id:any
  getEmpData:any;
  filteredNames:any
  getEmpID:any
  isChecked=false
  mobile_no:any
  constructor(private activatedRoute:ActivatedRoute, private dataServe:DataService,private msg:MessageService) { }
  dayFields = [
    {id: 0, day: 'Monday', code:1, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Tuesday', code:2, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Wednesday', code:3, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Thursday', code:4, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Friday', code:5, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Saturday', code:6, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Sunday', code:7, active_flag: false, off_on: false, start: '', end: ''},
  ]
  ngOnInit() {
    this.hotel_id=this.activatedRoute.snapshot.params['id']
    console.log(atob(this.hotel_id))
    
    this.getEmp()
  }
  getSchedule(e:any){
    console.log(e,this.getEmpID)
    this.getEmpID=e
    this.dataServe.global_service(0,'/emp_user_schedule',`hotel_id=${atob(this.hotel_id)}&emp_id=${e}`).subscribe(data=>{
      console.log(data)
      this.dayData=data
      this.mobile_no=this.dayData.msg[0].mobile_no
      console.log(this.mobile_no)
      this.isChecked=this.dayData.msg[0].active_flag=='Y'?false:true
      this.empCode=e
      for(let i=0;i<this.dayData.msg.length;i++){
        this.dayFields[this.dayData.msg[i].day_dt-1].active_flag=this.dayData.msg[i].date_on_off=='Y'?true:false
        this.dayFields[this.dayData.msg[i].day_dt-1].start=this.dayData.msg[i].start_time=='00:00:00' && this.dayData.msg[i].date_on_off=='N'?'':this.dayData.msg[i].start_time
        this.dayFields[this.dayData.msg[i].day_dt-1].end=this.dayData.msg[i].end_time=='00:00:00' && this.dayData.msg[i].date_on_off=='N'?'':this.dayData.msg[i].end_time
      // console.log(this.dayData.msg[0].day_dt[i])
      }
     
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  getEmp(){
    this.dataServe.global_service(0,'/emp_user',`hotel_id=${atob(this.hotel_id)}`).subscribe(data=>{console.log(data)
      this.getEmpData=data
      this.filteredNames=this.getEmpData.msg.filter((e:any)=>e.emp_dept_id==localStorage.getItem('dept') && e.mobile_no!=localStorage.getItem('phone'))
      // this.putdata(this.filteredNames)
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
  var dt={
    "emp_id":this.getEmpID,
    "hotel_id":atob(this.hotel_id),
    "day_dt":this.dayFields,
    "msg_type":'E',
    "user":localStorage.getItem("email"),
    "emp_code":0
  }
  console.log(dt)
  debugger;
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
revokePerm(){
  console.log(this.isChecked)
  var dt={
    "id":this.getEmpID,
    "mobile_no":this.mobile_no,
    "flag":this.isChecked,
    "user":localStorage.getItem('email')
  }
  this.dataServe.global_service(1,'/revoke_dept',dt).subscribe(data=>{
    console.log(data)
   
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
}
