import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { of, delay } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Filters, TypesEnum } from "../../../../core/models/filters";
import { HeaderColumnsTable } from "../../../../core/models/header-columns-table";
import { ListResponse, Meta } from "../../../../core/models/list-response";
import { DeleteConfirmComponent } from "../../../../shared/components/delete-confirm/delete-confirm.component";
import { AuthorDetailComponent } from "../../components/author-detail/author-detail.component";
import { AuthorModel } from "../../models/author.model";
import { AuthorService } from "../../services/author.service";

@Component({
  selector: 'app-author-maintenance',
  templateUrl: './author-maintenance.component.html',
  styleUrls: ['./author-maintenance.component.scss']
})
export class AuthorMaintenanceComponent implements OnInit {
  public authorResponse?: ListResponse<AuthorModel>;
  public data?: MatTableDataSource<AuthorModel>;

  public filters: Filters = { filters: [] };
  public search: string = '';
  public orderBy: string = '-id';
  public columns: HeaderColumnsTable[] = [
    { column: 'name', isSortable: true },
    { column: 'actions', isSortable: false }
  ];
  public columnsTitle: any = {
    name: 'Nombre'
  };

  constructor(private authorService: AuthorService,
              private dialog: MatDialog,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.findAll();
  }

  public openDialog(id?: number): void {
    if (!id) {
      // Registro nuevo
      const dialogRef = this.dialog.open(AuthorDetailComponent, {
        width: '350px',
        data: null
      });

      dialogRef.afterClosed().subscribe(refresh => {
        if (refresh) {
          this.prepareFilters();
        }
      });
    } else {
      // Registro existente
      this.authorService.findById(id).subscribe(author => {
        const dialogRef = this.dialog.open(AuthorDetailComponent, {
          width: '350px',
          data: author
        });

        dialogRef.afterClosed().subscribe(refresh => {
          if (refresh) {
            this.prepareFilters();
          }
        });
      });
    }
  }

  public delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().pipe(
      switchMap(confirm =>  (confirm) ? this.authorService.delete(id) : of(false)),
      delay(100)
    ).subscribe(confirm => {
      if (confirm) {
        this.toastr.success(`Autor eliminado.`, 'Proceso exitoso');
        this.prepareFilters();
      }
    });
  }

  public paginatorChanges(meta: Meta): void {
    this.authorResponse!.meta = meta;
    this.prepareFilters();
  }

  public sort(orderBy: string): void {
    this.orderBy = (orderBy.length === 0) ? '-id' : orderBy;
    this.prepareFilters();
  }

  public searchOptions(): void {
    this.prepareFilters();
  }

  private prepareFilters(): void {
    this.clearFilters();

    // Filtro para el nombre
    if (this.search.trim().length > 0) {
      this.generateFilter('name', TypesEnum.String, this.search);

      if (this.authorResponse?.meta) {
        this.authorResponse.meta.currentPage = 1;
      }
    }

    this.findAll();
  }

  private findAll(): void {
    const searchQuery = (this.filters.filters.length === 0) ? '' : JSON.stringify(this.filters);
    let currentPageInit = 1;
    let perPageInit = 5;
    if (this.authorResponse?.meta) {
      const { currentPage, perPage } = this.authorResponse?.meta;
      currentPageInit = currentPage!;
      perPageInit = perPage!;
    }

    this.authorService.findAll(this.orderBy, perPageInit, currentPageInit, searchQuery).subscribe(authorResponse => {
      this.authorResponse = authorResponse;
      this.data = new MatTableDataSource<AuthorModel>(authorResponse.data);
    });
  }

  private clearFilters(): void {
    this.filters = { filters: [] };
  }

  private generateFilter(field: string, type: TypesEnum, value: any): void {
    this.filters.filters?.push({ field, type, value });
  }
}
