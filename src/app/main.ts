import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import './rxjs-imports'

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(e => {
  window.alert(e.message)
})
