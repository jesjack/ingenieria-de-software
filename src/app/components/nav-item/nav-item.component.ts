import {Component, Input} from '@angular/core';
import {faBook} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {

    protected readonly faBook = faBook;
    @Input() routerLink: string[] | string = ['/'];
    @Input() icon!: IconDefinition;
}
