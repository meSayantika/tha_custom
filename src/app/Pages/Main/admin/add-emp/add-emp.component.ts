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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  empForm!: FormGroup;
  addDeptData:any
  getDeptData:any
  constructor(private activatedRoute:ActivatedRoute, public dialog: MatDialog,private msg:MessageService, private router: Router,private dataServe:DataService,private formBuilder: FormBuilder) { }
  displayedColumns: string[] = ['position','name','del'];
  dataSource = new MatTableDataSource();
  hotel_id:any
  id=0;
  getEmpData:any
  getEmpDataSrch:any
  searchDept=''
  getIdData:any
  getDelData:any
  deptName:any
  showRevoke=true
  isChecked=false;
  depts:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit() {
    this.hotel_id=this.activatedRoute.snapshot.params['id'];
    this.hotel_id=atob(this.hotel_id);
    this.empForm = this.formBuilder.group({
      emp_id:['',Validators.required],
      name: ['', [Validators.required]],
      mail:[''],
      phone:[''],
      mFlag:[true],
      dept:['',Validators.required],
      revokeFlag:['']

     
    });
    this.getDept()
    this.getEmp()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getDept(){
    this.dataServe.global_service(0,'/dept',`hotel_id=${this.hotel_id}`).subscribe(data=>{console.log(data)
    this.getDeptData=data
    // this.putdata(this.getDeptData.msg)
    //  this.deptName=this.getDeptData.msg.filter((e:any)=>e.dept_id==localStorage.getItem('dept'))[0].dept_name
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  getEmp(){
    this.dataServe.global_service(0,'/emp_dtls',`hotel_id=${this.hotel_id}`).subscribe(data=>{console.log(data)
      this.getEmpData=data
      this.putdata(this.getEmpData.msg)
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  putdata(v: any) { //assign pagination and sort header to datatable
    console.log(v)
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
   

  }
  add_emp(){
    var dt={
      id:this.id?this.id:0,
      emp_id:this.empForm.controls.emp_id.value,
      dept_id:this.empForm.controls.dept.value,
      emp_name:this.empForm.controls.name.value,
      user:"admin@gmail.com",
      phone_no:this.empForm.controls.phone.value,
      email:this.empForm.controls.mail.value,
      manager_flag:this.empForm.controls.mFlag.value?'Y':'N',
      hotel_id: this.hotel_id
    }
    this.dataServe.global_service(1,'/emp_dtls',dt).subscribe(data=>{
      console.log(data)
      this.addDeptData=data;
      if(this.addDeptData.suc>0)
      {
        if(this.id){
          this.msg.successMsg('SU')
        }
        else 
        {
          this.msg.successMsg('SS');
        }
    this.getEmp() ; this.refresh() 

      }
      else{
        if(this.id){
          this.msg.errorMsg('EU')

        }
        else 
        {
          this.msg.errorMsg('ES')
        }
      }
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }

  refresh(){
    this.empForm.reset()
    this.empForm.controls.emp_id.enable()
    this.showRevoke=true
    this.id=0
  }
  edit(element:any){
    this.showRevoke=false
    console.log(element)
    this.empForm.controls.emp_id.disable()
    this.empForm.patchValue({
      name:element.emp_name,
      dept:element.emp_dept_id,
      phone:element.mobile_no,
      mail:element.email_id,
      emp_id:element.emp_id,
      mFlag:element.manager_flag!='N'?true:false

    })
    this.id=element.id
    this.isChecked=element.active_flag=='N'?true:false
  }
  searchbyDept(){
    console.log(this.searchDept, this.getDeptData.msg)
    console.log(this.getEmpData.msg.filter((e:any)=>e.id==this.searchDept))
    this.getEmpDataSrch=this.getEmpData.msg.filter((e:any)=>e.id==this.searchDept)
    this.putdata(this.getEmpData.msg.filter((e:any)=>e.id==this.searchDept))
  }
  getID(){
    if(!this.empForm.controls.emp_id.value)
    this.dataServe.global_service(0,'/emp_dtls_last_id',`hotel_id=${this.hotel_id}`).subscribe(data=>{
      this.getIdData=data
      this.empForm.controls.emp_id.setValue(this.getIdData.msg[0].max_id)
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  delEmp(v:any){
    var f='delete'
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: '250px',
      data: { flag: f, content: v }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, f)
      if(result==1){
      this.dataServe.global_service(1,'/emp_dtls_del',{id:v}).subscribe(data=>{
        console.log(data)
        this.getDelData=data
        if(this.getDelData.suc==1)
        {
          this.msg.successMsg('SD')
          this.getEmp()
        }
        else if(this.getDelData.suc==2){
          this.msg.globalInfo(this.getDelData.msg)
        }
        else{
          this.msg.errorMsg('ED')
        }
      })
    }
      
  },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
   

  }
  revokePerm(){
    console.log(this.isChecked)
    var dt={
      "id":this.id,
      "mobile_no":this.empForm.controls.phone.value,
      "flag":this.isChecked,
      "user":"admin@gmail.com"
    }
    this.dataServe.global_service(1,'/revoke_dept',dt).subscribe(data=>{
      console.log(data)
     
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
}
