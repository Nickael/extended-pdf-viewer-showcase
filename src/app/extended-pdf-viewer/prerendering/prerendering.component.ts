import { Component } from '@angular/core';
import {
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
} from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-prerendering',
  templateUrl: './prerendering.component.html',
  styleUrls: ['./prerendering.component.css'],
})
export class PrerenderingComponent {
  public spreadMode: 'off' | 'even' | 'odd' = 'off';

  public page: number = 17;

  public pageLabel: string = '';

  public prerenderedPages = '';

  public currentlyRenderedPages = '';

  public currentlyRequestedPage: string | number = '(none)';

  public pagesToRender = '(none)';

  public visiblePages = '';

  constructor(private pdfViewerService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.ignoreDestinationZoom = true;
  }

  public onPageRendered(): void {
    if (!this.pdfViewerService.isRenderQueueEmpty()) {
      // try again later when the pages requested by the pdf.js core or the user have been rendered
      setTimeout(() => this.onPageRendered(), 100);
    }

    const pagesBefore = this.spreadMode === 'off' ? 2 : 2;
    const pagesAfter = this.spreadMode === 'off' ? 2 : 5;
    let startPage = Math.max(this.page - pagesBefore, 1);
    let endPage = Math.min(
      this.page + pagesAfter,
      this.pdfViewerService.numberOfPages()
    );

    let finished = true;
    for (let page = startPage; page <= endPage; page++) {
      const pageIndex = page - 1;
      if (!this.pdfViewerService.hasPageBeenRendered(pageIndex)) {
        this.pdfViewerService.addPageToRenderQueue(pageIndex);
        this.statistics(pageIndex + 1, `${startPage} -> ${endPage}`);
        finished = false;
        break;
      }
    }
    if (finished) {
      this.statistics('(none)', `${startPage} -> ${endPage}`);
    }
  }

  private statistics(
    requestedPage: number | string,
    pagesToRender: string
  ): void {
    this.currentlyRenderedPages = String(
      this.pdfViewerService.currentlyRenderedPages()
    ).replace(/,/g, ', ');
    this.currentlyRequestedPage = requestedPage;
    this.pagesToRender = pagesToRender;
    this.visiblePages = String(
      this.pdfViewerService.getCurrentlyVisiblePageNumbers()
    ).replace(',', ', ');
  }
}