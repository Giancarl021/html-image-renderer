# html-image-renderer

NodeJS Library that render images from HTML pages.

Similar package: [html-to-image](https://www.npmjs.com/package/html-to-image).

### Installation

Using NPM:
```bash
npm install --save html-image-renderer
```

Using YARN:
```bash
yarn add html-image-renderer
```

### Usage

```javascript
const createHIR = require('html-image-renderer');

async function main() {
    const hir = createHIR(browserOptions);

    hir.setInterface(interface);

    await hir.render(input, options);
}

main().catch(consoler.error);
```
#### `browserOptions`
Options passed directly to [``Puppeteer.launch()``](https://pptr.dev/#?product=Puppeteer&show=api-puppeteerlaunchoptions), default to ``{}``

#### ``interface``

The function executed in the client-side before the image capture. The parameter received is the value in key "params" on the options object in the function render, default to ``{}``.

Exemple:

```javascript
const iface = function (params) {
    [ ...document.querySelectorAll('img') ].forEach(img => {
        img.src = params.imageSource; // All the images in the HTML will change the src to the image passed in the imageSource parameter
    });
};
```

#### ``input``

The path to the local HTML file **or** the URL address of a website.

```javascript
const inputPath = 'file://path/to/file.html'; // Load local HTML file
// or
const inputPath = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Load a remote page
```

#### ``options``

Additional options sent to the renderer. Contains the size (width and height) of the image, the destination path of the image and the parameters sent to the interface function.

```javascript
const options = {
    width: 1920, // Width of the output image
    height: 1080, // Height of the output image
    dest: null, // Destination path of the output image. If null returns a Buffer instance
    params: {} // The parameters sent to the interface Function
};
```

### Example

This example loads the [NASA official website](https://www.nasa.gov/), changes the logo to another and saves the print on the ``out.png`` file.

```javascript
const createHIR = require('html-image-renderer');

async function main() {
    // Create an instance of the Renderer
    const hir = createHIR();

    hir.setInterface(params => {
        // Get the first image element
        const $img = document.querySelector('img');
        // Change the image to the image sent in the params
        $img.src = params.image;
        // Set the image to be 110x100 px
        $img.width = '110';
        $img.height = '110';
    });

    // NASA Official Website
    await hir.render('https://www.nasa.gov/', {
        // Parameters to the interface function
        params: {
            // Logo image from the game Protecc Earth-chan (https://play.google.com/store/apps/details?id=com.implyingprogramming.proteccearthchan&hl=pt)
            image: 'https://lh3.googleusercontent.com/sgOceUQzOv4cta_hMe0m7wrRLWuB8oiFjZFgRuoh6yqIAxEx6MBxQxK9V5FujZlVNg'
        },
        // Destination of the screenshot
        dest: 'out.png'
    });
}

main().catch(console.error);
```
