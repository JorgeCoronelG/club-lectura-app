import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookPortalModel } from "../../models/book-portal.model";
import { BookPortalService } from "../../services/book-portal.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  public latestBooks: BookPortalModel[] = [];
  public mostReadBooks: BookPortalModel[] = [];

  constructor(private bookPortalService: BookPortalService) {}

  ngOnInit(): void {
    this.bookPortalService.findAllIndex().subscribe(([latestBooks, mostReadBooks]) => {
      this.latestBooks = latestBooks;
      this.mostReadBooks = mostReadBooks;
    });
  }
}
