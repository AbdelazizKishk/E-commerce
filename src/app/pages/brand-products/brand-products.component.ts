import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Subscription } from 'rxjs';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-brand-products',
  imports: [CarouselModule],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.scss',
})
export class BrandProductsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly brandsService = inject(BrandsService);
  private readonly categoriesService = inject(CategoriesService);
  subscriptionSpecificBrand: Subscription = new Subscription();

  detailsBrand: Ibrands | null = null;

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  getSpecificBrands(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let idBrands = p.get('id');
        this.subscriptionSpecificBrand = this.brandsService
          .getSpecificBrands(idBrands)
          .subscribe({
            next: (res) => {
              console.log(res.data);
              this.detailsBrand = res.data;
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
    });
  }

  ngOnInit(): void {
    this.getSpecificBrands();
  }
  ngOnDestroy(): void {
    this.subscriptionSpecificBrand.unsubscribe();
  }
}
