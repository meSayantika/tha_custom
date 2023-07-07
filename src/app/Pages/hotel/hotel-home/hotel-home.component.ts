import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-hotel-home',
  templateUrl: './hotel-home.component.html',
  styleUrls: ['./hotel-home.component.css']
})
export class HotelHomeComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private dataServe:DataService,private activatedRoute:ActivatedRoute,private msg:MessageService) { }
  hotelInfo!:FormGroup
  initial_pay:any
  final_pay:any
  dashboardData:any
  hotel_id:any
  regData:any;
  countryData:any
  user_type:any
  privilege:any
  setup_mode:any
  ngOnInit() {
    this.hotel_id=this.activatedRoute.snapshot.params['id']
    this.hotel_id=atob(this.hotel_id)
    localStorage.setItem('hotel_id',this.hotel_id)
    this.dataServe.global_service(0,'/country','').pipe(map((x: any) => x.msg)).subscribe(data=>{
      this.countryData=data;
      console.log(this.countryData);

    })
    this.user_type=localStorage.getItem('user_type')
    this.hotelInfo=this.formBuilder.group({
      hotel_date: [''],
      hotel: [''],
      address: [''],
      country: [''],
      website: [''],
      phone: [''],
      whatsapp: [''],
      contact_name: [''],
      contact_position: [''],
      email: [''],
      contact_phone: [''],
      contact_whatsapp: [''],
      notes: [''],
      no_sale: [''],
      proposal_amount: [''],
      first_payment: [''],
      final_payment: [''],
    })
    this.getDashboardData()
  }
  getDashboardData(){
    this.dataServe.global_service(0,'/res_dtls_custom',`id=${this.hotel_id}`).subscribe(data=>{console.log(data)
      this.dashboardData=data;
      // this.show_spinner=true;
      this.dashboardData=this.dashboardData.msg;
      this.initial_pay=this.dashboardData[0].first_pay
      this.final_pay=this.dashboardData[0].final_pay
      localStorage.setItem('initial_pay',this.initial_pay)
      localStorage.setItem('final_pay',this.final_pay)
      localStorage.setItem('setup_mode',this.dashboardData[0].setup_mode)
      console.log(this.final_pay,this.initial_pay)
    if(this.initial_pay==null && this.final_pay==null && localStorage.getItem('user_type')=='A'){
      // this.hotelInfo.disable()
    }
      
      // this.rest_nm=this.dashboardData[0].restaurant_name;
      // this.rest_contact=this.dashboardData[0].contact_name;
      // this.rest_phone=this.dashboardData[0].phone_no;
      // this.rest_em=this.dashboardData[0].email;
      // this.rest_web=this.dashboardData[0].website;
      // this.rest_monthly=this.dashboardData[0].monthly_fee;
      // this.rest_setup=this.dashboardData[0].setup_fee;
      // this.dashboardData[0].addr_line2=this.dashboardData[0].addr_line2?this.dashboardData[0].addr_line2:''
      // this.rest_add=this.dashboardData[0].addr_line1+" "+this.dashboardData[0].addr_line2+" "+this.dashboardData[0].zip+" "+this.dashboardData[0].city+", "+this.dashboardData[0].country
      this.hotelInfo.patchValue({
        hotel_date:this.dashboardData[0].contact_date.substr(0,10),
        hotel:this.dashboardData[0].restaurant_name,
        address:this.dashboardData[0].addr_line1,
        country:this.dashboardData[0].country_id,
        website:this.dashboardData[0].website,
        phone:this.dashboardData[0].phone_no,
        whatsapp:this.dashboardData[0].whatsapp_no,
        contact_name:this.dashboardData[0].contact_name,
        contact_position:this.dashboardData[0].cnct_position,
        contact_phone:this.dashboardData[0].cnct_phone_no,
        contact_whatsapp:this.dashboardData[0].cnct_whatsapp_no,
        email:this.dashboardData[0].email,
        notes:this.dashboardData[0].remarks || this.dashboardData[0].remarks!=undefined || this.dashboardData[0].remarks!="undefined"?this.dashboardData[0].remarks:'',
        no_sale:this.dashboardData[0].proposal_status,
        proposal_amount:this.dashboardData[0].proposal_amt,
        first_payment:this.dashboardData[0].first_pay?.substr(0,10),
        final_payment:this.dashboardData[0].final_pay?.substr(0,10)
      })
      console.log(this.dashboardData[0].remarks)
    
    },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
  }
  get f(){
    return this.hotelInfo.controls;
  }
  updatehotelInfo(){
    console.log(this.hotelInfo.controls)
   
      var dt={
       "hotel_id":localStorage.getItem('rid'),
       "Name":this.f.hotel.value,
       "Contact":this.f.contact_name.value,
       "Telephone":this.f.phone.value,
       "Email":this.f.email.value,
       "Address1":this.f.address.value,
       "country":this.f.country.value,
       "Website":this.f.website.value,
       "cnct_position":this.f.contact_position.value,
       "cnct_phone_no":this.f.contact_phone.value,
       "cnct_whatsapp_no":this.f.contact_whatsapp.value,
       "whatsapp_no":this.f.whatsapp.value,
       "remarks":this.f.notes.value,
       "first_pay":this.f.first_payment.value,
       "final_pay":this.f.final_payment.value,
       "status":this.f.no_sale.value,
       "proposal_amt":this.f.proposal_amount.value
       
      }
      this.dataServe.global_service(1,'/registration',dt).subscribe(data=>{
        this.regData=data;
        if(this.regData.suc>0)
        { this.msg.successMsg('SU')}
         else
         { this.msg.errorMsg('EU')}
      },error=>{this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)})
   
    
  }
}
