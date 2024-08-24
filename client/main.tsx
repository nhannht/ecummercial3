import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router";

import 'react-quill/dist/quill.snow.css';
import {Toaster} from "@/components/ui/toaster.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        <Toaster />
    </React.StrictMode>,
)
