import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { Filters, TypesEnum } from "../../../../core/models/filters";
import { HeaderColumnsTable } from "../../../../core/models/header-columns-table";
import { ListResponse, Meta } from "../../../../core/models/list-response";
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
    //
  }

  public delete(id: number) {
    //
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
