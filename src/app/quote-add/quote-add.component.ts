import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Quote} from '../models/quote';

@Component({
  selector: 'app-quote-add',
  templateUrl: './quote-add.component.html',
  styleUrls: ['./quote-add.component.css']
})
export class QuoteAddComponent {
  @ViewChild('ref') quoteForm: NgForm;
  @Input() quotes: Quote[];
  @Output() saved = new EventEmitter<Quote>();
  saving = false;

  constructor() { }

  onSave(form: NgForm) {
    const content = form.value.quoteContent;
    const author = form.value.authorContent;
    const newQuote = new Quote(content, author);
    this.saved.emit(newQuote);
  }

}
