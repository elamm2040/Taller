import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../General/services/categories.service";
import {Categories} from "../../General/models/categories";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  loading: boolean = true;

  allCategories: Array<Categories> = [];
  bcCategory: Array<Categories> = [];

  constructor(private ser: CategoriesService) {
  }

  ngOnInit(): void {
    this.ser.getAllCategories().subscribe(data => {
      if (typeof data['status'] === 'undefined') {
        this.allCategories = data.map((categories: Array<Categories> = []) => Categories.fromJson(categories));
      }
      this.loading = false;
    });
  }

  breadcrumb(event: any) {
    this.bcCategory = event;
  }

  reloadCategories() {
    this.loading = true;
    this.ser.getAllCategories().subscribe(data => {
      if (typeof data['status'] === 'undefined') {
        this.allCategories = data.map((categories: Array<Categories> = []) => Categories.fromJson(categories));
      }
      this.loading = false;
    });
  }

}
