import React from 'react'
import ReactDOM from 'react-dom/client'
//reset CSS all navigators
import { CssBaseline } from '@mui/material'
import {Router} from './Router.jsx'
//Fonts 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline/>
    <Router/>
  </React.StrictMode>,
)
