import {} from '../../types/habits';
import { CurrentUserType } from '../../types/users';

export type UsersSliceState = {
  state: 'success' | 'loading' | 'error';
  data?: CurrentUserType;
};
