# Angular custom pagination module (NgPaginationModule)

This package is used to implement pagination with default bootstrap design but addon angular support.

1. Import `NgPaginationModule` in your `app.module`
2. Add below mentioned selector tag in your `component's html template`

```html
 <ngpagination 
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
 </ngpagination>
```
