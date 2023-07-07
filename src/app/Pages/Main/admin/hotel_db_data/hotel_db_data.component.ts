import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel_db_data',
  templateUrl: './hotel_db_data.component.html',
  styleUrls: ['./hotel_db_data.component.css']
})
export class Hotel_db_dataComponent implements OnInit {
  displayedColumns: string[] = ['id','check','user_name', 'user_type','mobile_no','email_id', 'check_in','check_out','language'];
  // dataSource = ELEMENT_DATA;
  userData: any;
  del_id: any;
  modeData: any;
  divid: any;
  flag: any;
  show_edit = false;
  setupmode: any;
  x: any;
  m = '';
  delData:any;
  hotel_id:any
  hotel_name:any
  checkDiv:any
  downloadArr:any=[]
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  constructor(private activatedRoute:ActivatedRoute, public dialog: MatDialog,private msg:MessageService, private router: Router,private dataServe:DataService) { }
  show_spinner = false;
  filterDat='C'
  table: any;
  csv: any;
  tr: any;
  tbody: any;
  hiddenElement:any
  downloadAll=false
  ngOnInit(): void {
    this.hotel_id=atob(this.activatedRoute.snapshot.params['hotel_id'])
    this.hotel_name=atob(this.activatedRoute.snapshot.params['hotel_name'])
    this.fetchdata();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matsort;
  }
 
