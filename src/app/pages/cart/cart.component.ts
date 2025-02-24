import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: Icart = {} as Icart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeSpecificItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.cartService.countCartNumber.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateItem(id: string, count: number): void {
    this.cartService.updateCartCount(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  clearAllItems(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn-success',
              cancelButton: ' btn-danger',
            },
            buttonsStyling: false,
          });
          swalWithBootstrapButtons
            .fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, cancel!',
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                  title: 'Deleted!',
                  text: 'Your Shop Cart deleted.',
                  icon: 'success',
                });
                this.cartDetails = {} as Icart;
                this.cartService.countCartNumber.set(0);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                  title: 'Cancelled',
                  text: 'Your Shop Cart is safe :)',
                  icon: 'error',
                });
              }
            });
        }
      },
    });
  }
}
