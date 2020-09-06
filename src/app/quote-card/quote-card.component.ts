import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';
import {Quote} from '../models/quote';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css']
})
export class QuoteCardComponent implements OnInit {
  @Input() quote: Quote;
  @Output() updated = new EventEmitter<Quote>();
  @Output() deleted = new EventEmitter<number>();
  targetQuote: Quote;
  updating = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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

  onUpdate(form: NgForm) {
    const content = form.value.quoteContent;
    const author = form.value.authorContent;
    const id = this.targetQuote.id;
    const updatedQuote = new Quote(content, author, id);
    this.updated.emit(updatedQuote);
  }

  openModal(quoteId: number) {
    this.modalService.open(DeleteModalComponent).result
      .then((result) => {
        if (result === 'Delete') {
          console.log(result);
          this.deleted.emit(quoteId);
        }
      });
  }

}
