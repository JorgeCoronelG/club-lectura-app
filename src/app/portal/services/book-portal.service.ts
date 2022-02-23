import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, tap, combineLatestAll, scheduled, asyncScheduler } from "rxjs";
import { map } from "rxjs/operators";
import { ListResponse } from "../../core/models/list-response";
import { EnvironmentService } from "../../core/services/environment.service";
import { BookPortalModel } from "../models/book-portal.model";

@Injectable({
  providedIn: 'root'
})
export class BookPortalService {
  constructor(private environmentService: EnvironmentService,
              private http: HttpClient) {}

  public findLatest(): Observable<BookPortalModel[]> {
    const url = `${this.environmentService.environmentApi}/portal/books/latest`;
    return this.http.get<ListResponse<BookPortalModel>>(url)
      .pipe(
        map(res => res.data!),
        tap(this.getAuthorStrCard)
      )
  }

  public findMostRead(): Observable<BookPortalModel[]> {
    const url = `${this.environmentService.environmentApi}/portal/books/most-read`;
    return this.http.get<ListResponse<BookPortalModel>>(url)
      .pipe(
        map(res => res.data!),
        tap(this.getAuthorStrCard)
      )
  }

  public findAllIndex(): Observable<BookPortalModel[][]> {
    return scheduled([this.findLatest(), this.findMostRead()], asyncScheduler)
      .pipe(
        combineLatestAll()
      );
  }

  private getAuthorStrCard(books: BookPortalModel[]): void {
    books.forEach(book => {
      let authorArray: string[] = [];
      book.authors.forEach(author => {
        const authorSplit = author.name.split(' ');
        if (authorSplit.length >= 2) {
          authorArray.push(`${authorSplit[0]} ${authorSplit[1]}`);
        } else {
          authorArray.push(authorSplit[1]);
        }
      });
      book.authorsStr = authorArray.join(', ');
    });
  }
}
