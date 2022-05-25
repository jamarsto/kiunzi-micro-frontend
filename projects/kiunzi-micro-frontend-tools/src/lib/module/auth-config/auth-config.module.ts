import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
              authority: 'https://login.demo.jasonmarston.co.uk/auth/realms/demo',
              redirectUrl: window.location.origin,
              postLogoutRedirectUri: window.location.origin,
              clientId: 'demo-app',
              scope: 'openid profile email',
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
              historyCleanupOff: false,
          }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
