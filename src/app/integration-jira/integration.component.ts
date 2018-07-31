import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PactService} from "../../assets/shared/pact.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-integrate-jira',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrateJIRAComponent implements OnInit {
  public usersList:any = [];
    public addUser = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['',[ Validators.required]],
      email:['', [Validators.required]],
      des:['', [Validators.required]],
    });

    public integrateJIRA = this.fb.group({
      bugts: ['', Validators.required],
      srcType: ['', Validators.required],
      srcServer:['', Validators.required],
      uname: ['', Validators.required],
      password:['', Validators.required],
    });
    public isAddUser:any = false;
    constructor(private fb:FormBuilder,private _PactService:PactService,private title:Title) {

    }
    ngOnInit() {
      this.usersList = this._PactService.getUsersRole();
      this.title.setTitle('Settings:People Tech Group');
    }

    public onAddUsers() {
     this.isAddUser = true;
   }
   public cancelUser() {
     this.addUser.reset();
     this.isAddUser = false;
   }
   public createUser() {
      this._PactService.setUsersRole(this.addUser.value);
      alert("User Added");
      this.addUser.reset();
      this.isAddUser = false;
   }
}
