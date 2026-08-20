import { BehaviorSubject } from 'rxjs';

export interface ModalState<T = unknown> {
  open: boolean;
  code: string | null;
  data?: T | T[] | null;
}

class ModalService<T = unknown> {
  private stateSubject = new BehaviorSubject<ModalState<T>>({
    open: false,
    code: null,
    data: null,
  });

  state$ = this.stateSubject.asObservable();

  setOpen(code: string, data?: T | T[] | null) {
    this.stateSubject.next({
      open: true,
      code,
      data,
    });
  }

  setClose() {
    this.stateSubject.next({
      open: false,
      code: null,
      data: null,
    });
  }

  getValue() {
    return this.stateSubject.value;
  }
}

export const modalService = new ModalService();
