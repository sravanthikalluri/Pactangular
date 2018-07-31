import {
  AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ActivatedRoute, Router } from "@angular/router";
import { PactService } from "../../assets/shared/pact.service";
import { SearchPipe } from "../../assets/pipes/search.pipe";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-pact',
  templateUrl: './pact.component.html',
  styleUrls: ['./pact.component.css']
})
export class PactComponent implements OnInit {
  public url: any;
  public isLoading: any  = true;
  public errorDescription: any = [];
  public searchResults: any = [];
  public Links: any = [];
  public pageNo: any;
  public totalPages: any;
  public currentPageViolations: any;
  public parentUrl: any = 0;
  public search: any = '';
  public showFilter: any = true;
  public selectedLevel: any = [];
  public check: any = [];
  public disableUrl: any;
  public htmlContent: string;
  public showErrorInfoPage:any = true;
  public showCreateBug:any = false;
  public getCheckCount:any = 0;
  public selectedBug:any = [];
  public visitedLinksArray:any = [];
  public showIntegrationPage:any = false;
  public showBugTracking:any = false;
  public assigned:any = [];
  public visitedLinksCount:any = 0;
  public checkedAll:any = false;
  public getLastPageInfo:any = [];
  public name:any;
  public activeFont:any;
  public visited:any = [];
  public showBugReport:any;
  public currentTableHeight:any;
  @ViewChild('viewSourceModal') modal:ModalComponent;

