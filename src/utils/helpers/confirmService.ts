import { Subject, Observable } from 'rxjs';

export interface ConfirmOptions {
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
}

export interface ConfirmState {
  open: boolean;
  options: ConfirmOptions;
  result?: Subject<boolean>;
}

class ConfirmService {
  private stateSubject = new Subject<ConfirmState>();

  state$: Observable<ConfirmState> =
    this.stateSubject.asObservable();

  private currentResult?: Subject<boolean>;

  open(options: ConfirmOptions = {}): Observable<boolean> {
    this.currentResult = new Subject<boolean>();

    this.stateSubject.next({
      open: true,
      options,
      result: this.currentResult,
    });

    return this.currentResult.asObservable();
  }

  confirm(): void {
    this.currentResult?.next(true);
    this.currentResult?.complete();

    this.close();
  }

  cancel(): void {
    this.currentResult?.next(false);
    this.currentResult?.complete();

    this.close();
  }

  close(): void {
    this.stateSubject.next({
      open: false,
      options: {},
    });

    this.currentResult = undefined;
  }
}

export const confirmService = new ConfirmService();