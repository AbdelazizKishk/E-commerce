import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import {
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate/mytranslate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  islogin: Signal<boolean> = input<boolean>(true);
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  countCart: Signal<number> = computed(() =>
    this.cartService.countCartNumber()
  );
  private readonly mytranslateService = inject(MytranslateService);
  private readonly translateService = inject(TranslateService);
  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countCartNumber.set(res.numOfCartItems);
      },
    });
  }
  change(lang: string): void {
    this.mytranslateService.changeLangtranslate(lang);
  }
  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }
}
