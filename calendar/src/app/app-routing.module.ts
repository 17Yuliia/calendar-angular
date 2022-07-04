import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'organizer',
		canActivate: [AuthGuard],
		loadChildren: () => import('./organizer/organizer.module').then(m => m.OrganizerModule)
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{ path: 'calculator', loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule) },
	{
		path: '**',
		component: PageNotFoundComponent
	}
]

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes, 
			{
				preloadingStrategy: PreloadAllModules
			}
		)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
