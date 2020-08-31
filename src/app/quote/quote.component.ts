import { Component, OnInit } from '@angular/core';
import {QuoteService} from '../services/quote.service';
import {Quote} from '../models/quote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quotes: Quote[];

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    console.log('there');
    this.showQuotes();
  }

  private showQuotes() {
    this.quoteService.getQuotes()
      .subscribe((data: Quote[]) => {
        console.log('hey ' + data);
        this.quotes = data;
      }, error => {
        this.quotes = error;
      });
  }

  onSuccess(val): boolean {
    return typeof val !== 'string';
  }

}
