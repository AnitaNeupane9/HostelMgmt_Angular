import {Student} from './student';

export interface ReviewReply {
  id: number;
  content: string;
  student?: Student;
}

export interface HostelReview {
  id: number;
  rating: number;
  content: string;
  likes: number;
  dislikes: number;
  student: Student;
  replies: ReviewReply[];
}
