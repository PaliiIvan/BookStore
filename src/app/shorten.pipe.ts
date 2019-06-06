import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortPipe implements PipeTransform {
    transform(value: any) {
        return value.substr(0, 10);
    }
}
