import { Component, Output, EventEmitter } from '@angular/core';
import { DisplayRecipleStoreFlag } from '../models/reciple.display.flag';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
@Output() displayEventEmiter = new EventEmitter<DisplayRecipleStoreFlag>();

    onRecipleShow() {
        this.displayEventEmiter.emit(DisplayRecipleStoreFlag.Reciple);
    }

    onShopingListShow() {
        this.displayEventEmiter.emit(DisplayRecipleStoreFlag.ShopingList);
    }
}
