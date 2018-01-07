import { NgModule } from "@angular/core";
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatGridListModule, MatSidenavModule } from "@angular/material";

@NgModule({
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,

        MatButtonModule
    ],
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,

        MatButtonModule
    ]
})
export class AppModuleMaterial {
}
