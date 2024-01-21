import { TestBed } from '@angular/core/testing';
import { PolishPaginationService } from './polish-pagination.service';

describe('PolishPaginationService', () => {
  let service: PolishPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolishPaginationService],
    });
    service = TestBed.inject(PolishPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default labels', () => {
    expect(service.firstPageLabel).toEqual('Pierwsza strona');
    expect(service.itemsPerPageLabel).toEqual('Elementów na stronę:');
    expect(service.lastPageLabel).toEqual('Ostatnia strona');
    expect(service.nextPageLabel).toEqual('Następna strona');
    expect(service.previousPageLabel).toEqual('Poprzednia strona');
  });

  it('should generate range label correctly when length is 0', () => {
    const page = 0;
    const pageSize = 10;
    const length = 0;
    const rangeLabel = service.getRangeLabel(page, pageSize, length);
    expect(rangeLabel).toEqual('Strona 1 z 1');
  });

  it('should generate range label correctly when length is greater than 0', () => {
    const page = 2;
    const pageSize = 10;
    const length = 25;
    const rangeLabel = service.getRangeLabel(page, pageSize, length);
    expect(rangeLabel).toEqual('Strona 3 z 3');
  });
});
