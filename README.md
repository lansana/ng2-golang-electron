# ng2-golang-electron

This repository is an example starting ground for building cross-platform Electron apps with Angular2 and Go.

## Installation

To clone the repository, run the following command:

`git clone https://github.com/lansana/ng2-golang-electron`

## Overview

The entire app is housed in the `client` directory. If the structure does not suit your needs,
feel free to move anything around. Make sure you correct any related paths in code/config files when doing so.

### Electron

`client/electron.js` is your entry point for electron.

The `renderer.js` function provided in the default Electron app is located at `client/src/assets/js/renderer.js`.

That function has the following code, which the application if will be discussed in the Angular2 section:

```js
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const spawn = require('child_process').spawn;

window.APP = {
    spawn: spawn,
    process: process
};
```

The `window` will contain an app configuration object called `APP`, as
you can see in the code above.

The Node.js `process` provided by Electron will be on the app object along with a `spawn` property,
which will be a function from a Node.js `child_process`. This is what the `GoService` uses to execute
your Go binaries.

### Angular2

The Angular2 code is freshly installed with the `ng new ...` command, and includes all of the defaults such
as the tests and app module. Included is a custom `shared` module, which contains a couple of services:
- `WindowService` - access the native `window` property to use the app configuration set in `renderer.js`
- `GoService` - allows you to run your go binaries on a Node.js child process with a function call

### Go

`client/cmd` is the directory to store your Go files and binaries. 

## Getting started

Before you start coding, there are a couple of things you should do.

1. Go to `client/package.json` and update the build script to point to the correct path. This is necessary
in order for your assets to load properly when running `ng build`.

For example, my directory was located at `C:/Projects/Go/src/ng2-golang-electron`, so I set the path to the
`dist` directory that would be built by the angular-cli when running `ng build`. You should update it to your 
respective path.

2. Update `client/.env` to reflect the local server and port you will be developing on. 

That should be all the pre-config.

## Development and packaging

To work in development, keep the default `.env` config and run the following commands in separate terminals:
- `electron .`
- `npm run start`

To build and package for production, update your `.env` and set `PACKAGE` to true. Then build your Angular2 code:
- `npm run build` (You should update the build script in `package.json` to build for production, or create a new production build script and run that instead)
- Then run whatever Electron commands you need to run to package your Electron app.

`electron.js` uses the `.env` config to know how to run your Electron app:

```js
// ...

// PACKAGE=true (runs the built files in the dist folder created by `ng build`
if (process.env.PACKAGE === 'true') { 
    window.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
} 
// PACKAGE=false (runs http://localhost:4200 server started by `ng serve`)
else { 
    window.loadURL(process.env.HOST);
}
```

## License

The MIT License (MIT)

Copyright (c) 2017 Lansana Camara

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
