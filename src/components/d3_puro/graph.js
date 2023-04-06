import * as d3 from "d3";

function drawGraph(data) {
    // Creamos un objeto de fuerza de D3 para calcular la posición de los nodos
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink().links(data.links).distance(100))
        .force("charge", d3.forceManyBody().strength(-300).distanceMax(500))
        .force("center", d3.forceCenter(600, 400));

    // Creamos un grupo SVG para contener el grafo
    const svg = d3.select("#graph")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [0, 0, 1200, 800])
        .attr("preserveAspectRatio", "xMidYMid meet");

    // Creamos un grupo para los enlaces
    const linkGroup = svg.append("g")
        .attr("class", "links");

    // Creamos un grupo para los nodos
    const nodeGroup = svg.append("g")
        .attr("class", "nodes");

    // Creamos los elementos SVG para los enlaces
    const links = linkGroup.selectAll(".link")
        .data(data.links)
        .enter()
        .append("line")
        .attr("class", "link");

    // Creamos los elementos SVG para los nodos
    const nodes = nodeGroup.selectAll(".node")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", 10)
        .call(drag(simulation));

    // Agregamos los nodos al objeto de fuerza
    simulation.nodes(data.nodes);

    // Agregamos los enlaces al objeto de fuerza
    simulation.force("link").links(data.links);

    // Actualizamos la posición de los elementos SVG en cada fotograma
    simulation.on("tick", () => {
        links.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

        nodes.attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    // Función que permite arrastrar los nodos
    function drag(simulation) {
        function dragStarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
        }

        function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
        }

        function dragEnded(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
        }

        return d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded);
    }
}

// Creamos un objeto de fuerza de D3 para calcular la posición de los nodos
const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink().links(data.links).distance(100))
    .force("charge", d3.forceManyBody().strength(-300).distanceMax(500))
    .force("center", d3.forceCenter(600, 400));

// Creamos un grupo SVG para contener el grafo
const svg = d3.select("#graph")
 .append("svg")
 .attr("width", "100%")
 .attr("height", "100%")
 .attr("viewBox", [0, 0, 1200, 800])
 .attr("preserveAspectRatio", "xMidYMid meet");

// Creamos un grupo para los enlaces
const linkGroup = svg.append("g")
 .attr("class", "links");

// Creamos un grupo para los nodos
const nodeGroup = svg.append("g")
 .attr("class", "nodes");
 // Creamos los elementos SVG para los enlaces
 const links = linkGroup.selectAll(".link")
 .data(data.links)
 .enter()
 .append("line")
 .attr("class", "link");

// Creamos los elementos SVG para los nodos
const nodes = nodeGroup.selectAll(".node")
 .data(data.nodes)
 .enter()
 .append("circle")
 .attr("class", "node")
 .attr("r", 10)
 .call(drag(simulation));
   
// Agregamos los nodos al objeto de fuerza
simulation.nodes(data.nodes);

// Agregamos los enlaces al objeto de fuerza
simulation.force("link").links(data.links);

// Actualizamos la posición de los elementos SVG en cada fotograma
simulation.on("tick", () => {
    links.attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

    nodes.attr("cx", d => d.x)
    .attr("cy", d => d.y);
});
// Función que permite arrastrar los nodos    
function drag(simulation) {
    function dragStarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);
}


// Cargamos el archivo de texto y procesamos sus datos
function loadData() {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = function() {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = function(event) {
        const data = processData(event.target.result);
        updateGraph(data);
      };
      reader.readAsText(file);
    };
    input.click();
}

// Procesamos los datos del archivo de texto
function processData(text) {
    const nodes = [];
    const links = [];

    // Separamos el texto en líneas y procesamos cada línea
    const lines = text.split("\n");
    for (const line of lines) {
        // Si la línea comienza con "node", agregamos un nodo
        if (line.startsWith("node")) {
        const [, id, label] = line.split(" ");
        nodes.push({ id: +id, label });
        }
        // Si la línea comienza con "edge", agregamos un enlace
        else if (line.startsWith("edge")) {
        const [, source, target] = line.split(" ");
        links.push({ source: +source, target: +target });
        }
    }

    return { nodes, links };
    }

// Actualizamos el grafo con los nuevos datos
function updateGraph(data) {
    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links);
}
    