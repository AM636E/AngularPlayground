import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  save<T>(key: string, value: T): Promise<T> {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("save", key, value);
    return Promise.resolve(value);
  }

  get<T>(key: string): Promise<T> {
    const storageValue = localStorage.getItem(key) ?? "";
    const converted = JSON.parse(storageValue) as T;

    return Promise.resolve(converted);
  }
}
