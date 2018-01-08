import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/ngsw-worker.js")
//     .then(function(registration) {
//       console.log("Service Worker registered");
//     })
//     .catch(function(err) {
//       console.log("Service Worker registration failed: ", err);
//     });
// }

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