  go_details(v: any) { //route to the particular restaurant on clicking on the edit option
    // alert(v);
    // this.router.navigate(['main/admin/manage_hotel_account',btoa(v)]).catch(data=>{
    //   this.msg.globalError(data);
    // })
    // this.router.navigate(['hotel/home',btoa(v)]).catch(data=>{
    //   this.msg.globalError(data);
    // })
    localStorage.setItem('privilege','A')
    localStorage.setItem('user_type','A')

  localStorage.setItem('Restaurant_id',v.id);
  localStorage.setItem('Email',v.email)
  // alert("hii")

  localStorage.setItem('Restaurant_name',v.restaurant_name);
  // localStorage.setItem('Restaurant_email',this.logData.msg.email_id);
    window.open(environment.routeUrl+'hotel/home/'+btoa(v.id))
    
  }
  fetchdata() { //fetching the restaurant record
    //Call APi
    this.dataServe.global_service(0,'/get_user_list',`hotel_id=${this.hotel_id}`).subscribe(data => {
      console.log(data)
      this.userData = data
      // this.userData = this.userData.msg;
      // this.show_spinner=true;
      this.putdata(this.userData.msg)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  putdata(v: any) { //assign pagination and sort header to datatable
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matsort;
    for (let i = 0; i < v.length; i++) {
      console.log('setup' + (i + 1));
      // this.divid=document.getElementById('setup'+(i+1));
      // console.log(this.divid)
      // this.divid.style.display='none'

    }

  }
  applyFilter(event: Event) { //search input
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  click_setup(v: any, id: any) { //to change mode to either setup, pending or approval
    console.log(id)
    this.setupmode = document.getElementById('setupmodeid' + id);
    console.log("checked:" + v.checked);
    this.divid = document.getElementById('setup' + id);
    if (v.checked) {
      this.flag = 'Y'
      this.m = 'Setup Mode: On'
    }
    else {
      this.flag = 'N'
      this.m = 'Setup Mode: Off'
    }
    this.dataServe.global_service(0,'/update_approval',`flag=${this.flag}&id=${id}`).subscribe(data => {
      console.log(data)
      this.modeData = data;
      if (this.modeData.suc == 1) {

      }
      else {
        this.msg.globalError('Error! Cannot change support mode. Please try again later!')

      }

    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

  }
  del_res(v: any) { //to assign the restaurant ID
    console.log(v);
    this.del_id = v;
    var f='delete'
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: { flag: f, content: v }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, f)
      if(result==1)
      // debugger
      this.delete_restaurant()
      
    })
  }
  delete_restaurant() { //function for deletin a restaurant
    this.dataServe.global_service(0,'/del_res',`id=${this.del_id}`).subscribe(data=>{console.log(data)
    this.delData=data;
    if(this.delData.suc==1){
      this.fetchdata()
      this.msg.successMsg('SD')
      
    }
    else{
     this.msg.errorMsg('ED')
    }
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  register(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: { flag: 'registration', content: null }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==1)
       this.fetchdata()
    })
  }
  sendQ(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: { flag: 'sendQ', content: null }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==1)
       this.fetchdata()
    })
  }
  getFilterData(){
    this.dataServe.global_service(0,'/get_user_list',`hotel_id=${this.hotel_id}&flag=${this.filterDat}`).subscribe(data => {
      console.log(data)
      this.userData = data
      // this.userData = this.userData.msg;
      // this.show_spinner=true;
      this.putdata(this.userData.msg)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

  openSearch(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: { flag: 'searchDt_db', content:null  }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataServe.global_service(0,'/get_user_list',`hotel_id=${this.hotel_id}&flag=${this.filterDat}&frm_dt=${result.from}&to_dt=${result.to}`).subscribe(data => {
        console.log(data)
        this.userData = data
        // this.userData = this.userData.msg;
        // this.show_spinner=true;
        this.putdata(this.userData.msg)
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  })
}
selectAll(e:any){
  if(e.target.checked){
    for(let i=0;i<this.userData.msg.length;i++){
      this.checkDiv=document.getElementById('check_'+i)
      this.checkDiv.checked=true
      this.downloadAll=true
    }
  }
  else{
    for(let i=0;i<this.userData.msg.length;i++){
      this.checkDiv=document.getElementById('check_'+i)
      this.checkDiv.checked=false
      this.downloadAll=false

    }
  }

}
checkAll(e:any){
  // if(e.)
}
download_all(){
  this.csv = "";
  this.table = document.getElementById("salesTable");
  this.tr = this.table.children[0].children[0];
  for (let i = 0; i < this.tr.children.length; i++) {
    this.csv += this.tr.children[i].innerText + ",";
  }
  console.log(this.csv);
 
  this.csv = this.csv.substring(0, this.csv.length - 1) + "\n";
  this.tbody = this.table.children[1];
  for (let i = 0; i < this.tbody.children.length; i++) {
    for (let j = 0; j < this.tbody.children[i].children.length; j++) {
      this.csv += this.tbody.children[i].children[j].innerText + ",";
    }
    this.csv = this.csv.substring(0, this.csv.length - 1) + "\n";
  }
  this.csv = this.csv.substring(0, this.csv.length - 1) + "\n";
  console.log(this.csv);

  var blob = new Blob([this.csv], { type: "data:text/csv;charset=utf-8" });
  var url = URL.createObjectURL(blob);
 
  this.hiddenElement = document.createElement("a");
  this.hiddenElement.href = url;
  this.hiddenElement.target = "_blank";
  this.hiddenElement.download = "data.csv";
  this.hiddenElement.click();
  
}
download_dat(){
  if(this.downloadAll==false){
  this.downloadArr.length=0
for(let i=0;i<this.userData.msg.length;i++){
  this.checkDiv=document.getElementById('check_'+i)
  console.log(this.checkDiv)
  if(this.checkDiv.checked)
    this.downloadArr.push(this.userData.msg[i])
}
console.log(this.downloadArr)

this.csv = "Name, Type, Phone, Email, Check In, Check Out, Language";

    this.csv = this.csv.substring(0, this.csv.length - 1) + "\n";
    for (let i = 0; i < this.downloadArr.length; i++) {
      let j = 0;
      for (let [key, value] of Object.entries(this.downloadArr[i])) {
        if (j > 2 && j < 10) this.csv += value + ",";
        j++;


      }
      this.csv = this.csv.substring(0, this.csv.length - 1) + "\n";
    }
    console.log(this.csv);

    var blob = new Blob([this.csv], { type: "data:text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);

    this.hiddenElement = document.createElement("a");
    this.hiddenElement.href = url;
    this.hiddenElement.target = "_blank";
    this.hiddenElement.download = "data.csv";
    this.hiddenElement.click();

  }

else{
  this.download_all()
}
}
}
