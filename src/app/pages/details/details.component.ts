import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  subscriptionSpecificProducts: Subscription = new Subscription();
  detailsProduct: Iproduct | null = null;
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');
        this.subscriptionSpecificProducts = this.productsService
          .getSpecificProducts(idProduct)
          .subscribe({
            next: (res) => {
              this.detailsProduct = res.data;
            },
          });
      },
    });
  }
  addCartItem(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.countCartNumber.set(res.numOfCartItems);
        this.toastrService.success(
          '🛒 Your item is now in the cart! Happy shopping! 🎉',
          'Swift Cart'
        );
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriptionSpecificProducts.unsubscribe();
  }
}
