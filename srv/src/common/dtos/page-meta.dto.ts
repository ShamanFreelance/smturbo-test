import { PageMetaDtoParameters } from '../interfaces';
import { integerDivision } from '../utils/integerDivision';

export class PageMetaDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly startPagination: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
  readonly hasPreviousTensPages: boolean;
  readonly hasNextTensPages: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.startPagination = integerDivision(this.page, 10) * 10 + 1;
    this.hasPreviousTensPages = this.startPagination - 10 > 0;
    this.hasNextTensPages = this.startPagination + 10 < this.pageCount;
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
