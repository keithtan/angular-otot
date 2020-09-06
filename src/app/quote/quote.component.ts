import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {QuoteService} from '../services/quote.service';
import {Quote} from '../models/quote';
import {QuoteCardComponent} from '../quote-card/quote-card.component';
import {QuoteAddComponent} from '../quote-add/quote-add.component';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quotes: Quote[] = [];
  deleteSuccess = false;
  @ViewChild(QuoteAddComponent) private quoteAddComponent: QuoteAddComponent;
  @ViewChildren(QuoteCardComponent) private quoteCardComponent: QueryList<QuoteCardComponent>;

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.showQuotes();
  }

  fetched(): boolean {
    return this.quotes.length > 0;
  }

  onSuccess(val): boolean {
    return typeof val !== 'string';
  }

  private getQuoteComponent(quoteId: number) {
    return this.quoteCardComponent.find(item => item.quote.id === quoteId);
  }

  private showQuotes() {
    this.quoteService
      .getQuotes()
      .subscribe((data: Quote[]) => {
        this.quotes = data;
      }, error => {
        this.quotes = error;
      });
  }

  onSave(newQuote: Quote) {
    this.quoteAddComponent.saving = true;
    this.quoteService
      .addQuote(newQuote)
      .subscribe(quote => {
        this.quotes.push(quote);
        this.quoteAddComponent.saving = false;
        this.quoteAddComponent.quoteForm.reset();
      });
  }

  onUpdate(updatedQuote: Quote) {
    const quoteCard = this.getQuoteComponent(updatedQuote.id);
    quoteCard.updating = true;
    this.quoteService
      .updateQuote(updatedQuote)
      .subscribe(_ => {
        this.quotes
          .filter(quote => quote.id === updatedQuote.id)
          .map(quote => {
            quote.content = updatedQuote.content;
            quote.author = updatedQuote.author;
            quoteCard.updating = false;
            quoteCard.targetQuote = undefined;
          });
      });
  }

  onDelete(quoteId: number) {
    this.quoteService
      .deleteQuote(quoteId)
      .subscribe(_ => {
        this.quotes = this.quotes
          .filter(quote => quote.id !== quoteId);
        this.deleteSuccess = true;
      });
  }

}
