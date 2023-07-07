import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { filter, map, pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-hotel-questionnaire',
  templateUrl: './hotel-questionnaire.component.html',
  styleUrls: ['./hotel-questionnaire.component.css']
})
export class HotelQuestionnaireComponent implements OnInit {
  qTabForm!:FormGroup
  userData:any
  questId:any
  submitInfoData:any
  id:any
  hotel_id:any
  final_pay:any
  initial_pay:any
  user_type:any
  constructor(public dialog: MatDialog,private activatedRoute:ActivatedRoute,private router:Router,private msg:MessageService,private dataServe:DataService,private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.user_type=localStorage.getItem('user_type')
    this.hotel_id=this.activatedRoute.snapshot.params['hotel_id']
    this.hotel_id=atob(this.hotel_id)
    this.qTabForm = this.formBuilder.group({
      firstCall: [''],
      notes: [''],
      date_sent: [''],
      qcomplete: [''],
      
    });
    this.initial_pay=localStorage.getItem('initial_pay')
    this.final_pay=localStorage.getItem('final_pay')
    console.log(this.final_pay,this.initial_pay)
  if((this.initial_pay=='null' && this.final_pay=='null' && localStorage.getItem('user_type')=='A')|| (this.initial_pay!=null && this.final_pay!=null))
  // alert('hello')
    this.qTabForm.disable()
    this.dataServe.global_service(0,'/quest_dt',`hotel_id=${this.hotel_id}`).subscribe(data => {
      console.log(data)
      this.userData = data
      this.questId = this.userData.suc > 0 && this.userData.msg.length > 0 ? this.userData.msg[0].id : 0
      console.log('Quest', this.questId);
      localStorage.setItem('Quest',this.questId)
      this.qTabForm.patchValue({
        qcomplete:this.userData.msg[0]?.receive?.substr(0,10),
        firstCall:this.userData.msg[0]?.first_call_dt?.substr(0,10),
        notes:this.userData.msg[0]?.admin_note,
        date_sent:this.userData.msg[0]?.send_dt?.substr(0,10)

      })
      console.log(this.qTabForm.controls)
      
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  submitqInfo(){
    console.log(this.qTabForm.controls,this.questId)
    var dt={
      "hotel_id":localStorage.getItem('rid'),
      "id":this.questId,
      "first_call_dt":this.qTabForm.controls.firstCall.value,
      "admin_note":this.qTabForm.controls.notes.value,
      "user":"admin@gmail.com"
    }
    console.log(dt)
    this.dataServe.global_service(1,'/quest_dt',dt).subscribe(data=>{
       this.submitInfoData=data;
       if(this.submitInfoData.suc>0){
        this.msg.successMsg('SU')
       }
      else
        this.msg.errorMsg('EU')
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
  go_to_questionnaire(v:any){
    this.id=localStorage.getItem('rid')
    this.router.navigate(['/hotel/hotel_create_qsn',btoa(this.questId),btoa(this.hotel_id),btoa('A'),btoa(v)])
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

  }
}
