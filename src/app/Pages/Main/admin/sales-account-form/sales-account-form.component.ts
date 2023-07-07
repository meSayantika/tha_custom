import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-sales-account-form',
  templateUrl: './sales-account-form.component.html',
  styleUrls: ['./sales-account-form.component.css']
})
export class SalesAccountFormComponent implements OnInit {
  displayedColumns: string[] = ['id', 'restaurant_name', 'date_enquiry','country','setup','edit', 'delete'];
  displaySubSales: string[] = ['id', 'name', 'contact','edit', 'delete'];
  subSalesData: any;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private dataServe: DataService, private msg: MessageService, private router: Router, public dialog: MatDialog) { }
  id: any;
  hotel_id: any;
  salesData: any;
  salesDashboardData: any;
  selectIndex:any;
  hotelInfo!: FormGroup;
  userData: any;
  dataSource = new MatTableDataSource();
  hotelDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  setupmode: any;
  divid: any;
  m: any;
  flag: any;
  modeData: any;
  del_id:any
  delData:any
  email_body:any
  email_title:any
  pwd:any;
  msg_flag=false;
  hotelData: any;
  // for hotel account
  displayedHotelColumns: string[] = ['id', 'restaurant_name', 'date_enquiry','country','setup','edit', 'delete'];
  
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    localStorage.setItem('user_id', atob(this.id))
    this.id = atob(this.id)
    console.log();

    this.fetchSubdata();
    this.fetchHoteldata();

    this.hotelInfo = this.formBuilder.group({
      agent_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      start_date: ['', [Validators.required]],
      territory: ['', [Validators.required]],
      commission: ['', [Validators.required]],
      commission1: ['', [Validators.required]],
      comments: ['', [Validators.required]],
      email_send_date: [''],
      email_body: ['', [Validators.required]],
      email_title: ['', [Validators.required]],

    });
    if(this.id>0){
    this.getAgentDtls()
    }
  }

  getAgentDtls() {
    this.dataServe.global_service(0, '/sales_agent', `id=${this.id}`).subscribe(dt => {
      var datePipe = new DatePipe("en-US");
      console.log(dt);
      this.salesDashboardData = dt
      this.hotelInfo.patchValue({
        agent_name: this.salesDashboardData.msg[0].agent_name,
        address: this.salesDashboardData.msg[0].address,
        phone: this.salesDashboardData.msg[0].phone_no,
        whatsapp: this.salesDashboardData.msg[0].whatsapp_no,
        email: this.salesDashboardData.msg[0].email,
        start_date: datePipe.transform(this.salesDashboardData.msg[0].start_date, 'yyyy-MM-dd'),
        territory: this.salesDashboardData.msg[0].territory,
        commission: this.salesDashboardData.msg[0].frst_comm,
        commission1: this.salesDashboardData.msg[0].snd_comm,
        comments: this.salesDashboardData.msg[0].comments,
        email_send_date: this.salesDashboardData.msg[0].email_send_dt ? datePipe.transform(this.salesDashboardData.msg[0].email_send_dt, 'yyyy-MM-dd') : '',
        email_title: this.salesDashboardData.msg[0].email_title,
        email_body: this.salesDashboardData.msg[0].email_body,
      })

    })
  }
  get f() { return this.hotelInfo.controls }

  updatehotelInfo() {
    // console.log(this.hotelInfo.controls)
    var data = {
      id: this.id,
      user: 'admin@gmail.com',
      hotel_id: localStorage.getItem('rid'),
      agent_name: this.f.agent_name.value,
      address: this.f.address.value,
      phone: this.f.phone.value,
      whatsapp: this.f.whatsapp.value,
      email: this.f.email.value,
      start_date: this.f.start_date.value,
      territory: this.f.territory.value,
      frst_comm:this.f.commission.value,
      snd_comm:this.f.commission1.value,
      comments: this.f.comments.value,
      email_title:this.f.email_title.value,
      email_body:this.f.email_body.value,
      pwd:this.pwd,
      msg_flag:this.msg_flag

    }
    this.dataServe.global_service(1, '/sales_agent', data).subscribe(dt => {
      this.salesData = dt;
      if (this.salesData.suc > 0) {
        this.msg.successMsg('SS'); this.hotelInfo.reset()
        this.router.navigate(['main/admin/sales_account']).catch(data => {
          this.msg.globalError(data);
        })
      }
      else { this.msg.errorMsg('ES') }

    }, error => {
      this.msg.globalError(error.status + ' ' + error.statusText + ' in ' + error.url)
      // console.log(dt);
    })
    // console.log(data);
  }

  
  fetchdata() { //fetching the restaurant record
    //Call APi
    this.dataServe.global_service(0,'/sales_agent',null).subscribe(data => {
      console.log(data)
      this.userData = data
      // this.userData = this.userData.msg;
      // this.show_spinner=true;
      // this.putdata(this.userData.msg)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  fetchSubdata() { //fetching the restaurant record
    //Call APi
    this.dataServe.global_service(0,'/sub_sales_agent',`sales_id=${this.id}`).subscribe(data => {
      console.log(data)
      this.subSalesData = data
      // this.userData = this.userData.msg;
      // this.show_spinner=true;
      this.putdata(this.subSalesData.msg)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  fetchHoteldata() { //fetching the restaurant record
    //Call APi
    this.dataServe.global_service(0,'/res_dtls_custom',`flag=S&sales_id=${this.id}`).subscribe(data => {
      console.log(data)
      this.hotelData = data
      // this.userData = this.userData.msg;
      // this.show_spinner=true;
      this.putHotelData(this.hotelData.msg)
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
  putHotelData(v: any) { //assign pagination and sort header to datatable
    this.hotelDataSource = new MatTableDataSource(v);
    this.hotelDataSource.paginator = this.paginator;
    this.hotelDataSource.sort = this.matsort;
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
  go_details(v: any,name:any) { //route to the particular restaurant on clicking on the edit option
    // alert(v);
    this.router.navigate(['main/sales/addsubsales',btoa(v),btoa(this.salesDashboardData.msg[0].agent_name)]).catch(data=>{
      this.msg.globalError(data);
    })
    
  }
  go_addhotel(v: any) { //route to the particular restaurant on clicking on the edit option
    // alert(v);
    this.router.navigate(['main/sales/salesaddhotel',btoa(v)]).catch(data=>{
      this.msg.globalError(data);
    })
    
  }
  go_hotelinfo(v:any){
    this.router.navigate(['main/sales/saleshotelinfo',btoa(v)]).catch(data=>{
      this.msg.globalError(data);
    })
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
  next(id:any){
    this.router.navigate(['main/sales/addsubsales',btoa(id),btoa(this.salesDashboardData.msg[0].agent_name)]).catch(data=>{
      this.msg.globalError(data);
    })
  }
  // go_next(id:any){
  //   this.router.navigate(['main/admin/sales_account_form',btoa(id)]).catch(data=>{
  //     this.msg.globalError(data);
  //   })
  // }
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

  generate_email(){
    if(this.f.agent_name.value&& this.f.phone.value!=''){
      this.msg_flag=true
    this.email_title = `Welcome ${this.f.agent_name.value}`
    var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var a = alpha[Math.floor(Math.random() * 62)];
    var b = alpha[Math.floor(Math.random() * 62)];
    var c = alpha[Math.floor(Math.random() * 62)];
    var d = alpha[Math.floor(Math.random() * 62)];
    var e = alpha[Math.floor(Math.random() * 62)];
    var sum = a + b + c + d + e;
    this.pwd=sum

    this.email_body = `Hello ${this.f.agent_name.value},
Please log in to your account with the following credentials to add and manage hotels.

Login Link: ${environment.routeUrl}/main/sales/saleslogin
UserID: ${this.f.phone.value}
Password: ${sum}
    
Thank You,
Cindy Ferguson`
    this.hotelInfo.patchValue({
      email_body: this.email_body,
      email_title: this.email_title,
    })
    }else{
      this.msg.globalError('Please enter name and phone first')
    }
  }
  back(){
    history.back()
  }
}
