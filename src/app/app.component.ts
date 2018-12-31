import { Component } from '@angular/core';
import { DisplayRecipleStoreFlag } from './models/reciple.display.flag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  flag: DisplayRecipleStoreFlag = DisplayRecipleStoreFlag.Reciple;
  onChaneDisply(flag: DisplayRecipleStoreFlag) {
    this.flag = flag;
  }

  public get IsReciple(): boolean {
    return this.flag === DisplayRecipleStoreFlag.Reciple;
  }

}
