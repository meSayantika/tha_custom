import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild,Inject, Renderer2 } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/Services/message.service';
import Calendar from "tui-calendar";
import { BottomSheetDataComponent } from '../bottom-sheet-data/bottom-sheet-data.component';
import { CalendarDetailsComponent } from '../calendar-details/calendar-details.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private style?: HTMLLinkElement;
  btnName = { id: "M", name: "Month" };
  displaymode = [
    { id: "M", name: "Month" },
    { id: "D", name: "Day" },
    { id: "W", name: "Week" },
  ];
  cal: any;
  todayDt:string='';
  getDate:any
  @ViewChild("calendar", { static: false }) calendarContainer!: ElementRef;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
    public dialogRef: MatDialogRef<CalendarComponent>,
    private msg: MessageService,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetDataComponent>,private _bottomSheet: MatBottomSheet,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    // this.loadCss();

  }

  ngOnInit() {
  }
  ngAfterViewInit() {

    // this.emailAddr = this.emailQ;
    // this.emailAddr.nativeElement.value = this.data.content;
    //
console.log(this.data.content)
    this.cal = new Calendar(this.calendarContainer.nativeElement, {
      isReadOnly: true,
      // 'day', 'week', 'month'
      defaultView: "month",
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

  this.getDate=this.cal.getDate()
  this.getDate=this.getDate._date
// console.log(this.getDate._date)
    // this.cal.createSchedules([
    //   {
    //     id: "1",
    //     title: "Lorem Ispum",
    //     start: "Thu Apr 04 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     end: "Thu Apr 04 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     category: "allday",
    //     location: "SASA",
    //   },
    //   {
    //     id: "2",
    //     title: "Lorem Ispum",
    //     start: "Thu Apr 03 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     end: "Thu Apr 03 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     category: "allday",
    //     location: "Lorem Ipsum Lorem Ipsum",
    //   },
    //   {
    //     id: "3",
    //     title: "Lorem Ipsum",
    //     start: "Thu Apr 03 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     end: "Thu Apr 03 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     category: "allday",
    //     location: "Lorem Ipsum",
    //   },
    //   {
    //     id: "4",
    //     title: "Lorem Ipsum",
    //     start: "Thu Apr 05 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     end: "Thu Apr 05 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     category: "allday",
    //     location: "Lorem Ipsum",
    //   },
    //   {
    //     id: "5",
    //     title: "Lorem Ipsum",
    //     start: "Thu Apr 08 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     end: "Thu Apr 08 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     category: "allday",
    //     location: "Lorem Ipsum",
    //   },
    //   {
    //     id: "6",
    //     title: "Lorem Ipsum",
    //     start: "Thu Mar 08 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     end: "Thu Mar 08 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     category: "allday",
    //     location: "Lorem Ipsum",
    //   },
    //   {
    //     id: "6",
    //     title: "Lorem Ipsum",
    //     start: "Thu Apr 12 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     end: "Thu Apr 12 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     category: "allday",
    //     location: "Lorem Ipsum",
    //   },
    //   {
    //     id: "7",
    //     title: "Lorem Ipsum",
    //     start: "Thu Mar 27 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     end: "Thu Apr 27 2023 19:30:00 GMT+0530 (India Standard Time)",
    //     category: "allday",
    //     location: "Lorem Ipsum",
    //   },
    // ]);
    for(let i=0;i<this.data.content.msg.length;i++){
      this.cal.createSchedules([{
        id: this.data.content.msg[i].id,
        title:this.data.content.msg[i].event_title,
        start:new Date(this.data.content.msg[i].event_date),
        end:new Date(this.data.content.msg[i].event_date),
        // id:"4",
        // title: "Lorem Ipsum",
        // start: "Thu Mar 27 2023 19:30:00 GMT+0530 (India Standard Time)",
        // end: "Thu Apr 27 2023 19:30:00 GMT+0530 (India Standard Time)",
        category: "allday",
        genre:this.data.content.msg[i].event_sub_title,
        location: "Lorem Ipsudfgsgagasgdgsdm",
      }])
    }
    this.cal.on('clickSchedule',(event:any)=>{
      console.log(event.schedule.id)
      console.log(this.data.content.msg.filter((e:any)=>e.id==event.schedule.id))
      const bsRef= this._bottomSheet.open(CalendarDetailsComponent,{
        data: {content:this.data.content.msg.filter((e:any)=>e.id==event.schedule.id)}
       }
        
        );
   
    })
    // this.cal.createSchedules(this.data.content.msg);
    console.log(this.cal.getDate()._date.toISOString().substring(0, 8));
    this.todayDt = this.cal.getDate()._date.toISOString().substring(0, 7);
    console.log(this.cal);

    // this.cal.on("beforeCreateSchedule", (scheduleData: any) => {
    //   var schedule = {
    //     id: "1",
    //     title: scheduleData.title,
    //     start: scheduleData.start,
    //     end: scheduleData.end,
    //     category: "allday",
    //     location: scheduleData.location,
    //   };
    //   this.cal.createSchedules([schedule]);
    //   console.log(scheduleData.end);
    // });

    // this.cal.on("beforeUpdateSchedule", (e: any) => {
    //   var schedule = e.schedule;
    //   var changes = e.changes;

    //   console.log("beforeUpdateSchedule", e);

    //   this.cal.updateSchedule(schedule.id, schedule.calendarId, changes);
    // });

    // this.cal.on("beforeDeleteSchedule", (e: any) => {
    //   this.cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
    // });

    console.log(this.cal.today);

    //
  }
moveNext(v:any){
  switch(v){
    case 'P': this.cal.prev();break;
    case 'N': this.cal.next();break;
  }
  this.getDate=this.cal.getDate()
}
 
}