  constructor(private ac: ActivatedRoute, private _PactService: PactService, private router: Router,private titleService: Title) {
    this.activeFont = 0;
    this.disableUrl = sessionStorage.getItem('userType');
    this.titleService.setTitle('Accessibility Findings : PeopleTech Group');
    this.selectedBug = [];
    this.ac.params.subscribe(param => {
      this.url = param['url'];
      this.parentUrl = param['url']
    });
    this.name = this.url.substring(this.url.indexOf(".") + 1, this.url.lastIndexOf("."));
    this.getPageInformation(this.url, null);
    this._PactService.getAllLinks(this.url).subscribe(links => {
      this.Links = links.filter(item => {
          return item.indexOf(this.name) >= 0;
      });
      this.totalPages = this.Links.length + 1;
    });
    this.visitedLinksCount = 0;
    this.getLastPageInfo.push('home');
    this.getLastPageInfo.push({'showErrorInfoPage':true});
  }
  ngOnInit() {
  }
  getChanges() {
    if(document.getElementById('table_body')) {
      this.currentTableHeight = document.getElementById('table_body').scrollHeight;
    }
    else{
      this.currentTableHeight = 600;
    }

    if(this.currentTableHeight >600) {
      document.getElementById('tableHeader').style.width = '99.25%';
    }
    else{
      document.getElementById('tableHeader').style.width = '100%';
      document.getElementById('table_div').style.marginRight = '6px';
    }
  }
  public isClickable() {
    alert("Subscribe To avail full features.");
  }
  public getPageInformation(url: any, pageNo: any) {
    this.showBugTracking= false;
    this.showErrorInfoPage = true;
    this.showIntegrationPage = false;
    this.url = url;
    let getVisitedLink = this.visitedLinksArray.includes(pageNo);
    this.visitedLinksArray.push(pageNo);
    if(getVisitedLink) {
    }
    else{
      this.visitedLinksCount = this.visitedLinksCount + 1;
    }
    this.pageNo = pageNo;
    this.showBugReport = true;
    this.search = '';
    this._PactService.getErrorInfoPage(url).subscribe(data => {
      data.map(item => {
        if(item) {
          item['checked'] = false;
        }
      });
      this.errorDescription = this.searchResults = data;
      this.currentPageViolations = data.length;
      this.isLoading = false;
      this.showBugReport = false;
    }),
      (error) => {
        this.isLoading = false;
        this.showBugReport = false;
        alert(error);
      };
  }
  public exportToExcel() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      headers:['Element Source','WCAG 2.0 Conformance Level','WCAG 2.0 Guideline','Findings','Recommended Solution']
    };
    let exportData;
    if(this.showCreateBug) {
      exportData = this.searchResults.filter(item => {
        return item['checked'];
      })
    }
    else{
      exportData = this.errorDescription;
    }
    exportData.map(item => {
       delete item['checked'];
    })
    console.log(exportData);
    new Angular2Csv(exportData, this.name + 'Report', options);
  }
  public exportToPDF() {
    /* this.pdfmake.addText(this.errorDescription);
     this.pdfmake.download();*/
    /* var doc = new jsPDF();
     doc.text(this.errorDescription);
     doc.save('url.pdf');*/
  }

  public searchByTag(searchQuery: any, type: any) {
    if (!searchQuery) {
      this.searchResults = this.errorDescription;
    }
    else {
      this.searchResults = new SearchPipe().transform(searchQuery, type, this.errorDescription);
    }
  }
  public checkAll(event) {
    if (event.target.checked) {
      this.checkedAll = true;
      this.searchResults.map(item => {
        item['checked'] = true;
      });
      this.showCreateBug = true;
      this.selectedBug = this.searchResults;
    }
    else {
      this.checkedAll = false;
      this.searchResults.map(item => {
        item['checked'] = false;
      });
      this.showCreateBug = false;
      this.selectedBug = [];
    }

  }
  public rowCheck(event, data,ind) {
    if (event.target.checked) {
      this.getCheckCount ++;
      data['checked'] = true;
      data['index'] = ind;
      this.selectedBug.push(data);
    }
    else {
      this.getCheckCount --;
      data['checked'] = false;
      var index = this.selectedBug.indexOf(data);
      this.selectedBug.splice(index, 1);
    }
    if(this.getCheckCount > 0){
      this.showCreateBug = true;
    }
    else{
      this.showCreateBug = false;
    }
  }
  public hideBox() {
    this.showFilter = true;
  }
  public filteredLevel(item: any, level: any, event: any, index: any, obj: any) {
    var arr = [];
    if (event.target.checked) {
      this.check[index] = true;
      this.selectedLevel.push(item);
    }
    else {
      this.check[index] = false;
      var index = this.selectedLevel.indexOf(item);
      this.selectedLevel.splice(index, 1);
    }
    if (this.selectedLevel.length > 0) {
      let temp = [];
      for (let key in this.selectedLevel) {
        temp = this.errorDescription.filter(data => {
          return data[level] === this.selectedLevel[key];
        });
        arr = arr.concat(temp);
      }
      this.searchResults = arr;
    }
    else {
      this.searchResults = this.errorDescription;
    }
  }
  public viewSource(url) {
    this._PactService.getViewSource(url).subscribe((res) => {
      this.htmlContent = res['_body'];
      this.htmlContent.replace(/[<>]/g, function (m) { return { '<': '&lt;', '>': '&gt;' }[m] });
      this.modal.open();
    });
  }
  public closeModal() {
    this.modal.close();
  }
  public createBug() {
    this._PactService.setSelectedBug(this.selectedBug);
    this.showBugTracking= true;
    this.showErrorInfoPage = false;
    this.showIntegrationPage = false;
    //this.router.navigate(['layout/bug',{BugTracking:true}],{skipLocationChange:true});
  }
  public logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate([''],{skipLocationChange:true});
  }
  public getBugStatus($event) {
      this.assigned[$event.index] = true;
  }
  public showHome() {
    this.getLastPageInfo.push({'showErrorInfoPage':true});
    /*this.showErrorInfoPage= true;
    this.showBugTracking =false;
    this.showIntegrationPage = false*/
    this.router.navigate(['']);
  }
  public showTrackBugs() {
    this.getLastPageInfo.push({'showBugTracking':true});
    this.showErrorInfoPage= false;
    this.showBugTracking = true;
    this.showIntegrationPage = false;
  }
  public showSettings() {
    this.getLastPageInfo.push({'showIntegrationPage':true});
    this.showIntegrationPage=true;
    this.showErrorInfoPage= false;
    this.showBugTracking =false;
  }
  public navigateToBackPage() {
    this.getLastPageInfo.pop();
   if(this.getLastPageInfo[this.getLastPageInfo.length-1] === 'home') {
     this.router.navigate(['']);
   }
   else{
     this.showIntegrationPage=this.getLastPageInfo[this.getLastPageInfo.length-1].showIntegrationPage;
     this.showErrorInfoPage= this.getLastPageInfo[this.getLastPageInfo.length-1].showErrorInfoPage;
     this.showBugTracking =this.getLastPageInfo[this.getLastPageInfo.length-1].showBugTracking;
   }
  }
  public changeFont(size:any) {
     this.activeFont = size;
  }
}
