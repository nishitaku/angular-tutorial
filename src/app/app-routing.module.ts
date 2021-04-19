import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ParentComponent } from './parent/parent.component';
import { SvgComponent } from './svg/svg.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'reactive-forms', component: ReactiveFormsComponent },
  { path: 'dropdown', component: DropdownComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'svg', component: SvgComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
