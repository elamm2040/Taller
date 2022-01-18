import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Input,
  SimpleChanges,
  AfterViewChecked,
  Output, EventEmitter, ViewChild, ViewChildren, TemplateRef
} from '@angular/core';
import {Categories} from "../../../General/models/categories";
import {CategoriesService} from "../../../General/services/categories.service";

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() listCategories: Array<Categories> = [];
  @Output() breadcrumb: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren('list') list: TemplateRef<any> | undefined;

  baseItem: string = '<div class="item"><i class="folder icon"></i><div class="content">';
  headerItem: string = '<div class="header" (click)="shContent()" id="$id" style="cursor: pointer">';
  descriptionItem: string = '<div class="description">';
  subItem: string = '<div class="list">';
  closeDiv: string = '</div>';
  resHTML: string = '';

  checkElemnts: number = 1;

  espCategories: Array<Categories> = [];

  constructor(private elementRef: ElementRef,
              private ser: CategoriesService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    this.addEventListener();
  }

  insertHTML(list: Array<Categories>) {
    for (let cont = 0; cont < list.length; cont++) {
      this.resHTML += this.baseItem;
      this.resHTML += this.headerItem.replace('$id', '' + list[cont].id) + list[cont].name;
      this.closeDivTag(1);
      this.resHTML += this.descriptionItem;
      this.closeDivTag(1);

      if (list[cont].childrenCategories.length != 0) {
        this.resHTML += this.subItem;
        this.insertHTML(list[cont].childrenCategories);
        this.closeDivTag(1);
      }
      this.closeDivTag(2);
    }
  }

  addEventListener() {
    if (this.elementRef.nativeElement.querySelector('.header') && this.checkElemnts == 1) {
      const elements = this.elementRef.nativeElement.querySelectorAll('.header');
      for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', this.shContent.bind(this));
      }
      this.checkElemnts++;
    }
  }

  closeDivTag(times: number = 0) {
    for (let cont = 1; cont <= times; cont++) {
      this.resHTML += this.closeDiv;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.resHTML = '';
    if (changes.listCategories.currentValue.length != 0) {
      this.insertHTML(changes.listCategories.currentValue);
      this.checkElemnts = 1;
    }
  }

  shContent(element: any) {
    const id = element.target.id;
    this.ser.getParentCategories(id).subscribe(data => {
      this.espCategories = data.map((categories: Array<Categories> = []) => Categories.fromJson(categories));
      this.sentBreadcrumb(this.espCategories);
    });
  }

  sentBreadcrumb(data: any) {
    this.breadcrumb.emit(data);
  }

}
