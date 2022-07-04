import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'organizer',
		loadChildren: () => import('./organizer/organizer.module').then(m => m.OrganizerModule)
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{ path: 'calculator', loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule) },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
