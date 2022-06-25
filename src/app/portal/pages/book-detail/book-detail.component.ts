import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { I18nPlural } from "../../../core/models";
import { LanguageBookNameEnum, LanguageBookEnum } from "../../enums/language-book.enum";
import { StatusBookEnum, StatusBookNameEnum } from "../../enums/status-book.enum";
import { BookPortalModel } from "../../models/book-portal.model";
import { BookPortalService } from "../../services/book-portal.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  public book?: BookPortalModel;
  public authorMessageMapping: I18nPlural = { '=1': 'Autor:', 'other': 'Autores:' };
  public languageBook: string = '';
  public _statusBook: string = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private bookPortalService: BookPortalService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.findBookById(id));
  }

  get statusBook(): typeof StatusBookEnum {
    return StatusBookEnum;
  }

  public redirect(): void {
    this.router.navigateByUrl('/portal');
  }

  private findBookById(id: number): void {
    this.bookPortalService.findById(id).subscribe({
      next: (book) => {
        this.book = book
        this.languageBook = LanguageBookNameEnum[LanguageBookEnum[book.language!] as keyof typeof LanguageBookNameEnum];
        this._statusBook = StatusBookNameEnum[StatusBookEnum[book.status] as keyof typeof StatusBookNameEnum];
      },
      error: () => this.redirect()
    });
  }
}
