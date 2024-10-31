import React from 'react';
import { render } from 'react-dom';
import App from './views/App';

const docReady = (cb) => {
    // see if DOM is already available
    if (['complete', 'interactive'].includes(document.readyState)) {
        setTimeout(cb);
    } else {
        document.addEventListener('DOMContentLoaded', cb);
    }
};

docReady(() => {
    const appEl = document.getElementById('app');
    if (appEl) {
        appEl.innerHTML = '';
        render(<App />, appEl);
    }
});
