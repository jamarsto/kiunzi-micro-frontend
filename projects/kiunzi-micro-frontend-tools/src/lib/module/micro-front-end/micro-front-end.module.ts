import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../../component/not-found/not-found.component';
import { RootComponent } from '../../component/root/root.component';
import { UnauthorisedComponent } from '../../component/unauthorised/unauthorised.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    RootComponent,
    UnauthorisedComponent,
  ],
  imports: [
    RouterModule
  ],
  providers: [
  ],
  exports: [
    NotFoundComponent,
    RootComponent,
    UnauthorisedComponent,
  ]
})
export class MicroFrontEndModule { }
