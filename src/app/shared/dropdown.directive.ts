import { Directive, ElementRef, Renderer2, OnInit, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  isDropDownButton: boolean;
  isDroped = false;
  readonly openClass = 'open';

  constructor(private elementRef: ElementRef, private render: Renderer2) { }
@HostListener('click') appDropdown() {
  if (this.isDropDownButton) {
    if (!this.isDroped) {
      this.render.addClass(this.elementRef.nativeElement, this.openClass);
    } else {
      this.render.removeClass(this.elementRef.nativeElement, this.openClass);
    }
    this.isDroped = !this.isDroped;
  }
}

  ngOnInit() {
    this.isDropDownButton = (this.elementRef.nativeElement.classList as DOMTokenList).contains('btn-group');
  }
}
