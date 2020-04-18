# Angular custom pagination module (NgPaginationModule)

This package is used to implement pagination with default bootstrap design but addon angular support.

1. Import `NgPaginationModule` in your `app.module`
2. Add below mentioned selector tag in your `component's html template`

```html
 <pagination
	[totalItems]="totalItems"
	[itemsPerPage]="itemsPerPage"
	[maxSize]="maxSize"
	[disable]="loading"
	[reset]="resetPagination"
	[firstPageText]="firstPageText"
	[prevPageText]="prevPageText"
	[nextPageText]="nextPageText"
	[lastPageText]="lastPageText"
	(onPageChanged)="onPageChanged($event)">
 </pagination>
```
Default style set would be bootstrap ^4.0 but you can customize it by providing following inputs & these inputs are nothing but placeholder for css class name.

```html

	[pageListStyle]="pageListStyle"
	[pageStyle]="pageStyle"
	[pageLinkStyle]="pageLinkStyle"

```