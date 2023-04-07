/* global Promise, fetch, window, cytoscape, document, tippy, _ */
import './main.css';
import Template from './templates/Template.js';

(async function App() {
  // console.log('App()');
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();



