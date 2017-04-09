import { Component } from "@angular/core";

import { GoService } from "./shared";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'App works!';

    constructor(private goService: GoService) {}

    click(): void {
        this.goService.run();
    }
}
