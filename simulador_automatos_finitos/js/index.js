/* Variáveis */
let selectedMenuItem = null;
let currentAction = 0;
let nextState = 0;
let drawableWidth;
let drawableHeight;
let stage;
let layer;
// Array para armazenar todos os círculos desenhados no canvas
let estados = [];

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
		default:
			break;
	}
}

// Desenha um círculo na posição (x, y) com o raio especificado
function drawCircle(x, y, radius) {
	estados.push({x: x, y: y, radius: radius});
	let circle = new Konva.Group({
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
	});
	circle.on('mouseleave', function () {
    	stage.container().style.cursor = 'default';
    });
	layer.add(circle);
	stage.add(layer);
	console.log(stage);
	nextState++;
	console.log(1);
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