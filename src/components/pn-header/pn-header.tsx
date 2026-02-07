import { Component, Prop, State, h, Listen, Element, Event as StencilEvent, EventEmitter } from '@stencil/core';

interface NavigationItem {
  label: string;
  href?: string;
  children?: NavigationItem[];
  target?: string;
}

interface ActionButton {
  label: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'white' | 'transparent';
  href?: string;
  target?: string;
  rounded?: boolean;
  iconLeft?: string;
  iconRight?: string;
}

type HeaderVariant = 'default' | 'centered' | 'mega-menu' | 'sticky' | 'transparent' | 'split' | 'sidebar' | 'command-palette';

@Component({
  tag: 'pn-header',
  styleUrl: 'pn-header.scss',
  shadow: false,
})
export class PnHeader {
  @Prop() logo: string;
  @Prop() logoAltText: string;
  @Prop() company: string;
  @Prop() navigation: NavigationItem[] = [];
  @Prop() actions: ActionButton[] = [];
  @Prop() showSearch: boolean = false;
  @Prop() variant: HeaderVariant = 'default';
  @Prop() utilityLinks: { label: string; href?: string }[] = [];

  @State() isMobileMenuOpen: boolean = false;
  @State() activeDropdowns: Set<string> = new Set();
  @State() isSearchOpen: boolean = false;
  @State() searchQuery: string = '';
  @State() isScrolled: boolean = false;
  @State() isSidebarOpen: boolean = false;

  private mobileBreakpoint = 768;
  private searchInputRef: HTMLInputElement;

  @Element() el: HTMLElement;

  @StencilEvent({ eventName: 'headerSearch' }) headerSearch: EventEmitter<string>;

  connectedCallback() {
    if (this.variant === 'sticky' || this.variant === 'transparent') {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = () => {
    this.isScrolled = window.scrollY > 20;
  };

  @Listen('resize', { target: 'window' })
  handleResize() {
    if (window.innerWidth > this.mobileBreakpoint && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.activeDropdowns = new Set();
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.isSearchOpen) {
        this.closeSearch();
      } else if (this.isSidebarOpen) {
        this.isSidebarOpen = false;
      } else {
        this.isMobileMenuOpen = false;
        this.activeDropdowns = new Set();
      }
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('pn-header')) {
      this.activeDropdowns = new Set();
    }
  }

  private toggleMobileMenu = () => {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.activeDropdowns = new Set();
    }
  };

  private toggleDropdown = (itemId: string, event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const newDropdowns = new Set(this.activeDropdowns);
    const segments = itemId.split('-');
    const parentPrefix = segments.slice(0, -1).join('-');

    newDropdowns.forEach(activeId => {
      const activeSegments = activeId.split('-');
      const activeParentPrefix = activeSegments.slice(0, -1).join('-');
      if (activeParentPrefix === parentPrefix && activeId !== itemId) {
        newDropdowns.delete(activeId);
        newDropdowns.forEach(id => {
          if (id.startsWith(activeId + '-')) newDropdowns.delete(id);
        });
      }
    });

    if (newDropdowns.has(itemId)) {
      newDropdowns.delete(itemId);
      newDropdowns.forEach(id => {
        if (id.startsWith(itemId + '-')) newDropdowns.delete(id);
      });
    } else {
      newDropdowns.add(itemId);
    }

    this.activeDropdowns = newDropdowns;
  };

