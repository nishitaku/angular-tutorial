import { Component, OnInit } from "@angular/core";
import {
  SessionStorageService,
  SessionStorageValue,
} from "../services/session-storage/session-storage.service";
import { StoreService } from "../services/store/store.service";

export interface ToChildData {
  name: string;
  list: string[];
}

export interface PostMessage {
  name: string;
  age: number;
}

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  toChildData: ToChildData;
  toChildList: string[];
  val$ = this.storeService.val$;

  private tmpData: ToChildData;

  constructor(
    private storeService: StoreService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    // this.toChildData = {
    //   name: "init",
    //   list: ["1st", "2nd", "3rd"],
    // };
    this.toChildList = ["a", "b", "c", "d", "e"];
    this.tmpData = {
      name: "tmp",
      list: ["1st", "2nd", "3rd", "4th"],
    };
    this.toChildData = this.tmpData;
  }

  onClickChange() {
    // this.toChildData = {
    //   name: "changedByParent",
    //   list: ["1st", "2nd", "3rd"],
    // };
    this.tmpData = {
      name: "tmp changed",
      list: ["1st", "2nd", "3rd"],
    };
  }

  onClickChangePart() {
    this.toChildData.name = "changedNameByParent";
  }

  changedData(data: ToChildData) {
    console.log(`Changed data: ${JSON.stringify(data)}`);
    this.toChildData = data;
  }

  onClickNewTabWithPostMessage() {
    this.storeService.val = 10;
    const newtabRef = window.open("/newtab", "_blank");
    newtabRef.onload = () => {
      const data: PostMessage = {
        name: "taro",
        age: 10,
      };
      newtabRef.postMessage(data, window.location.origin);
    };
  }

  onClickNewTabWithSessionStorage() {
    this.sessionStorageService.setItem("hogehoge", "ooo");
    const newtabRef = window.open("/newtab", "_blank");
  }

  onClickUpdateSessionStorage() {
    const value: SessionStorageValue = {
      name: "hanako",
      age: 20,
    };
    this.sessionStorageService.setUserItem("11111", value);
  }

  onClickRemoveSessionStorage() {
    this.sessionStorageService.removeUserItem("abcdef");
  }
}
