const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');    //canvas에 그림을 그릴 수 있게 해주는 붓(Context)

canvas.width=800;           //canvas의 크기를 javascript에서도 알려줘야한다.(캔버스 변수에 설정)
canvas.height=800;

// ctx.fillRect(50,50,100,100);        //canvas안에서 설정한 좌표위치에 사각형을 그리는 함수

// ctx.rect(150,150,100,100);          //fillRect()를 rect()와 fill()로 나눠서 그릴 수 있다.
// ctx.rect(250,250,100,100);
// ctx.fill();

// ctx.beginPath();                    //fill()의 색을 바꿀 수 있다.
// ctx.rect(350,350,100,100);
// ctx.rect(450,450,100,100);
// ctx.fillStyle="red";
// ctx.fill();

ctx.moveTo(50,50);
ctx.lineTo(150,50);
ctx.stroke();

ctx.lineTo(150,150);
ctx.stroke();

ctx.lineTo(50,150);
ctx.stroke();

ctx.lineTo(50,50);
ctx.stroke();

ctx.fill();