import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
@Component({
  selector: 'app-lost-found-dashboard',
  templateUrl: './lost-found-dashboard.component.html',
  styleUrls: ['./lost-found-dashboard.component.css']
})
export class LostFoundDashboardComponent implements OnInit {
  displayedColumns: string[] = ['position','date', 'item', 'desc', 'initiator','edit'];
  dataSource = new MatTableDataSource();
  constructor(private router:Router,private msg:MessageService,private formBuilder: FormBuilder,private dataServe:DataService) { }
  hotel_id:any
  lostForm!:FormGroup
  foundForm!:FormGroup
  category='L'
  lostFoundData:any
  getLostFoundData:any
  getFilteredData:any
  id:any
  formID:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
    this.getLostFound('L')
  }
  getLostFound(v:any){
    this.dataServe.global_service(0,'/lost_found',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.getLostFoundData=data
      this.getLostFoundData=this.getLostFoundData.msg
      this.getFilteredData=this.getLostFoundData.filter((e:any)=>e.lf_flag==v)
      this.putdata(this.getFilteredData)
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
  getFilter(){
    this.getFilteredData=null
    this.getFilteredData=this.getLostFoundData.filter((e:any)=>e.lf_flag==this.category)
    console.log(this.getFilteredData)
      this.putdata(this.getFilteredData)
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  go_to_lost_found_form(id:any){
    this.router.navigate(['hotel/lost_found',btoa(this.hotel_id),btoa(id)]).catch(e=>this.msg.globalError(e))

  }
  viewInfo(){
    this.dataServe.showInfo.next({data:'lost_found',flag:true,heading:'FAQ'})
  }
}
