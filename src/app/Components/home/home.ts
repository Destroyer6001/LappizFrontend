import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import {Router, RouterOutlet} from '@angular/router';
import {MatDivider, MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-home',
  imports: [
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatDivider,
    MatListItemTitle,
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSideNavOpen: boolean = false;

  constructor(private router: Router) {
  }

  toggleSideNav() {
    this.sidenav?.toggle();
  }

  redirectLink(link: string) : void
  {
    this.router.navigateByUrl(link);
  }
}
