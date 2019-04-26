/**
 * The actual act of importing our main module and boostrapping our Angular web application is 
 * left to the main.ts file.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
/**
 *  > In Angular bootstrapping is platform specific
 *  > Angular 1 assumed that Angular would only ever be run in a browser, Angular makes no such
 *    assumption. We could be writing Angular code for a mobile device using a solution like Ionic. We
 *    could be loading up Angular on a node server so we can render HTML for web crawlers that don’t 
 *    run JavaScript.
 *  > Angular isn’t limited to only working in the browser which is why we need to tell Angular exactly
 *    how we want it to bootstrap itself, in our case we are running in the browser so we use the
 *    platformBrowserDynamic function to bootstrap our application.
 */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
