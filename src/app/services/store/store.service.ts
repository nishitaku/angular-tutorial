import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  private _val: number = 0;
  get val(): number {
    return this._val;
  }
  set val(value: number) {
    this._val = value;
    this.valSubject.next(value);
  }

  private valSubject = new BehaviorSubject<number>(0);
  get val$() {
    return this.valSubject.asObservable();
  }

  constructor() {}
}
