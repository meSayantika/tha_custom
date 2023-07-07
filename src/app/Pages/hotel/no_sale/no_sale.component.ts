import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-no_sale',
  templateUrl: './no_sale.component.html',
  styleUrls: ['./no_sale.component.css']
})
export class No_saleComponent implements OnInit {
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
  nosaledata:any
  nosale=false
  constructor(public dialog: MatDialog,private activatedRoute:ActivatedRoute,private router:Router,private msg:MessageService,private dataServe:DataService,private formBuilder: FormBuilder) { }

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
      checkbox:[''],
      declined_comments:['']

    })
    this.initial_pay=localStorage.getItem('initial_pay')
    this.final_pay=localStorage.getItem('final_pay')
    this.user_type=localStorage.getItem('user_type')
    console.log(this.final_pay,this.initial_pay)
  if(this.initial_pay=='null' && this.final_pay=='null' && localStorage.getItem('user_type')=='A'){}
  // alert('hello')
    // this.propForm.disable()
    // console.log('hi');
    this.dataServe.global_service(0,'/quest_dt',`hotel_id=${this.hotel_id}`).subscribe(data => {
      console.log(data);
      this.nosaledata=data
      if(this.nosaledata.suc>0 && this.nosaledata.msg.length>0){
        this.nosale=false
      } else if(this.nosaledata.suc>0){
        this.nosale=true

      
      }
    })
    this.dataServe.global_service(0,'/proposal_cust',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data);
      this.proposalData=data
      console.log(this.proposalData.msg.length)
      this.propId=this.proposalData.msg[0]?.id?this.proposalData.msg[0].id:0
      console.log(this.propId)
      console.log(this.proposalData.msg[0]?.status)
      if(this.proposalData.msg[0]?.status!='D' || this.propId==0){
        this.router.navigate(['/hotel/hotel_proposal',btoa(this.hotel_id)]).catch(data=>this.msg.globalError(data))
      }

      this.propForm.patchValue({
       status:this.proposalData.msg[0]?.status,
        send_date:this.proposalData.msg[0]?.send_dt?.substr(0,10),
      resend_date:this.proposalData.msg[0]?.modified_dt?.substr(0,10),
      hotel_qsns:this.proposalData.msg[0]?.hotel_remarks,
      edited_send_date:this.proposalData.msg[0]?.modified_dt.substr(0,10),
      accepted_date:this.proposalData.msg[0]?.status_dt?.substr(0,10),
      checkbox:this.proposalData.msg[0]?.status=='D' ? true : false,     
      date:this.proposalData.msg[0]?.date?.substr(0,10),
      
      // proposal_amt:this.proposalData.msg[0]?.,
      // first_half_pay:this.proposalData.msg[0]?.,
      // first_half_pay_date:this.proposalData.msg[0]?.,
      // final_half_pay:this.proposalData.msg[0]?.,
      // final_half_pay_date:this.proposalData.msg[0]?.,
      // subscription_fee:this.proposalData.msg[0]?.,
      // additional_fee:this.proposalData.msg[0]?.,
      declined_comments:this.proposalData.msg[0]?.admin_notes,

      })
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
    
  }

  go_to_proposal(v:any){
    this.id=localStorage.getItem('rid')
    // localStorage.setItem('hotel_email',this.hotelInfo.controls.email.value)
    
    this.router.navigate(['/hotel/no_sale',btoa(this.propId.toString()),btoa(this.hotel_id),btoa('A'),btoa(v)]).catch(data=>this.msg.globalError(data))
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
      path: 'hotel/no_sale'+'/'+encodeURIComponent(btoa(this.propId.toString()))+'/'+encodeURIComponent(btoa(this.hotel_id))+'/'+encodeURIComponent(btoa('U'))+'/'+encodeURIComponent(btoa('E'))
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

  openDialogForStatus(){
    console.log(this.propForm.controls);
    
    var dt={
      status: 'P',
      hotel_remarks: this.propForm.controls.hotel_qsns.value,
      admin_notes: this.propForm.controls.declined_comments.value,
      user:'admin@gmail.com',
      id:this.propId,
      user_type:'A',
      hotel_id:this.hotel_id,
    }
    this.dataServe.global_service(1,'/update_proposal',dt).subscribe(data=>{
      console.log(data)
      this.updatePropData=data;
      if(this.updatePropData.suc>0)
       this.msg.successMsg('SU')
      else
       this.msg.errorMsg('EU')
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

}
