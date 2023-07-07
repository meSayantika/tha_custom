import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import  { io, Socket }  from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket!: Socket;
  showInfo=new Subject<any>()
  
  constructor(private http: HttpClient) { 
  this.socket = io(environment.api_url, {transports: ['polling']});
  // this.socket = io('https://api.er-360.com', {transports: ['polling']});

  }

  local_service(url:any){
    return this.http.get(url);  
  }
 
  global_service(flag:any, api_path:any, data:any){ 
     // FLAG : 1 -> POST || 0 -> GET  
     if(flag > 0){   
      // EX: data = {id: this.id, dt: this.dt};  
       return this.http.post(environment.api_url + api_path, data);  }
       else{  
         // EX: data = 'id=' + this.id + '&dt=' + this.dt  
          var api_dt = data ? '?' + data : '';   
          return this.http.get(environment.api_url + api_path + api_dt);  } }

          downloadsection(restid:any,menuid:any){ //download section data
            console.log(restid+" "+menuid)
            return this.http.get(environment.api_url+'/download_section?id='+restid+'&menu_id='+menuid,{responseType:'arraybuffer'})
          }
          downloadlogotopcover(restid:any){ //download all
            return this.http.get(environment.api_url+'/download_cov?id='+restid,{responseType:'arraybuffer'})
          
          }
           //For Listening api for chats
   listen(eventname:any){
    //  console.log(eventname);   
    return new Observable((observer)=>{
      this.socket.on(eventname,(news:Observable<any>)=>{
            observer.next(news);
             // console.log(news);     
      })
    })
   }
   //For Sending data to socket.io server
   emit(eventname:any,data:any){
         this.socket.emit(eventname,data);
   }
   sendMessage(data:any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data:any) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

}
