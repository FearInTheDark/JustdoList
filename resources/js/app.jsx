import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || '- Laravel';

createInertiaApp({
    title: (title) => `${title} ${appName}`,
    resolve:  (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", {eager: true});
        return pages[`./pages/${name}.jsx`];
    },
    setup({el, App, props}) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        delay: 250,
        color: '#ffffff',
    },
}).then()
