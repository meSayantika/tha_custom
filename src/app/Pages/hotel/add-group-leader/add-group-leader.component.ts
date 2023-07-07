import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/Services/message.service';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe, getLocaleDayPeriods } from '@angular/common';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
@Component({
  selector: 'app-add-group-leader',
  templateUrl: './add-group-leader.component.html',
  styleUrls: ['./add-group-leader.component.css'],
  providers:[DatePipe]
})



export class AddGroupLeaderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  getDeptUserDtlsData:any;
  mngForm!: FormGroup;
  deptForm!: FormGroup;
  letterForm!:FormGroup;
  hotel_id:any;
  id=0;
  getDeptData:any
  getEmpData:any
  email_body=``
  deptName=''
  empName=''
  subjectLine=''
  mngFlag:any
  empID:any
  postdeptMngData:any
  disabledEmail=false
  sendMailData:any
  chk_phone_exists:any
  disableSave=true
  alreadyExists:any
  userID:any
  addDeptData:any
  myDate:any;
  groupSaveData:any
  getLeaderData:any;
  
  selectedItems:any=[
    {id:"M", name:"Employee Messages"},
  ]
  selectedDepts:any
  dropdownSettings:IDropdownSettings = {
    // singleSelection: false,
    // idField: 'item_id',
    // textField: 'item_text',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    // allowSearchFilter: true
    //singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  deptSettings:IDropdownSettings = {
   
    idField: 'id',
    textField: 'dept_name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  deptSelected:any
  depts:any
  msgList=[
    {id:"H", name:"Hotel Message Center"},
    {id:"E", name:"Emergency Messages"},
    {id:"V", name:"VIP Messages"},
    {id:"M", name:"Employee Messages"},
    {id:"G", name:"Group Messages"}
  ]
  alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  a=''
  b=''
  c=''
  d=''
  e=''
  sum=''
  dayFields = [
    {id: 0, day: 'Monday', code:1, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Tuesday', code:2, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Wednesday', code:3, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Thursday', code:4, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Friday', code:5, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Saturday', code:6, active_flag: false, off_on: false, start: '', end: ''},
    {id: 0, day: 'Sunday', code:7, active_flag: false, off_on: false, start: '', end: ''},
  ]
  constructor(private datePipe:DatePipe, public dialog: MatDialog,private activatedRoute:ActivatedRoute,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }
  displayedColumns: string[] = ['group_name', 'leader_name', 'no_of_people'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    console.log(this.selectedItems)
    this.hotel_id=this.activatedRoute.snapshot.params['hotel_id'];
    this.hotel_id=atob(this.hotel_id);
    // this.id=this.activatedRoute.snapshot.params['id'],
    // this.id=atob(this.id)
    this.mngForm=this.formBuilder.group({
      group_name:['',Validators.required],
      group_leader_name:['',Validators.required],
      check_in:['',[Validators.required,Validators.email]],
      check_out:['',Validators.required],
      phone:['',Validators.required],
      language:['',Validators.required],
      no_of_members:['',Validators.required],
      g_email:['',Validators.required]
     
    })
    this.letterForm=this.formBuilder.group({
      subject:['',Validators.required],
      email_text:['',Validators.required],
      preview:['']

    })
   this.getLeaders()
    // console.log(this.id)
    // if(this.id!=0)
    // this.getDeptById(this.id)
  }
  get m(){
    return this.mngForm.controls;
  }
  getDept(){
    this.dataServe.global_service(0,'/dept',`hotel_id=${this.hotel_id}`).subscribe(data=>{console.log(data)
    this.getDeptData=data

    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  getDeptById(v:any){
    this.dataServe.global_service(0,'/dept_user_dtls',`hotel_id=${this.hotel_id}&id=${v}`).subscribe(data=>{
      console.log(data)
      this.getDeptUserDtlsData=data
      this.mngForm.patchValue({
        dept_name:this.getDeptUserDtlsData.msg[0].dept_id
      })
      this.getEmp()
      for(let dt of this.getDeptUserDtlsData.msg[0].msg_type){
        this.selectedItems.push(this.msgList[this.msgList.findIndex((msg:any) => msg.id==dt.msg_type )])
      }
      console.log(this.selectedItems)
    
      this.mngForm.patchValue({
        mng_name:this.getEmpData?.msg[0].emp_id
      })
      // this.getEmpDtls()

    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
  getEmp(){
    this.subjectLine=''
    this.email_body=''
    this.disabledEmail=true
    
    this.mngForm.controls.m_email.reset()
    this.mngForm.controls.m_phone.reset()
    this.dataServe.global_service(0,'/emp_dtls',`hotel_id=${this.hotel_id}&dept_id=${this.mngForm.controls.dept_name.value}`).subscribe(data=>{console.log(data)
      this.getEmpData=data
    // this.empName=this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value)[0].emp_name
    // this.deptName=this.getDeptData.msg.filter((e:any)=>e.id==this.mngForm.controls.dept_name.value)[0].dept_name
   console.log(this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value),this.getDeptData.msg.filter((e:any)=>e.id==this.mngForm.controls.dept_name.value))
      if(this.id!=0){
        this.mngForm.patchValue({
          mng_name:this.getEmpData?.msg[0].emp_id
        })
      }
     
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  change(){
    console.log(this.email_body)
    this.letterForm.controls.preview.setValue(this.email_body)
  }
  putData(v:any){
   this.dataSource= new MatTableDataSource(v);
  }
  go_prev_page(){
    this.router.navigate(['main/admin/manage_hotel_account',btoa(this.hotel_id)]).catch(data=>{
      this.msg.globalError(data);
    })
  }
  onItemSelect(item: any) {
    console.log(item);
    // this.selectedItems.push(item)
    console.log(this.selectedItems)

  }
  onSelectAll(items: any) {
    console.log(items);
    // this.selectedItems=items
    console.log(this.selectedItems)

  }
  getEmpDtls(){
    this.subjectLine=''
    this.email_body=''
    this.disabledEmail=false
    this.empName=this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value)[0].emp_name
    this.deptName=this.getDeptData.msg.filter((e:any)=>e.id==this.mngForm.controls.dept_name.value)[0].dept_name
   console.log(this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value),this.getDeptData.msg.filter((e:any)=>e.id==this.mngForm.controls.dept_name.value))

    this.mngFlag=this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value)[0].manager_flag
    this.empID=this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value)[0].emp_id
      this.mngForm.controls.m_email.setValue(this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value)[0].email_id)
      this.mngForm.controls.m_phone.setValue(this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value)[0].mobile_no)
    this.dataServe.global_service(0,'/chk_dept_dtls',`phone_no=${this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value)[0].mobile_no}`).subscribe(data=>{
      console.log(data)
      this.chk_phone_exists=data;
      this.alreadyExists=this.chk_phone_exists.msg[0].chk_user
      if(this.chk_phone_exists.msg[0].chk_user>0)
      { this.disableSave=true;
        // this.disabledEmail=true
        this.msg.globalInfo('Data already saved in roster') 
        this.userID= this.chk_phone_exists.msg[0].id
      }
      else
      { this.disableSave=false; this.disabledEmail=false}

      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
    }
  add_manager(){
    console.log(this.mngForm.controls)
    console.log(this.letterForm.controls)
    console.log(this.selectedItems)
    this.dayFields[0].active_flag=this.mngForm.controls.check_mon.value?true:false
    this.dayFields[1].active_flag=this.mngForm.controls.check_tue.value?true:false
    this.dayFields[2].active_flag=this.mngForm.controls.check_wed.value?true:false
    this.dayFields[3].active_flag=this.mngForm.controls.check_thur.value?true:false
    this.dayFields[4].active_flag=this.mngForm.controls.check_fri.value?true:false
    this.dayFields[5].active_flag=this.mngForm.controls.check_sat.value?true:false
    this.dayFields[6].active_flag=this.mngForm.controls.check_sun.value?true:false

    this.dayFields[0].off_on=this.mngForm.controls.check_mon_off.value?true:false
    this.dayFields[1].off_on=this.mngForm.controls.check_tue_off.value?true:false
    this.dayFields[2].off_on=this.mngForm.controls.check_wed_off.value?true:false
    this.dayFields[3].off_on=this.mngForm.controls.check_thur_off.value?true:false
    this.dayFields[4].off_on=this.mngForm.controls.check_fri_off.value?true:false
    this.dayFields[5].off_on=this.mngForm.controls.check_sat_off.value?true:false
    this.dayFields[6].off_on=this.mngForm.controls.check_sun_off.value?true:false

    this.dayFields[0].start= this.mngForm.controls.check_mon.value? (this.mngForm.controls.mon_time_start.value==''? '00:00': this.mngForm.controls.mon_time_start.value):''
    this.dayFields[1].start= this.mngForm.controls.check_tue.value? (this.mngForm.controls.tue_time_start.value==''? '00:00': this.mngForm.controls.tue_time_start.value):''
    this.dayFields[2].start= this.mngForm.controls.check_wed.value? (this.mngForm.controls.wed_time_start.value==''? '00:00': this.mngForm.controls.wed_time_start.value):''
    this.dayFields[3].start= this.mngForm.controls.check_thur.value? (this.mngForm.controls.thur_time_start.value==''? '00:00': this.mngForm.controls.thur_time_start.value):''
    this.dayFields[4].start= this.mngForm.controls.check_fri.value? (this.mngForm.controls.fri_time_start.value==''? '00:00': this.mngForm.controls.fri_time_start.value):''
    this.dayFields[5].start= this.mngForm.controls.check_sat.value? (this.mngForm.controls.sat_time_start.value==''? '00:00': this.mngForm.controls.sat_time_start.value):''
    this.dayFields[6].start= this.mngForm.controls.check_sun.value? (this.mngForm.controls.sun_time_start.value==''? '00:00': this.mngForm.controls.sun_time_start.value):''

    this.dayFields[0].end= this.mngForm.controls.check_mon.value? (this.mngForm.controls.mon_time_end.value==''? '23:59': this.mngForm.controls.mon_time_end.value):''
    this.dayFields[1].end= this.mngForm.controls.check_tue.value? (this.mngForm.controls.tue_time_end.value==''? '23:59': this.mngForm.controls.tue_time_end.value):''
    this.dayFields[2].end= this.mngForm.controls.check_wed.value? (this.mngForm.controls.wed_time_end.value==''? '23:59': this.mngForm.controls.wed_time_end.value):''
    this.dayFields[3].end= this.mngForm.controls.check_thur.value? (this.mngForm.controls.thur_time_end.value==''? '23:59': this.mngForm.controls.thur_time_end.value):''
    this.dayFields[4].end= this.mngForm.controls.check_fri.value? (this.mngForm.controls.fri_time_end.value==''? '23:59':this.mngForm.controls.fri_time_end.value):''
    this.dayFields[5].end= this.mngForm.controls.check_sat.value? (this.mngForm.controls.sat_time_end.value==''? '23:59':this.mngForm.controls.sat_time_end.value):''
    this.dayFields[6].end= this.mngForm.controls.check_sun.value? (this.mngForm.controls.sun_time_end.value==''? '23:59':this.mngForm.controls.sun_time_end.value):''
    var dt={
      id:0,
      dept_id:this.mngForm.controls.dept_name.value,
      emp_name: this.getEmpData.msg.filter((e:any)=>e.emp_id==this.mngForm.controls.mng_name.value)[0].emp_name,
      phone_no:this.mngForm.controls.m_phone.value,
      email:this.mngForm.controls.m_email.value,
      group_leader_flag:this.mngFlag,
      msg_type:this.selectedItems,
      emp_id:this.empID,
      day_dt: this.dayFields,
      user_type:'E',
      user:"admin@gmail.com",
      hotel_id:this.hotel_id,
      
    }
    console.log(dt)
    this.dataServe.global_service(1,'/dept_user_dtls',dt).subscribe(data=>{
      console.log(data)
      this.postdeptMngData=data 
      if(this.postdeptMngData.suc>0){
        this.userID = this.alreadyExists == 0 ? this.postdeptMngData.lastId.insertId : this.userID
        this.msg.successMsg('SS')
      }
      else
        this.msg.errorMsg('ES')
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  gen_body(){
    this.disableSave=this.mngForm.controls.g_email.value &&this.mngForm.controls.group_name.value && this.mngForm.controls.group_leader_name.value?false:true
    // this.deptName=this.getDeptUserDtlsData.msg.filter((e:any)=>e.id==this.deptName)[0].dept_name
    // this.empName=this.getEmpData.msg.filter((e:any)=>e.id==this.empName)[0].emp_name
    this.sum=''
    this.a = this.alpha[Math.floor(Math.random() * 62)];
    this.b = this.alpha[Math.floor(Math.random() * 62)];
    this.c = this.alpha[Math.floor(Math.random() * 62)];
    this.d = this.alpha[Math.floor(Math.random() * 62)];
    this.e = this.alpha[Math.floor(Math.random() * 62)];
    this.sum = this.a + this.b + this.c + this.d + this.e;
    this.myDate = this.datePipe.transform(this.mngForm.controls.check_in.value, 'yyyy-MM-dd');
   console.log(this.m)
    this.subjectLine=`Welcome ${this.mngForm.controls.group_leader_name.value}`
    this.email_body=`Hello ${this.mngForm.controls.group_leader_name.value},

We are excited to host your group on ${this.myDate}.
    
FIRST, please REGISTER HERE The only way to actkate your PERSONAL CONCIERGE is to Register
Please log-in to your GROUP COMMUNICATION PLATFORM, enabling you to communicate with your entire group ${this.mngForm.controls.group_name.value}, or one-on-one with any of your group members via chat or voice/call
If you have any questions, please call 800-777-7777
    
Thank you,
    
Hotel Bahia
    

Login Credentials:

User ID: ${this.mngForm.controls.phone.value}
Password: ${this.sum}
`

  }
sendEmail(){
  var dt={
    "hotel_id":this.hotel_id,
    "email_id":this.mngForm.controls.m_email.value,
    "user_id":this.userID,
    "email_body":this.letterForm.controls.email_text.value,
    "email_title":this.letterForm.controls.subject.value,
    "password":this.sum,
    "user":"admin@gmail.com",
    "id":0
  }
  if(this.letterForm.controls.email_text.value!='' && this.letterForm.controls.subject.value!='')
  {this.dataServe.global_service(1,'/dept_user_send_email',dt).subscribe(data=>{
    this.sendMailData=data
    console.log(data)
    if(this.sendMailData.suc>0)
     this.msg.globalSuccess('Email sent successfully!')
    else
     this.msg.globalError('Error while sending email!')
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  else
   this.msg.globalError('Please generate email first!')
}
getLeaders(){
  this.dataServe.global_service(0,'/group_leader',`hotel_id=${this.hotel_id}`).subscribe(data=>{
    console.log(data)
    this.getLeaderData=data
    this.putData(this.getLeaderData.msg)
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
add_emp(){
  var dt={
    id:this.id?this.id:0,
    dept_list:this.selectedDepts,
    emp_name:this.mngForm.controls.mng_name.value,
    user:"admin@gmail.com",
    phone_no:this.mngForm.controls.m_phone.value,
    email:this.mngForm.controls.m_email.value,
    manager_flag:'Y',
    hotel_id: this.hotel_id,
    group_leader_flag:this.mngFlag,
    user_type:'E',
    day_dt: this.dayFields,
    msg_type:[{id:"M", name:"Employee Messages"}],
    dept_id:0,
    password:this.sum,
    email_body:this.email_body,
    email_title:this.subjectLine
  }
  this.dataServe.global_service(1,'/emp_dtls',dt).subscribe(data=>{
    console.log(data)
    this.addDeptData=data;
    if(this.addDeptData.suc>0)
    {
      if(this.id){
        this.msg.successMsg('SU')
      }
      else 
      {
        this.msg.successMsg('SS');
      }
 

    }
    else{
      if(this.id){
        this.msg.errorMsg('EU')

      }
      else 
      {
        this.msg.errorMsg('ES')
      }
    }
    this.mngForm.controls.m_phone.enable()
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
chk_phone(){
  this.selectedDepts=null
  this.mngForm.controls.m_phone.enable()
  if(this.mngForm.controls.m_phone.value)
  this.disabledEmail=false
  this.dataServe.global_service(0,'/chk_emp_dept',`hotel_id=${this.hotel_id}&mobile_no=${this.mngForm.controls.m_phone.value}`).subscribe(data=>{
    console.log(data)
    this.depts=data;
    this.selectedDepts=this.depts.msg
    if(this.depts.msg){
      this.mngForm.controls.m_phone.disable()
    }
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
clearField(){
  this.selectedDepts=null
  this.mngForm.controls.m_phone.enable()
  this.mngForm.controls.m_phone.setValue(null)
  this.disabledEmail=true

}
add_leader(){
  console.log(this.mngForm)
  var dt={
id:this.id?this.id:0,
hotel_id:this.hotel_id,
group_name:this.m.group_name.value,
no_of_people:this.m.no_of_members.value,
user_name:this.m.group_leader_name.value,
user_type:'G',
mobile_no:this.m.phone.value,
email_id:this.m.g_email.value,
password:this.sum,
leader_flag:'Y',
email_title:this.subjectLine,
email_body:this.email_body,
check_in:this.m.check_in.value,
check_out:this.m.check_out.value,
room_no:0,
status_flag:'A',
user:"admin@gmail.com"
}
this.dataServe.global_service(1,'/group_leader',dt).subscribe(data=>{
  console.log(data)
  this.groupSaveData=data;
  if(this.groupSaveData.suc>0){
    this.msg.successMsg('SS')
    this.id=0
    this.getLeaders()
  }
  else{
    this.msg.errorMsg('ES')
  }
},error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
showLeader(v:any){
  this.disableSave=false
  console.log(v.id)
  this.id=v.id
  window.scroll(0,0)
  console.log(v)
  this.mngForm.patchValue({
    group_name:v.group_name,
      group_leader_name:v.leader_name,
      check_in:v.check_in,
      check_out:v.check_out,
      phone:v.mobile_no,
      language:'E',
      no_of_members:v.no_of_people,
      g_email:v.email_id
  })
  this.letterForm.patchValue({
    subject:v.email_title,
    email_text:v.email_body,
  })
}
go_home(){
  this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

}
}
