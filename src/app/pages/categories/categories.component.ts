import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  // allCategories: Icategories[] = [];
  allCategories: WritableSignal<Icategories[]> = signal([]);
  subCategories: Icategories[] = [];

  ngOnInit(): void {
    this.getAllCategories();
    this.getSubcategories();
  }
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allCategories.set(res.data);
      },
    });
  }
  getSubcategories(): void {
    this.categoriesService.getAllSubcategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.subCategories = res.data;
      },
    });
  }
}
