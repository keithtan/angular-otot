import {Component, OnInit, ViewChild} from '@angular/core';
import {QuoteService} from '../services/quote.service';
import {Quote} from '../models/quote';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quotes: Quote[] = [];
  @ViewChild('ref') quoteForm: NgForm;
  targetQuote: Quote;
  updating = false;

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

  onSave(form: NgForm) {
    const content = form.value.quoteContent;
    const author = form.value.authorContent;
    const quote = new Quote(content, author);
    console.log(quote);
    this.quoteService
      .addQuote(quote)
      .subscribe(newQuote => this.quotes.push(newQuote));
    this.quoteForm.reset();
  }

  onUpdate(form: NgForm) {
    this.updating = true;
    const content = form.value.quoteContent;
    const author = form.value.authorContent;
    const id = this.targetQuote.id;
    const updatedQuote = new Quote(content, author, id);
    console.log(updatedQuote);
    this.quoteService.updateQuote(updatedQuote)
      .subscribe(_ => {
        this.quotes.filter(quote => quote.id === id)
          .map(quote => {
            console.log(quote);
            quote.content = content;
            quote.author = author;
            this.updating = false;
          });
        this.targetQuote = undefined;
      });
  }

  update(quote: Quote) {
    this.targetQuote = quote;
  }

  isEditing(quoteId: number): boolean {
    if (this.targetQuote === undefined) {
      return false;
    }
    return this.targetQuote.id === quoteId;
  }

  delete(quoteId: number) {
    console.log(quoteId);
  }

}
