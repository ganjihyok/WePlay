// entry file for application

// import third-party apps
import React from 'react';
import ReactDOM from 'react-dom';

// import root app
import App from './components/App/App';

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(<App />, MOUNT_NODE);