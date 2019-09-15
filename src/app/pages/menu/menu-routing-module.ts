
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './component/menu.component';
import { MenulistComponent } from './component/menulist.component';
import { ChildmenulistComponent } from './component/childmenulist.component';
import { AddchildmenuComponent } from './modal/addchildmenu.component';
import { EditchildmenuComponent } from './modal/editchildmenu.component';

const routes: Routes = [{
    path: '',
    component: MenuComponent,
    children: [
        {

            path: '',
            redirectTo: 'list',
        },
        {
            path: 'list',
            component: MenulistComponent,
        },
        {
            path: 'childmenulist',
            component: ChildmenulistComponent
        },
        
    ],
}];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuRoutingModule {


}
export const routedComponents = [
    MenuComponent,
    MenulistComponent,
    ChildmenulistComponent,
    AddchildmenuComponent,
    EditchildmenuComponent
];