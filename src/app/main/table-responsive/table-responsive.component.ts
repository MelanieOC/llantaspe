import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MediaqueryService } from 'src/app/services/mediaquery.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableResponsiveComponent implements OnInit {
  @Input() data: any[]
  @Input() columns: any[]

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = []

  cols: any[]

  @ViewChild('paginator', { static: false }) set content(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set content2(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  expandedElement = null;

  private mediaService = new MediaqueryService('(min-width: 600px)');
  isDesktop: boolean;


  constructor() { }

  ngOnInit(): void {
    
    this.cols = this.columns.slice(2, this.columns.length)
    this.mediaService.match$.pipe(take(1)).subscribe(value => {
      this.isDesktop = value
      if (value) {
        this.displayedColumns = this.columns.map(el => el.slug)
      } else {
        this.displayedColumns = this.columns.slice(0, 2).map(el => el.slug)
      }
    });
  }

  ngOnChanges(){
    this.dataSource.data = this.data
  }

  expand(row) {
    console.log(this.isDesktop)
    if (!this.isDesktop) {
      this.expandedElement = this.expandedElement === row ? null : row
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