  private handleNavKeyDown = (event: KeyboardEvent, itemId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdown(itemId, event);
    }
  };

  private closeAllDropdowns = () => {
    this.activeDropdowns = new Set();
  };

  private openSearch = () => {
    this.isSearchOpen = true;
    this.activeDropdowns = new Set();
    setTimeout(() => {
      if (this.searchInputRef) {
        this.searchInputRef.focus();
      }
    }, 100);
  };

  private closeSearch = () => {
    this.isSearchOpen = false;
    this.searchQuery = '';
  };

  private handleSearchInput = (e: InputEvent) => {
    this.searchQuery = (e.target as HTMLInputElement).value;
  };

  private handleSearchSubmit = (e?: Event) => {
    if (e) e.preventDefault();
    if (this.searchQuery.trim()) {
      this.headerSearch.emit(this.searchQuery.trim());
    }
  };

  private handleSearchKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleSearchSubmit();
    }
  };

  // ─── Shared Render Helpers ─────────────────────────────

  private renderSearchBar(extraClass?: string) {
    return (
      <div class={{ 'header__search-bar': true, 'header__search-bar--open': this.isSearchOpen, [extraClass]: !!extraClass }}>
        <div class="header__search-bar-inner">
          <svg class="header__search-bar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input
            class="header__search-input"
            type="text"
            placeholder="Search..."
            value={this.searchQuery}
            onInput={this.handleSearchInput}
            onKeyDown={this.handleSearchKeyDown}
            ref={(el) => (this.searchInputRef = el)}
            aria-label="Search"
          />
          <button
            class="header__search-go"
            onClick={() => this.handleSearchSubmit()}
            aria-label="Go"
            disabled={!this.searchQuery.trim()}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Go</span>
          </button>
        </div>
      </div>
    );
  }

  private renderSearchToggle() {
    if (!this.showSearch) return null;
    return (
      <button
        class={{ 'header__search-toggle': true, 'header__search-toggle--close': this.isSearchOpen }}
        onClick={this.isSearchOpen ? this.closeSearch : this.openSearch}
        aria-label={this.isSearchOpen ? 'Close search' : 'Open search'}
      >
        {this.isSearchOpen ? (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        )}
      </button>
    );
  }

  private renderBrand() {
    return (
      <div class="header__brand">
        {this.logo && <img src={this.logo} alt={this.logoAltText || ''} class="header__logo" />}
        {this.company && <span class="header__company">{this.company}</span>}
      </div>
    );
  }

  private renderNavigationItem = (item: NavigationItem, index: number, level: number = 0, parentKey: string = '') => {
    const itemKey = parentKey ? `${parentKey}-${index}` : `${index}`;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = this.activeDropdowns.has(itemKey);

    return (
      <li class={{ 'nav-item': true, 'nav-item--open': isOpen }} key={itemKey}>
        {hasChildren ? (
          <button
            class="nav-item__trigger"
            onClick={(e) => this.toggleDropdown(itemKey, e)}
            onKeyDown={(e) => this.handleNavKeyDown(e, itemKey)}
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-haspopup="true"
            aria-controls={`dropdown-${itemKey}`}
          >
            <span>{item.label}</span>
            <svg class={{ 'nav-item__chevron': true, 'nav-item__chevron--up': isOpen }} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        ) : (
          <a
            class="nav-item__link"
            href={item.href}
            target={item.target}
            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
            onClick={this.closeAllDropdowns}
          >
            <span>{item.label}</span>
            {item.target === '_blank' && (
              <svg class="nav-item__external" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M10.5 1.5L5.5 6.5M10.5 1.5H7.5M10.5 1.5V4.5M4.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V9.5C1.5 10.05 1.95 10.5 2.5 10.5H9.5C10.05 10.5 10.5 10.05 10.5 9.5V7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            )}
          </a>
        )}

        {hasChildren && (
          <ul
            class={{ 'dropdown': true, 'dropdown--open': isOpen, [`dropdown--level-${level + 1}`]: true }}
            id={`dropdown-${itemKey}`}
            role="menu"
            aria-hidden={isOpen ? 'false' : 'true'}
          >
            {item.children.map((child, childIndex) =>
              this.renderNavigationItem(child, childIndex, level + 1, itemKey)
            )}
          </ul>
        )}
      </li>
    );
  };

  // Mega menu: render top-level items with full-width panel dropdowns
  private renderMegaMenuItem = (item: NavigationItem, index: number) => {
    const itemKey = `${index}`;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = this.activeDropdowns.has(itemKey);

    return (
      <li class={{ 'nav-item': true, 'nav-item--open': isOpen, 'nav-item--mega': true }} key={itemKey}>
        {hasChildren ? (
          <button
            class="nav-item__trigger"
            onClick={(e) => this.toggleDropdown(itemKey, e)}
            onKeyDown={(e) => this.handleNavKeyDown(e, itemKey)}
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-haspopup="true"
          >
            <span>{item.label}</span>
            <svg class={{ 'nav-item__chevron': true, 'nav-item__chevron--up': isOpen }} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        ) : (
          <a class="nav-item__link" href={item.href} target={item.target} onClick={this.closeAllDropdowns}>
            <span>{item.label}</span>
          </a>
        )}
        {hasChildren && isOpen && (
          <div class="mega-panel">
            <div class="mega-panel__grid">
              {item.children.map((group) => (
                <div class="mega-panel__column">
                  <h4 class="mega-panel__heading">
                    {group.href ? <a href={group.href}>{group.label}</a> : group.label}
                  </h4>
                  {group.children && (
                    <ul class="mega-panel__list">
                      {group.children.map((child) => (
                        <li><a class="mega-panel__link" href={child.href} target={child.target}>{child.label}</a></li>
                      ))}
                    </ul>
                  )}
                  {!group.children && group.href && (
                    <a class="mega-panel__link" href={group.href}>{group.label}</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </li>
    );
  };

  private getActions(): ActionButton[] {
    return (this.actions || []).slice(0, 2);
  }

  private renderActions(mobile: boolean = false) {
    const actions = this.getActions();
    if (actions.length === 0) return null;

    return (
      <div class={{ 'header__actions': true, 'header__actions--mobile': mobile }}>
        {actions.map((action) => {
          const btn = (
            <pn-button
              label={action.label}
              type={action.type || 'primary'}
              rounded={action.rounded || false}
              icon-left={action.iconLeft}
              icon-right={action.iconRight}
            ></pn-button>
          );

          if (action.href) {
            return (
              <a class="header__action-link" href={action.href} target={action.target} rel={action.target === '_blank' ? 'noopener noreferrer' : undefined}>
                {btn}
              </a>
            );
          }
          return btn;
        })}
      </div>
    );
  }

  private renderHamburger() {
    return (
      <button
        class={{ 'header__hamburger': true, 'header__hamburger--active': this.isMobileMenuOpen }}
        onClick={this.toggleMobileMenu}
        aria-expanded={this.isMobileMenuOpen ? 'true' : 'false'}
        aria-controls="mobile-nav"
        aria-label={this.isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span class="header__hamburger-line"></span>
        <span class="header__hamburger-line"></span>
        <span class="header__hamburger-line"></span>
      </button>
    );
  }

  private renderMobileNav() {
    const hasActions = this.getActions().length > 0;
    return (
      <nav
        class={{ 'header__mobile-nav': true, 'header__mobile-nav--open': this.isMobileMenuOpen }}
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={this.isMobileMenuOpen ? 'false' : 'true'}
      >
        <ul class="nav-list nav-list--mobile">
          {this.navigation.map((item, index) => this.renderNavigationItem(item, index))}
        </ul>
        {hasActions && this.renderActions(true)}
      </nav>
    );
  }

  // Command palette style search (always visible, prominent)
  private renderCommandSearch() {
    return (
      <div class="header__command-search">
        <div class="header__command-search-inner">
          <svg class="header__search-bar-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input
            class="header__search-input"
            type="text"
            placeholder="Search documentation...  ⌘K"
            value={this.searchQuery}
            onInput={this.handleSearchInput}
            onKeyDown={this.handleSearchKeyDown}
            ref={(el) => (this.searchInputRef = el)}
            aria-label="Search"
          />
          <button class="header__search-go" onClick={() => this.handleSearchSubmit()} aria-label="Go" disabled={!this.searchQuery.trim()}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Go</span>
          </button>
        </div>
      </div>
    );
  }

  // ─── Variant Renderers ─────────────────────────────────

  // 1. Default
  private renderDefault() {
    const hasActions = this.getActions().length > 0;
    return (
      <header class="header header--default">
        <div class="header__inner">
          {this.renderBrand()}
          <div class={{ 'header__content': true, 'header__content--search-open': this.isSearchOpen }}>
            <nav class="header__nav" aria-label="Main navigation">
              <ul class="nav-list">
                {this.navigation.map((item, index) => this.renderNavigationItem(item, index))}
              </ul>
            </nav>
            {hasActions && this.renderActions()}
            {this.showSearch && this.renderSearchBar()}
          </div>
          {this.renderSearchToggle()}
          {this.renderHamburger()}
          {this.renderMobileNav()}
        </div>
      </header>
    );
  }

  // 2. Centered Nav
  private renderCentered() {
    const hasActions = this.getActions().length > 0;
    return (
      <header class="header header--centered">
        <div class="header__inner">
          {this.renderBrand()}
          <div class={{ 'header__content header__content--centered': true, 'header__content--search-open': this.isSearchOpen }}>
            <nav class="header__nav" aria-label="Main navigation">
              <ul class="nav-list">
                {this.navigation.map((item, index) => this.renderNavigationItem(item, index))}
              </ul>
            </nav>
            {this.showSearch && this.renderSearchBar()}
          </div>
          <div class="header__right">
            {hasActions && this.renderActions()}
            {this.renderSearchToggle()}
          </div>
          {this.renderHamburger()}
          {this.renderMobileNav()}
        </div>
      </header>
    );
  }

  // 3. Mega Menu
  private renderMegaMenu() {
    const hasActions = this.getActions().length > 0;
    return (
      <header class="header header--mega-menu">
        <div class="header__inner">
          {this.renderBrand()}
          <div class={{ 'header__content': true, 'header__content--search-open': this.isSearchOpen }}>
            <nav class="header__nav" aria-label="Main navigation">
              <ul class="nav-list">
                {this.navigation.map((item, index) => this.renderMegaMenuItem(item, index))}
              </ul>
            </nav>
            {hasActions && this.renderActions()}
            {this.showSearch && this.renderSearchBar()}
          </div>
          {this.renderSearchToggle()}
          {this.renderHamburger()}
          {this.renderMobileNav()}
        </div>
      </header>
    );
  }

  // 4. Sticky + Shrinking
  private renderSticky() {
    const hasActions = this.getActions().length > 0;
    return (
      <header class={{ 'header header--sticky': true, 'header--shrunk': this.isScrolled }}>
        <div class="header__inner">
          {this.renderBrand()}
          <div class={{ 'header__content': true, 'header__content--search-open': this.isSearchOpen }}>
            <nav class="header__nav" aria-label="Main navigation">
              <ul class="nav-list">
                {this.navigation.map((item, index) => this.renderNavigationItem(item, index))}
              </ul>
            </nav>
            {hasActions && this.renderActions()}
            {this.showSearch && this.renderSearchBar()}
          </div>
          {this.renderSearchToggle()}
          {this.renderHamburger()}
          {this.renderMobileNav()}
        </div>
      </header>
    );
  }

  // 5. Transparent → Solid
  private renderTransparent() {
    const hasActions = this.getActions().length > 0;
    return (
      <header class={{ 'header header--transparent': true, 'header--solid': this.isScrolled }}>
        <div class="header__inner">
          {this.renderBrand()}
          <div class={{ 'header__content': true, 'header__content--search-open': this.isSearchOpen }}>
            <nav class="header__nav" aria-label="Main navigation">
              <ul class="nav-list">
                {this.navigation.map((item, index) => this.renderNavigationItem(item, index))}
              </ul>
            </nav>
            {hasActions && this.renderActions()}
            {this.showSearch && this.renderSearchBar()}
          </div>
          {this.renderSearchToggle()}
          {this.renderHamburger()}
          {this.renderMobileNav()}
        </div>
      </header>
    );
  }

  // 6. Split (Two-Row)
  private renderSplit() {
    const hasActions = this.getActions().length > 0;
    const links = this.utilityLinks.length > 0 ? this.utilityLinks : [
      { label: 'Support', href: '/support' },
      { label: 'Contact Sales', href: '/sales' },
    ];
    return (
      <header class="header header--split">
        <div class="header__utility-bar">
          <div class="header__utility-inner">
            <div class="header__utility-links">
              {links.map((link) => (
                <a class="header__utility-link" href={link.href}>{link.label}</a>
              ))}
            </div>
            <div class="header__utility-right">
              {this.renderSearchToggle()}
            </div>
          </div>
        </div>
        <div class="header__main-bar">
          <div class="header__inner">
            {this.renderBrand()}
            <div class={{ 'header__content': true, 'header__content--search-open': this.isSearchOpen }}>
              <nav class="header__nav" aria-label="Main navigation">
                <ul class="nav-list">
                  {this.navigation.map((item, index) => this.renderNavigationItem(item, index))}
                </ul>
              </nav>
              {hasActions && this.renderActions()}
              {this.showSearch && this.renderSearchBar()}
            </div>
            {this.renderHamburger()}
            {this.renderMobileNav()}
          </div>
        </div>
      </header>
    );
  }

  // 7. Sidebar
  private renderSidebar() {
    const hasActions = this.getActions().length > 0;
    return (
      <header class="header header--sidebar-trigger">
        <div class="header__inner">
          {this.renderBrand()}
          <div class="header__right">
            {hasActions && this.renderActions()}
            {this.renderSearchToggle()}
            <button
              class={{ 'header__sidebar-toggle': true, 'header__sidebar-toggle--active': this.isSidebarOpen }}
              onClick={() => { this.isSidebarOpen = !this.isSidebarOpen; }}
              aria-label={this.isSidebarOpen ? 'Close menu' : 'Open menu'}
            >
              <span class="header__hamburger-line"></span>
              <span class="header__hamburger-line"></span>
              <span class="header__hamburger-line"></span>
            </button>
          </div>
        </div>
        {/* Sidebar overlay */}
        <div class={{ 'header__sidebar-overlay': true, 'header__sidebar-overlay--open': this.isSidebarOpen }} onClick={() => { this.isSidebarOpen = false; }}></div>
        <aside class={{ 'header__sidebar': true, 'header__sidebar--open': this.isSidebarOpen }}>
          <div class="header__sidebar-header">
            {this.renderBrand()}
            <button class="header__sidebar-close" onClick={() => { this.isSidebarOpen = false; }} aria-label="Close sidebar">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          {this.showSearch && (
            <div class="header__sidebar-search">
              <div class="header__command-search-inner">
                <svg class="header__search-bar-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input class="header__search-input" type="text" placeholder="Search..." value={this.searchQuery} onInput={this.handleSearchInput} onKeyDown={this.handleSearchKeyDown} ref={(el) => (this.searchInputRef = el)} aria-label="Search"/>
              </div>
            </div>
          )}
          <nav class="header__sidebar-nav" aria-label="Sidebar navigation">
            <ul class="nav-list nav-list--sidebar">
              {this.navigation.map((item, index) => this.renderNavigationItem(item, index))}
            </ul>
          </nav>
          {hasActions && (
            <div class="header__sidebar-actions">
              {this.renderActions()}
            </div>
          )}
        </aside>
      </header>
    );
  }

  // 8. Command Palette
  private renderCommandPalette() {
    const hasActions = this.getActions().length > 0;
    return (
      <header class="header header--command-palette">
        <div class="header__inner">
          {this.renderBrand()}
          {this.showSearch && this.renderCommandSearch()}
          <div class="header__content header__content--cmd">
            <nav class="header__nav" aria-label="Main navigation">
              <ul class="nav-list">
                {this.navigation.map((item, index) => this.renderNavigationItem(item, index))}
              </ul>
            </nav>
            {hasActions && this.renderActions()}
          </div>
          {this.renderHamburger()}
          {this.renderMobileNav()}
        </div>
      </header>
    );
  }

  render() {
    switch (this.variant) {
      case 'centered': return this.renderCentered();
      case 'mega-menu': return this.renderMegaMenu();
      case 'sticky': return this.renderSticky();
      case 'transparent': return this.renderTransparent();
      case 'split': return this.renderSplit();
      case 'sidebar': return this.renderSidebar();
      case 'command-palette': return this.renderCommandPalette();
      default: return this.renderDefault();
    }
  }
}
