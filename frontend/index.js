/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


// import { NativeRouter } from "react-router-native";
// import * as ReactDOMClient from 'react-dom/client';

// const root = ReactDOMClient.createRoot(document.getElementById('root'));
// root.render(
//     <NativeRouter>
//         <App/>
//     </NativeRouter>
// )