import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './component/setting.component';
import { StatelistComponent } from './component/statelist.component';
import { StateaddComponent } from './component/stateadd.component';
import { RoleComponent } from './component/role.component';
import { MenumapComponent } from './component/menumap.component';
import { CountryComponent } from './component/country.component';
import { CityComponent } from './component/city.component';
import { AddCityComponent } from './modal/add-city.component';
import { EditcityComponent } from './modal/editcity.component';
import { JobcategoryComponent } from './component/jobcategory.component';
import { JobsubcategoryComponent } from './component/jobsubcategory.component';
import { AddJobsubcategoryComponent } from './modal/add-jobsubcategory.component';
import { EditJobsubcategoryComponent } from './modal/edit-jobsubcategory.component';


const routes: Routes = [{
    path: '',
    component: SettingComponent,
    children: [
        {
            path: '',
            redirectTo: 'list',
        },
        {
            path: 'add',
            component: StateaddComponent,
        },
        {
            path: 'statelist',
            component: StatelistComponent,
        },
        {
            path: 'country',
            component: CountryComponent,
        },
        {
            path: 'city',
            component: CityComponent,
        },
        {
            path: 'role',
            component: RoleComponent
        },
        {
            path: 'menumap',
            component: MenumapComponent
        },
        {
            path: 'jobCategory',
            component: JobcategoryComponent,
        },
        {
            path: 'jobSubCategory',
            component: JobsubcategoryComponent,
        }
    ],
}];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
})

export class SettingRoutingModule{

}

export const routedComponents = [
    SettingComponent,
    StatelistComponent,
    StateaddComponent,
    RoleComponent,
    MenumapComponent,
    CountryComponent,
    CityComponent,
    AddCityComponent,
    EditcityComponent,
    AddJobsubcategoryComponent,
    EditJobsubcategoryComponent,
];