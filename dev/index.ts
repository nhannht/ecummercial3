import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import {useInitial} from "./useInitial";

const ComponentPreviews = React.lazy(() => import("./previews"));

export {
    ComponentPreviews,
    useInitial
};