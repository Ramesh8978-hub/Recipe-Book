import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [CommonModule],
    exports: [
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [AlertComponent]
})
export class SharedModule { }