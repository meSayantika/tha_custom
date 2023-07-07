import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/Services/message.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-add_ticket',
  templateUrl: './add_ticket.component.html',
  styleUrls: ['./add_ticket.component.css']
})
export class Add_ticketComponent implements OnInit {
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
  editTime:any
  datePipe:any
  imgPath:any = null
  getdata:any
  constructor(private domSan: DomSanitizer, public dialog: MatDialog,private activatedRoute:ActivatedRoute,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }

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
     
    })

    if(this.id == 0)
      setInterval(() => {
        this.now = new Date();
        this.ticketform.patchValue({
          date:this.datePipe.transform(this.now, 'dd-MM-YYYY h:mm:ss a')
        })
      }, 100)

    if(this.id>0){
      this.dataServe.global_service(0,'/support_log',`id=${this.id}&hotel_id=${this.hotel_id}`).subscribe(data => {
        console.log(data)
        this.editdata=data
        this.hotel_name=this.editdata.msg[0].hotel_name
      console.log(this.hotel_name);
        this.imgPath = `${environment.api_url}/${this.editdata.msg[0].file_path}`
        this.ticketform.patchValue({
          date: this.datePipe.transform(this.editdata.msg[0].tkt_date, 'dd-MM-YYYY h:mm:ss a'),
          person_name:this.editdata.msg[0].hotel_user_name,
          designation:this.editdata.msg[0].hotel_user_desig,
          phone:this.editdata.msg[0].hotel_user_phone,
          email:this.editdata.msg[0].hotel_user_email,
          issue:this.editdata.msg[0].issue,
          

        })
        console.log(this.upload);
        
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
            var reader = new FileReader();
            reader.readAsDataURL(this.upload);
            
            reader.onload = (_event) => {
              this.imgPath = reader.result; 
            }
            // this.imgPath = this.domSan.bypassSecurityTrustUrl(window.URL.createObjectURL(this.upload))
           this.warning = false; 
             }
      }
      else{
        this.msg.globalError('Invalid file type!')
        this.ticketform.controls.upload.reset()


      }
    
  }

  submit(){
   
  const formData=new FormData()
  formData.append('id',this.id)
  formData.append('hotel_id',this.hotel_id)
  formData.append('user_name',this.m.person_name.value)
  formData.append('phone',this.m.phone.value)
  formData.append('email',this.m.email.value)
  formData.append('desig',this.m.designation.value)
  formData.append('issue',this.m.issue.value)
  formData.append('user',this.m.person_name.value)
  formData.append('img',this.upload)
  formData.append('hotel_name',this.hotel_name)
 
  this.dataServe.global_service(1,'/raise_tkt',formData).subscribe(data=>{
    console.log(data)
    this.ticketdata=data
    if(this.ticketdata.suc>0){
      this.msg.successMsg('SS')
      this.router.navigate(['hotel/submit_ticket/'+btoa(this.hotel_id)])
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

go_prev_page(){
  this.router.navigate(['hotel/submit_ticket/'+btoa(this.hotel_id)])
}

previewImage(){
    window.open(this.imgPath, '_blank')
  }

 

}


