import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Quote} from '../models/quote';
import {QuoteService} from '../services/quote.service';

@Component({
  selector: 'app-quote-add',
  templateUrl: './quote-add.component.html',
  styleUrls: ['./quote-add.component.css']
})
export class QuoteAddComponent implements OnInit {
  saving = false;
  @Input() quotes: Quote[];
  @ViewChild('ref') quoteForm: NgForm;

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
  }

  onSave(form: NgForm) {
    this.saving = true;
    const content = form.value.quoteContent;
    const author = form.value.authorContent;
    const quote = new Quote(content, author);
    console.log(quote);
    this.quoteService
      .addQuote(quote)
      .subscribe(newQuote => {
        this.quotes.push(newQuote);
        this.saving = false;
      });
    this.quoteForm.reset();
  }

}
