import { Component, OnInit,Inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/Services/message.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms'
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet'
import { BottomSheetDataComponent } from 'src/app/Core/bottom-sheet-data/bottom-sheet-data.component';
import Calendar from 'tui-calendar'

@Component({
  selector: 'app-dialogBox',
  templateUrl: './dialogBox.component.html',
  styleUrls: ['./dialogBox.component.css']
})
export class DialogBoxComponent implements OnInit {
  cal: any;
@ViewChild('calendar') calendarContainer!: ElementRef;
  @ViewChild('emailQ')emailQ!:ElementRef;
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  regForm!: FormGroup;
  profileForm!: FormGroup;
  passForm!: FormGroup;
  searchForm!: FormGroup;
  addVipForm!:FormGroup
  addItemForm!:FormGroup
  suggForm!:FormGroup
  countryData: any;
  countries:any
  timezone:any
  regData:any
  email_data:any
  exist:any
  exist_number=false
  emailAddr:any
  getData:any
  urlSet=environment.api_url+'/'
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  sectionData:any
  sectionData1:any
  audFilePlay:any;
  audPath=new Audio();
  filteredFruits: Observable<string[]> | undefined;
  vipData:any
  divCal:any
  selectedLeader:any
  memberList:any;
  group_emp_id:any
  lostFoundData:any
  lostFoundFilterData:any
  VIP: string[] = ['Cindy'];
  isImg:any
  // allVIP: string[] = ['Cindy', 'Brian', 'Shubham', 'Tanmoy', 'Somnath', 'Sayantika Babuni'];
  allVIP:any
  allGuest:any
  showError=false
  m:any
  getVIPList:any
  messages:any
  showOld=false
  showNew=false
  showConf=false
  quant=24
  selectedMember=''
  count=0
  totLength=0
  suggData:any
  lostFoundForm!:FormGroup
  category='L'
  category1='L'
  todayDt:any
  cal_dt:any
  updateRoomData:any
  // 
  // 
  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings = {};

dropdownList = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangaluru' },
    { item_id: 3, item_text: 'Pune' },
    { item_id: 4, item_text: 'Navsari' },
    { item_id: 5, item_text: 'New Delhi' }
  ];
  // selectedItems = [
  //   { item_id: 3, item_text: 'Pune' },
  //   { item_id: 4, item_text: 'Navsari' }
  // ];
  selectedItems=[]
  dropdownSettings:IDropdownSettings = {
    // singleSelection: false,
    // idField: 'item_id',
    // textField: 'item_text',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    // allowSearchFilter: true
    //singleSelection: false,
    idField: 'id',
    textField: 'user_name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  // 

  myEvents = [
    { 
      id: "required-id-1",
      name: "New Year", 
      date: "Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)", 
      type: "holiday", 
      everyYear: true 
    },
    { 
      id: "required-id-2",
      name: "Valentine's Day", 
      date: "Fri Feb 14 2020 00:00:00 GMT-0800 (Pacific Standard Time)", 
      type: "holiday", 
      everyYear: true,
      color: "#222"
    },
    { 
      id: "required-id-3",
      name: "Custom Date", 
      badge: "08/03 - 08/05",
      date: ["August/03/2020", "August/05/2020"],
      description: "Description here",
      type: "event", 
    },
    // more events here
  ]
  getUserData: any;
  // 
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, private msg:MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,private dataServe:DataService,private _bottomSheetRef: MatBottomSheetRef<BottomSheetDataComponent>,private _bottomSheet: MatBottomSheet) { 
      // @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,private dataServe:DataService) { 
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allVIP.slice())),
      );
    }

  ngOnInit() {
  this.urlSet=environment.api_url+'/'
  
    
    console.log(this.data)
    if(this.data.flag=='imgPrev'){
      if(this.data.content.includes('jpg') || this.data.content.includes('jpeg') || this.data.content.includes('png')) 
        this.isImg=true
      else
        this.isImg=false
    }
    // this.m=this.data.content
   else if(this.data.flag=='msgCenter'){
        this.messages=Object.keys(this.data.content)
        console.log(this.messages)
    }
  else  if(this.data.flag=='menuPrev'){
   
   this.sectionData = Object.keys( this.data.content?.arr[this.data.content?.key])
  }
  //  this.sectionData = this.data.content.arr[this.data.content.key]
 else if(this.data.flag=='dynamicMenuPrev'){
 this.sectionData1 = Object.keys( this.data.content?.arr)
//  this.sectionData1 = this.data.content?.arr
 
  console.log(this.sectionData1)
 }
   //  console.log(section)
    // console.log(this.data.content.arr, this.data.);
    // }
    // console.log(Object.keys(this.data.content?.arr[this.data.content?.key]))
    // for(let sec of this.sectionData){
    //     for(let m of  this.data.content?.arr[this.data.content?.key][sec].res){
    //         console.log(m);
    //     }
    // console.log(sec)
    // }
    // }
 else if(this.data.flag=='lostDash'){
    this.filterData()}
  else if(this.data.flag=='progress'){
    for(let i=0;i<this.data.content.length;i++){
      if(this.data.content[i].title=='Menu Setup'){
        for(let j=0;j<this.data.content[i].menu_list.length;j++){
          if(this.data.content[i].menu_list[j].count_dt>0){
            this.count++
          }
          this.totLength=this.data.content[i].menu_list.length
        }
      }
     }
        this.quant=this.count/this.totLength
        this.quant=this.quant*100
        // this.quant=74
  
    
   }
   this.lostFoundForm=this.formBuilder.group({
     dateReported:['',[Validators.required]],
     item_name:['',[Validators.required]],
     description:['',[Validators.required]],
     remarks:['',[Validators.required]]
   })
  
    if(this.data.flag=='msgPrev')
    this.urlSet=environment.api_url+'/'+this.data.content?.path
    this.regForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      mail: ['', [Validators.required,Validators.email]],
      addr1: ['', [Validators.required]],
      addr2: ['', [Validators.required]],
      cityState: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]],
      website: ['', [Validators.required]],
      timeZone: ['', [Validators.required]],

    });
    this.suggForm=this.formBuilder.group({
      sugg_text:['',[Validators.required]]
    })
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      mail: ['', [Validators.required,Validators.email]],
      dept:['']
      
    });
    this.profileForm.controls.phone.disable()
    this.passForm = this.formBuilder.group({
      oldPass: ['', [Validators.required]],
      newPass: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]],
      
    });
    if(this.data.flag=='profile'){
      // localStorage.setItem('email',this.profileForm?.controls.mail.value)
      // localStorage.setItem('name',this.profileForm?.controls.name.value)
      // localStorage.setItem('phone',this.profileForm?.controls.phone.value)
      // localStorage.setItem('password',btoa(this.passForm?.controls.newPass.value))
      this.profileForm?.patchValue({
        name:localStorage.getItem('name'),
        mail:localStorage.getItem('email'),
        phone:localStorage.getItem('phone'),
        dept:this.data.content
      })
      // this.passForm?.controls.oldPass.setValue(localStorage.getItem('password'))
     
       
     
     }
    this.addVipForm=this.formBuilder.group({
     
      vipStruct:this.formBuilder.array([]),
    })
    this.addVip()
    this.addItemForm=this.formBuilder.group({
     
      itemStruct:this.formBuilder.array([]),
    })
    this.addItem()
    
    this.searchForm=this.formBuilder.group({
      from:['',Validators.required],
      to:['',Validators.required]
    })
    this.dataServe.global_service(0,'/country','').pipe(map((x: any) => x.msg)).subscribe(data=>{
      this.countryData=data;
      console.log(this.countryData);

    })
    this.dataServe.local_service(environment.timezoneUrl).subscribe(data=>{
      console.log(data);
      this.timezone=data;
    })
   if(this.data.flag=='singleVIP'){
    console.log(this.data.content)
    this.dataServe.global_service(0,'/guest_user',`hotel_id=${this.data.content.hotel_id}&flag=${this.data.content.flag}`).subscribe(data=>{
      console.log(data);
      this.allVIP=data
      this.selectedItems=this.data.content.audience
      console.log(this.selectedItems)
    })
   }
   if(this.data.flag=='singleGuest'){
    this.getGuestGroupUserList()
   }
  // if(this.data.flag=='addVIP'){
  //   this.selectedItems=this.data.content.audience
  //   console.log(this.selectedItems)
  // }
  //  
  
  // 
  // this.getGuestGroupUserList()
  if(this.data.flag=='reserv_rest'){
    
  }

}
  
  // getMember(){
  //   this.dataServe.global_service(0,'/guest_user_dt',`hotel_id=${this.hotel_id}&group_id=${localStorage.getItem('group_emp_id')}`).subscribe(data=>{console.log(data)
  //     this.getMemData=data
  //     console.log(this.getMemData.msg)
 
  //     },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  // }
  get vip() {
    return this.addVipForm?.controls.vipStruct as FormArray;
  }
  get item() {
    return this.addItemForm?.controls.itemStruct as FormArray;
  }
  addVip(){
    const vipForm = this.formBuilder.group({
      name:['',Validators.required],
      phone:['',Validators.required],
      check_in:['',Validators.required],
      check_out:['',Validators.required],
  });
  this.vip.push(vipForm);
  // console.log(this.rest_dtls)
  }
  addItem(){
    const itemForm = this.formBuilder.group({
      date:['',Validators.required],
      itemLost:['',Validators.required],
     
  });
  this.item.push(itemForm);
  // console.log(this.rest_dtls)
  }
  removeVip(i:any){
  
    this.vip.removeAt(i)
   
  }
    removeItem(i:any){
  
      this.item.removeAt(i)
     
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.VIP.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.VIP.indexOf(fruit);

    if (index >= 0) {
      this.VIP.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.VIP.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allVIP.filter((fruit:any) => fruit.toLowerCase().includes(filterValue.toLowerCase()))
  }
  ngAfterViewInit(){
    this.emailAddr=this.emailQ
    this.emailAddr.nativeElement.value=this.data.content
// 
this.cal = new Calendar(this.calendarContainer.nativeElement,
  {
    useCreationPopup: true,
    useDetailPopup: true,
    taskView: true,
    defaultView: 'month',
    template: {
    monthDayname: function(dayname) {
    return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
  }
  },
  calendars: [
  {
  id: '1',
  name: 'My Calendar',
  color: '#ffffff',
  bgColor: '#9e5fff',
  dragBgColor: '#9e5fff',
  borderColor: '#9e5fff'
  },
  {
  id: '2',
  name: 'Company',
  color: '#ffffff',
  bgColor: '#00a9ff',
  dragBgColor: '#00a9ff',
  borderColor: '#00a9ff'
  }]
});
this.cal.createSchedules(
  [
    {
      id: '1',
      title: "Lorem Ispum",
      start: "Wed Mar 01 2023 19:30:00 GMT+0530 (India Standard Time)",
      end: "Wed Mar 01 2023 19:30:00 GMT+0530 (India Standard Time)",
      category: 'allday',
      location: "SASA"
  }
  ]
)
console.log(this.cal.getDate()._date.toISOString().substring(0,8));
this.todayDt=this.cal.getDate()._date.toISOString().substring(0,7)
console.log(this.cal);

this.cal.on('beforeCreateSchedule', (scheduleData:any) => {
 var schedule = {
  id: '1',
  title: scheduleData.title,
  start: scheduleData.start,
  end: scheduleData.end,
  category: 'allday',
  // category: scheduleData.isAllDay ? 'allday' : 'time',
  // dueDateClass: '',
  // color: calendar.color,
  // bgColor: calendar.bgColor,
  // dragBgColor: calendar.bgColor,
  // borderColor: calendar.borderColor,
  location: scheduleData.location,
  // raw: {
  //     class: scheduleData.raw['class']
  // },
  // state: scheduleData.state
};
 this.cal.createSchedules([schedule]);
 console.log(scheduleData.end)
});

this.cal.on('beforeUpdateSchedule', (e:any) =>{
  var schedule = e.schedule;
  var changes = e.changes;

  console.log('beforeUpdateSchedule', e);

  this.cal.updateSchedule(schedule.id, schedule.calendarId, changes);
})

this.cal.on('beforeDeleteSchedule', (e:any) => {
  this.cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
},)

console.log(this.cal.today);

// 
 
 
  }
  get f(){
    // if(this.data.flag=='registration')
    return this.regForm?.controls}

  onClose(v:any): void {
    this.dialogRef.close(v);
  }
  submitRoom(v:any){
    // this.onClose({room:v})
    var dt={
      room_no:v,
      id:this.data.content
    }
    this.dataServe.global_service(1,'/update_app_room',dt).subscribe(data=>{
      this.updateRoomData=data
      if(this.updateRoomData.suc>0)
      this.onClose(1)

    })
  }
  saveRoomCheck(room:any,checkIn:any,checkOut:any){
    var dt={
      room_no:room,
      id:0,
      user_id:this.data.content,
      hotel_id:1,
      check_in:checkIn,
      check_out:checkOut
    }
    this.dataServe.global_service(1,'/update_app_room',dt).subscribe(data=>{
      this.updateRoomData=data
      if(this.updateRoomData.suc>0)
      this.onClose(1)
  })
}
  check_mail(e:any){
    console.log(e.target.value);
    if(e.target.id=='em'){

    
    this.dataServe.global_service(0,'/email_check',`Email=${e.target.value}`).subscribe(data=>{
      console.log(data)
    this.email_data=data;
    if(this.email_data.suc==2)
     {
      this.msg.globalWarning('This email already exists')
    }
    else if(this.email_data.suc==1)
     {

      //  this.show_msg=false;
      }
    else
    {}
 
    })
  }
  // check if the telephone number is an existing one
  else if(e.target.id=='tel'){
    this.dataServe.global_service(0,'/mobile_check',`no=${e.target.value}`).subscribe(data=>{

      console.log(data);
      this.exist=data;
      if(this.exist.suc==2){
        this.exist_number=true;
          this.msg.globalWarning('This number already exists');
       
      }
      else{
        this.exist_number=false;
      }
    })
  }
  }
  regSubmit(){
   var dt={
    "Name":this.f.name.value,
    "Contact":this.f.contact.value,
    "Telephone":this.f.phone.value,
    "Email":this.f.mail.value,
    "Address1":this.f.addr1.value,
    "Address2":this.f.addr2.value,
    "cityState":this.f.cityState.value,
    "zip":this.f.zip.value,
    "country":this.f.country.value,
    "Website":this.f.website.value,
    "time_zone":this.f.timeZone.value
    
   }
   this.dataServe.global_service(1,'/registration',dt).subscribe(data=>{
     this.regData=data;
     if(this.regData.suc>0)
     {this.onClose(1); this.msg.successMsg('SS')}
      else
      { this.onClose(0); this.msg.errorMsg('ES')}
   },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
  sendmail(){
    console.log(this.emailAddr.nativeElement.value)
    var dt={
      "email":this.emailAddr.nativeElement.value,
      "hotel_id":localStorage.getItem('rid'),
      "user":"admin@gmail.com"
    }
    this.dataServe.global_service(1,'/send_quest',dt).subscribe(data=>{
      this.getData=data
      if(this.getData.suc>0)
       this.msg.globalSuccess('Email sent successfully!')
      else
       this.msg.globalError('Problem sending the email!')
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
    this.onClose(1)
  }
  search_dates(){
    if(this.searchForm?.controls.from.value<this.searchForm?.controls.to.value)
    {this.onClose({from:this.searchForm?.controls.from.value,to:this.searchForm?.controls.to.value}); this.showError=false}
    else
    this.showError=true
  }
  playAudio(){
    this.audFilePlay= this.audFilePlay=environment.api_url+'/'+this.data.content.data.sound_path
    this.audPath.src = this.audFilePlay
    this.audPath.load();
    this.audPath.play();
  }
  stopAudio(){
   
    this.audPath.pause();
  }
updateVip(){
  console.log(this.addVipForm)
  console.log(this.data.content.hotel_id,this.data.content.user)
  var dt={
    user:this.data.content.user,
    hotel_id:this.data.content.hotel_id,
    user_type:'V',
    user_dt:this.addVipForm.value.vipStruct
  }
  this.dataServe.global_service(1,'/add_vip',dt).subscribe(data=>{
    console.log(data)
  this.vipData=data
  if(this.vipData.suc>0)
    {
      this.msg.successMsg('SS')
      this.onClose(1)

    }
  else{
    this.msg.successMsg('ES')

  }

},error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  console.log(dt)
}

onItemSelect(item: any) {
  console.log(item);
  console.log(this.selectedItems)

}
onSelectAll(items: any) {
  console.log(items);
  console.log(this.selectedItems)

}
showVipList(){
  console.log(this.selectedItems)
  this.onClose(this.selectedItems)
}
closeRoom(){
  this.onClose(1)
}
openBottomSheet(txt:any): void {
 const bsRef= this._bottomSheet.open(BottomSheetDataComponent,{
  data: {flag:'msg', content:txt}
 }
  
  );
}
openBottomSheetLost(txt:any):void{
  const bsRef= this._bottomSheet.open(BottomSheetDataComponent,{
    data: {flag:'lost', content:txt}
   }
    
    );
}
update_info(){
        localStorage.setItem('email',this.profileForm.controls.mail.value)
        localStorage.setItem('name',this.profileForm.controls.name.value)
        localStorage.setItem('phone',this.profileForm.controls.phone.value)
}
update_pass(){
  localStorage.setItem('password',btoa(this.passForm.controls.newPass.value))

}
selectMember(leader:any){
  console.log(leader)
  // this.group_emp_id=this.data.content.member.filter((e:any)=>e.group_emp_id==leader)[0].group_emp_id;
  console.log(this.group_emp_id, this.data.content.member)
  this.memberList=this.data.content.member.filter((e:any)=>e.group_emp_id==leader)
  console.log(this.memberList)
}
sendSugg(){
  console.log(this.suggForm)
  if(this.suggForm.controls.sugg_text.value){
    var dt={
      user_id:22,
      id:0,
      user:"nick@gmail.com",
      sugg:this.suggForm.controls.sugg_text.value,
      hotel_id:localStorage.getItem('hotel_id')
    }
    this.dataServe.global_service(1,'/sugg_box',dt).subscribe(data=>{
      console.log(data)
      this.suggData=data
      if(this.suggData.suc>0){
        this.msg.successMsg('SS')
        this.suggForm.reset()
        this.onClose(1)
      }
      else{
        this.msg.successMsg('ES')

      }
        
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  else{
    this.msg.globalError('Please fill in the suggestion form!')
  }
}
sendItem(){
  console.log(this.addItemForm)
  var dt={
    user_id:22,
    id:0,
    user:"nick@gmail.com",
    sugg:this.suggForm.controls.sugg_text.value,
    hotel_id:localStorage.getItem('hotel_id')
  }
  this.dataServe.global_service(1,'/sugg_box',dt).subscribe(data=>{
    console.log(data)
    this.suggData=data
    if(this.suggData.suc>0){
      this.msg.successMsg('SS')
      this.suggForm.reset()
      this.onClose(1)
    }
    else{
      this.msg.successMsg('ES')

    }
      
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
report(){
  console.log(this.lostFoundForm.controls)
  var dt={
  id:0,
  hotel_id:1,
  saved_by:'U',
  user_id:22,
  user_name:'Nick Carter',
  user_email:'nick@gmail.com',
  lf_flag:this.category,
  lf_date:this.lostFoundForm.controls.dateReported.value.toString(),
  item_name:this.lostFoundForm.controls.item_name.value,
  item_desc:this.lostFoundForm.controls.description.value,
  remarks:this.lostFoundForm.controls.remarks.value
}
this.dataServe.global_service(1,'/lost_found',dt).subscribe(data=>{
  console.log(data)
  this.lostFoundData=data;
  if(this.lostFoundData.suc>0){
    this.msg.globalSuccess('Successfully reported!')
    this.lostFoundForm.reset(); this.onClose(1)}
  else{
    this.msg.globalError('Error while reporting!')
  }
},error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
}
filterData(){
this.lostFoundFilterData=this.data.content.filter((e:any)=>e.lf_flag==this.category1 && e.approval_flag=='Y')
}
showEvent(e:any){
  console.log(e)
}
today(){
  this.cal.today();
this.todayDt=this.cal.getDate()._date.toISOString().substring(0,7)

}
previous(){
  this.cal.prev();
this.todayDt=this.cal.getDate()._date.toISOString().substring(0,7)

}
next(){
  this.cal.next();
this.todayDt=this.cal.getDate()._date.toISOString().substring(0,7)


}
changeView(__ev:any){
  console.log(__ev)
  if(__ev.value == 'W'){
     this.cal.changeView('week',true);
  }
  else if(__ev.value == 'M'){
    this.cal.changeView('month',true);
  }
  else{
    this.cal.changeView('day',true);
  }
}

getGuestGroupUserList(){
  this.dataServe.global_service(0,'/get_emer_user_list', `hotel_id=${this.data.content.hotel_id}&flag=V`).subscribe(data =>{
    console.log(data);
    this.getUserData=data;
    this.getUserData=this.getUserData.msg;
  })
}

}
// 


