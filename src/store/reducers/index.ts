import { UserAppState } from './userReducer';

export * from './rootReducer';

export interface AppState {
  user: UserAppState
}
