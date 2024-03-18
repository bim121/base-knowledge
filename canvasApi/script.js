let selectedElement = null;

function drawRect(ctx, x, y) {
    ctx.strokeStyle = "blue";
    const squareSize = 50;
    ctx.strokeRect(x, y, squareSize, squareSize);
}

function drawEllipse(ctx, x, y) {
    ctx.strokeStyle = "red";
    const radiusX = 50;
    const radiusY = 30;
    const startAngle = 0;
    const endAngle = 0;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, startAngle, endAngle, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
}

function drawLine(ctx, x, y) {
    ctx.strokeStyle = "orange";
    const lineWidth = 80;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + lineWidth, y + lineWidth);
    ctx.stroke();
    ctx.closePath();
}

function drawImage(ctx, x, y) {
    var img = new Image();
    const imageSize = 100;
    img.onload = function() {
        ctx.drawImage(img, x, y, imageSize, imageSize);
    }
    img.src = "./image/home.png";
}

function drawText(ctx, x, y) {
    ctx.font = "48px serif";
    const text = "Text";
    ctx.fillText(text, x, y);
}

function drawTriangle(ctx, x, y) {
    ctx.strokeStyle = "green";
    const lineWidth = 40;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + lineWidth, y);
    ctx.lineTo(x + lineWidth, y + lineWidth);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
}

function isSelectedElement(element, isSelected){
    if(isSelected){
        element.style.backgroundColor = "gray";
    }else{
        element.style.backgroundColor = "#f0f0f0";
    }
}

function clearSelectedElements(elements, exceptObj) {
    for (const key in elements) {
        if(key === exceptObj){
            continue;
        }
        elements[key].isSelected = false;
        elements[key].div.style.backgroundColor = '#f0f0f0';
    }
}

function mouseClick(event, canvas) {
    if (selectedElement) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        switch (selectedElement) {
            case "rectangle":
                drawRect(canvas.getContext('2d'), x, y);
                break;
            case "ellipse":
                drawEllipse(canvas.getContext('2d'), x, y);
                break;
            case "line":
                drawLine(canvas.getContext('2d'), x, y);
                break;
            case "image":
                drawImage(canvas.getContext('2d'), x, y);
                break;
            case "text":
                drawText(canvas.getContext('2d'), x, y);
                break;
            case "triangle":
                drawTriangle(canvas.getContext('2d'), x, y);
                break;
        }
    }
}

function init() {
    const elements = {
        rectangle: {
            div: document.getElementById('rectangle'),
            isSelected: false
        },
        ellipse: {
            div: document.getElementById('ellipse'),
            isSelected: false
        },
        line: {
            div: document.getElementById('line'),
            isSelected: false
        },
        image: {
            div: document.getElementById('image'),
            isSelected: false
        },
        text: {
            div: document.getElementById('text'),
            isSelected: false
        },
        triangle: {
            div: document.getElementById('triangle'),
            isSelected: false
        }
    };

    const canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        canvas.addEventListener('click', function(event) {
            mouseClick(event, canvas);
        });

        for (const key in elements) {
            elements[key].div.onclick = function() {
                elements[key].isSelected = !elements[key].isSelected;
                if(elements[key].isSelected){
                    selectedElement = key;
                    clearSelectedElements(elements, key);
                }else{
                    selectedElement = null;
                }
                isSelectedElement(elements[key].div, elements[key].isSelected);

                console.log(elements)
            };
        }
    }
}

init();
