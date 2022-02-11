import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceholder]' // naming pattern for naming directives should be camelCase in case you dont know it yet...
})
export class PlaceHolderDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
