// auth.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface AuthStateModel {
  authToken: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    authToken: null,
  },
})
export class AuthState {
  @Selector()
  static authToken(state: AuthStateModel): string | null {
    return state.authToken;
  }

  @Action(SetAuthToken)
  setAuthToken(ctx: StateContext<AuthStateModel>, action: SetAuthToken): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      authToken: action.token,
    });
  }
}

export class SetAuthToken {
  static readonly type = '[Auth] Set Auth Token';

  constructor(public token: string) {}
}
