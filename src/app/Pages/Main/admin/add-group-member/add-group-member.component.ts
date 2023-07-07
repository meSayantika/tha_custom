import { Component, OnInit , ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { MessageService } from 'src/app/Services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
@Component({
  selector: 'app-add-group-member',
  templateUrl: './add-group-member.component.html',
  styleUrls: ['./add-group-member.component.css']
})
export class AddGroupMemberComponent implements OnInit {

  empForm!: FormGroup;
  addDeptData:any
  getDeptData:any
  constructor(private activatedRoute:ActivatedRoute, public dialog: MatDialog,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }
  displayedColumns: string[] = ['position','name','del'];
  dataSource = new MatTableDataSource();
  hotel_id:any
  id=0;
  getEmpData:any
  getEmpDataSrch:any
  searchDept=''
  getIdData:any
  getDelData:any
  deptName:any
  groupSaveData:any
  filteredNames:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  subjectLine=''
  // deptName=''
  // email_body=''
  emailData:any
  empName=''
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
  email_body=`Hello #user_name,
    
Please log in to communicate, 24/7, or one-on-one via chat or voice call.
Thank You  
Cindy Ferguson
  
Here are your credentials:
URL: #url
User ID: #user_id,
Password: #password
  `
  ngOnInit() {
    this.hotel_id=this.activatedRoute.snapshot.params['id'];
    this.hotel_id=atob(this.hotel_id);
    this.empForm = this.formBuilder.group({
      emp_id:[''],
      name: ['', [Validators.required]],
      mail:[''],
      phone:[''],
      mFlag:[false],
      dept:[''],
      check_in:[''],
      check_out:[''],
      room_no:['']

     
    });
    // this.getDept()
    this.getEmp()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // getDept(){
  //   this.dataServe.global_service(0,'/dept',`hotel_id=${this.hotel_id}`).subscribe(data=>{console.log(data)
  //   this.getDeptData=data
  //    this.deptName=this.getDeptData.msg.filter((e:any)=>e.id==localStorage.getItem('dept'))[0].dept_name

  //   // this.putdata(this.getDeptData.msg)
  //   },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  // }
  get m(){
    return this.empForm.controls
  }
  getEmp(){
    this.dataServe.global_service(0,'/guest_user_dt',`hotel_id=${this.hotel_id}&group_id=${localStorage.getItem('group_emp_id')}&flag=N`).subscribe(data=>{console.log(data)
      this.getEmpData=data
      console.log(this.getEmpData.msg)
      this.filteredNames=this.getEmpData.msg.filter((e:any)=>e.emp_dept_id==localStorage.getItem('dept') && e.mobile_no!=localStorage.getItem('phone'))
     
      this.putdata(this.getEmpData.msg)
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  putdata(v: any) { //assign pagination and sort header to datatable
    console.log(v)
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
   
  }
  add_member(){
    var dt={
  id:localStorage.getItem('group_emp_id'),
  hotel_id:this.hotel_id,
  user_name:this.m.name.value,
  user_type:'G',
  mobile_no:this.m.phone.value,
  email_id:this.m.mail.value,
  leader_flag:'N',
  check_in:this.m.check_in.value,
  check_out:this.m.check_out.value,
  room_no:this.m.room_no.value,
  status_flag:'A',
  user:localStorage.getItem('email')
  }
  this.dataServe.global_service(1,'/group_user',dt).subscribe(data=>{
    console.log(data)
    this.groupSaveData=data;
    if(this.groupSaveData.suc>0){
      this.msg.successMsg('SS')
      this.id=0
      this.empForm.reset()
      this.getEmp()
      // this.getLeaders()
    }
    else{
      this.msg.errorMsg('ES')
    }
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  add_emp(){
    var dt={
      id:this.id?this.id:0,
      emp_id:this.empForm.controls.emp_id.value,
      dept_id:localStorage.getItem('dept'),
      emp_name:this.empForm.controls.name.value,
      user:localStorage.getItem('email'),
      phone_no:this.empForm.controls.phone.value,
      email:this.empForm.controls.mail.value,
      manager_flag:'N',
      hotel_id: this.hotel_id
    }
    this.dataServe.global_service(1,'/emp_user',dt).subscribe(data=>{
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
    this.getEmp() ; this.refresh() 

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
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

  refresh(){
    this.empForm.reset()
    this.empForm.controls.emp_id.enable()

    this.id=0
  }
  edit(element:any){
    console.log(element)
    this.empForm.controls.emp_id.disable()
    this.empForm.patchValue({
      name:element.user_name,
      dept:element.emp_dept_id,
      phone:element.mobile_no,
      mail:element.email_id,
      emp_id:element.emp_id,
      room_no:element.room_no,
      check_in:element.check_in,
      check_out:element.check_out,
      mFlag:element.manager_flag!='N'?true:false
    })
    this.id=element.id
  }
  searchbyDept(){
    console.log(this.searchDept, this.getDeptData.msg)
    console.log(this.getEmpData.msg.filter((e:any)=>e.id==this.searchDept))
    this.getEmpDataSrch=this.getEmpData.msg.filter((e:any)=>e.id==this.searchDept)
    this.putdata(this.getEmpData.msg.filter((e:any)=>e.id==this.searchDept))
  }
  getID(){
    if(!this.empForm.controls.emp_id.value)
    this.dataServe.global_service(0,'/emp_dtls_last_id',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      this.getIdData=data
      this.empForm.controls.emp_id.setValue(this.getIdData.msg[0].max_id)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  delEmp(v:any){
    var f='delete'
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: { flag: f, content: v }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, f)
      if(result==1){
      this.dataServe.global_service(1,'/guest_user_del',{id:v}).subscribe(data=>{
        console.log(data)
        this.getDelData=data
        if(this.getDelData.suc==1)
        {
          this.msg.successMsg('SD')
          this.getEmp()
        }
        else if(this.getDelData.suc==2){
          this.msg.globalInfo(this.getDelData.msg)
        }
        else{
          this.msg.errorMsg('ED')
        }
      })
    }
      
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
   

  }

  gen_body(){
  
    var dt={
      "dept_id": localStorage.getItem('dept'),
      "hotel_id": this.hotel_id,
      "title": "Account Invitation",
      "body": this.email_body,
      "user":localStorage.getItem('email')
    } 
    this.dataServe.global_service(1,'/send_user_email',dt).subscribe(data=>{
      console.log(data)
      this.emailData=data
      if(this.emailData.suc>0)
      this.msg.globalSuccess('Email sent successfully!')
      else
      this.msg.globalError('Error while sending email!')
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
    console.log(this.email_body)
  
  }

}
