import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FirebaseService, FirestoreService } from './service.js';

const firebase = new FirebaseService()
const fireStore = new FirestoreService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App firebase={firebase} fireStore={fireStore}/>
);
