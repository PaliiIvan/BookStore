import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';
import { ServersComponent } from '../servers/servers.component';
import { EditServerComponent } from '../servers/edit-server/edit-server.component';
import { Routes, RouterModule } from '@angular/router';
import { ServerComponent } from '../servers/server/server.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { UserComponent } from '../users/user/user.component';
import { AuthGuardService } from '../auth-guard.service';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { ServerResolver } from '../servers/server/server-resolver.service';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ] },
    {
       path: 'servers',
        canActivateChild: [AuthGuardService],
         component: ServersComponent,
          children: [
        { path: ':id', component: ServerComponent, resolve:{server: ServerResolver} },
        { path: ':id/edit', component: EditServerComponent }
      ] },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not Found'}},
    { path: '**', redirectTo: 'not-found' }
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
