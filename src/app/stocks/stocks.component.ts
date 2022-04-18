import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Stock } from '../_models/stock.model';
import { StocksService } from '../_services/stocks.service';
import { NewStockComponent } from './new-stock/new-stock.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['certificateNumber', 'issueDate', 'numberOfShares', 'name'];
  dataSource = new MatTableDataSource<Partial<Stock>>();

  constructor(private stockService: StocksService, private newStockDialog: MatDialog) {}

  ngOnInit(): void {
    this.stockService.getStocks().subscribe((stocks) => {
      console.log('stocks', stocks);
      this.dataSource.data = stocks;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterData(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  openNewStockDialog() {
    const dialogRef = this.newStockDialog.open(NewStockComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed dialog: ', result);
    });
  }
}
