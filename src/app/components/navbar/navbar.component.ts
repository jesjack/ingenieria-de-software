import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {createPopper, Instance} from "@popperjs/core";
import {
  faAngleLeft,
  faBook,
  faCalendar,
  faChartBar,
  faGem,
  faGlobe,
  faPaintBrush, faServer,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild('sidebar', {static: true}) sidebarElement!: ElementRef<HTMLElement>;
  @ViewChildren('subMenuItem', { read: ElementRef }) menuItems!: QueryList<ElementRef>;
  @ViewChildren('subA', { read: ElementRef }) firstSubMenusBtn!: QueryList<ElementRef>;
  @ViewChildren('subSubA', { read: ElementRef }) innerSubMenusBtn!: QueryList<ElementRef>;
  // document.getElementById("btn-collapse")
  @ViewChild('btnCollapse', {static: true}) btnCollapse!: ElementRef<HTMLElement>;
  // document.querySelectorAll(".menu-item.sub-menu.open")
  @ViewChildren('menu-item sub-menu open', { read: ElementRef }) menuItemsSubMenusOpen!: QueryList<ElementRef>;

  constructor() {
  }
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.SIDEBAR_EL = this.sidebarElement.nativeElement;
    this.SUB_MENU_ELS = this.menuItems.map((item) => item.nativeElement);
    this.FIRST_SUB_MENUS_BTN = this.firstSubMenusBtn.map((item) => item.nativeElement);
    this.INNER_SUB_MENUS_BTN = this.innerSubMenusBtn.map((item) => item.nativeElement);

    console.log('SUB MENU ELS', this.SUB_MENU_ELS);

    const slideUp = (target: HTMLElement, duration = this.ANIMATION_DURATION) => {
      const { parentElement } = target;
      if (!parentElement) return;
      parentElement.classList.remove("open");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = `${duration}ms`;
      target.style.boxSizing = "border-box";
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0 + '';
      target.style.paddingTop = 0 + '';
      target.style.paddingBottom = 0 + '';
      target.style.marginTop = 0 + '';
      target.style.marginBottom = 0 + '';
      window.setTimeout(() => {
        target.style.display = "none";
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
      }, duration);
    };
    const slideDown = (target: HTMLElement, duration = this.ANIMATION_DURATION) => {
      const { parentElement } = target;
      if (!parentElement) return;
      parentElement.classList.add("open");
      target.style.removeProperty("display");
      let { display } = window.getComputedStyle(target);
      if (display === "none") display = "block";
      target.style.display = display;
      const height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0 + '';
      target.style.paddingTop = 0 + '';
      target.style.paddingBottom = 0 + '';
      target.style.marginTop = 0 + '';
      target.style.marginBottom = 0 + '';
      target.offsetHeight;
      target.style.boxSizing = "border-box";
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = `${duration}ms`;
      target.style.height = `${height}px`;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
      }, duration);
    };

    const slideToggle = (target: HTMLElement, duration = this.ANIMATION_DURATION) => {
      if (window.getComputedStyle(target).display === "none")
        return slideDown(target, duration);
      return slideUp(target, duration);
    };

    const PoppersInstance = new Poppers(this.SUB_MENU_ELS, this.SIDEBAR_EL);
    const updatePoppersTimeout = () => {
      setTimeout(() => {
        PoppersInstance.updatePoppers();
      }, this.ANIMATION_DURATION);
    };

    this.btnCollapse.nativeElement.addEventListener('click', () => {
      this.SIDEBAR_EL.classList.toggle('collapsed');
      PoppersInstance.closePoppers();
      if (this.SIDEBAR_EL.classList.contains("collapsed"))
        this.FIRST_SUB_MENUS_BTN.forEach((element) => {
          element.parentElement?.classList.remove("open");
        });

      updatePoppersTimeout();
    });

    const defaultOpenMenus = this.menuItemsSubMenusOpen.map((item) => item.nativeElement);

    defaultOpenMenus.forEach((element) => {
      element.lastElementChild.style.display = "block";
    });

    this.FIRST_SUB_MENUS_BTN.forEach((element) => {
      element.addEventListener("click", () => {
        if (this.SIDEBAR_EL.classList.contains("collapsed"))
          PoppersInstance.togglePopper(<HTMLElement>element.nextElementSibling);
        else {
          const parentMenu = element.closest(".menu.open-current-submenu");
          if (parentMenu)
            parentMenu
              .querySelectorAll(":scope > ul > .menu-item.sub-menu > a")
              .forEach(
                (el) =>
                  window.getComputedStyle(<Element>el.nextElementSibling).display !==
                  "none" && slideUp(<HTMLElement>el.nextElementSibling)
              );
          slideToggle(<HTMLElement>element.nextElementSibling);
        }
      });
    });

    this.INNER_SUB_MENUS_BTN.forEach((element) => {
      element.addEventListener("click", () => {
        slideToggle(<HTMLElement>element.nextElementSibling);
      });
    });
  }

  // const ANIMATION_DURATION = 300;
  ANIMATION_DURATION = 300;
  // const SIDEBAR_EL = document.getElementById("sidebar");
  SIDEBAR_EL!: HTMLElement;
  // const SUB_MENU_ELS = document.querySelectorAll(
  //   ".menu > ul > .menu-item.sub-menu"
  // );
  SUB_MENU_ELS!: Array<HTMLElement>;
  // const FIRST_SUB_MENUS_BTN = document.querySelectorAll(
  //   ".menu > ul > .menu-item.sub-menu > a"
  // );
  FIRST_SUB_MENUS_BTN!: Array<HTMLElement>;
  // const INNER_SUB_MENUS_BTN = document.querySelectorAll(
  //   ".menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a"
  // );
  INNER_SUB_MENUS_BTN!: Array<HTMLElement>;

  protected readonly faGem = faGem;
  protected readonly faChartBar = faChartBar;
  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faGlobe = faGlobe;
  protected readonly faPaintBrush = faPaintBrush;
  protected readonly faBook = faBook;
  protected readonly faCalendar = faCalendar;
  protected readonly faServer = faServer;
  protected readonly faAngleLeft = faAngleLeft;
}



