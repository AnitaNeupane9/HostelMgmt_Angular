import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ReviewService} from '../../../../services/review/review.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import bootstrap from 'bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reply-add-edit',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './reply-add-edit.component.html',
  styleUrl: './reply-add-edit.component.css'
})
export class ReplyAddEditComponent implements OnInit{

  @Input() reviewId: number | null = null;
  @Input() replyId: number | null = null; // Null means "Add Mode", non-null for "Edit Mode"
  @Output() close = new EventEmitter<void>(); // Notify parent component to close modal
  @Output() replyUpdated = new EventEmitter<void>(); // Notify parent to refresh data


  // Form Group for Reply Content
  replyForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(private reviewService: ReviewService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.replyId) {
      this.loadReply();
    }
  }

  /**
   * Load existing reply details in Edit Mode
   */
  loadReply(): void {
    if (this.reviewId && this.replyId) {
      this.reviewService.getReplyDetail(this.reviewId, this.replyId).subscribe({
        next: (response) => {
          this.replyForm.patchValue({
            content: response.data.content,
          });
        },
        error: (err) => {
          console.error('Error loading reply details:', err);
        },
      });
    }
  }

  saveReply(): void {
    if (!this.reviewId) {
      this.toastr.info("review doesn't exist");
      return;
    }

    if (this.replyForm.invalid) {
      return;
    }

    if (this.replyId) {
      // Edit existing reply
      this.reviewService.editReply(this.reviewId, this.replyId, this.replyForm.value).subscribe({
        next: () => {
          this.replyUpdated.emit();
          this.toastr.success('Reply updated successfully');
          this.closeModal();
        },
        error: (err) => {
          this.toastr.error('Failed to update reply:', err);
        },
      });
    } else {
      // Add new reply
      this.reviewService.addReply(this.reviewId, this.replyForm.value).subscribe({
        next: () => {
          this.replyUpdated.emit();
          this.toastr.success('Reply added successfully');
          this.closeModal();
        },
        error: (err) => {
          this.toastr.error('Failed to add reply:', err);
        },
      });
    }
  }


  closeModal(): void {
    this.close.emit(); // Emit event to notify parent component
  }
}

