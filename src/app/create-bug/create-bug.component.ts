import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PactService} from "../../assets/shared/pact.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Angular2Csv} from "angular2-csv";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.css']
})
export class CreateBugComponent implements OnInit {

  private bugsList:any =[];
  public createBugsList:any = [];
  public userList:any =[];
  public actionBugForm = this.fb.group({
    name:[''],
    priority: ['', Validators.required],
    assign: ['', Validators.required],
    duedate: ['', Validators.required],
    status: ['', Validators.required],

  });
  @Output() getBugStatus = new EventEmitter();
  constructor(private _PactService:PactService,private fb:FormBuilder,private titleService:Title) {
    //this.selectedBug = this._PactService.getSelectedBug();
  }

  ngOnInit() {
    this.titleService.setTitle('Track Bugs:People Tech Group');
    this.createBugsList = this._PactService.getSelectedBug();
    this.userList = this._PactService.getUsersRole();
    this._PactService.getTrackBugs().subscribe(trackedBugs => {
      trackedBugs.issues.map(item => {
        this.bugsList.push({
          name:item['fields'].summary,
          priority:item['fields'].priority['name'],
          duedate:item['fields'].updated,
          status:item['fields'].status['name'],
          assign:item['fields'].reporter['name'],
        });
      });
  });
  }
  public save(bugName:any,ind:any) {
    this.actionBugForm.value['name'] = bugName;
    this.bugsList.push(this.actionBugForm.value);
    var index = this.createBugsList.indexOf(this.actionBugForm.value);
    this.createBugsList.splice(index, 1);
    this.actionBugForm.reset();
    this.getBugStatus.emit({assigned:true,index:ind});
  }
  public exportToExcel() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      headers:['Name','Priority','Due Date','Status','Assign  To']
    };
    new Angular2Csv(this.bugsList, 'Bugs Information' + 'Report', options);
  }
}
