import { Component, Inject, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet'
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.css']
})
export class CalendarDetailsComponent implements OnInit {
  vid_url:any
  constructor(private san:DomSanitizer, private _bottomSheetRef: MatBottomSheetRef<CalendarDetailsComponent>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
  url=environment.api_url+'/'
  ngOnInit() {
    console.log(this.data.content)
    this.vid_url=this.san.bypassSecurityTrustResourceUrl(this.data.content[0].video_url)
  }
  go_to(v:any){
    window.open(v,'_blank')
  }
  onClose(){
    this._bottomSheetRef.dismiss()
   }
}
