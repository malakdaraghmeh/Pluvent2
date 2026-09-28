import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './index.css';

import './i18n/i18n';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { PrimeReactProvider } from 'primereact/api';
import ErrorBoundary from './components/helper/ErrorBoundary';

const container = document.getElementById('root');
if (container) {
    createRoot(container).render(
        <Provider store={store}>
            <HelmetProvider>
                <ErrorBoundary>
                    <PrimeReactProvider>
                        <BrowserRouter>
                            <App />
                            <Toaster richColors position="top-right" />
                        </BrowserRouter>
                    </PrimeReactProvider>
                </ErrorBoundary>
            </HelmetProvider>
        </Provider>
    );
}


