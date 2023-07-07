import { Component, OnInit, ViewChild} from '@angular/core';
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
  selector: 'app-submit_ticket',
  templateUrl: './submit_ticket.component.html',
  styleUrls: ['./submit_ticket.component.css']
})
export class Submit_ticketComponent implements OnInit {
  displayedColumns: string[] = ['id', 'ticket', 'date','status','view', 'delete'];
  // dataSource = ELEMENT_DATA;
  userData: any;
  del_id: any;
  modeData: any;
  divid: any;
  flag: any;
  show_edit = false;
  // setupmode: any;
  x: any;
  m = '';
  id:any
  delData:any;
  category='O'
  getFilteredData:any;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  hotel_id: any;
  editdata: any;
  constructor(public dialog: MatDialog,private msg:MessageService, private router: Router,private dataServe:DataService,private activeroute:ActivatedRoute) { }
  show_spinner = false;
  ngOnInit(): void {
    this.hotel_id=this.activeroute.snapshot.params['hotel_id']
    this.hotel_id=atob(this.hotel_id)
    console.log(this.hotel_id)
    this.fetchdata();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matsort;
  }
  // go_details(v: any) { //route to the particular restaurant on clicking on the edit option
  // //  localStorage.setItem('Restaurant_id',v.id);
  // // localStorage.setItem('Email',v.email)
  // // localStorage.setItem('Restaurant_name',v.restaurant_name);
  // //   window.open(environment.routeUrl+'hotel/add_ticket/'+btoa(v.id))
    
  // }
  fetchdata() { //fetching the restaurant record
    //Call APi
    // this.dataServe.global_service(0,'/support_log',`id=0&hotel_id=${this.hotel_id}`).subscribe(data => {
    //   console.log(data)
    //   this.userData = data
    //   this.userData=this.userData.msg.filter((dt:any)=> dt.tkt_status!='S')
    //   console.log(this.userData);
      this.dataServe.global_service(0,'/support_log',`id=0&hotel_id=${this.hotel_id}`).subscribe(data => {
        console.log(data)
        this.userData = data
        this.getFilteredData=null
        this.getFilteredData=this.userData.msg.filter((dt:any)=> dt.tkt_status!='S')
        console.log(this.getFilteredData);
        
        console.log(this.getFilteredData);

      // this.userData = this.userData.msg;
      // this.show_spinner=true;
      this.putdata(this.getFilteredData)
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
  
  // }
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
      if(result==1){
        console.log(true);
        this.delete_restaurant(v)
        
      }
      // debugger
      
    })
  }
  delete_restaurant(id:any) { //function for deletin a restaurant
    this.dataServe.global_service(0,'/support_log_del',`id=${id}`).subscribe(data=>{console.log(data)
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

  go_to_add(v:any){
    this.router.navigate(['hotel/add_ticket/'+btoa(v)])
      
    }

    getFilter(){
      // this.getFilteredData=null
      // this.getFilteredData=this.category
      // this.getFilteredData=this.category!='C'? this.userData.msg.filter((dt:any)=> dt.tkt_status!='S'):this.userData.msg.filter((dt:any)=> dt.tkt_status=='S')
      // console.log(this.getFilteredData)
      // this.putdata(this.getFilteredData)
      this.getFilteredData=null
      console.log(this.category);
      this.getFilteredData=this.category!='C'?this.userData.msg.filter((dt:any)=> dt.tkt_status!='S'):this.userData.msg.filter((dt:any)=> dt.tkt_status=='S')
      // this.getFilteredData=this.getLostFoundData.filter((e:any)=>e.lf_flag==this.category)
      console.log(this.getFilteredData)
        this.putdata(this.getFilteredData)
    }
  }



