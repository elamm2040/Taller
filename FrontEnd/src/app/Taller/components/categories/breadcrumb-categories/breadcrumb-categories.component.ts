import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Categories} from "../../../General/models/categories";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  faHeading,
  faAlignLeft,
  faPen
} from "@fortawesome/free-solid-svg-icons";
import {CategoriesService} from "../../../General/services/categories.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-breadcrumb-categories',
  templateUrl: './breadcrumb-categories.component.html',
  styleUrls: ['./breadcrumb-categories.component.css']
})
export class BreadcrumbCategoriesComponent implements OnInit {

  @Input() category: Array<Categories> = [];
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });

  subNivel: boolean = false;
  subLvl: boolean = false; /* Just for checkbox */

  section: string = '<div class="section">$name</div>';
  divider: string = '<i class="right angle icon divider"></i>';
  endSection: string = '<div class="active section">$name</div>';
  resHTML: string = '';

  faHeading = faHeading;
  faAlignLeft = faAlignLeft;
  faPen = faPen;

  public formCat: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ser: CategoriesService) {
    this.formCat = this.formBuilder.group({
      id: 0,
      name: ['', Validators.required],
      sublvl: false,
      categoriesId: null
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.resHTML = '';
    let currentVal = changes.category.currentValue;
    let id = (currentVal.length != 0) ? currentVal[0]['id'] : 0;
    if (id != 0) {
      this.subNivel = true;
      this.insertHTML(currentVal, id);
    }
  }

  insertHTML(list: Array<Categories>, id: number = 0) {
    for (let cont = 0; cont < list.length; cont++) {
      if (list[cont].parentCategories.length != 0)
        this.insertHTML(list[cont].parentCategories);

      if (id == 0) {
        this.resHTML += this.section.replace('$name', '' + list[cont].name);
        this.resHTML += this.divider;
      } else {
        this.resHTML += this.endSection.replace('$name', '' + list[cont].name);
      }
    }
  }

  canCat() {
    this.subNivel = false;
    this.subLvl = false;
    this.resHTML = '';
    this.resetForm();
  }

  saveCat(edit: boolean = false) {
    if (this.subNivel) {
      let parent = null;

      if (this.category[0]['parentCategories'].length != 0)
        parent = this.category[0]['parentCategories'][0]['id'];

      this.formCat.patchValue({
        categoriesId: this.formCat.value.sublvl ? this.category[0]['id'] : parent
      });
    } else {
      this.formCat.patchValue({
        categoriesId: null
      });
    }

    if (edit) {
      this.formCat.patchValue({
        id: this.category[0]['id'],
        categoriesId: this.category[0]['id']
      });
      this.ser.updateCategory(this.formCat.value).subscribe(res => {
        if (res.status == 'error') {
          this.toast.fire({
            icon: 'error',
            title: res.description
          });
        } else {
          this.toast.fire({
            icon: 'success',
            title: 'Categoría actualizada.'
          });
          this.reload.emit();
          this.reloadBreadcrumb(this.formCat.value.id);
        }
      });
    } else {
      this.ser.saveCategory(this.formCat.value).subscribe(res => {
        if (res.status == 'error') {
          this.toast.fire({
            icon: 'error',
            title: res.description
          });
        } else {
          this.toast.fire({
            icon: 'success',
            title: 'Categoría agregada.'
          });
          this.reload.emit();
        }
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.formCat.patchValue({
      id: 0,
      name: '',
      sublvl: false,
      categoriesId: null
    });
  }

  subLvlChange(event: any) {
    this.subLvl = event.target.checked;
  }

  reloadBreadcrumb(id: number) {
    this.ser.getParentCategories(id).subscribe(data => {
      let currentVal = data.map((categories: Array<Categories> = []) => Categories.fromJson(categories));
      this.resHTML = '';
      this.subNivel = true;
      this.insertHTML(currentVal, id);
      this.category[0]['name'] = this.formCat.value.name;
      this.resetForm();
    });
  }

  getCatName() {
    this.formCat.patchValue({
      name: this.category[0]['name']
    });
  }

}
