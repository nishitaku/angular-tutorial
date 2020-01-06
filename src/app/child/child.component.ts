import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  Output,
  EventEmitter
} from "@angular/core";
import { ToChildData } from "../parent/parent.component";
import { cloneDeep } from "lodash";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"]
})
export class ChildComponent implements OnInit, OnChanges {
  @Input() inData: ToChildData;
  @Input() inList: string[];

  @Output() changeData: EventEmitter<ToChildData> = new EventEmitter();

  copyData: ToChildData;
  childList = ["1", "2", "3", "4", "5"];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.inData) {
      console.log(`ChildComponent: inData=${JSON.stringify(this.inData)}`);
      // deep copy
      this.copyData = cloneDeep(this.inData);
    }
  }

  onClickChange() {
    // @Inputのオブジェクトを変更すると、親コンポーネントのオブジェクトも変更されてしまう
    // this.inData.name = "changedByChild";
    // this.inData.list = ["2nd", "3rd", "1st"];
    this.copyData.name = "changedByChild";
    this.copyData.list = ["2nd", "3rd", "1st"];
  }

  onClickEmit() {
    this.changeData.emit(this.copyData);
  }

  onClickChangeList() {
    console.log(`inList=${this.inList}`);
    // 破壊的な配列操作ではChangeDetectionがはしらないのでUIが変わらない
    // さらに、@Inputだった場合は親コンポーネントの状態が直接変更されてしまう
    this.inList.splice(1, 2, this.inList[2], this.inList[1]);
    // deep copyしてから反映させる
    // const copyList = cloneDeep(this.inList);
    // copyList.splice(1, 2, copyList[2], copyList[1]);
    // this.inList = copyList;
    console.log(`inList=${this.inList}`);
  }

  onClickChangeChildList() {
    console.log(`child list=${this.childList}`);
    // 破壊的な配列操作ではChangeDetectionがはしらないのでUIが変わらない
    // this.childList.splice(1, 2, this.childList[2], this.childList[1]);
    this.childList.shift();
    console.log(`child list=${this.childList}`);
  }
}
