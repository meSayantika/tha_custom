import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/Services/message.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-admin_add_ticket',
  templateUrl: './admin_add_ticket.component.html',
  styleUrls: ['./admin_add_ticket.component.css']
})
export class Admin_add_ticketComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hotel_id: any;
  url:any
  results:any
  event:any
  ticketform!: FormGroup;
  name:any
  phone:any
  email:any
  issue:any
  upload:any
  desig:any
  ticketdata:any
  id:any = 0
  hotel_name:any
  file:any
  files:any
  warning:any
  userData: any;
  editdata:any
  now:any;
  editTime:any;
  datePipe:any
  imgPath:any
  constructor(public dialog: MatDialog,private activatedRoute:ActivatedRoute,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.id=this.activatedRoute.snapshot.params['id']
    this.id=atob(this.id)
    console.log(this.id)
    
    // this.hotel_name=localStorage.getItem('Restaurant_name')
    this.hotel_id=localStorage.getItem('hotel_id')
   console.log(this.hotel_id);

   this.datePipe = new DatePipe("en-US");
   
    this.ticketform=this.formBuilder.group({
      date:[''],
      person_name:['',Validators.required],
      designation:['',Validators.required],
      phone:['',Validators.required],
      email:['',Validators.required],
      issue:['',Validators.required],
      remarks:['',Validators.required],
      status:['',Validators.required]
      // upload:['',Validators.required],
     
    })

    if(this.id>0){
      this.dataServe.global_service(0,'/support_log',`id=${this.id}`).subscribe(data => {
        console.log(data)
        this.editdata=data
        this.hotel_name=this.editdata.msg[0].hotel_name
        console.log(this.hotel_name)
        this.imgPath = `${environment.api_url}/${this.editdata.msg[0].file_path}`
        this.ticketform.patchValue({
          date: this.datePipe.transform(this.editdata.msg[0].tkt_date, 'dd-MM-YYYY h:mm:ss a'),
          person_name:this.editdata.msg[0].hotel_user_name,
          designation:this.editdata.msg[0].hotel_user_desig,
          phone:this.editdata.msg[0].hotel_user_phone,
          email:this.editdata.msg[0].hotel_user_email,
          issue:this.editdata.msg[0].issue,
          remarks:this.editdata.msg[0].remarks,
          status:this.editdata.msg[0].tkt_status
        })
        
       })
    }
    
  }

  get m(){
    return this.ticketform.controls;
  }

  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  }

  onSelectFile(v:any) {
    
      this.upload=v.target.files[0]
      console.log(this.upload);
      const allowed_type = ['application/xslx']
      console.log(v.target.files[0].name.split('.')[1])
      if(v.target.files[0].name.split('.')[1].toLowerCase()=='jpg' || v.target.files[0].name.split('.')[1].toLowerCase()=='png' || v.target.files[0].name.split('.')[1].toLowerCase()=='jpeg'){
        if (v.target.files[0].size >8 * 1024 * 1024 ) {
          this.warning = true;     
          this.msg.globalError('File size should not exceed 8MB')
          this.ticketform.controls.upload.reset()
           } else {
           this.warning = false; 
             }
      }
      else{
        this.msg.globalError('Invalid file type!')
        this.ticketform.controls.upload.reset()


      }

      // var reader = new FileReader();

      // reader.readAsDataURL(v.target.files[0]); // read file as data url

      // reader.onload = (event) => { // called once readAsDataURL is completed
      //   this.url =v.target.result;
      // }
    
  }

  submit(){
  // const formData=new FormData()
  var dt = {
    id: this.id,
    user: 'Admin',
    remarks: this.m.remarks.value,
    tkt_status: this.m.status.value,
    hotel_user_name: this.m.person_name.value,
    hotel_user_phone: this.m.phone.value,
    hotel_user_email: this.m.email.value,
    issue:this.m.issue.value
  }
  // formData.append('id',this.id)
  // formData.append('user','Admin')
  // formData.append('remarks',this.m.remarks.value)
  // formData.append('tkt_status',this.m.status.value)
  // formData.append('img',this.upload)
 
  this.dataServe.global_service(1,'/update_support_log ',dt).subscribe(data=>{
    console.log(data)
    this.ticketdata=data
    if(this.ticketdata.suc>0){
      this.msg.successMsg('SS')
      this.router.navigate(['main/admin/manage_ticket'])
    }
    else{
      this.msg.errorMsg('ES')
    }
  })
}

fetchdata() { //fetching the restaurant record
  //Call APi
  this.dataServe.global_service(0,'/support_log',`id=${this.id}&hotel_id=${this.hotel_id}`).subscribe(data => {
    console.log(data)
    this.userData = data

  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}

previewImage(){
  window.open(this.imgPath, '_blank')
}

go_prev_page(){
  this.router.navigate(['main/admin/manage_ticket'])
}

}
