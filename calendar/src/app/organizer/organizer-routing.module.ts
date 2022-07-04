import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './organizer.component';
import * as moment from 'moment';

const routes: Routes = [
    { 
        path: '',
        redirectTo: `${moment().format('DD-MM-YYYY')}`,
        pathMatch: 'full'
    },
    {
        path: ':date',
        component: OrganizerComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }