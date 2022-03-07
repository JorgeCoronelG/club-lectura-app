import { AuthorsModel } from "./authors.model";
import { LanguageBookEnum } from "../enums/language-book.enum";
import { LiterarySubgenderModel } from "./literary-subgender.model";
import { StatusBookEnum } from "../enums/status-book.enum";

export interface BookPortalModel {
  id: number;
  title: string;
  image: string;
  status: StatusBookEnum.Available | StatusBookEnum.OnLoan;
  authors: AuthorsModel[];
  isbn?: string;
  noPages?: number;
  language?: LanguageBookEnum;
  review?: string;
  literarySubgender?: LiterarySubgenderModel;
  authorsStr: string;
}

export interface MinMaxPagesModel {
  minPages?: number;
  maxPages?: number;
}
