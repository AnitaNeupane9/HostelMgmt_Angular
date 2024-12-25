import {StudentSummary} from './StudentSummary';

export interface Complaint{
  id: number;
  dateFiled: string;
  topic: string;
  description: string;
  dateResolved: string;
  severityLevel: string;
  resolved: boolean;
  student: StudentSummary;
}
