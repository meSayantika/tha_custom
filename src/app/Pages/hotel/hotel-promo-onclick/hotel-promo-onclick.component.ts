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
  selector: 'app-hotel-promo-onclick',
  templateUrl: './hotel-promo-onclick.component.html',
  styleUrls: ['./hotel-promo-onclick.component.css']
})
export class HotelPromoOnclickComponent implements OnInit {
  constructor(public dialog: MatDialog,private dataServe:DataService, private router:Router,private msg:MessageService) { }
  hotel_id:any
  msgData:any
  time_now:any
  sendData:any
  menuShow:any
  promo:any
  displayedColumns: string[] = ['position', 'title', 'edit', 'preview','send'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.hotel_id=localStorage.getItem('hotel_id')
    this.getMessage()
    this.getEditableData()
    this.getEditableData()
  }
  getEditableData(){
    this.dataServe.global_service(0,'/dir_live',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.menuShow=data
      this.menuShow=this.menuShow.msg

      this.promo=this.menuShow[0]?.promo?this.menuShow[0]?.promo:'N'
     
      console.log(this.promo)
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
    this.dataServe.global_service(0,'/message_center',`hotel_id=${this.hotel_id}&flag=R`).subscribe(data=>{
      console.log(data)
      this.msgData=data
      this.putdata(this.msgData.msg)

    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  putdata(v: any) { //assign pagination and sort header to datatable
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
   

  }
  go_home(){
    this.router.navigate(['hotel/home',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))
  
  }
  go_to_previous(){
    this.router.navigate(['hotel/hotel_promo',btoa(this.hotel_id)]).catch(e=>this.msg.globalError(e))

  }
  create_msg(v:any){
    console.log(v)
    this.router.navigate(['/hotel/hotel_create_comm',btoa(this.hotel_id),btoa(v),btoa('1')])

  }
  previewMsg(v:any){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '30%',
      data: { flag: 'msgPrev', content:{path:v.img_path,title:v.msg_title,subtitle:v.msg_subtitle,body:v.msg_body}  }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    })
  }
  send_msg(v:any,from_time:any,to_time:any){
    // console.log(this.time_now.getTime())
    // console.log()
    var date = new Date()
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds(); 
  console.log('Curr Date', `${hour}:${minute}:${second}`);
  this.time_now=`${hour}:${minute}:${second}`
  console.log(this.time_now)
    console.log(new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${from_time}`).getTime())
    // console.log(this.time_now.getTime())
    console.log(new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${to_time}`).getTime())
    // if(this.time_now.getTime()>=new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${from_time}`).getTime() && this.time_now.getTime()<=new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${to_time}`).getTime()){
      if(this.time_now>=from_time && this.time_now<=to_time){
    var dt={
      msg_id:v,
      user:"admin@gmail.com",
      hotel_id:this.hotel_id
    }
    this.dataServe.global_service(1,'/post_message',dt).subscribe(data=>{
      console.log(data);
      this.sendData=data;
      if(this.sendData.suc>0)
       this.msg.globalSuccess('Message sent successfully!')
      else
       this.msg.globalError('Error while sending message!')
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

  else

    this.msg.globalError('You can\'t send message to this particular user beyond the time interval')
  

  }
  viewInfo(){
    this.dataServe.showInfo.next({data:'hotel_promo_dash',flag:true,heading:'FAQ'})
  }
}
