import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PropertyListComponent } from './pages/property-list/property-list.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { ViewcompanydetailsComponent } from './viewcompanydetails/viewcompanydetails.component';
import { EditcompanydetailsComponent } from './editcompanydetails/editcompanydetails.component';
import { EditpropertydetailsComponent } from './editpropertydetails/editpropertydetails.component';
import { ViewpropertydetailsComponent } from './viewpropertydetails/viewpropertydetails.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'property-list', component: PropertyListComponent },
      { path: 'company-list', component: CompanyListComponent },
      { path: 'property-details', component: PropertyDetailsComponent },
      {
        path: 'viewcompanydetail/:id',
        component: ViewcompanydetailsComponent,
      },
      {
        path: 'editcompanydetail/:id',
        component: EditcompanydetailsComponent,
      },
      {
        path: 'edit-property/:id',
        component: EditpropertydetailsComponent,
      },
      {
        path: 'viewpropertydetails/:id',
        component: ViewpropertydetailsComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        path: 'addproperty',
        component: AddpropertyComponent,
      },
      {
        path: 'addcompany',
        component: AddcompanyComponent,
      },
      {
        path: 'stepper',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
