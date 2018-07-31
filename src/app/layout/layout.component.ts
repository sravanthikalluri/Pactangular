import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PactService} from "../../assets/shared/pact.service";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['../home/home.component.css','../pact/pact.component.css','./layout.component.css']
})
export class LayoutComponent implements OnInit{
  public showErrorInfoPage:any = true;
  public url:any;
  public SuperUser:any=false;
  constructor(private router:Router,private ac: ActivatedRoute) {

  }
  ngOnInit(){
    let currentUrl:any;
    this.ac.params.subscribe(param => {
      currentUrl = param['url'];
      if(param['BugTracking']){
        this.showErrorInfoPage = false;
      }
    });
    this.url = currentUrl;
    this.SuperUser = localStorage.getItem('userType');
  }
  public navigateToHome() {
    this.showErrorInfoPage = !this.showErrorInfoPage;
    this.router.navigate(['layout/pact',{showErrorInfoPage:false}],{skipLocationChange:true});
  }
  public navigateToBugTracker() {
    this.showErrorInfoPage = !this.showErrorInfoPage;
    this.router.navigate(['layout/pact',{showErrorInfoPage:false}],{skipLocationChange:true});
  }
  public navigateToSettings() {
    this.router.navigate(['layout/settings',{url:this.url}],{skipLocationChange:true});
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate([''],{skipLocationChange:true});
  }
}
