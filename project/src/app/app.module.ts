import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, TaskService, ProjectService, LabelService, UserService } from './_services/index';

import { FaqComponent } from './faq/index';
import { LoginComponent } from './login/index';
import { LogoutComponent } from './logout/index';
import { ProjectComponent } from './project/index';
import { ProjectsComponent } from './projects/index';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        SimpleNotificationsModule.forRoot(),
        MyDatePickerModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        ProjectComponent,
        FaqComponent,
        LoginComponent,
        LogoutComponent,
        ProjectsComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        TaskService,
        ProjectService,
        LabelService,
        UserService,
        // providers used to create fake backend
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
