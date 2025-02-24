import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  allBrands: Ibrands[] = [];
  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getSpecificBrands(id: string): void {
    this.brandsService.getSpecificBrands(id).subscribe({
      next: (res) => {
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getAllBrands();
  }
}
