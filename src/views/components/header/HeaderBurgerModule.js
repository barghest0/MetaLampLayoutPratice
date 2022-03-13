import { BURGER_SELECTOR, BURGER_NAV_SELECTOR, OPEN_BURGER_CLASS } from './constants';

class HeaderBurger {
  constructor($container) {
    this.$container = $container;
    this.init();
  }

  init() {
    this.setBurgerNav();
    this.attachListeners();
  }

  setBurgerNav() {
    this.$burgerNav = this.$container.find(BURGER_NAV_SELECTOR);
  }

  attachListeners() {
    this.$container.on('click', this.handleBurgerClick);
    document.addEventListener('click', this.closeBurgerAfterDocumentClick.bind(this));
  }

  handleBurgerClick(event) {
    $(event.currentTarget).toggleClass(OPEN_BURGER_CLASS);
    $(BURGER_NAV_SELECTOR).toggleClass(OPEN_BURGER_CLASS);
  }

  closeBurgerAfterDocumentClick(event) {
    if (!event.target.closest(BURGER_SELECTOR)) {
      this.$container.removeClass(OPEN_BURGER_CLASS);
    }
  }
}

export default HeaderBurger;