
import { createRoot } from 'react-dom/client'
import {PersistGate} from "redux-persist/integration/react";
import App from './App.tsx'
import {persistor, store} from "./app/store.ts";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./constants.ts";


createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>
)
