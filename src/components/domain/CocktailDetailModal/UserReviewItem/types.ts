interface UserReviewItemProps {
  reviewId: number;
  userImageUrl?: string;
  userRating?: number;
  userComment?: string;
  onDelete(reviewId: number): void;
}

export type { UserReviewItemProps };
