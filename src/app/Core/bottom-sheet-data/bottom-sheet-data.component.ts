import { Component, Inject, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bottom-sheet-data',
  templateUrl: './bottom-sheet-data.component.html',
  styleUrls: ['./bottom-sheet-data.component.css']
})
export class BottomSheetDataComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetDataComponent>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
  urlSet=environment.api_url+'/'
  isNotImg:any
  ngOnInit() {
    console.log(this.data)
    if(this.data.content.img_path?.includes('jpg') || this.data.content.img_path?.includes('png') || this.data.content.img_path?.includes('jpeg'))
    this.isNotImg=false
    else
    this.isNotImg=true

   
  }
  onClose(v:any){
    this._bottomSheetRef.dismiss(v)
   }

}
