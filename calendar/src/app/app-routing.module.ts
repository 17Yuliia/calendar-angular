import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './organizer/organizer.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './organizer/todo/todo.component';
import * as moment from 'moment';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'organizer/:date',
		component: OrganizerComponent
	},
	{
		path: 'organizer',
		redirectTo: `organizer/${moment().format('DD-MM-YYYY')}`,
		pathMatch: 'full'
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
