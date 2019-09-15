import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import { UserService } from '../../../@core/mock/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: [ './header.component.scss' ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor( private sidebarService: NbSidebarService,
               private menuService: NbMenuService,
               private userService: UserService,
               private analyticsService: AnalyticsService,
               public router: Router,
               private themeService: NbThemeService ) {
  }

  ngOnInit() {
   this.themeService.changeTheme('default');
    this.userService.getUsers()
      .subscribe(( users: any ) => this.user = users.nick);
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    })
  }

  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      // Do something on Log out
      console.log('Log out Clicked ')
      localStorage.clear();
      this.router.navigate(['']);
    } else if ( title === 'Profile' ) {
      // Do something on Profile
      console.log('Profile Clicked ')
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }


}
