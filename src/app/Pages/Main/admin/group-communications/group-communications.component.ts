import { Component, OnInit  , ViewChild } from '@angular/core';
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
  selector: 'app-group-communications',
  templateUrl: './group-communications.component.html',
  styleUrls: ['./group-communications.component.css']
})
export class GroupCommunicationsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'title', 'edit', 'preview','cron_job','send'];
  dataSource = new MatTableDataSource();
  msgData:any
  hotel_id:any
  sendData:any
  time_now:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public datepipe: DatePipe,public dialog: MatDialog,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder, private activatedRoute:ActivatedRoute){}
 ngOnInit(){
  this.hotel_id=this.activatedRoute.snapshot.params['id'];
  console.log(this.hotel_id)
  this.hotel_id=atob(this.hotel_id);
  console.log(this.hotel_id)
  this.getMessage()
  this.time_now=new Date()
  console.log(this.time_now.getTime())
  // this.time_now =this.datepipe.transform((new Date), 'H:mm:ss');
  // console.log(this.time_now)
 }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  go_to_message(v:any){
    if(localStorage.getItem('privilege')!='D')
    this.router.navigate(['/hotel/hotel_create_comm',btoa(this.hotel_id),btoa(v),btoa('0')])
    else
    this.router.navigate(['/main/admin/create_group_notif',btoa(this.hotel_id),btoa(v)])

  }
  getMessage(){
    this.dataServe.global_service(0,'/message_center',`hotel_id=${this.hotel_id}&flag=G`).subscribe(data=>{
      console.log(data)
      this.msgData=data
      this.putdata(this.msgData.msg)

    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  putdata(v: any) { //assign pagination and sort header to datatable
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
   

  }
  previewMsg(v:any){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
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

}
