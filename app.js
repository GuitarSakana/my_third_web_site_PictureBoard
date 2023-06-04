const canvas = document.querySelector('canvas');
const line_width = document.querySelector('#line_width');
const line_color = document.querySelector('#color');
const colorOption = Array.from(document.getElementsByClassName('color-option'));
const mode_btn = document.querySelector('#mode-btn');
const destroy_btn = document.querySelector('#destroy-btn');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800; 
canvas.width = CANVAS_WIDTH; canvas.height = CANVAS_HEIGHT;

ctx.lineWidth=line_width.value;
ctx.strokeStyle = 'black';
let isPainting= false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY);
}
function startPainting(){
    isPainting=true;
    // console.log(isPainting);
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
    // console.log(isPainting);
}
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onLineColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onCanvasClick(){
    if(isFilling){
        canvas.style.backgroundColor=ctx.strokeStyle;
    }
}
canvas.addEventListener('mousemove',onMove);
canvas.addEventListener('mousedown',startPainting);
canvas.addEventListener('mouseup',cancelPainting);
canvas.addEventListener('mouseleave',cancelPainting);
canvas.addEventListener('click',onCanvasClick);
line_width.addEventListener('change',onLineWidthChange);
line_color.addEventListener('change',onLineColorChange);

function onColorClick(event){
    ctx.strokeStyle=event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    line_color.value = event.target.dataset.color;
    // console.dir(event.target.dataset.color);
}
colorOption.forEach((color) => color.addEventListener("click",onColorClick));

function onModeClick(){
    if(isFilling){
        isFilling=false;
        mode_btn.innerHTML = 'fill';
    }else{
        isFilling=true;
        mode_btn.innerHTML = 'line';
    }
}
function onDestroyClick(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

mode_btn.addEventListener('click',onModeClick);
destroy_btn.addEventListener('click',onDestroyClick);