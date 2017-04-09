import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// App modules
import { SharedModule } from "./shared/shared.module";

// App components
import { AppComponent } from "./app.component";

// App services
import { WindowService, GoService } from './shared';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule
    ],
    providers: [
        WindowService,
        GoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
