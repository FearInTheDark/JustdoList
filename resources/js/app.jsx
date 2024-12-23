import '../css/app.css';
import './bootstrap';

import {createInertiaApp} from '@inertiajs/react';
import {createRoot} from 'react-dom/client';
import {LanguageProvider} from "@/contexts/LanguageContext"
import {SheetProvider} from "@/contexts/SheetContext"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const appName = import.meta.env.VITE_APP_NAME || '- JustdoList';
const queryClient = new QueryClient()

createInertiaApp({
    title: (title) => `${title}` || `${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", {eager: true});
        return pages[`./pages/${name}.jsx`];
    },
    setup({el, App, props}) {
        const root = createRoot(el);
        root.render(
            <QueryClientProvider client={queryClient}>
                <LanguageProvider>
                    <SheetProvider>
                        <App {...props} />
                    </SheetProvider>
                </LanguageProvider>
            </QueryClientProvider>
        );
    },
    progress: {
        delay: 250,
        color: '#ffffff',
    },
}).then()
