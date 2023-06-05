const canvas = document.querySelector('canvas');
const line_width = document.querySelector('#line_width');
const line_color = document.querySelector('#color');
const colorOption = Array.from(document.getElementsByClassName('color-option'));
const mode_btn = document.querySelector('#mode-btn');
const destroy_btn = document.querySelector('#destroy-btn');
const eraser_btn = document.querySelector('#eraser-btn');
const fileIn = document.querySelector('#file');
const textIn = document.querySelector('#text');
const save_btn = document.querySelector('#save');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800; 
canvas.width = CANVAS_WIDTH; canvas.height = CANVAS_HEIGHT;

ctx.lineWidth=line_width.value;
ctx.lineCap="round";
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
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT) ;
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
function onEraserClick(){
    if(isFilling){
        onModeClick();
    }
    ctx.strokeStyle='white';
}
function onfileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);      //임시 url을 생성해주는 메소드
    const imag = new Image();
    imag.src= url;
    imag.onload=function(){
        ctx.drawImage(imag,170,110);
    }
    fileIn.value=null;
}
function onDubleClick(event){
    const text = textIn.value;
    if(text == ""){
        return;
    }else{
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font='48px 휴먼편지체';
        ctx.fillText(text,event.offsetX,event.offsetY);
        ctx.restore();
    }
}
function onSaveClick(){
    const url = canvas.toDataURL();
    const a =document.createElement("a");
    a.href=url;
    a.download='myDrawing.png'
    a.click();
}

mode_btn.addEventListener('click',onModeClick);
destroy_btn.addEventListener('click',onDestroyClick);
eraser_btn.addEventListener('click',onEraserClick);
fileIn.addEventListener('change',onfileChange);

canvas.addEventListener("dblclick",onDubleClick);
save_btn.addEventListener('click',onSaveClick);