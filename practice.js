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

// ctx.moveTo(50,50);
// ctx.lineTo(150,50);
// ctx.stroke();

// ctx.lineTo(150,150);
// ctx.stroke();

// ctx.lineTo(50,150);
// ctx.stroke();

// ctx.lineTo(50,50);
// ctx.stroke();

// ctx.fill();

// ctx.fillRect(200,200,50,200);
// ctx.fillRect(400,200,50,200);
// ctx.lineWidth = 2;
// ctx.strokeRect(300,300,50,100);
// ctx.fillRect(200,200,200,20);

// ctx.moveTo(200,200);
// ctx.lineTo(330,100);
// ctx.stroke();

// ctx.lineTo(450,200);
// ctx.stroke();
// ctx.fill();

ctx.fillRect(230,200,15,100);
ctx.fillRect(340,200,15,100);
ctx.fillRect(260,200,60,200);
ctx.arc(290,150,30,0,2*Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle ='red';
ctx.arc(275,140,5,0,2*Math.PI);
ctx.arc(300,140,5,0,2*Math.PI);
ctx.fill();