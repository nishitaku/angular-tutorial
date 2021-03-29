import { Component, OnInit } from "@angular/core";

export interface ToChildData {
  name: string;
  list: string[];
}

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  toChildData: ToChildData;
  toChildList: string[];

  private tmpData: ToChildData;

  constructor() {}

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
}
