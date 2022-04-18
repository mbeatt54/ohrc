export interface Stock {
  certificateNumber: string;
  numberOfShares: number;
  transferredFrom?: Stock[];
  transferredTo?: number;
  name: string;
  issueDate: Date;
  refundedDate?: Date;
  notes?: string;
}
