import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.css'],
  providers:[DatePipe]
})
export class GroupHomeComponent implements OnInit {

  constructor(private msg:MessageService, private dataServe:DataService, public dialog: MatDialog,private activatedRoute:ActivatedRoute,private router:Router) { }
  hotel_id:any
  managerDtls:any
  mngType:any
  msg_type:any
  getDeptData:any;
  deptName:any
  activity:any
  dep_name:any
  ngOnInit() {
    localStorage.setItem('mngFlag','G')
    this.dep_name=localStorage.getItem('name')
    this.activity=localStorage.getItem('activity')
    this.hotel_id=this.activatedRoute.snapshot.params['hotel_id']
    console.log(btoa(this.hotel_id))
    this.msg_type=localStorage.getItem('msg_type')
    this.dataServe.global_service(0,'/dept_user_dtls',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.managerDtls=data
      console.log(this.managerDtls.msg.filter((e:any)=>e.id==localStorage.getItem('id')))
    
      
  })
  this.dataServe.global_service(0,'/dept',`hotel_id=${this.hotel_id}`).subscribe(data=>{console.log(data)
    this.getDeptData=data
     this.deptName=this.getDeptData.msg.filter((e:any)=>e.id==localStorage.getItem('dept'))[0].dept_name

    // this.putdata(this.getDeptData.msg)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
  signout(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: {flag:'signout',content:null}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result==1)
       {
        localStorage.clear();
        this.router.navigate(['/main/admin/deptlogin'])

       }

    });
  }
  profile(){
    
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '460px',
      data: {flag:'profile',content:this.deptName}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
     

    });
  }
  setFlag(v:any){
    localStorage.setItem('mngFlag',v)
  }
}
