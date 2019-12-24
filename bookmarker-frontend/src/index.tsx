import React from 'react';
import ReactDOM from 'react-dom';
import App  from './App';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
export const REACT_APP_YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

ReactDOM.render(<App />, document.getElementById('root'));
