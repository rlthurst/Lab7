// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

const title = document.querySelector('header > h1')
title.addEventListener('click', () => {
  setState(true, 1);
});

const settingBtn = document.querySelector('header > img');
settingBtn.addEventListener('click', () => {
  setState(true, 3);
});

// On entry-page click, pass in entry data as entry param
document.querySelector('main').addEventListener('click', (event) => {
  setState(true, 2, event.target);
});

// On page back/forward, pass in entry index as entry param (for state: 2)
window.addEventListener('popstate', (event) => {
  if(event.state){
    setState(false, event.state.state, event.state.index);
  } else{
    setState(false, 1);
  }
});