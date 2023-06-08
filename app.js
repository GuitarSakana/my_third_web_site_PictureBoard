const canvas = document.querySelector('canvas');
const line_width = document.querySelector('#line_width');
const eraser_width = document.querySelector('#eraser_width');
const line_color = document.querySelector('#color');
const colorOption = Array.from(document.getElementsByClassName('color-option'));
const draw_btn = document.querySelector('#draw');
const fill_btn = document.querySelector('#fill');
const dr_stroke_btn = document.querySelector('#dr_stroke');
const dr_fill_btn = document.querySelector('#dr_fill');
const destroy_btn = document.querySelector('#destroy-btn');
const eraser_btn = document.querySelector('#eraser-btn');
const fileIn = document.querySelector('#file');
const textIn = document.querySelector('#text');
const save_btn = document.querySelector('#save');
const fontSelect_btn = document.querySelector('#fontFamily');
const text_width = document.querySelector('#text_width');

const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800; 
canvas.width = CANVAS_WIDTH; canvas.height = CANVAS_HEIGHT;

ctx.lineWidth=line_width.value;
ctx.lineCap="round";
ctx.strokeStyle = 'black';
let isPainting= false;      //그리기 준비
let isFilling = false;      // 채우기 준비
let isDrawing = true;
let isSD = true;       //그리기_선그리기
let isFD = false;       //그리기_색채우기
let isEraser = false;   //지우개
ButtonToggle();




function onMove(event){                 //클릭상태일때는 그림을 그리고 아닐 때는 좌표만 잡는다.
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY);
}

function startPainting(){       //마우스를 클릭상태일 때는 그릴 준비 완료(ispPainting true)
    if(isFilling){              //isFilling이 true일때는 작동하지 않는다.
        return;
    }
    isPainting=true;
}

function cancelPainting(){      //마우스를 땐 상태일 때는 그리기 종료(isPainting false)
    isPainting = false;         //그리기가 채우기면 ctx.fill()로 마무리.
    if(isFD){                   //새로운 선 대기.
        ctx.fill();
    }
    ctx.beginPath();
}

function onLineWidthChange(event){              //펜 두께 변경 함수.
    if(isEraser){
        return;
    }else{
        ctx.lineWidth = event.target.value;
    }
}

function onLineColorChange(event){      //펜 색 변경함수,  지우개 상태일 때는 색 선택 불가능.
    if(isEraser){
        alert('지우개 상태에서는 색 선택이 불가능 합니다.'); 
        return;
    }
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onEraserWidthChange(event){        //지우개 두께 변경함수
    if(isDrawing){
        return;
    }else{
        ctx.lineWidth = event.target.value;
    }
}

function onCanvasClick(){       //캔버스를 클릭했을 때 isFilling상태이면 전체 배경 채우기
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT) ;
    }
}
function onFunctionChange(){
    if(isDrawing){
        if(isSD){
            isFD=true;
            isSD=false;
            ButtonToggle();
        }else{
            isFD=false;
            isSD=true;
            ButtonToggle();
        }
    }else{
        return;
    }
}
canvas.addEventListener('mousemove',onMove);    
canvas.addEventListener('mousedown',startPainting);
canvas.addEventListener('mouseup',cancelPainting);
// canvas.addEventListener('mouseleave',cancelPainting);
canvas.addEventListener('click',onCanvasClick);     //fill 상태일때 전체 배경 넣기
canvas.addEventListener('contextmenu',onFunctionChange);
line_width.addEventListener('change',onLineWidthChange);
eraser_width.addEventListener('change',onEraserWidthChange);
line_color.addEventListener('change',onLineColorChange);






function onColorClick(event){   //샘플 색 선택시 작동하는 함수
    if(isEraser){
        alert('지우개 상태에서는 색 선택이 불가능 합니다.');
        return;
    }
    ctx.strokeStyle=event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    line_color.value = event.target.dataset.color;
}
colorOption.forEach((color) => color.addEventListener("click",onColorClick));       //샘플 색 선택






function onFillClick(){         //캔버스 배경색 채우기 함수
    if(isPainting){
        isPainting =false;
    }
    if(isEraser){
        isEraser=false;
    }
    isDrawing = false;
    isFD=false;isSD=false;
    isFilling = true;
    ButtonToggle();
}

