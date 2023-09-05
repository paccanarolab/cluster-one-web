// /* global Promise, fetch, window, cytoscape, document, tippy, _ */
// import cytoscape from 'cytoscape';

// function Graph(dataArray) {
//   var h = function(tag, attrs, children){
//     var el = document.createElement(tag);
//     Object.keys(attrs).forEach(function(key){
//       var val = attrs[key];
//       el.setAttribute(key, val);
//     });

//     children.forEach(function(child){
//       el.appendChild(child);
//     });

//     return el;
//   };

//   var t = function(text){
//     var el = document.createTextNode(text);

//     return el;
//   };

//   var $ = document.querySelector.bind(document); // jquery selector

//   var cy = window.cy = cytoscape({
//     container: document.getElementById('cy'),
//     style: dataArray[0],
//     elements: dataArray[1],
//     layout: { name: 'random' }
//   });

//   var params = {
//     name: 'random',
//     nodeSpacing: 5,
//     edgeLengthVal: 45,
//     animate: true,
//     randomize: false,
//     maxSimulationTime: 1500
//   };
  
//   var layout = makeLayout();
//   layout.run();

//   var $btnParam = h('div', {
//     'class': 'param'
//   }, []);

//   var $config = $('#config');
  
//   $config.appendChild( $btnParam );

//   function makeLayout( opts ){
//     params.randomize = false;
//     params.edgeLength = function(e){ return params.edgeLengthVal / e.data('weight'); };

//     for( var i in opts ){
//       params[i] = opts[i];
//     }

//     return cy.layout( params );
//   }


//   var makeTippy = function(node, html){
//     return tippy( node.popperRef(), {
//       html: html,
//       trigger: 'manual',
//       arrow: true,
//       placement: 'bottom',
//       hideOnClick: false,
//       interactive: true
//     } ).tooltips[0];
//   };

//   var hideTippy = function(node){
//     var tippy = node.data('tippy');

//     if(tippy != null){
//       tippy.hide();
//     }
//   };

//   var hideAllTippies = function(){
//     cy.nodes().forEach(hideTippy);
//   };

//   cy.on('tap', function(e){
//     if(e.target === cy){
//       hideAllTippies();
//     }
//   });

//   cy.on('tap', 'edge', function(e){
//     hideAllTippies();
//   });

//   cy.on('zoom pan', function(e){
//     hideAllTippies();
//   });

//   cy.nodes().forEach(function(n){
//     var g = n.data('name');

//     var $links = [
//       {
//         name: 'UniProt search',
//         url: 'http://www.uniprot.org/uniprot/?query='+ g +'&fil=organism%3A%22Homo+sapiens+%28Human%29+%5B9606%5D%22&sort=score'
//       },
//     ].map(function( link ){
//       return h('a', { target: '_blank', href: link.url, 'class': 'tip-link' }, [ t(link.name) ]);
//     });
//     var tippy = makeTippy(n, h('div', {}, $links));
//     n.data('tippy', tippy);
//     n.on('click', function(e){
//       tippy.show();
//       cy.nodes().not(n).forEach(hideTippy);
//     });
//   });

//   $('#config-toggle').addEventListener('click', function(){
//     $('body').classList.toggle('config-closed');
//     cy.resize();
//   });

// }




// export default Graph;

