import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
    imports: [],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    providers: [],
})
export class SharedModule { }
