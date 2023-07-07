import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-flipboook_dash',
  templateUrl: './flipboook_dash.component.html',
  styleUrls: ['./flipboook_dash.component.css']
})
export class Flipboook_dashComponent implements OnInit {
  constructor(private activatedRoute:ActivatedRoute, private router:Router,private msg:MessageService, private dataServe:DataService) { }
  hotel_id:any
  getLostFoundData:any
  getFilteredData:any
  displayedColumns: string[] = ['position','name', 'check_in', 'check_out', 'room_no','edit','status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    console.log(this.hotel_id)
    this.getFlip()
  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  viewInfo(){
    this.dataServe.showInfo.next({data:'hotel_flip',flag:true,heading:'Flip Book'})
  }
  go_to_approval(v:any){
    this.router.navigate(['main/admin/flip_book_create',btoa(this.hotel_id),btoa(v)]).catch(e=>this.msg.globalError(e))

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
