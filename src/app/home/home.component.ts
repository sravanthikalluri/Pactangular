import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PactService} from "../../assets/shared/pact.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../pact/pact.component.css']
})
export class HomeComponent implements OnInit {

  public username: any;
  public url:any;
  public showLogin:any = false;
  public isDisabled:boolean=true;
  public searchCount:any = 0;

  constructor(private router:Router,private PactService:PactService,private titleService:Title) {
      this.PactService.getDisabled().subscribe(res => {
              this.isDisabled = res.data;
      });
  }
  public getUserType(event:any) {
    if(event.data){
      this.isDisabled = true;
      document.getElementById('loginButton').focus();
    }
    this.showLogin = false;
    this.username = sessionStorage.getItem('userType');
  }
  ngOnInit() {
    if(sessionStorage.getItem('token')) {
      this.isDisabled = false;
    }
    else{
      this.isDisabled = true;
    }
    this.username = sessionStorage.getItem('userType');
    this.titleService.setTitle('Pact : PeopleTech Group');
  }
   
  public navigateToPact(url:any) {
    var userType = this.PactService.getUserName();
    if(+sessionStorage.getItem(userType) > 10 && userType === 'DemoUser') {
      alert("Subscribe to avail the full features");
    }
    else{
      var count = +sessionStorage.getItem(userType) + 1;
      sessionStorage.setItem(userType,count.toString());
      this.router.navigate(['/pact',{url:url}],{skipLocationChange:true});
    }

  }
  public login() {
    this.showLogin = true;
  }
  public logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.isDisabled = true;
    localStorage.clear();
   // this.router.navigate([''],{skipLocationChange:true});
  }
}
