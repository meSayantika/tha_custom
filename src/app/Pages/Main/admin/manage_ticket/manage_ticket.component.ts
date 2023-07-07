import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
@Component({
  selector: 'app-manage_ticket',
  templateUrl: './manage_ticket.component.html',
  styleUrls: ['./manage_ticket.component.css']
})
export class Manage_ticketComponent implements OnInit {
  displayedColumns: string[] = ['id','hotel_name','ticket', 'date','status','view'];
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
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  hotel_id: any;
  editdata: any;
  category='O'
  getFilteredData:any;
  getLostFoundData:any
 constructor(public dialog: MatDialog,private msg:MessageService, private router: Router,private dataServe:DataService,private activeroute:ActivatedRoute) { }
  show_spinner = false;

  ngOnInit() {

    this.fetchdata();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matsort;
  }

  fetchdata() { //fetching the restaurant record
    //Call APi
    this.dataServe.global_service(0,'/support_log',`id=0&hotel_id=0`).subscribe(data => {
      console.log(data)
      this.userData = data
      this.getFilteredData=null
      this.getFilteredData=this.userData.msg.filter((dt:any)=> dt.tkt_status!='S')
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
    this.router.navigate(['main/admin/admin_add_ticket/'+btoa(v)])
      
    }

    getFilter(){
      this.getFilteredData=null
      console.log(this.category);
      this.getFilteredData=this.category!='C'?this.userData.msg.filter((dt:any)=> dt.tkt_status!='S'):this.userData.msg.filter((dt:any)=> dt.tkt_status=='S')
      // this.getFilteredData=this.getLostFoundData.filter((e:any)=>e.lf_flag==this.category)
      console.log(this.getFilteredData)
        this.putdata(this.getFilteredData)
    }


  }


