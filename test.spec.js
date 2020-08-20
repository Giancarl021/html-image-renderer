const createHIR = require('./index');

async function main() {
    const hir = createHIR();

    hir.setInterface(params => {
        // if (!params.text) return;
        // document.querySelector('h1').innerText = params.text;

        // delete params.text;

        for (const key in params) {
            document.documentElement.style.setProperty('--' + key, params[key]);
        }
    });

    await hir.render('https://www.google.com', {
        params: {
            color: '#303',
            text: 'Xalabaias Monstro',
            size: '100px'
        },
        dest: 'demo/out.png'
    });
}

main().catch(console.error);