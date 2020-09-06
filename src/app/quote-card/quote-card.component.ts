import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';
import {Quote} from '../models/quote';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css']
})
export class QuoteCardComponent {
  targetQuote: Quote;
  updating = false;
  @Input() quotes: Quote[];
  @Output() updated = new EventEmitter<Quote>();
  @Output() deleted = new EventEmitter<number>();

  constructor(private modalService: NgbModal) { }

  update(quote: Quote) {
    this.targetQuote = quote;
  }

  isEditing(quoteId: number): boolean {
    if (this.targetQuote === undefined) {
      return false;
    }
    return this.targetQuote.id === quoteId;
  }

  onUpdate(form: NgForm) {
    const content = form.value.quoteContent;
    const author = form.value.authorContent;
    const id = this.targetQuote.id;
    const updatedQuote = new Quote(content, author, id);
    this.updated.emit(updatedQuote);
  }

  openModal(quoteId: number) {
    this.modalService
      .open(DeleteModalComponent)
      .result
      .then((result) => {
        if (result === 'Delete') {
          this.deleted.emit(quoteId);
        }
      });
  }
}
