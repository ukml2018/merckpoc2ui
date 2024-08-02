import { ChangeDetectorRef, Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { poc2DummyData2, TableData } from './constants/tabledata';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { QueryService } from './services/query.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { randomJson } from './constants/tabledata';
import { randomJson2 } from './constants/tabledata';
import { randomJson3 } from './constants/tabledata';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { watsonData } from './constants/tabledata';
import { poc2Data } from './constants/tabledata';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { response } from 'express';
import { poc2NewData, poc2DummyData } from './constants/tabledata';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatGridListModule, HttpClientModule, CommonModule, MatProgressSpinnerModule, TableComponentComponent ],
  providers:[QueryService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  displayedColumns!: string[];
  isString = true;  
  data = new MatTableDataSource();
  // data!: any;
  hidePageSize = true;
  query = '';
  queryResp:any;
  isLoading = false;
  sqlData = '';
  isTableData = false;

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  // set paginator(value: MatPaginator) {
  //   this.data.paginator = value;
  // }

  @ViewChild('message') message!:ElementRef

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  onSubmit() {

  }

  setQuery() {
    this.isLoading = true;
    this.query = this.message.nativeElement.value;

    this.message.nativeElement.value = '';
    this.message.nativeElement.disabled = true;
    
    
    this.fetchData(this.query);
    
  }

  fetchData(query:string) {
    this.query = query;
    this.isLoading = true;
    this.isTableData = false;
    this.sqlData = '';
    this.queryResp = '';
    this.isString = true;
    this.chRef.detectChanges();
    
    this.queryService.callConverse(query).subscribe({
      next : response => {
      this.formatData(response);
    },
    complete: () => {
      this.isLoading = false;
      this.message.nativeElement.disabled = false;
      this.chRef.detectChanges();
    },
    error: (e) => {
      console.log(e);
      this.isLoading = false;
      this.message.nativeElement.disabled = false;
      this.chRef.detectChanges();
    }
    });
  }

  formatData(response: any) {

    let pocData = response.TABLEDATA;
    this.sqlData = response.SQL;
    const keydata =  response.KEY;

    if(keydata) {
      this.isTableData = true;
      this.isString = false;

      const data1 = eval(pocData);
      this.data = new MatTableDataSource(data1);

      this.data.paginator = this.paginator;
      this.data.sort = this.sort;

      this.chRef.detectChanges();

      if(Array.isArray(data1)){
        this.displayedColumns = Object.keys(data1[0]);
      }
    }
    else {
      this.isTableData = false;
      this.isString = true;
      this.queryResp = pocData;
    }
  }
  
  constructor(private queryService:QueryService, private chRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    const _self = this;
    (window as any).watsonAssistantChatOptions = {
      integrationID: '8766f149-a178-4ad0-af09-ce115de30f2a', // The UUID from the IBM Watson Assistant embed code
      region: 'us-south', // The region e.g. 'us-south', 'us-east', 'jp-tok', 'au-syd', 'eu-gb', 'eu-de', etc.
      serviceInstanceID: '0ee5cd1c-3904-4697-8867-5ac7d42c8da8', // The UUID from the IBM Watson Assistant embed code
      onLoad: async (instance: { on: (arg0: { type: string; handler: (event: any) => void; }) => void; render: () => any; }) => {
        
        const self = _self;
        instance.on({ type: 'receive', handler: (event: any) => {
            // console.log('I received a message!', event);
            // update Question
            if(event.data.context.skills['actions skill'].skill_variables && event.data.context.skills['actions skill'].skill_variables.chat_history.length > 0) {
              const length = event.data.context.skills['actions skill'].skill_variables.chat_history.length;
              const value = event.data.context.skills['actions skill'].skill_variables.chat_history[length-1];

              self.query = value;
              self.message.nativeElement.value = value;
              self.setQuery();
            }
                    
          }
        });

        // Render the chat instance
        await instance.render();
      }
    };

    setTimeout(() => {
      const t = document.createElement('script');
      t.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/' + ((window as any).watsonAssistantChatOptions.clientVersion || 'latest') + '/WatsonAssistantChatEntry.js';
      document.head.appendChild(t);
    });

  }

  preventSubmission() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    });
  }
  
}
