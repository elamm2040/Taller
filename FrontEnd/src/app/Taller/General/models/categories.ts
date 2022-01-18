export class Categories {
  id: number;
  categoriesId: number;
  name: string;
  childrenCategories: Array<Categories>;
  parentCategories: Array<Categories>;

  constructor(id: number,
              categoriesId: number,
              name: string,
              childrenCategories: Array<Categories> = [],
              parentCategories: Array<Categories> = []) {
    this.id = id;
    this.categoriesId = categoriesId;
    this.name = name;
    this.childrenCategories = childrenCategories;
    this.parentCategories = parentCategories;
  }

  static fromJson(json: any): Categories {
    return new Categories(
      json.id ?? 0,
      json.categories_id ?? 0,
      json.name ?? '',
      (json.all_children_categories ?? []).map((childrenCategories: Array<Categories> = []) => Categories.fromJson(childrenCategories)),
      (json.all_parent_categories ?? []).map((parentCategories: Array<Categories> = []) => Categories.fromJson(parentCategories))
    );
  }
}
