import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ReviewService} from '../../../services/review/review.service';
import {HostelReview} from '../../../model/interface/review';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ReplyAddEditComponent} from './reply-add-edit/reply-add-edit.component';
import {APIResponseModel} from '../../../model/interface/APIResponse';
import {ReviewAddEditComponent} from './review-add-edit/review-add-edit.component';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-review',
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    ReplyAddEditComponent,
    ReviewAddEditComponent
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})

export class ReviewComponent implements OnInit {

  reviewList: HostelReview[] = [];

  currentReviewId: number | null = null;
  currentReplyId: number | null = null;
  isReplyModalOpen: boolean = false;
  isReviewModalOpen: boolean = false;

  constructor(private reviewService: ReviewService,
              protected authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllReviews();
  }

  getAllReviews(): void {
    this.reviewService.getReview().subscribe((res) => {
      this.reviewList = res.data;
    });
  }

//Reply
  addReply(reviewId: number): void {
    this.currentReviewId = reviewId;
    this.currentReplyId = null;
    this.isReplyModalOpen = true;
  }

  // Edit Reply Handler
  editReply(reviewId: number, replyId: number): void {
    debugger;
    this.currentReviewId = reviewId;
    this.currentReplyId = replyId;
    this.isReplyModalOpen = true;
  }


  // Close Modal
  closeReplyModal(): void {
    this.isReplyModalOpen = false;
    this.currentReviewId = null;
    this.currentReplyId = null;
  }

  deleteReply(reviewiId: number, replyId: number) {
    const isDelete = confirm("Are you sure you want to delete Reply?");
    if (isDelete) {
      this.reviewService.deleteReply(reviewiId, replyId).subscribe((res: APIResponseModel) => {
        if (res.status) {
          this.toastr.success('Reply deleted Successfully.');
          this.getAllReviews();
        } else {
          this.toastr.error("Something Went Wrong.")
        }
      })
    }
  }

  /**
   * Reviews Section
   */

  deleteReview(id: number) {
    const isDelete = confirm("Are you sure you want to delete Review?");
    if (isDelete) {
      this.reviewService.deleteReview(id).subscribe((res: APIResponseModel) => {
        if (res.status) {
          this.toastr.success('Review deleted Successfully.');
          this.getAllReviews();

        } else {
          this.toastr.error("Something Went Wrong.");
          this.getAllReviews();
        }
      });
    }
  }


  likeReview(reviewId: number) {
    this.reviewService.likeReview(reviewId).subscribe((res: APIResponseModel) => {
      if (res.status) {
        this.getAllReviews();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  dislikeReview(reviewId: number) {
    this.reviewService.dislikeReview(reviewId).subscribe((res: APIResponseModel) => {
      if (res.status) {
        this.getAllReviews();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  editReview(reviewId: number): void {
    this.currentReviewId = reviewId;
    this.isReviewModalOpen = true;
  }

  addReview(): void {
    console.log("add review clicked.")
    this.currentReviewId = null;
    this.isReviewModalOpen = true;
  }

  closeReviewModal(): void {
    this.isReviewModalOpen = false;
    this.currentReviewId = null;
  }
}
