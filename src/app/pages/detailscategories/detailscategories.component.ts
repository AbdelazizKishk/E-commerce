import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Icategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-detailscategories',
  imports: [],
  templateUrl: './detailscategories.component.html',
  styleUrl: './detailscategories.component.scss',
})
export class DetailscategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  catId: string | null = '';
  detailesCat: Icategories = {} as Icategories;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (prams) => {
        this.catId = prams.get('id');
      },
    });

    this.categoriesService.getSpecificCategories(this.catId).subscribe({
      next: (res) => {
        console.log(res.data);
        this.detailesCat = res.data;
      },
    });
  }
}
