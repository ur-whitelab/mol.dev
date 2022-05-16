importScripts('https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js');

const selfiesVersion = 2.0;
let pyodide = null;
// make fake function to start with
const selfiesMod = {
    decoder: s => { return null },
    encoder: s => { return null },
    pyodideLoaded: 'loading',
    selfiesLoaded: 'loading'
};

onmessage = (e) => {
    const data = e.data;
    const mtype = data[0];
    const mid = data[1];
    let result = '';
    if (mtype === 'loading-status') {
        result = { pyodide: selfiesMod.pyodideLoaded, selfies: selfiesMod.selfiesLoaded };
    } else if (mtype === 'encoder') {
        result = selfiesMod.encoder(data[2]);
    } else if (mtype === 'decoder') {
        result = selfiesMod.decoder(data[2]);
    }
    postMessage([mtype, mid, result]);
}


console.log('SELFIE WORKER: Started')
importScripts('https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js')

loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" }).then((pyodide) => {
    selfiesMod.pyodideLoaded = 'loaded';
    pyodide.loadPackage('micropip').then(() => {
        pyodide.runPythonAsync(`
            import micropip
            await micropip.install('selfies==${selfiesVersion}')
            from selfies import encoder, decoder
        `, (err) => {
            selfiesMod.pyodideLoaded = 'failed';
            selfiesMod.selfiesLoaded = 'failed';
        }).then(() => {
            selfiesMod.selfiesLoaded = 'loaded'
            const decoder = pyodide.globals.get('decoder');
            selfiesMod.decoder = (selfies) => {
                try {
                    let result = decoder(selfies);
                    return result;
                } catch (e) {
                    console.log(e);
                    return null;
                }
            };
            const encoder = pyodide.globals.get('encoder');
            selfiesMod.encoder = (selfies) => {
                try {
                    let result = encoder(selfies);
                    return result;
                } catch (e) {
                    console.log(e);
                    return null;
                }
            };
            console.log('Loaded selfies')
        });
    }, (err) => {
        selfiesMod.selfiesLoaded = 'failed';
    })
});
