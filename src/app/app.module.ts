import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PropertyListComponent } from './pages/property-list/property-list.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { SwiperModule } from "swiper/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import { EditcompanydetailsComponent } from './editcompanydetails/editcompanydetails.component';
import { ViewcompanydetailsComponent } from './viewcompanydetails/viewcompanydetails.component';
import { ViewpropertydetailsComponent } from './viewpropertydetails/viewpropertydetails.component';
import { EditpropertydetailsComponent } from './editpropertydetails/editpropertydetails.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DropzoneDirective } from './dropzone.directive';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PropertyListComponent,
    CompanyListComponent,
    EditcompanydetailsComponent,
    ViewcompanydetailsComponent,
    ViewpropertydetailsComponent,
    EditpropertydetailsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    AddpropertyComponent,
    AddcompanyComponent,
    SidenavComponent,
    PageNotFoundComponent,
    DropzoneDirective,
    UploadTaskComponent,
    PropertyDetailsComponent,
    DialogBoxComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SwiperModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
     MatFormFieldModule,
     MatSidenavModule,
     MatToolbarModule,
     MatSlideToggleModule,
     MatIconModule,
     MatButtonModule,  
     MatMenuModule,
     MatPaginatorModule,
     MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFireStorageModule,
    MatSnackBarModule
    
  ],
  providers: [ { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
