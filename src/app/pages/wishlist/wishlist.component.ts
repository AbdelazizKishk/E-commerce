import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  imports: [TermtextPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  wishListProducts: Iproduct[] = [];
  ngOnInit(): void {
    this.getAllWishlist();
  }
  getAllWishlist(): void {
    this.wishlistService.getloggedUserWishlist().subscribe({
      next: (res) => {
        this.wishListProducts = res.data;
      },
    });
  }

  removeProduct(id: string): void {
    this.wishlistService.removeProductfromWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
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
                  text: 'Your Item is deleted.',
                  icon: 'success',
                });
                this.getAllWishlist();
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                  title: 'Cancelled',
                  text: 'Your Wishlist is safe :)',
                  icon: 'error',
                });
              }
            });
        }
      },
    });
  }
}
