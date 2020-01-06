import { Component, OnInit } from "@angular/core";

export interface ToChildData {
  name: string;
  list: string[];
}

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"]
})
export class ParentComponent implements OnInit {
  toChildData: ToChildData;
  toChildList: string[];

  constructor() {}

  ngOnInit() {
    this.toChildData = {
      name: "init",
      list: ["1st", "2nd", "3rd"]
    };
    // this.toChildList = this.toChildData.list;
    this.toChildList = ["a", "b", "c", "d", "e"];
  }

  onClickChange() {
    this.toChildData = {
      name: "changedByParent",
      list: ["1st", "2nd", "3rd"]
    };
  }

  onClickSend() {
    console.log(
      `Parent Component: toChildData=${JSON.stringify(this.toChildData)}`
    );
    console.log(`Parent Component: toChildList=${this.toChildList}`);
  }

  changedData(data: ToChildData) {
    console.log(`Changed data: ${JSON.stringify(data)}`);
    this.toChildData = data;
  }
}
