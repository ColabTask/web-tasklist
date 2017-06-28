import { Routes, RouterModule } from '@angular/router';

import { FaqComponent } from './faq/index';
import { LoginComponent } from './login/index';
import { LogoutComponent } from './logout/index';
import { ProjectComponent } from './project/index';
import { ProjectsComponent } from './projects/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: ProjectsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'logout', component: LogoutComponent},
    { path: 'faq', component: FaqComponent},
    { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'project/:id/:endDate', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
