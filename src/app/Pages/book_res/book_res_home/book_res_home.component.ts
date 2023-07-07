import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet'
import { CalendarComponent } from 'src/app/Core/calendar/calendar.component';
import { ActivatedRoute } from '@angular/router';
import { BottomSheetDataComponent } from 'src/app/Core/bottom-sheet-data/bottom-sheet-data.component';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-book_res_home',
  templateUrl: './book_res_home.component.html',
  styleUrls: ['./book_res_home.component.css']
})
export class Book_res_homeComponent implements OnInit {
  submitted=false
  timeDiv:any
  showHome=0
  resId:any
  resName:any
  hotel_id:any
  flag:any
  getReserve:any
  allHeads:any = []
  getSetupData:any
  currDate = new Date();
  nextDate:any = new Date();
  schedule_date:any
  allTimes:any=[];
  prevTime:any=0;
  start_time:any;
  end_time:any;
  interval:any=1;
  inter:any
  selected_st_time:any
  selected_end_time:any
  select_date:any
  selected_people:any
  check_flag=true
  select_catg:any
  avail_seat:any
  timeLeft: number = 60;
  calData:any
  people:any
  select_people:any
  select_occasion:any
  constructor(public dialog: MatDialog,private msg:MessageService,private _bottomSheetRef: MatBottomSheetRef<BottomSheetDataComponent>,private _bottomSheet: MatBottomSheet,private activatedRoute:ActivatedRoute,private dataServe:DataService) { }

  ngOnInit() {
    this.hotel_id=this.activatedRoute.snapshot.params['hotel_id']
    this.flag=this.activatedRoute.snapshot.params['flag']
    this.resId=this.activatedRoute.snapshot.params['id'];
    this.resName=this.activatedRoute.snapshot.params['name'];
    console.log(this.resName);
    // this.get_reserve_category();
    this.get_head_category();
 
    
    console.log(this.timeLeft);
    
    
  }
showTimeSlots(){
  this.submitted=!this.submitted
  // this.timeDiv=document.getElementById('timeSlots')
  // this.timeDiv.classList.remove('animate__fadeInDown')
  // this.timeDiv.classList.add('animate__fadeInDown')
}
openBottomSheet(start:any, end:any, date:any,pep:any): void {
  this.dataServe.global_service(0,'/reserv_avail_seat',`hotel_id=${this.hotel_id}&flag=${this.flag}&srv_res_id=${this.resId}&start=${start}`).subscribe(data=>{
    console.log(data);
    this.avail_seat=data;
  
  const bsRef= this._bottomSheet.open(BottomSheetDataComponent,{
   data: {flag:'timeSlotConfirm', content:this.avail_seat.msg}
  }
   );
   
   this.selected_st_time=start;
   this.selected_end_time=end;
   this.select_date = date
   console.log(this.select_date);
  //  this.select_catg=catg;
   this.select_people=pep;
   bsRef.afterDismissed().subscribe(data=>{
    console.log(data);
    this.showHome=data
    if(this.showHome==1){
      this.inter = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
      console.log(this.timeLeft);
  
        } else {
          this.timeLeft = 60;
          alert('Your timer has been excided')
          clearInterval(this.inter)
          this.showHome=0
        }
      },1000)
    }
   }
    )
  });
 }
 openBottomConfirm(occ:any,sp_req:any): void {
  const bsRef= this._bottomSheet.open(BottomSheetDataComponent,{
   data: {flag:'timeSlotSave', content:occ}
  });
   bsRef.afterDismissed().subscribe(data=>{
    console.log(data)
    this.showHome=data
    if(this.showHome>1){
      clearInterval(this.inter)
      var dt={
        hotel_id:this.hotel_id,
        flag:this.flag,
        srv_res_id:this.resId,
        reserv_date:this.select_date,
        start:this.selected_st_time,
        end:this.selected_end_time,
        seat:this.select_people,
        user_id:1,
        user_name:'Steven Smith',
        user_email:'smithsteven96@gmail.com',
        phone:'8583949565',
        occation:occ,
        sp_req:sp_req
}
      this.dataServe.global_service(1,'/reserv',dt).subscribe(data=>{
console.log(data);

      });
      
    }
    

   }
    )
 }
//  get_reserve_category(){
//   this.dataServe.global_service(0,'/reserv_category',`hotel_id=${this.hotel_id}&flag=${this.flag}&srv_res_id=${this.resId}`).subscribe(data=>{
//     console.log(data);
//     this.getReserve=data;
//     this.getReserve = this.getReserve.msg
//   });
//  }
 get_head_category(){
  // console.log(catg);

  this.dataServe.global_service(0,'/reserv_setup',`hotel_id=${this.hotel_id}&flag=${this.flag}&srv_res_id=${this.resId}`).subscribe(data=>{
    console.log(data);
    
    this.getSetupData=data;
    console.log(this.getSetupData);
    
    // this.getSetupData=this.getSetupData;
    if(this.getSetupData.suc > 0){
      for(let i=2; i <= this.getSetupData.msg[0].no_of_pax; i++){
        this.allHeads.push({id:i, value: i})
      }
      // this.selected_people=no_of_pax;
      console.log(this.allHeads);
      this.schedule_date = this.nextDate.setDate(parseInt(this.nextDate.getDate().toString()) + parseInt(this.getSetupData.msg[0].max_date_limit))
      console.log(this.nextDate);
      this.start_time=this.getSetupData.msg[0].res_open_time;
      console.log(this.start_time);
      this.end_time=this.getSetupData.msg[0].res_close_time;
      console.log(this.end_time);
      //  this.interval=this.getSetupData.msg[0].time_duration;
      //  console.log(this.interval);
       this.people=this.getSetupData.msg[0].no_of_pax;
       console.log(this.people);
      
      
       
      while(this.check_flag){
         if(parseInt(this.prevTime) >= parseInt(this.end_time)-1){
          this.check_flag=false
         }
         else{
          this.prevTime= parseInt(this.start_time)
          console.log(this.prevTime);
          this.start_time=parseInt(this.start_time) + parseInt(this.interval)
          console.log(this.start_time);
          if(this.currDate.getHours() < this.prevTime){
            this.allTimes.push({start:this.prevTime, end:this.start_time} )
           }
           console.log(this.allTimes)
         }
      }
      
    }
  })
}

display_menu(v:any){
  console.log(v)
  window.open(environment.routeUrl+'user/user_menu'+'/'+encodeURIComponent(btoa('1'))+'/'+encodeURIComponent(btoa(v)),'popup','width=400,height=500')
}

Calendar(flag:any,id:any){
  this.dataServe.global_service(0,'/calendar',`hotel_id=${this.hotel_id}`).subscribe(data=>{
    console.log(data)
    this.calData=data
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.panelClass = "fullscreen-dialog"
    dialogConfig.data = {flag: 'calendar', content:this.calData}
    const dialogref = this.dialog.open(
      CalendarComponent,
      dialogConfig,
     );
    dialogref.afterClosed().subscribe(result => {
   
    })
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
}
