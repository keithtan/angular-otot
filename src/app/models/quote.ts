export class Quote {
  id: number;
  content: string;
  author: string;

  constructor(content, author, id = null) {
    this.content = content;
    this.author = author;
    this.id = id;
  }

}
