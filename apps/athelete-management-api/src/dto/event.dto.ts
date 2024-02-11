import { ActionEvent } from '@/utils';

export interface CreateActionEvent {
  event: keyof typeof ActionEvent;
  user: string;
}
