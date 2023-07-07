import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-hotel-flip',
  templateUrl: './hotel-flip.component.html',
  styleUrls: ['./hotel-flip.component.css']
})
export class HotelFlipComponent implements OnInit {
  constructor(private router:Router,private msg:MessageService, private dataServe:DataService) { }
  hotel_id:any
  getLostFoundData:any
  getFilteredData:any
  displayedColumns: string[] = ['position','name', 'check_in', 'check_out', 'room_no','edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
    this.getFlip()
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  viewInfo(){
    this.dataServe.showInfo.next({data:'hotel_flip',flag:true,heading:'Flip Book'})
  }
  go_to_approval(v:any){
    this.router.navigate(['hotel/hotel_flip_approve',btoa(this.hotel_id),btoa(v)]).catch(e=>this.msg.globalError(e))

  }
  getFlip(){
    this.dataServe.global_service(0,'/flip_book',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.getLostFoundData=data
     
      this.putdata(this.getLostFoundData.msg)
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
}
