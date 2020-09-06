import {Component, OnInit, ViewChild} from '@angular/core';
import {QuoteService} from '../services/quote.service';
import {Quote} from '../models/quote';
import {NgForm} from '@angular/forms';
import {QuoteCardComponent} from '../quote-card/quote-card.component';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quotes: Quote[] = [];
  @ViewChild('ref') quoteForm: NgForm;
  @ViewChild(QuoteCardComponent) private quoteCardComponent: QuoteCardComponent;
  deleteSuccess = false;

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    console.log(this.quotes);
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

  fetched(): boolean {
    return this.quotes.length > 0;
  }

  onSuccess(val): boolean {
    return typeof val !== 'string';
  }

  onUpdate(updatedQuote: Quote) {
    this.quoteCardComponent.updating = true;
    this.quoteService.updateQuote(updatedQuote)
      .subscribe(_ => {
        this.quotes.filter(quote => quote.id === updatedQuote.id)
          .map(quote => {
            console.log(quote);
            quote.content = updatedQuote.content;
            quote.author = updatedQuote.author;
            this.quoteCardComponent.updating = false;
          });
        this.quoteCardComponent.targetQuote = undefined;
      });
  }

  onDelete(quoteId: number) {
    console.log(quoteId);
    this.quoteService.deleteQuote(quoteId)
      .subscribe(_ => {
        this.quotes = this.quotes
          .filter(quote => quote.id !== quoteId);
        this.deleteSuccess = true;
      });
  }

}
