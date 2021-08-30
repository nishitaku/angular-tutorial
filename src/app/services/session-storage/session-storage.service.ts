import { Injectable } from "@angular/core";

export interface SessionStorageValue {
  name: string;
  age: number;
}

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor() {}

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }

  setUserItem(userId: string, value: SessionStorageValue) {
    const currentValue: SessionStorageValue = this.getItem(userId)
      ? JSON.parse(this.getItem(userId))
      : {};
    this.setItem(userId, JSON.stringify(Object.assign(currentValue, value)));
  }

  getUserItem(userId: string): SessionStorageValue {
    return JSON.parse(this.getItem(userId));
  }

  removeUserItem(userId: string) {
    this.removeItem(userId);
  }
}
