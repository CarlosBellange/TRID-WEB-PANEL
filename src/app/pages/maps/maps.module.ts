import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsRoutingModule, routedComponents } from './maps-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    AgmCoreModule.forRoot({
     // apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
     apiKey:'AIzaSyBrmUANBWFGdVahMgTiVnfGucKyi5iRiwA',
      libraries: ['places'],
    }),
    LeafletModule.forRoot(),
    MapsRoutingModule,
    NgxEchartsModule,
  ],
  exports: [...routedComponents],
  declarations: [
    ...routedComponents,
  ],
})
export class MapsModule { }
