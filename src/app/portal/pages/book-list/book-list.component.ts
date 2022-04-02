import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Filters, TypesEnum } from "../../../core/models/filters";
import { ListResponse, Meta } from "../../../core/models/list-response";
import { MinMaxPagesModel, BookPortalModel } from "../../models/book-portal.model";
import { LanguageBookEnum } from "../../enums/language-book.enum";
import { LiteraryGenderModel } from "../../models/literary-gender.model";
import { StatusBookEnum } from "../../enums/status-book.enum";
import { BookPortalService } from "../../services/book-portal.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  public languageForm: FormGroup;
  public statusForm: FormGroup;
  public literaryGenderControl: FormControl = new FormControl();

  public booksResponse?: ListResponse<BookPortalModel>;
  public literaryGenders: LiteraryGenderModel[] = [];
  public minMaxPages?: MinMaxPagesModel;
  public filters: Filters = { filters: [] };

  public search: string = '';
  public orderBy: string = '-created_at';
  public noPagesSlides: number = 0;
  public orderBySelectOptions: { value: string, text: string }[] = [
    { value: 'title', text: 'Título - A a la Z' },
    { value: '-title', text: 'Título - Z a la A' },
    { value: 'created_at', text: 'Del más viejo al más nuevo' },
    { value: '-created_at', text: 'Del más nuevo al más viejo' }
  ];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private bookPortalService: BookPortalService,
              private toastr: ToastrService) {
    this.languageForm = this.formBuilder.group({
      spanish: false,
      english: false
    });

    this.statusForm = this.formBuilder.group({
      available: false,
      onLoan: false
    });
  }

  ngOnInit(): void {
    this.bookPortalService.combineRequestListBook(this.orderBy)
      .subscribe(([bookListResponse, minMaxPages, literaryGenders]) => {
        this.booksResponse = bookListResponse;
        this.minMaxPages = minMaxPages;
        this.literaryGenders = literaryGenders;

        this.noPagesSlides = minMaxPages.minPages!;

        if (bookListResponse.data!.length === 0) {
          this.toastr.info('No hay registros de libros', 'Información');
        }
      });
  }

  public searchOptions(): void {
    this.prepareFilters();
  }

  public paginatorChanges(meta: Meta): void {
    this.booksResponse!.meta = meta;
    this.prepareFilters();
  }

  public itemClick(id: number): void {
    this.router.navigate(['/portal/libro', id]);
  }

  private prepareFilters(): void {
    this.clearFilters();

    // Filtro general de libro o autor
    if (this.search.length > 0) {
      this.generateFilter('searchGeneral', TypesEnum.String, this.search);
    }

    // Filtro para el idioma
    let languageFilter: number[] = [];
    if (this.languageForm.get('spanish')?.value) {
      languageFilter.push(LanguageBookEnum.Spanish);
    }
    if (this.languageForm.get('english')?.value) {
      languageFilter.push(LanguageBookEnum.English);
    }
    if (languageFilter.length > 0) {
      this.generateFilter('language', TypesEnum.Array, languageFilter);
    }

    // Filtro para el estatus
    let statusFilter: number[] = [];
    if (this.statusForm.get('available')?.value) {
      statusFilter.push(StatusBookEnum.Available);
    }
    if (this.statusForm.get('onLoan')?.value) {
      statusFilter.push(StatusBookEnum.OnLoan);
    }
    if (statusFilter.length > 0) {
      this.generateFilter('status', TypesEnum.Array, statusFilter);
    }

    // Filtro para el subgénero
    if (this.literaryGenderControl.value && this.literaryGenderControl.value.length > 0) {
      this.generateFilter('literarySubgender', TypesEnum.Array, this.literaryGenderControl.value);
    }

    // Filtro para el # de páginas
    if (this.noPagesSlides > this.minMaxPages?.minPages!) {
      this.generateFilter('noPageMin', TypesEnum.Int, this.minMaxPages?.minPages);
      this.generateFilter('noPageMax', TypesEnum.Int, this.noPagesSlides);
    }

    this.findAll();
  }

  private findAll(): void {
    const searchQuery = (this.filters.filters.length === 0) ? '' : JSON.stringify(this.filters);
    const { current_page, per_page } = this.booksResponse?.meta!;
    this.bookPortalService.findAll(this.orderBy, per_page, current_page, searchQuery).subscribe(booksResponse => {
      this.booksResponse = booksResponse;
    });
  }

  private clearFilters(): void {
    this.filters = { filters: [] };
  }

  private generateFilter(field: string, type: TypesEnum, value: any): void {
    this.filters.filters?.push({ field, type, value });
  }
}
