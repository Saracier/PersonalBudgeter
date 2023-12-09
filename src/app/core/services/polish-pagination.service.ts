import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class PolishPaginationService implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = $localize`Pierwsza strona`;
  itemsPerPageLabel = $localize`Elemtntów na stronę:`;
  lastPageLabel = $localize`Ostatnia strona`;
  nextPageLabel = 'Następna strona';
  previousPageLabel = 'Poprzednia strona';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Strona 1 z 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Strona ${page + 1} z ${amountPages}`;
  }
}
