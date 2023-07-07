import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { MessageService } from 'src/app/Services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogBoxComponent } from 'src/app/Core/dialogBox/dialogBox.component';
@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private activatedRoute:ActivatedRoute, public dialog: MatDialog,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }
  displayedColumns: string[] = ['position','dept','name','edit'];
  dataSource = new MatTableDataSource();
  hotel_id:any;
  getDeptUserDtlsData:any

  ngOnInit() {
    this.hotel_id=this.activatedRoute.snapshot.params['hotel_id'];
    this.hotel_id=atob(this.hotel_id);
   this.getDeptUserDtls()
  }
  getDeptUserDtls(){
    this.dataServe.global_service(0,'/dept_user_dtls',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      console.log(data)
      this.getDeptUserDtlsData=data
    this.putdata(this.getDeptUserDtlsData.msg)

    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})

}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
putdata(v: any) { //assign pagination and sort header to datatable
  this.dataSource = new MatTableDataSource(v);
  this.dataSource.paginator = this.paginator;
 

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
go_to_mng(id:any){
  this.router.navigate(['schedule',btoa(this.hotel_id),btoa(id)])
}
}
