import { Injectable } from '@angular/core';

// Return the global native browser window object
function _window(): any {
    return window;
}

@Injectable()
export class WindowService {
    get nativeWindow(): any {
        return _window();
    }
    get app(): any {
        return this.nativeWindow.APP;
    }
}
