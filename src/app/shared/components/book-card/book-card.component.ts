import { Component, Input } from '@angular/core';
import { I18nPlural } from "../../../core/models";
import { StatusBookEnum, StatusBookNameEnum } from "../../../portal/enums/status-book.enum";

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
  set status(status: StatusBookEnum.Available | StatusBookEnum.OnLoan) {
    this._status = status;
    this._statusName = StatusBookNameEnum[StatusBookEnum[status] as keyof typeof StatusBookNameEnum];
  }

  public _status!: StatusBookEnum.Available | StatusBookEnum.OnLoan;
  public _statusName: string = '';

  public authorMessageMapping: I18nPlural = { '=1': 'Autor:', 'other': 'Autores:' };

  constructor() {}

  get statusBook(): typeof StatusBookEnum {
    return StatusBookEnum;
  }
}
