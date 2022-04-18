import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Stock } from '../_models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  constructor(private db: Firestore) {}

  getStocks() {
    const stocksRef = collection(this.db, 'stocks');
    return collectionData(stocksRef, { idField: 'id' }) as Observable<Stock[]>;
  }

  addStock(stock: Stock) {
    const stocksRef = collection(this.db, 'stocks');
    return addDoc(stocksRef, stock);
  }
}
