import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Add other routes as needed
  {path: 'register', component: RegisterComponent},
  {path: 'view-tasks', component: ViewTasksComponent},
  {path: '', component: HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
