import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { AppCommonModule } from './app.common.module';
import { ExtendedPdfViewerMenuComponent } from './nav/extended-pdf-viewer-menu/extended-pdf-viewer-menu.component';
import { OctocatComponent } from './nav/octocat/octocat.component';
import { TippyDirective } from '@ngneat/helipopper';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OctocatComponent,
    ExtendedPdfViewerMenuComponent
  ],
  imports: [
    AppCommonModule,
    AppRoutingModule,
    TippyDirective
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
