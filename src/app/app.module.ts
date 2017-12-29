import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app.component";

import { environment } from "../environments/environment";

import { AngularFireModule } from "angularfire2";

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from "angularfire2/database";

export const firebaseConfig = {
  apiKey: "AIzaSyB6tIkSAFsEb8cZQSYq4tlOpuw9DWaF-_E",
  authDomain: "simon-cheng-64272.firebaseapp.com",
  databaseURL: "https://simon-cheng-64272.firebaseio.com",
  projectId: "simon-cheng-64272",
  storageBucket: "simon-cheng-64272.appspot.com",
  messagingSenderId: "330596747932"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    environment.production
      ? ServiceWorkerModule.register("/ngsw-worker.js")
      : [],
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
