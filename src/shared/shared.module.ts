import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts'

import { TestPipe } from './pipes/test.pipe'
import { ClickFeedbackDirective } from './directives/click-feedback.directive'
import { BackFeedbackDirective } from './directives/back-feedback.directive'

const pipes = [
  TestPipe
]

const components = [
]

const directives = [
  ClickFeedbackDirective,
  BackFeedbackDirective
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // ChartsModule,
        HttpClientModule
    ],
    declarations: [
      ...pipes,
      ...components,
      ...directives
    ],
    providers: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // ChartsModule,
        HttpClientModule,
        ...pipes,
        ...components,
        ...directives
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
