import { Component, Input } from '@angular/core';
import { StatusBookEnum } from "../../../portal/models/status-book.enum";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input()
  public img!: string;
  @Input()
  public title!: string;
  @Input()
  public author!: string;
  @Input()
  public noAuthors!: number;
  @Input()
  public status!: StatusBookEnum.Available | StatusBookEnum.OnLoan;

  public authorMessageMapping: { [k: string]: string } = { '=1': 'Autor:', 'other': 'Autores:' };

  constructor() {}
}
