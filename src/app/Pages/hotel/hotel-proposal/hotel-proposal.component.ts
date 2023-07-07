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
  selector: 'app-hotel-proposal',
  templateUrl: './hotel-proposal.component.html',
  styleUrls: ['./hotel-proposal.component.css']
})
export class HotelProposalComponent implements OnInit {
  propForm!:FormGroup
  id:any
  propId=0
  proposalData:any
  hotel_id:any
  proposalEmailData:any
  updatePropData:any
  initial_pay:any
  final_pay:any
  user_type:any
  questdata:any
  quest=false
  constructor(public dialog: MatDialog,private activatedRoute:ActivatedRoute,private router:Router,private msg:MessageService,private dataServe:DataService,private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.propForm=this.formBuilder.group({
      send_date:[''],
      resend_date:[''],
      hotel_qsns:[''],
      edited_send_date:[''],
      accepted_date:[''],
      status:[''],
      proposal_amt:[''],
      first_half_pay:[''],
      first_half_pay_date:[''],
      final_half_pay:[''],
      final_half_pay_date:[''],
      subscription_fee:[''],
      additional_fee:[''],
      declined_comments:['']
    })
    this.initial_pay=localStorage.getItem('initial_pay')
    this.final_pay=localStorage.getItem('final_pay')
    this.user_type=localStorage.getItem('user_type')
    console.log(this.final_pay,this.initial_pay)
  if(this.initial_pay=='null' && this.final_pay=='null' && localStorage.getItem('user_type')=='A')
  // alert('hello')
    this.propForm.disable()
    this.dataServe.global_service(0,'/quest_dt',`hotel_id=${this.hotel_id}`).subscribe(data => {
      console.log(data);
      this.questdata=data
      if(this.questdata.suc>0 && this.questdata.msg.length>0){
          this.quest=false
      } else if(this.questdata.suc>0){
        this.quest=true

      }

      })
    this.dataServe.global_service(0,'/proposal_cust',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.proposalData=data
      this.propId=this.proposalData.msg[0]?.id?this.proposalData.msg[0].id:0

      if(this.proposalData.msg[0]?.status=='D'){
        this.router.navigate(['/hotel/no_sale',btoa(this.hotel_id)]).catch(data=>this.msg.globalError(data))
      }

      this.propForm.patchValue({
       status:this.proposalData.msg[0]?.status,
       send_date:this.proposalData.msg[0]?.send_dt?.substr(0,10),
      resend_date:this.proposalData.msg[0]?.modified_dt?.substr(0,10),
      hotel_qsns:this.proposalData.msg[0]?.hotel_remarks,
      edited_send_date:this.proposalData.msg[0]?.modified_dt.substr(0,10),
      accepted_date:this.proposalData.msg[0]?.receive_dt?.substr(0,10),
     
      // proposal_amt:this.proposalData.msg[0]?.,
      // first_half_pay:this.proposalData.msg[0]?.,
      // first_half_pay_date:this.proposalData.msg[0]?.,
      // final_half_pay:this.proposalData.msg[0]?.,
      // final_half_pay_date:this.proposalData.msg[0]?.,
      // subscription_fee:this.proposalData.msg[0]?.,
      // additional_fee:this.proposalData.msg[0]?.,
      declined_comments:this.proposalData.msg[0]?.admin_notes?this.proposalData.msg[0]?.admin_notes:''
      })
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  go_to_proposal(v:any){
    this.id=localStorage.getItem('rid')
    // localStorage.setItem('hotel_email',this.hotelInfo.controls.email.value)
    
    this.router.navigate(['/hotel/hotel_create_prop',btoa(this.propId.toString()),btoa(this.hotel_id),btoa('A'),btoa(v)]).catch(data=>this.msg.globalError(data))
  }
  send_proposal_email(){
    var dt={
      id:this.propId,
      hotel_id:this.hotel_id,
      email:localStorage.getItem('Email'),
      hotel_name: localStorage.getItem('Restaurant_name'),
      // hotel_name:this.hotelInfo.controls.hotel.value,
      // email:this.hotelInfo.controls.email.value,  //to be added
      user:"admin@gmail.com",
      path: 'hotel/hotel_create_prop'+'/'+encodeURIComponent(btoa(this.propId.toString()))+'/'+encodeURIComponent(btoa(this.hotel_id))+'/'+encodeURIComponent(btoa('U'))+'/'+encodeURIComponent(btoa('S'))
    }
    this.dataServe.global_service(1,'/send_proposal',dt).subscribe(data=>{
      console.log(data)
      this.proposalEmailData=data;
      if(this.proposalEmailData.suc>0){
        this.msg.globalSuccess('Email sent successfully!')
      
      }
      else{
        this.msg.globalError('Problem sending email')
      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
  submitpropInfo(){
    var dt={
      status: this.propForm.controls.status.value,
      hotel_remarks: this.propForm.controls.hotel_qsns.value,
      admin_notes: this.propForm.controls.declined_comments.value,
      user:"admin@gmail.com",
      id:this.propId,
      user_type:'A',
      hotel_id:localStorage.getItem('rid'),
    }
    debugger;
    this.dataServe.global_service(1,'/update_proposal',dt).subscribe(data=>{
      console.log(data)
      this.updatePropData=data;
      if(this.updatePropData.suc>0)
       this.msg.successMsg('SU')
      else
       this.msg.errorMsg('EU')
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))


  }
}
