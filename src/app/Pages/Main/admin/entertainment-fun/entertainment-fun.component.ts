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
  selector: 'app-entertainment-fun',
  templateUrl: './entertainment-fun.component.html',
  styleUrls: ['./entertainment-fun.component.css'],
  providers:[DatePipe]
})
export class EntertainmentFunComponent implements OnInit {
  displayedColumns: string[] = ['position', 'date', 'title', 'edit'];
  dataSource = new MatTableDataSource();
  msgData:any
  hotel_id=0
  sendData:any
  time_now:any
  routeFlag:any
  category=''
  getVenues:any
  rest_serve:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public datepipe: DatePipe,public dialog: MatDialog,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder, private activatedRoute:ActivatedRoute){}
 ngOnInit(){
  // this.hotel_id=this.activatedRoute.snapshot.params['hotel_id'];
  console.log(this.hotel_id)
  
  // this.hotel_id=atob(this.hotel_id);
  console.log(this.hotel_id)
  // this.getMessage()
  this.time_now=new Date()
  console.log(this.time_now.getTime())
  // this.time_now =this.datepipe.transform((new Date), 'H:mm:ss');
  // console.log(this.time_now)
  this.getMessage()
 }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  go_to_message(v:any){
   
    this.router.navigate(['main/admin/entertainment_create_calendar',btoa('0'),btoa(v)])
    

  }

  getCat(){
    
    this.dataServe.global_service(0,'/cust_menu_list',`hotel_id=${this.hotel_id}`).subscribe((data:any)=>{
      console.log(data,this.category);
      this.getVenues=data;
      if(this.category=='R'){
        this.getVenues=this.getVenues.msg.restaurant
      }
      else{
        this.getVenues=this.getVenues.msg.service

      }
      // this.mncdata=this.getVenues.msg[0].id; //to be changed
  
      // this.putdata(this.getVenues.msg);
    }
  ,error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)}
    
    )
  

}
  getMessage(){
    this.dataServe.global_service(0,'/fun_directory_calendar',`hotel_id=0`).subscribe(data=>{
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
  go_home(){
    history.back()
  }

  openSearch(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: { flag: 'searchDt', content:null  }
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log(result)
     this.dataServe.global_service(0,'/fun_directory_calendar',`hotel_id=0&frm=${result.from}&to=${result.to}`).subscribe(data=>{
      console.log(data)
      this.msgData=data
      this.putdata(this.msgData.msg)
    } ,error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
    })
  }

  viewInfo(){
    // console.log('hello')
    this.dataServe.showInfo.next({data:'fundirectory',flag:true,heading:'Fun Directory-Add Menus',type:'E'})
  }
}
