import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, TermtextPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  searchQuery: string = '';

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 6000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  customOptions: OwlOptions = {
    loop: true,
    margin: 15,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  // products: Iproduct[] = [];
  products: WritableSignal<Iproduct[]> = signal([]);

  // categories: Icategories[] = [];
  categories: WritableSignal<Icategories[]> = signal([]);
  ngOnInit(): void {
    this.getProductsData();
    this.getCategioes();
  }
  subscriptionProducts: Subscription = new Subscription();
  subscriptioncategories: Subscription = new Subscription();

  getProductsData(): void {
    this.subscriptionProducts = this.productsService
      .getAllProducts()
      .subscribe({
        next: (res) => {
          this.products.set(res.data);
        },
        error: (err) => {
          console.log(err);
        },
        complete() {},
      });
  }
  getCategioes(): void {
    this.subscriptioncategories = this.categoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.categories.set(res.data);
        },
        error: (err) => {
          console.log(err);
        },
        complete() {},
      });
  }

  addCartItem(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.countCartNumber.set(res.numOfCartItems);
        this.toastrService.success(
          '🛒 Your item is now in the cart! Happy shopping! 🎉',
          'Swift Cart'
        );
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriptionProducts.unsubscribe();
    this.subscriptioncategories.unsubscribe();
  }
  addWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(
          'Your item is now in the Wishlist! 🎉',
          'Swift Cart'
        );
      },
    });
  }
}
