import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
@Component({
  selector: 'app-dept_login',
  templateUrl: './dept_login.component.html',
  styleUrls: ['./dept_login.component.css']
})
export class Dept_loginComponent implements OnInit {
  loginForm!: FormGroup;
  getLoginData: any
  constructor(private router:Router, private formBuilder: FormBuilder, private dataServe: DataService, private msg: MessageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email_address: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
  }
  get f() { return this.loginForm.controls }

  logSubmit() {
    console.log(this.f)
    var dt = {
      "email_id": this.f.email_address.value,
      "password": this.f.password.value
    }
    this.dataServe.global_service(1,'/dept_login', dt).subscribe(data => {
      this.getLoginData = data;
      console.log(data)
      debugger;
      if (this.getLoginData.suc > 0){
        // debugger;
        localStorage.setItem('privilege','D')
        localStorage.setItem('type',this.getLoginData.user_dt.user_type)
        // localStorage.setItem('password',btoa(this.f.password.value))
        localStorage.setItem('email',this.getLoginData.user_dt.email_id)
        localStorage.setItem('name',this.getLoginData.user_dt.user_name)
        localStorage.setItem('phone',this.getLoginData.user_dt.mobile_no)
        localStorage.setItem('dept',this.getLoginData.user_dt.dept_id)
        localStorage.setItem('id',this.getLoginData.user_dt.id)
        localStorage.setItem('group_emp_id',this.getLoginData.user_dt.group_emp_id)
        localStorage.setItem('msg_type',this.getLoginData.user_schedule?.msg_type)
        localStorage.setItem('user_type','M')
        localStorage.setItem('activity',this.getLoginData.active_flag)
        if(this.getLoginData.user_dt.user_type=='V'){
          var date=new Date()
          if(date>=new Date(this.getLoginData.lodgging_dt.check_in) && date<=new Date(this.getLoginData.lodgging_dt.check_out))
         this.router.navigate(['directory/directory_home/Z/0/0/',btoa(this.getLoginData.user_dt.hotel_id)]).catch(data=>{
          this.msg.globalError(data)
         })
        }
        else if(this.getLoginData.user_dt.user_type=='G'){
          this.router.navigate(['main/admin/group_home',btoa(this.getLoginData.user_dt.hotel_id)]).catch(data=>{
            this.msg.globalError(data)
           })
        }
         else
        this.router.navigate(['main/admin/dept_home',btoa(this.getLoginData.user_dt.hotel_id)]).catch(data=>{
          this.msg.globalError(data)
        
        })
        }
      else
        this.msg.globalError(this.getLoginData.msg)
    }, error => {
      this.msg.globalError(error)
    });


  }

}
