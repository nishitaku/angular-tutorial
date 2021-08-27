import { Component, HostListener, OnInit } from "@angular/core";
import { StoreService } from "src/app/services/store/store.service";

@Component({
  selector: "app-newtab",
  templateUrl: "./newtab.component.html",
  styleUrls: ["./newtab.component.css"],
})
export class NewtabComponent implements OnInit {
  val: number;
  val$ = this.storeService.val$;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.val = this.storeService.val;
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
