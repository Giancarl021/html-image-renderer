const createHIR = require('./index');

async function main() {
    // Create an instance of the Renderer
    const hir = createHIR({
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
    });

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