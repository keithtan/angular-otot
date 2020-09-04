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
    console.log('Quote content: ' + form.value.quoteContent);
    this.quoteForm.reset();
  }

}
