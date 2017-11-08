import { NgModule } from '@angular/core';

import { TestPipe } from './pipes/test.pipe'

const pipes = [
  TestPipe
]

const components = [
]

const directives = [
]

@NgModule({
    imports: [
    ],
    declarations: [
      ...pipes,
      ...components,
      ...directives
    ],
    providers: [
    ],
    exports: [
        ...pipes,
        ...components,
        ...directives
    ]
})
export class SharedModule {
}
