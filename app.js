const canvas = document.querySelector('canvas');
const line_width = document.querySelector('#line_width');
const line_color = document.querySelector('#color');
const ctx = canvas.getContext('2d');
canvas.width=800; canvas.height=800;
ctx.lineWidth=line_width.value;
ctx.strokeStyle = 'black';
let isPainting= false;

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
canvas.addEventListener('mousemove',onMove);
canvas.addEventListener('mousedown',startPainting);
canvas.addEventListener('mouseup',cancelPainting);
canvas.addEventListener('mouseleave',cancelPainting);
line_width.addEventListener('change',onLineWidthChange);
line_color.addEventListener('change',onLineColorChange);