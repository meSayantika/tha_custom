import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-lost-found-guest-create',
  templateUrl: './lost-found-guest-create.component.html',
  styleUrls: ['./lost-found-guest-create.component.css'],
  providers:[DatePipe]
})
export class LostFoundGuestCreateComponent implements OnInit {

  displayedColumns: string[] = ['position','date', 'item', 'desc', 'initiator'];
  dataSource = new MatTableDataSource();
  constructor(private datePipe:DatePipe, private activatedRoute:ActivatedRoute, private router:Router,private msg:MessageService,private formBuilder: FormBuilder,private dataServe:DataService) { }
  hotel_id:any
  lostForm!:FormGroup
  foundForm!:FormGroup
  category='L'
  lostFoundData:any
  getLostFoundData:any
  getFilteredData:any
  id:any
  approveData:any
  formID:any
  date:any
  last:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.last = new Date((new Date()).getTime() - (7 * 24 * 60 * 60 * 1000));
    this.last = this.datePipe.transform(this.last, 'yyyy-MM-dd');
    this.hotel_id=localStorage.getItem('hotel_id')
    this.id=atob(this.activatedRoute.snapshot.params['id'])
    console.log(this.id)
    this.lostForm=this.formBuilder.group({
      dateReported:['',Validators.required],
      item:['',Validators.required],
      description:['',Validators.required],
      remarks:['',Validators.required]
    })
    this.foundForm=this.formBuilder.group({
      dateReported:['',Validators.required],
      item:['',Validators.required],
      description:['',Validators.required],
      remarks:['',Validators.required]
      
    })
    if(this.id!=0)
    this.getLostFound()

    if(this.id!=0){
      this.lostForm.disable()
      this.foundForm.disable()
    }
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  getLostFound(){
    this.dataServe.global_service(0,'/lost_found',`hotel_id=${this.hotel_id}&id=${this.id}`).subscribe(data=>{
      console.log(data)
      this.getLostFoundData=data
      this.getLostFoundData=this.getLostFoundData.msg
      console.log(this.getLostFoundData[0].lf_flag)
      this.category=this.getLostFoundData[0].lf_flag
      this.edit(this.getLostFoundData[0])
      // this.getFilteredData=this.getLostFoundData.filter((e:any)=>e.lf_flag==v)
      // this.putdata(this.getFilteredData)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  putdata(v: any) { //assign pagination and sort header to datatable
    console.log(v)
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
   

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  register(){
    var dt={
      id:this.id,
      hotel_id:this.hotel_id,
      saved_by:'A',
      user_id:0,
      user_name:'admin',
      user_email:'admin@gmail.com',
      lf_flag:this.category,
      lf_date:this.category=='L'?this.lostForm.controls.dateReported.value:this.foundForm.controls.dateReported.value,
      item_name:this.category=='L'?this.lostForm.controls.item.value:this.foundForm.controls.item.value,
      item_desc:this.category=='L'?this.lostForm.controls.description.value:this.foundForm.controls.description.value,
      remarks:this.category=='L'?this.lostForm.controls.remarks.value:this.foundForm.controls.remarks.value
    }
    this.dataServe.global_service(1,'/lost_found',dt).subscribe(data=>{
      console.log(data)
      this.lostFoundData=data;
      if(this.lostFoundData.suc>0){
        this.msg.successMsg('SS')
        this.lostForm.reset();this.foundForm.reset()
  this.router.navigate(['hotel/lost_found_guest',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

      }
      else{
        this.msg.errorMsg('ES')
      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  getFilter(){
    this.getFilteredData=null
    this.getFilteredData=this.getLostFoundData.filter((e:any)=>e.lf_flag==this.category)
    console.log(this.getFilteredData)
      this.putdata(this.getFilteredData)
  }

  edit(v:any){
    this.formID=document.getElementById('formID')
    var topPos = this.formID.offsetTop;
    // document.getElementById('scrolling_div').scrollTop = topPos;

    // window.scroll(0,0)
    this.id=v.id
    // this.lostForm.reset(),
    // this.foundForm.reset()
    if(this.category=='L'){
      
      this.lostForm.patchValue({
        dateReported:v.lf_date.substr(0,10),
        item:v.item_name,
        description:v.item_desc,
        remarks:v.remarks
      })
    }
    else{
      this.foundForm.patchValue({
        dateReported:v.lf_date.substr(0,10),
        item:v.item_name,
        description:v.item_desc,
        remarks:v.remarks
      })
    }
  }
  go_previous(){
    this.router.navigate(['hotel/lost_found_guest',btoa(this.hotel_id)])
  }
  lost_found_approve(flag:any){
    var dt={
      id:this.id,
      approval_flag:flag,
      user:'admin@gmail.com'
    }
    this.dataServe.global_service(1,'/lost_found_approve',dt).subscribe(data=>{
      console.log(data)
      this.approveData=data
      if(this.approveData.suc>0){
        if(flag=='Y'){
          this.msg.globalSuccess('Successfully approved!')
        }
        else{
          this.msg.globalSuccess('Successfully rejected')
        }
      }
      else{
        this.msg.globalError('Error while completing action!')
      }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
}
