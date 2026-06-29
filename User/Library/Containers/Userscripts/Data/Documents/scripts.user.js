
// ==UserScript==
// @name         Page Color Changer
// @namespace    https://yourscripts.example/
// @version      1.1
// @description  Automatically changes background color on example.com
// @author       Your Name
// @match        https://example.com/*
// @icon         https://example.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ensure the DOM is ready before applying changes
    window.addEventListener('load', () => {
        document.body.style.backgroundColor = '#f0f8ff'; // AliceBlue
        console.log('Background color changed by Page Color Changer script.');
    });
})();
