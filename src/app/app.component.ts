import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';
import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  userName: string | null = null;
  email: string | null = null;
  id: string | null = null;

  title = 'OBD';
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);
  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor() {
    this.#titleService.setTitle(this.title);
    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    console.log('AppComponent initialized');
    const token = localStorage.getItem('token');
    console.log('tokend',token);
    if (token) {
      const decodedToken: any = jwtDecode(token);

      console.log('Decoded token:', decodedToken);
      this.id = decodedToken.sub;
      this.userName = decodedToken.PreferredUsername;
      this.email = decodedToken.email;
      if (this.id) {
        localStorage.setItem('userId', this.id);
      }
      if (this.userName) {
        localStorage.setItem('userName', this.userName);
      }
      if (this.email) {
        localStorage.setItem('email', this.email);
      }


    }


    this.#router.events
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter((evt) => evt instanceof NavigationEnd)
      )
      .subscribe(() => {
      });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map((params) => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter((theme) => ['dark', 'light', 'auto'].includes(theme)),
        tap((theme) => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
