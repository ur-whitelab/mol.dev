import * as tf from '@tensorflow/tfjs-core';
import { loadLayersModel } from '@tensorflow/tfjs-layers';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { vocab, vocab_stoi } from './vocab.json';


export async function loadModel(url) {
    const model = await loadLayersModel(url,
        // not sure why, but seems to require this. It cannot
        // determine which fetch to use otherwise
        { fetchFunc: (path, rinit = RequestInit) => fetch(path, rinit) });
    return model;
};


export async function parseResult(y) {
    const mus = tf.squeeze(y[0]);
    const vars = tf.squeeze(y[1]);
    const mu = await mus.array();
    const my_var = await vars.array();
    mus.dispose();
    vars.dispose();
    y[0].dispose();
    y[1].dispose();
    return { mu: mu, var: my_var };
}

export function seq2vec(s) {
    const result = Array()
    let in_token = false;
    let token = '';
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '[')
            in_token = true;
        else if (s[i] == ']') {
            in_token = false;
            result.push(vocab_stoi['[' + token + ']']);
            token = '';
        } else if (s[i] == '.') {
            result.push(vocab_stoi['.']);
        } else if (in_token)
            token += s[i];
    }
    const vec = tf.tensor(result, [1, result.length]);
    return vec;
}