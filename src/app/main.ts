import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';



platformBrowserDynamic().bootstrapModule(AppModule)
.catch(e => {
  window.alert(JSON.stringify(e, null, 2))
})