class Poppers {
  subMenuPoppers: Array<PopperObject> = [];

  constructor(
    private SUB_MENU_ELS: Array<HTMLElement>,
    private SIDEBAR_EL: HTMLElement,
  ) {
    this.init();
  }

  init() {
    this.SUB_MENU_ELS.forEach((element) => {
      this.subMenuPoppers.push(
        new PopperObject(element, <HTMLElement>element.lastElementChild, this.SIDEBAR_EL)
      );
      this.closePoppers();
    });
  }

  togglePopper(target: HTMLElement) {
    if (window.getComputedStyle(target).visibility === "hidden")
      target.style.visibility = "visible";
    else target.style.visibility = "hidden";
  }

  updatePoppers() {
    this.subMenuPoppers.forEach((element) => {
      element.instance.state.elements.popper.style.display = "none";
      element.instance.update();
    });
  }

  closePoppers() {
    this.subMenuPoppers.forEach((element) => {
      element.hide();
    });
  }
}


class PopperObject {
  instance!: Instance;
  reference!: HTMLElement;
  popperTarget!: HTMLElement;

  constructor(reference: HTMLElement, popperTarget: HTMLElement,
              private SIDEBAR_EL: HTMLElement) {
    this.init(reference, popperTarget);
  }

  init(reference: HTMLElement, popperTarget: HTMLElement) {
    this.reference = reference;
    this.popperTarget = popperTarget;
    this.instance = createPopper(this.reference, this.popperTarget, {
      placement: "right",
      strategy: "fixed",
      // resize: true,
      modifiers: [
        {
          name: "computeStyles",
          options: {
            adaptive: false
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["left", "right"]
          }
        }
      ]
    });

    document.addEventListener(
      "click",
      (e) => this.clicker(e, this.popperTarget, this.reference),
      false
    );

    const ro = new ResizeObserver(() => {
      this.instance.update();
    });

    ro.observe(this.popperTarget);
    ro.observe(this.reference);
  }

  clicker(event: MouseEvent, popperTarget: HTMLElement, reference: HTMLElement) {
    if (
      this.SIDEBAR_EL.classList.contains("collapsed") &&
      !popperTarget.contains(event.target as (Node | null)) &&
      !reference.contains(event.target as (Node | null))
    ) {
      this.hide();
    }
  }

  hide() {
    this.instance.state.elements.popper.style.visibility = "hidden";
  }
}
