import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ReviewService} from '../../../../services/review/review.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-review-add-edit',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './review-add-edit.component.html',
  styleUrl: './review-add-edit.component.css'
})
export class ReviewAddEditComponent implements OnInit{

  @Input() reviewId: number | null = null;
  @Output() close = new EventEmitter<void>(); // Notify parent component to close modal
  @Output() reviewUpdated = new EventEmitter<void>();

  reviewForm: FormGroup = new FormGroup({
    rating: new FormControl(null, [Validators.required]),
    content: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private reviewService: ReviewService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.reviewId) {
      this.loadReview();
    }
  }

  /**
   * Load existing reply details in Edit Mode
   */
  loadReview(): void {
    if (this.reviewId ) {
      this.reviewService.getReviewDetail(this.reviewId).subscribe({
        next: (response) => {
          this.reviewForm.patchValue({
            content: response.data.content,
            rating : response.data.rating
          });
        },
        error: (err) => {
          console.error('Error loading reply details:', err);
        },
      });
    }
  }

  saveReview(): void {
    debugger;

    if (this.reviewForm.invalid) {
      return;
    }

    if (this.reviewId) {
      // Edit existing review
      this.reviewService.editReview(this.reviewId, this.reviewForm.value).subscribe({
        next: () => {
          this.reviewUpdated.emit();
          this.toastr.success('Review updated successfully');
          this.closeModal();
        },
        error: (err) => {
          this.toastr.error('Failed to update Review:', err);
        },
      });
    } else {
      // Add new review
      this.reviewService.addReview(this.reviewForm.value).subscribe({
        next: () => {
          this.reviewUpdated.emit();
          this.toastr.success('Review added successfully');
          this.closeModal();
        },
        error: (err) => {
          this.toastr.error('Something Went Wrong.Try Again!');
        },
      });
    }
  }

  setRating(rating: number): void {
    this.reviewForm.get('rating')?.setValue(rating);
  }

  closeModal(): void {
    this.close.emit();
  }
}