function onDrawClick(){         //연필그리기 함수
    if(isFilling){
        isFilling = false;
    }
    isEraser=false;
    isDrawing=true;
    isSD=true;
    ctx.lineWidth=line_width.value;
    ctx.strokeStyle = line_color.value;
    ctx.fillStyle = line_color.value;
    ButtonToggle();
}

function onStrokeDraw(){        //연필그리기_선그리기
    if(isFilling){
        alert('배경 채우기 상태일 때는 사용이 불가능 합니다.');
        return;
    }else if(isEraser){
        alert('지우개 상태일 때는 사용이 불가능 합니다.');
    }
    if(isFD){
        isFD=false;
    }
    isSD=true;
    ButtonToggle();
}

function onFillDraw(){              //연필그리기_색채우기
    if(isFilling){
        alert('배경 채우기 상태일 때는 사용이 불가능 합니다.');
        return;
    }else if(isEraser){
        alert('지우개 상태일 때는 사용이 불가능 합니다.');
        return;
    }
    if(isSD){
        isSD=false;
    }
    isFD=true;
    ButtonToggle();
}

function onDestroyClick(){          //전부 초기화 (캔버스를 흰색으로 덮어씀)
   if(confirm('정말 전부 지우시겠습니까?')){
        if(isEraser){
            isEraser=false;
            ctx.lineWidth = line_width.value;
            isDrawing=true;isSD=true;
        }
        ctx.save();
        ctx.fillStyle="white";
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.restore();
   }else{
        return;
   }
}

function onEraserClick(){           //지우개 버튼
    if(isFilling){
        isFilling=false;
    }
    isFD=false;
    isSD=false;
    isDrawing = false;
    isEraser = true;
    ctx.strokeStyle='white';
    ctx.lineWidth = eraser_width.value;
    ButtonToggle();
}

function onfileChange(event){           //캔버스에 그림을 가져오는 함수(그림 붙여넣기)
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);      //임시 url을 생성해주는 메소드
    const imag = new Image();
    imag.src= url;
    imag.onload=function(){
        ctx.drawImage(imag,170,110);
    }
    fileIn.value=null;
}

ctx.font=`${text_width.value}px sans-serif`;
function onDubleClick(event){           //텍스트를 캔버스에 생성하기
    const text = textIn.value;      //인풋 텍스트 값을 가져와서
    if(text == ""){
        return;
    }else{
        ctx.save();                 //캔버스에 삽입한다.
        ctx.lineWidth = 1;
        ctx.fillText(text,event.offsetX,event.offsetY);
        ctx.restore();
    }
}

function onSaveClick(){                 //캔버스 그림 이미지로 저장하기.
    const url = canvas.toDataURL();
    const a =document.createElement("a");
    a.href=url;
    a.download='myDrawing.png'
    a.click();
}
function onFontSet(){
    const selectFont = fontSelect_btn.value;
    const fontsize = text_width.value;
    ctx.font=`${fontsize}px ${selectFont}`;
}

draw_btn.addEventListener('click',onDrawClick);
fill_btn.addEventListener('click',onFillClick);
dr_stroke_btn.addEventListener('click',onStrokeDraw);
dr_fill_btn.addEventListener('click',onFillDraw);
destroy_btn.addEventListener('click',onDestroyClick);
eraser_btn.addEventListener('click',onEraserClick);
fileIn.addEventListener('change',onfileChange);
fontSelect_btn.addEventListener('change',onFontSet);
text_width.addEventListener('change',onFontSet);

canvas.addEventListener("dblclick",onDubleClick);
save_btn.addEventListener('click',onSaveClick);



function ButtonToggle(){
    isDrawing==true?draw_btn.classList.add('choice'):draw_btn.classList.remove('choice');
    isFilling==true?fill_btn.classList.add('choice'):fill_btn.classList.remove('choice');
    isSD==true?dr_stroke_btn.classList.add('choice'):dr_stroke_btn.classList.remove('choice');
    isFD==true?dr_fill_btn.classList.add('choice'):dr_fill_btn.classList.remove('choice');
    isEraser==true?eraser_btn.classList.add('choice'):eraser_btn.classList.remove('choice');
}