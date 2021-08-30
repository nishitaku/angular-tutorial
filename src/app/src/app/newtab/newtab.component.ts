import { Component, HostListener, OnInit } from "@angular/core";
import { SessionStorageService } from "src/app/services/session-storage/session-storage.service";
import { StoreService } from "src/app/services/store/store.service";

@Component({
  selector: "app-newtab",
  templateUrl: "./newtab.component.html",
  styleUrls: ["./newtab.component.css"],
})
export class NewtabComponent implements OnInit {
  val: number;
  val$ = this.storeService.val$;
  sessionStorageItem: any;

  constructor(
    private storeService: StoreService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    this.val = this.storeService.val;
    this.sessionStorageItem = this.sessionStorageService.getItem("hogehoge");
    console.log(`ngOnInit: ${this.sessionStorageItem}`);
  }

  onClickBtn() {
    this.storeService.val = 20;
  }

  @HostListener("window:message", ["$event"])
  onPostMessage(event) {
    if (event.origin === window.location.origin) {
      if (event.data.name) {
        console.log(event.data);
      }
    }
  }
}
