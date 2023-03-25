/* Variáveis */
let selectedMenuItem = null;
let currentAction = 0;
let nextState = 0;
let drawableWidth;
let drawableHeight;
let stage;
let layer;
// Array para armazenar todos os círculos desenhados no canvas
let states = [];
// Array para armazenar todas as conexões entre círculos no canvas
let connections = [];
// Estado em que o mouse está passando por cima
let stateHovered = null;
let state1 = null;
let state2 = null;

/* Funções */
function onStart() {
	updateSelectedMenuItem("opt-1");
	tela = document.getElementById('tela');
	drawableWidth = tela.offsetWidth;
	drawableHeight = tela.offsetHeight;
	stage = new Konva.Stage({
		container: 'tela',
		width: drawableWidth,
		height: drawableHeight,
	});
	layer = new Konva.Layer();
}

function updateSelectedMenuItem(buttonId) {
	let buttonList = this.document.getElementsByClassName("menu-item-selected");
	for (let i = 0; i < buttonList.length; i++) {
		let btn = buttonList[i];
		btn.classList.remove("menu-item-selected");
	}
	let button = this.document.getElementById(buttonId);
	button.classList.add("menu-item-selected");

	currentAction = buttonId;
}

function handleClick(event) {
	switch (currentAction) {
		case 'opt-2':
			drawCircle(event.x - tela.offsetLeft, event.y - tela.offsetTop, 30);
			break;
		case 'opt-3':
			tryToConnect();
		default:
			break;
	}
}

// Desenha um círculo na posição (x, y) com o raio especificado
function drawCircle(x, y, radius) {
	let circle = new Konva.Group({
		id: 'q'+nextState,
		x: x,
		y: y,
		width: radius*2,
		height: radius*2,
		draggable: true,
	});
	
	circle.add(new Konva.Circle({
		radius: radius,
		fill: 'white',
		stroke: 'black',
		strokeWidth: 4,
	}));
	circle.add(new Konva.Text({
		text: 'q'+nextState,
		fontSize: 18,
		fontFamily: 'Roboto',
		fill: '#000',
		align: 'left',
		verticalAlign: 'top',
		padding: -8,
	}));
	circle.on('mouseenter', function () {
		stage.container().style.cursor = 'pointer';
		stateHovered = circle;
	});
	circle.on('mouseleave', function () {
    	stage.container().style.cursor = 'default';
		stateHovered = null;
    });
	circle.on('dragmove', () => {
		updateObjects();
	});
	states.push(circle);
	layer.add(circle);
	stage.add(layer);
	nextState++;
}

function tryToConnect() {
	if (stateHovered) {
		if (!state1) {
			state1 = stateHovered;
			state2 = null;
		}
		else if (!state2) {
			state2 = stateHovered;
			connectStates();
			state1 = null;
			state2 = null;
		}
	}
}

function connectStates() {
	let from = state1.attrs.id;
	let to = state2.attrs.id;
	let id = 'con_'+from+'_'+to;

	if (!connections.find(con => con.id == id)) {
		connections.push({
			id: id,
			from: from,
			to: to
		});
		let line = new Konva.Arrow({
			stroke: 'black',
			id: id,
			fill: 'black'
		});
		layer.add(line);
		updateObjects();
	}
}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text/plain");
    let dragImage = document.getElementById(data);
    let dropzone = event.target;

    // Mover a imagem para a nova posição
    dropzone.appendChild(dragImage);
    dragImage.style.top = (dropzone.offsetTop + event.offsetY - 10) + "px";
    dragImage.style.left = (dropzone.offsetLeft + event.offsetX - 25) + "px";
}

function getConnectorPoints(from, to) {
	const dx = to.x - from.x;
	const dy = to.y - from.y;
	let angle = Math.atan2(-dy, dx);

	const radius = 50;

	return [
		from.x + -radius * Math.cos(angle + Math.PI),
		from.y + radius * Math.sin(angle + Math.PI),
		to.x + -radius * Math.cos(angle),
		to.y + radius * Math.sin(angle),
	];
}

// update all objects on the canvas from the state of the app
function updateObjects() {
	connections.forEach((con) => {
		let line = layer.find(obj => obj.attrs.id == con.id)[0];
	  	let fromNode = states.find(obj => obj.attrs.id == con.from);
	  	let toNode = states.find(obj => obj.attrs.id == con.to);

		const points = getConnectorPoints(
			fromNode.position(),
			toNode.position()
		);
		line.points(points);
	});
}