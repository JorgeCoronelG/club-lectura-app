import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { Filters, TypesEnum } from "../../../../core/models/filters";
import { HeaderColumnsTable } from "../../../../core/models/header-columns-table";
import { ListResponse, Meta } from "../../../../core/models/list-response";
import { convertCamelCaseToSnakeCase } from "../../../../core/utils/utils";
import { UserDetailComponent } from "../../components/user-detail/user-detail.component";
import { UserModel } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-maintenance',
  templateUrl: './user-maintenance.component.html',
  styleUrls: ['./user-maintenance.component.scss']
})
export class UserMaintenanceComponent implements OnInit {
  public userResponse?: ListResponse<UserModel>;
  public data?: MatTableDataSource<UserModel>;

  public filters: Filters = { filters: [] };
  public search: string = '';
  public orderBy: string = '-id';
  public columns: HeaderColumnsTable[] = [
    { column: 'code', isSortable: true },
    { column: 'completeName', isSortable: true },
    { column: 'email', isSortable: true },
    { column: 'phone', isSortable: false },
    { column: 'statusStr', isSortable: true },
    { column: 'actions', isSortable: false }
  ];
  public columnsTitle: any = {
    code: 'Código',
    completeName: 'Nombre',
    email: 'Correo',
    phone: 'Teléfono',
    statusStr: 'Estatus'
  };

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.findAll();
  }

  public openDialog(id?: number): void {
    if (!id) {
      const dialogRef = this.dialog.open(UserDetailComponent, {
        width: '100%',
        data: null
      });
    } else {
      //
    }
  }

  public delete(id: number) {
    //
  }

  public paginatorChanges(meta: Meta): void {
    this.userResponse!.meta = meta;
    this.prepareFilters();
  }

  public sort(orderBy: string): void {
    this.orderBy = (orderBy.length === 0) ? '-id' : convertCamelCaseToSnakeCase(orderBy);
    this.prepareFilters();
  }

  public searchOptions(): void {
    this.prepareFilters();
  }

  private prepareFilters(): void {
    this.clearFilters();

    if (this.search.trim().length > 0) {
      this.generateFilter('code', TypesEnum.String, this.search);
      this.generateFilter('completeName', TypesEnum.String, this.search);
      this.generateFilter('email', TypesEnum.String, this.search);

      if (this.userResponse?.meta) {
        this.userResponse.meta.currentPage = 1;
      }
    }

    this.findAll();
  }

  private findAll(): void {
    const searchQuery = (this.filters.filters.length === 0) ? '' : JSON.stringify(this.filters);
    let currentPageInit = 1;
    let perPageInit = 5;
    if (this.userResponse?.meta) {
      const { currentPage, perPage } = this.userResponse?.meta;
      currentPageInit = currentPage!;
      perPageInit = perPage!;
    }

    this.userService.findAll(this.orderBy, perPageInit, currentPageInit, searchQuery).subscribe(userResponse => {
      this.userResponse = userResponse;
      this.data = new MatTableDataSource<UserModel>(userResponse.data);
    });
  }

  private clearFilters(): void {
    this.filters = { filters: [] };
  }

  private generateFilter(field: string, type: TypesEnum, value: any): void {
    this.filters.filters?.push({ field, type, value });
  }
}
