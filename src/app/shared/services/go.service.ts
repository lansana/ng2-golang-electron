import { Injectable } from '@angular/core';

import { WindowService } from './window.service';

@Injectable()
export class GoService {
    constructor(private window: WindowService) {}

    run(onData?: Function, onClose?: Function): void {
        let binary;

        switch (this.window.app.process.platform) {
            case 'win32': binary = this.window.app.spawn('./cmd/main.exe');
                break;
            case 'darwin': binary = this.window.app.spawn('./cmd/main');
                break;
            case 'linux': binary = this.window.app.spawn('./cmd/main');
                break;
        }

        let stdout, stderr, close;

        binary.stdout.on('data', data => {
            stdout = data;

            if (onData instanceof Function) {
                onData(stdout, stderr);
            } else {
                console.log(`Go binary stdout: ${data}`);
            }
        });

        binary.stderr.on('data', data => {
            stderr = data;

            if (onData instanceof Function) {
                onData(stdout, stderr);
            } else {
                console.log(`Go binary stderr: ${data}`);
            }
        });

        binary.on('close', (code) => {
            close = code;

            if (onClose instanceof Function) {
                onClose(close);
            } else {
                console.log(`Child process of Go binary exited with status ${code}`);
            }
        });
    }
}
