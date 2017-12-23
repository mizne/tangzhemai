import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromApp from './app.action'
import { TenantService } from './services/tenant.service'

@Injectable()
export class AppEffects {
  @Effect()
  logout$ = this.actions$.ofType(fromApp.LOGOUT).switchMap(() => {
    return Observable.fromPromise(this.tenantService.logout())
      .map(() => {
        return new fromApp.LogoutSuccessAction()
      })
      .catch(() => {
        return Observable.of(new fromApp.LogoutFailureAction())
      })
  })

  constructor(
    private actions$: Actions,
    private tenantService: TenantService
  ) {}
}
