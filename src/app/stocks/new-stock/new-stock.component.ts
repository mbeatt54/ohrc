import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stock } from 'src/app/_models/stock.model';
import { StocksService } from 'src/app/_services/stocks.service';
import { StocksComponent } from '../stocks.component';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.css'],
})
export class NewStockComponent implements OnInit {
  newStockForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewStockComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Stock,
    private stockService: StocksService
  ) {}

  ngOnInit(): void {
    this.newStockForm = new FormGroup({
      certificateNumber: new FormControl('2022001', { validators: [Validators.required] }),
      numberOfShares: new FormControl('1', { validators: [Validators.required] }),
      name: new FormControl('Girl Smith', { validators: [Validators.required] }),
      issueDate: new FormControl(new Date(), { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    this.dialogRef.close(this.newStockForm.value);
    this.stockService.addStock(this.newStockForm.value).then(() => this.newStockForm.reset());
  }

  onCancel() {
    this.dialogRef.close();
  }
}
