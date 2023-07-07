import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Calendar from 'tui-calendar';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';



@Component({
  selector: 'app-reserv_rest',
  templateUrl: './reserv_rest.component.html',
  styleUrls: ['./reserv_rest.component.css']
})
export class Reserv_restComponent implements OnInit, AfterViewInit {
  cal: any;
  getDate:any
  calData:any
  hotel_id:any=1
  flag:any='R'
  srv_res_id:any=1
  getVenues:any;
  r_id:any;




  @ViewChild("calendar", { static: false }) calendarContainer!: ElementRef;
  constructor(public dialog: MatDialog,private dataServe:DataService,private msg:MessageService) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   console.log('Call function');
      
    //   this.getCalData()
    // }, 2000)
    this.hotel_id=localStorage.getItem('hotel_id')
    this.getCat()
  }

  ngAfterViewInit() {
    // console.log(this.data.content)
    console.log('view here');
    
    this.cal = new Calendar(this.calendarContainer.nativeElement, {
      isReadOnly: true,
      // 'day', 'week', 'month'
      defaultView: "day",
      // shows the milestone and task in weekly, daily view
      taskView: false,
      // shows the all day and time grid in weekly, daily view
      scheduleView: true,
      // override default styles here
      useCreationPopup: false,
      useDetailPopup: false,
      month:{
        visibleScheduleCount:1
      },
      // taskView: true,
      // defaultView: "month",
      template: {
        monthDayname: function (dayname) {
          console.log(dayname);
          return (
            '<span class="calendar-week-dayname-name">' +
            dayname.label +
            "</span>"
          );
        },
      }
    });

    console.log(this.calData);
    
    console.log('call for');
    
    //  });
    // console.log(this.cal);

  }

  moveNext(v:any){
    switch(v){
      case 'P': this.cal.prev();break;
      case 'N': this.cal.next();break;
    }
    this.getDate=this.cal.getDate()
    console.log(this.getDate);
    
  }

  getCalData(srv_res_id:any){
    this.dataServe.global_service(0,'/reserv',`hotel_id=${this.hotel_id}&flag=${this.flag}&srv_res_id=${srv_res_id}`).subscribe(data=>{
      console.log(data);
      this.calData=data
      this.calData=this.calData.msg

      

// this.calData = [{
//   id: '1',
//   calendarId: '1',
//   title: 'my event',
//   category: 'time',
//   dueDateClass: '',
//   start: '2023-05-26T13:00:00',
//   end: '2023-05-26T14:00:00',
// },
// {
//   id: '2',
//   calendarId: '1',
//   title: 'second event',
//   category: 'time',
//   dueDateClass: '',
//   start: '2023-05-26T17:00:00',
//   end: '2023-05-26T18:00:00',
// },
// {
//   id: '3',
//   calendarId: '1',
//   title: 'third event',
//   category: 'time',
//   dueDateClass: '',
//   start: '2023-05-27T10:00:00',
//   end: '2023-05-27T11:00:00',
// },
// {
//   id: '4',
//   calendarId: '1',
//   title: 'fourth event',
//   category: 'time',
//   dueDateClass: '',
//   start: '2023-05-29T13:00:00',
//   end: '2023-05-29T14:00:00',
// }];

  // this.cal.createSchedules([
  //     // {
  //     //   id: "1",
  //     //   title: "Lorem Ispum",
  //     //   start: "Fri May 26 2023 11:00:00 GMT+0530 (India Standard Time)",
  //     //   end: "Fri May 26 2023 12:00:00 GMT+0530 (India Standard Time)",
  //     //   category: "allday",
  //     //   location: "SASA",
  //     // },
  //     // {
  //     //   id: "2",
  //     //   title: "Lorem Ispum",
  //     //   start: "Fri May 26 2023 12:00:00 GMT+0530 (India Standard Time)",
  //     //   end: "Fri May 26 2023 13:00:00 GMT+0530 (India Standard Time)",
  //     //   category: "allday",
  //     //   location: "Lorem Ipsum Lorem Ipsum",
  //     // },
  //     // {
  //     //   id: "3",
  //     //   title: "Lorem Ipsum",
  //     //   start: "Fri May 26 2023 13:00:00 GMT+0530 (India Standard Time)",
  //     //   end: "Fri May 26 2023 14:00:00 GMT+0530 (India Standard Time)",
  //     //   category: "allday",
  //     //   location: "Lorem Ipsum",
  //     // },
  //     // {
  //     //   id: "4",
  //     //   title: "Lorem Ipsum",
  //     //   start: "Fri May 26 2023 15:00:00 GMT+0530 (India Standard Time)",
  //     //   end: "Fri May 26 2023 16:00:00 GMT+0530 (India Standard Time)",
  //     //   category: "allday",
  //     //   location: "Lorem Ipsum",
  //     // },
  //     // {
  //     //   id: "5",
  //     //   title: "Lorem Ipsum",
  //     //   start: "Sat May 27 2023 17:00:00 GMT+0530 (India Standard Time)",
  //     //   end: "Sat May 27 2023 18:00:00 GMT+0530 (India Standard Time)",
  //     //   category: "allday",
  //     //   location: "Lorem Ipsum",
  //     // },
  //     // {
  //     //   id: "6",
  //     //   title: "Lorem Ipsum",
  //     //   start: "Sat Mar 27 2023 18:00:00 GMT+0530 (India Standard Time)",
  //     //   end: "Sat Mar 27 2023 19:00:00 GMT+0530 (India Standard Time)",
  //     //   category: "allday",
  //     //   location: "Lorem Ipsum",
  //     // },
  //     // {
  //     //   id: "6",
  //     //   title: "Lorem Ipsum",
  //     //   start: "Sat May 27 2023 20:00:00 GMT+0530 (India Standard Time)",
  //     //   end: "Sat May 27 2023 21:00:00 GMT+0530 (India Standard Time)",
  //     //   category: "allday",
  //     //   location: "Lorem Ipsum",
  //     // },
  //     // {
  //     //   id: "7",
  //     //   title: "Lorem Ipsum",
  //     //   start: "Sat May 27 2023 21:00:00 GMT+0530 (India Standard Time)",
  //     //   end: "Sat May 27 2023 22:00:00 GMT+0530 (India Standard Time)",
  //     //   category: "allday",
  //     //   location: "Lorem Ipsum",
  //     // },
  //     {
  //       id: '1',
  //       calendarId: '1',
  //       title: 'my event',
  //       category: 'time',
  //       dueDateClass: '',
  //       start: '2023-05-26T13:00:00',
  //       end: '2023-05-26T14:00:00',
  //     },
  //     {
  //       id: '2',
  //       calendarId: '1',
  //       title: 'second event',
  //       category: 'time',
  //       dueDateClass: '',
  //       start: '2023-05-26T17:00:00',
  //       end: '2023-05-26T18:00:00',
  //     },
  //     {
  //       id: '3',
  //       calendarId: '1',
  //       title: 'third event',
  //       category: 'time',
  //       dueDateClass: '',
  //       start: '2023-05-27T10:00:00',
  //       end: '2023-05-27T11:00:00',
  //     },
  //     {
  //       id: '4',
  //       calendarId: '1',
  //       title: 'fourth event',
  //       category: 'time',
  //       dueDateClass: '',
  //       start: '2023-05-29T13:00:00',
  //       end: '2023-05-29T14:00:00',
  //     },
  //   ]);

      for(let i=0;i<this.calData?.length;i++){
        this.cal.createSchedules([{
          id: this.calData[i].id,
          calendarId: i,
          title: `${this.calData[i].user_name} booked ${this.calData[i].no_of_pax} of seat(s) at ${this.calData[i].reserv_time_slot}`,
          category: 'time',
          dueDateClass:'',
          start: this.calData[i].reserv_date.split('T')[0]+'T'+this.calData[i].st_time,
          end: this.calData[i].reserv_date.split('T')[0]+'T'+this.calData[i].end_time,
        }])
        console.log(this.calData[i].reserv_date.split('T')[0]+'T'+this.calData[i].st_time, this.calData[i].reserv_date.split('T')[0]+'T'+this.calData[i].end_time);
      }

    this.cal.on('clickSchedule',(event:any)=>{
      console.log(event.schedule.id)
      console.log(this.calData.filter((e:any)=>e.id==event.schedule.id))
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        width: '350px',
        height:'350px',
  
        data: { flag: 'reserv_rest', content: this.calData.filter((e:any)=>e.id==event.schedule.id) }
      });
      dialogRef.afterClosed().subscribe(result => {
       console.log(result)
      //  this.selectedVIPs=result
  
      })
      // const dialogRef = this.dialog.open(DialogBoxComponent, {
      // });
      // const bsRef= this._bottomSheet.open(CalendarDetailsComponent,{
      //   data: {content:this.calData.content.msg.filter((e:any)=>e.id==event.schedule.id)}
      //  }
        
      //   );
   
    })

    console.log(this.calData);
    
      this.getDate=this.cal.getDate()
      
      this.getDate=this.getDate._date
      console.log(this.getDate);
    })
  }

  getCat(){
    
    this.dataServe.global_service(0,'/cust_menu_list',`hotel_id=${this.hotel_id}`).subscribe((data:any)=>{
      console.log(data);
      this.getVenues=data;
      this.getVenues=this.getVenues.msg.restaurant
      // this.mncdata=this.getVenues.msg[0].id; //to be changed
  
      // this.putdata(this.getVenues.msg);
    }
  ,error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)}
    
    )
  

}


}
