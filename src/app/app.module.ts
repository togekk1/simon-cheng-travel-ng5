import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgProgressModule } from '@ngx-progressbar/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AutofocusDirective } from './app.directive';
import { KeysPipe } from './app.pipe';
import { AppService } from './app.service';
import { BgLoadingComponent } from './components/bg-loading/bg-loading.component';
import { BgLoadingService } from './components/bg-loading/bg-loading.service';
import { JournalComponent } from './components/journal/journal.component';
import { ContentToolsComponent } from './contenttools.component';
import { NgInitDirective } from './nginit.directive';
import { DatabaseService } from './services/database.service';
import { WasmService } from './services/wasm.service';

// New imports to update based on AngularFire2 version 4
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

export const firebaseConfig = {
  apiKey: 'AIzaSyB6tIkSAFsEb8cZQSYq4tlOpuw9DWaF-_E',
  authDomain: 'simon-cheng-64272.firebaseapp.com',
  databaseURL: 'https://simon-cheng-64272.firebaseio.com',
  projectId: 'simon-cheng-64272',
  storageBucket: 'simon-cheng-64272.appspot.com',
  messagingSenderId: '330596747932'
};

@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    NgInitDirective,
    KeysPipe,
    ContentToolsComponent,
    JournalComponent,
    BgLoadingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    environment.production
      ? ServiceWorkerModule.register('/ngsw-worker.js')
      : [],
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    NgProgressModule.forRoot(),
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AppService,
    WasmService,
    DatabaseService,
    BgLoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
