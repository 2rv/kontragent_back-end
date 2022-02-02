import { IsOptional, IsIn } from 'class-validator';
import { FEEDBACK_STATUS } from '../enum/feedback-status.enum';

export class UpdateFeedbackStatusDto {
  @IsOptional()
  @IsIn(Object.values(FEEDBACK_STATUS))
  status: FEEDBACK_STATUS;
}
