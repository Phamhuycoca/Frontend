import { Subject, Observable } from 'rxjs';

export interface LoadingState {
  loading: boolean;
}

class LoadingService {
  private stateSubject = new Subject<LoadingState>();

  readonly state$: Observable<LoadingState> = this.stateSubject.asObservable();

  private loading = false;

  setLoading(loading: boolean): void {
    this.loading = loading;

    this.stateSubject.next({
      loading,
    });
  }

  startLoading(): void {
    this.setLoading(true);
  }

  stopLoading(): void {
    this.setLoading(false);
  }

  getLoading(): boolean {
    return this.loading;
  }
}

export const loadingService = new LoadingService();
