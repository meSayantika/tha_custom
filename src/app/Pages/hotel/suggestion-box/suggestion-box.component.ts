import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { MessageService } from 'src/app/Services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.css']
})
export class SuggestionBoxComponent implements OnInit {

  constructor(public dialog: MatDialog,private dataServe:DataService, private router:Router,private msg:MessageService) { }
  hotel_id:any
  msgData:any
  time_now:any
  sendData:any
  getDelData:any
  menuShow:any
  sug_box:any
  displayedColumns: string[] = ['position','date', 'name', 'suggestion', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
    this.getMessage()
    this.getEditableData()
  }
  getEditableData(){
    this.dataServe.global_service(0,'/dir_live',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.menuShow=data
      this.menuShow=this.menuShow.msg

      this.sug_box=this.menuShow[0].sug_box
     
      console.log(this.sug_box)
      // console.log(this.menuShow[0].ent_cal)
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getMessage(){
    this.dataServe.global_service(0,'/sugg_box',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.msgData=data
      this.putdata(this.msgData.msg)

    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  putdata(v: any) { //assign pagination and sort header to datatable
    console.log(v)
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
   

  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  delSugg(v:any){
    var f='delete'
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: { flag: f, content: v }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, f)
      if(result==1){
      this.dataServe.global_service(1,'/sugg_box_del',{id:v}).subscribe(data=>{
        console.log(data)
        this.getDelData=data
        if(this.getDelData.suc>0)
        {
          this.msg.successMsg('SD')
          this.getMessage()
        }
       
        else{
          this.msg.errorMsg('ED')
        }
      })
    }
      
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
   

  }
  viewInfo(){
    this.dataServe.showInfo.next({data:'suggestion',flag:true,heading:'FAQ'})
  }
}
