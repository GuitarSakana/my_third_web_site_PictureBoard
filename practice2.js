const canvas = document.querySelector('canvas');
canvas.width=800;
canvas.height=800;

const ctx = canvas.getContext('2d');

ctx.lineWidth=2;

const colors = [
    "#1abc9c",
    '#2ecc71',
    "#3498db",
    "#9b59b6",
    "#34495e",
    '#e67e22',
    '#8e44ad',
    '#2c3e50',
]
function onclick(event){
    ctx.moveTo(400,400);
    const color =colors[Math.floor(Math.random()*colors.length)]
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
}
canvas.addEventListener('mousemove',onclick)