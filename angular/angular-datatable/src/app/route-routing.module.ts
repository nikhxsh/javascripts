import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WineryComponent } from './winery/winery.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'winery',
		pathMatch: 'full'
	},
	{
		path: 'winery',
		component: WineryComponent
	},
	{ path: '**', component: WineryComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class RouteRoutingModule { }
