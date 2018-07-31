import {Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {FormBuilder, Validators} from "@angular/forms";
import {PactService} from "../../assets/shared/pact.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private login: any;
  public authUser:any;
  @Output() getUserType = new EventEmitter();

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  @ViewChild('loginModal') modal:ModalComponent;
  @ViewChild('close') close:ElementRef;

  constructor(private fb:FormBuilder ,private PactService:PactService,public renderer: Renderer, public elementRef: ElementRef) {
  }
  ngOnInit() {
    this.modal.open();
  }
  public closeModal() {
    this.modal.close();
    this.getUserType.emit({data:true});
  }

  public getToken(loginDetails){
    /*if( !this.PactService.getUserName()) {
      this.PactService.setUserName('demoUser');
      this.PactService.setUser('demoUser');
    }
      this.PactService.loginAuth().subscribe((data) => {
          var authenticatedUser = _.findIndex(data,function(item:any){
          return item.username === username;
       });

      if(authenticatedUser !== -1 && data[authenticatedUser].password === loginDetails.value.password) {
        if(localStorage.getItem(this.PactService.getUserName())) {
          var type = +localStorage.getItem(this.PactService.getUserName()) + 1;
          localStorage.setItem(this.PactService.getUserName(),type.toString());
        }
        else{
          localStorage.setItem(this.PactService.getUserName(), '1');
        }
        alert(this.PactService.getUserName());
        localStorage.setItem('token',data[authenticatedUser].token);
        localStorage.setItem('userType',this.PactService.getUserName());
        this.PactService.setDisabled(false);
        this.getUserType.emit({data:false});
        this.modal.close();
      }
      else {
        alert("login failed!");
      }
    });*/

    this.PactService.loginAuth().subscribe(data => {
        this.authUser  = data.filter(item => {
          return item['username'].ignoreCase === loginDetails.value['email'].ignoreCase && item['password'] === loginDetails.value['password'];
        });
        if(this.authUser.length >= 1) {
          this.PactService.setUserName(this.authUser[0].type);
          if(sessionStorage.getItem(this.PactService.getUserName())) {
            var type = +sessionStorage.getItem(this.PactService.getUserName()) + 1;
            sessionStorage.setItem(this.PactService.getUserName(),type.toString());
          }
          else{
            sessionStorage.setItem(this.PactService.getUserName(), '1');
          }
          sessionStorage.setItem('token',this.authUser[0].token);
          sessionStorage.setItem('userType',this.authUser[0].type);
          this.PactService.setDisabled(false);
          this.getUserType.emit({data:false});
          this.modal.close();
        }
        else{
          alert("Login Falied");
        }
    });
  }
  public getFocus(event:any) {
     document.getElementById('close').setActive();
  }

}
