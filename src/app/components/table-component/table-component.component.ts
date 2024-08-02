import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatGridListModule, CommonModule],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss'
})
export class TableComponentComponent {

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  @Input('data') data: any;

  @Input('displayedColumns') displayedColumns: any;

  hidePageSize = true;

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log('child data ==> ', this.data)
    this.data.paginator = this.paginator;
  }

}
