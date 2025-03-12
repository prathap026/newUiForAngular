import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userList: any;

  constructor(private route:Router,
    private service:LoginService
  ){}
  ngOnInit(): void {

    this.getUserData();
    
  }

  onAdd(){
    this.route.navigate(['/main/user/add']);
  }

  getUserData(){
    const payload = {
      "dataCode":"REGISTRATION_LIST_DETAILS",
      "placeholderKeyValueMap":{
        "role":"ROLE_OFFICER"
      }

    }
    this.service.getData(payload).subscribe((resp:any)=>{
      if(resp.statusCode == 0){
        this.userList = resp.response;
        console.log("UserList :",this.userList)
      }else{
        console.log("Data not found!...")
      }
      
    })
  }

}
