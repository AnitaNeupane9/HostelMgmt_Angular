export interface Room{
  id: number;
  roomNumber: string;
  floor: number;
  roomType: string;
  capacity: number;
  currentStudentCount: number;
  availableStudentSlots: number;
  status: string;

}
