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
import {
  LiteraryGenderDetailComponent
} from "../../components/literary-gender-detail/literary-gender-detail.component";
import { LiteraryGenderModel } from "../../models/literary-gender.model";
import { LiteraryGenderService } from "../../services/literary-gender.service";

@Component({
  selector: 'app-literary-gender-maintenance',
  templateUrl: './literary-gender-maintenance.component.html',
  styleUrls: ['./literary-gender-maintenance.component.scss']
})
export class LiteraryGenderMaintenanceComponent implements OnInit {
  public literaryGenderResponse?: ListResponse<LiteraryGenderModel>;
  public data?: MatTableDataSource<LiteraryGenderModel>;

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

  constructor(private literaryGenderService: LiteraryGenderService,
              private dialog: MatDialog,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.findAll();
  }

  public openDialog(id?: number): void {
    if (!id) {
      const dialogRef = this.dialog.open(LiteraryGenderDetailComponent, {
        width: '350px',
        data: null
      });

      dialogRef.afterClosed().subscribe(refresh => {
        if (refresh) {
          this.prepareFilters();
        }
      });
    } else {
      this.literaryGenderService.findById(id).subscribe(literaryGender => {
        const dialogRef = this.dialog.open(LiteraryGenderDetailComponent, {
          width: '350px',
          data: literaryGender
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
      switchMap(confirm =>  (confirm) ? this.literaryGenderService.delete(id) : of(false)),
      delay(100)
    ).subscribe(confirm => {
      if (confirm) {
        this.toastr.success(`Género literario eliminado.`, 'Proceso exitoso');
        this.prepareFilters();
      }
    });
  }

  public paginatorChanges(meta: Meta): void {
    this.literaryGenderResponse!.meta = meta;
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
      this.generateFilter('name', TypesEnum.String, this.search.trim());

      if (this.literaryGenderResponse?.meta) {
        this.literaryGenderResponse.meta.currentPage = 1;
      }
    }

    this.findAll();
  }

  private findAll(): void {
    const searchQuery = (this.filters.filters.length === 0) ? '' : JSON.stringify(this.filters);
    let currentPageInit = 1;
    let perPageInit = 5;
    if (this.literaryGenderResponse?.meta) {
      const { currentPage, perPage } = this.literaryGenderResponse?.meta;
      currentPageInit = currentPage!;
      perPageInit = perPage!;
    }

    this.literaryGenderService.findAll(this.orderBy, perPageInit, currentPageInit, searchQuery).subscribe(literaryGenderResponse => {
      this.literaryGenderResponse = literaryGenderResponse;
      this.data = new MatTableDataSource<LiteraryGenderModel>(literaryGenderResponse.data);
    });
  }

  private clearFilters(): void {
    this.filters = { filters: [] };
  }

  private generateFilter(field: string, type: TypesEnum, value: any): void {
    this.filters.filters?.push({ field, type, value });
  }
}
