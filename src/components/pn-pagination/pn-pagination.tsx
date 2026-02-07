import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'pn-pagination',
  styleUrl: 'pn-pagination.scss',
  shadow: false,
})
export class PnPagination {
  @Prop({ mutable: true }) currentPage: number = 1;
  @Prop() totalPages: number = 1;
  @Prop() siblingCount: number = 1;
  @Prop() showFirstLast: boolean = true;
  @Prop() showPrevNext: boolean = true;
  @Prop() compact: boolean = false;
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  @Event() pnPageChange: EventEmitter<{ page: number }>;

  private goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.pnPageChange.emit({ page });
  }

  private getPages(): (number | '...')[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const siblings = this.siblingCount;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < total - 1;

    const pages: (number | '...')[] = [];

    pages.push(1);

    if (showLeftDots) {
      pages.push('...');
    } else {
      for (let i = 2; i < leftSibling; i++) {
        pages.push(i);
      }
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== total) {
        pages.push(i);
      }
    }

    if (showRightDots) {
      pages.push('...');
    } else {
      for (let i = rightSibling + 1; i < total; i++) {
        pages.push(i);
      }
    }

    pages.push(total);

    return pages;
  }

  render() {
    const classes = {
      'pn-pgn': true,
      [`pn-pgn--${this.size}`]: true,
      'pn-pgn--compact': this.compact,
    };

    if (this.compact) {
      return (
        <nav class={classes} aria-label="Pagination">
          <div class="pn-pgn__compact">
            <button
              class="pn-pgn__btn"
              disabled={this.currentPage <= 1}
              onClick={() => this.goToPage(this.currentPage - 1)}
              aria-label="Previous page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span class="pn-pgn__info">
              Page {this.currentPage} of {this.totalPages}
            </span>
            <button
              class="pn-pgn__btn"
              disabled={this.currentPage >= this.totalPages}
              onClick={() => this.goToPage(this.currentPage + 1)}
              aria-label="Next page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </nav>
      );
    }

    const pages = this.getPages();

    return (
      <nav class={classes} aria-label="Pagination">
        <ul class="pn-pgn__list">
          {this.showFirstLast ? (
            <li>
              <button
                class="pn-pgn__btn"
                disabled={this.currentPage <= 1}
                onClick={() => this.goToPage(1)}
                aria-label="First page"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>
              </button>
            </li>
          ) : null}
          {this.showPrevNext ? (
            <li>
              <button
                class="pn-pgn__btn"
                disabled={this.currentPage <= 1}
                onClick={() => this.goToPage(this.currentPage - 1)}
                aria-label="Previous page"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
            </li>
          ) : null}
          {pages.map((page, i) => (
            <li key={i}>
              {page === '...' ? (
                <span class="pn-pgn__ellipsis">…</span>
              ) : (
                <button
                  class={{
                    'pn-pgn__btn': true,
                    'pn-pgn__btn--active': page === this.currentPage,
                  }}
                  aria-current={page === this.currentPage ? 'page' : undefined}
                  onClick={() => this.goToPage(page as number)}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
          {this.showPrevNext ? (
            <li>
              <button
                class="pn-pgn__btn"
                disabled={this.currentPage >= this.totalPages}
                onClick={() => this.goToPage(this.currentPage + 1)}
                aria-label="Next page"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </li>
          ) : null}
          {this.showFirstLast ? (
            <li>
              <button
                class="pn-pgn__btn"
                disabled={this.currentPage >= this.totalPages}
                onClick={() => this.goToPage(this.totalPages)}
                aria-label="Last page"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    );
  }
}
