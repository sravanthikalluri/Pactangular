/*
http://183.82.48.194:8689/pact/imagealt*/

import {Injectable} from "@angular/core";
import {Http,Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PactService {
 public isDisabled:boolean;
 public assigeUser:any = [];
 public username:any;
 public selectedBug:any = [];
 private subject = new Subject<any>();
  constructor(private http:Http) {



  }
  public loginAuth() {
    return this.http.get('assets/json/login.json').map((res:Response) => res.json());
  }
  public getErrorInfoPage(url:any) {
    let urlType = url.includes('https');
    let urlText;
    if(urlType) {
      urlText = 'http://pactnew.azurewebsites.net/getpageinfo?page=https://';
    }
    else {
      urlText = 'http://pactnew.azurewebsites.net/getpageinfo?page=http://';
    }
    url = url.replace('http://','');
    url = url.replace('https://','');
    url = urlText+url;
    return this.http.get(url).map((res:Response) => res.json());
  }
  public getAllLinks(url:any) {
    let urlType = url.includes('https');
    let urlText;
    if(urlType) {
      urlText = 'http://pactnew.azurewebsites.net/allpages?site=https://';
    }
    else {
      urlText = 'http://pactnew.azurewebsites.net/allpages?site=http://';
    }
    url = url.replace('http://','');
    url = url.replace('https://','');
    url= urlText + url;
    return this.http.get(url).map((res:Response) => res.json());
  }
  public getViewSource(url:string){
    let urlType = url.includes('https');
    let urlText;
    if(urlType) {
      urlText = 'http://pactnew.azurewebsites.net/pagesource?page=https://';
    }
    else {
      urlText = 'http://pactnew.azurewebsites.net/pagesource?page=http://';
    }
    url = url.replace('http://','');
    url = url.replace('https://','');
    url = urlText+url+"/";
    return this.http.get(url);
  }
  public setDisabled(item){
     this.subject.next({data:item});
  }
  public getDisabled(): Observable<any> {
    return this.subject.asObservable();
  }
  public setUserName(username){
    this.username = username;
  }
  public getUserName(){
    return this.username;
  }
  public setUser(user){
    this.subject.next({name:user});

  }
  public getUser(): Observable<any>{
    return this.subject.asObservable();
  }
  public getTrackBugs() {
    return this.http.get('assets/json/trackBugs.json').map((res:Response) => res.json());
  }
  public setSelectedBug(selectedBug){
    this.selectedBug = selectedBug
  }
  public getSelectedBug(){
    return this.selectedBug;
  }
  public getUsersRole() {
    return this.assigeUser;
  }
  public setUsersRole(assigeUser) {
    this.assigeUser.push(assigeUser);
  }
}
