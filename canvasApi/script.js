let isResizing = false;

let selectedElement = null;

let squareSize = 50;

let startX, startY;

let currentFigure = null;

let figures = [];

const homeImage = new Image();

homeImage.src = "./image/home.svg";

function drawAllFigures(canvas) {
    const ctx = canvas.getContext('2d');
    figures.forEach(figure => {
        if (figure.type === "rectangle") {
            drawRect(ctx, figure.x, figure.y, figure.size);
        }
        if (figure.type === "triangle") {
            drawTriangle(ctx, figure.startX, figure.startY, figure.endX, figure.endY);
        }
        if (figure.type === "line") {
            drawLine(ctx, figure.startX, figure.startY, figure.endX, figure.endY);
        }
        if(figure.type === "ellipse"){
            drawEllipse(ctx, figure.x, figure.y, figure.radiusX, figure.radiusY);
        }
        if(figure.type === "image"){
            drawImage(ctx, figure.x, figure.y, figure.size);
        }
        if(figure.type === "text"){
            drawText(ctx, figure.x, figure.y, figure.fontSize);
        }
    });
}

function drawRect(ctx, x, y, size) {
    ctx.strokeStyle = "blue";
    ctx.strokeRect(x, y, size, size);
}

function drawEllipse(ctx, x, y, radiusX, radiusY) {
    ctx.strokeStyle = "red";
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, startAngle, endAngle, 0);
    ctx.stroke();
    ctx.closePath();
}

function drawLine(ctx, startX, startY, endX, endY) {
    ctx.strokeStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
}

function drawImage(ctx, x, y, size) {
    ctx.drawImage(homeImage, x, y, size, size);
}

function drawText(ctx, x, y, fontSize) {
    ctx.font = fontSize + "px serif";
    const text = "Text";
    ctx.fillText(text, x, y);
}

function drawTriangle(ctx, startX, startY, endX, endY) {
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(startX + (endX - startX) / 2, startY - (endY - startY));
    ctx.lineTo(startX, startY);
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

function handleMouseDown(event, canvas) {
    if(selectedElement !== null){
        const rect = canvas.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
        isResizing = true;
    }
}

function clearAndDraw(canvas){
    clearCanvas(canvas);
    drawAllFigures(canvas);
}

function handleMouseMove(event, canvas) {
    if(isResizing && selectedElement !== null){
        const rect = canvas.getBoundingClientRect();
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;

        if (selectedElement === "rectangle") {
            squareSize = Math.abs(currentX - startX);
            clearAndDraw(canvas);
            drawRect(canvas.getContext('2d'), startX, startY, squareSize);
        }
        if (selectedElement === "triangle") {
            clearAndDraw(canvas);
            drawTriangle(canvas.getContext('2d'), startX, startY, currentX, currentY);
        }
        if (selectedElement === "line") {
            clearAndDraw(canvas);
            drawLine(canvas.getContext('2d'), startX, startY, currentX, currentY);
        }
        if (selectedElement === "ellipse") {
            const radiusX = Math.abs(currentX - startX);
            const radiusY = Math.abs(currentY - startY);
            clearAndDraw(canvas);
            drawEllipse(canvas.getContext('2d'), startX, startY, radiusX, radiusY);
        }
        if (selectedElement === "image") {
            const imageSize = Math.abs(currentX - startX);
            clearAndDraw(canvas);
            drawImage(canvas.getContext('2d'), startX, startY, imageSize);
        }
        if (isResizing && selectedElement === "text") {
            const fontSize = Math.abs(currentX - startX); 
            clearAndDraw(canvas);
            drawText(canvas.getContext('2d'), startX, startY, fontSize);
        }
    }
}

function handleMouseUp(event, canvas) {
    if(isResizing && selectedElement !== null){
        isResizing = false;
        const rect = canvas.getBoundingClientRect();
        const endX = event.clientX - rect.left;
        const endY = event.clientY - rect.top;
        let newFigure;

        if (selectedElement === "rectangle") {
            squareSize = Math.abs(endX - startX); 
            newFigure = { type: "rectangle", x: startX, y: startY, size: squareSize };
        }
        if (selectedElement === "triangle") {
            newFigure = { type: "triangle", startX: startX, startY: startY, endX: endX, endY: endY };
        }
        if (selectedElement === "line") {
            newFigure = { type: "line", startX: startX, startY: startY, endX: endX, endY: endY };
        }
        if (selectedElement === "ellipse") {
            const radiusX = Math.abs(endX - startX);
            const radiusY = Math.abs(endY - startY);
            newFigure = { type: "ellipse", x: startX, y: startY, radiusX: radiusX, radiusY: radiusY };
        }
        if (selectedElement === "image") {
            const imageSize = Math.abs(endX - startX);
            newFigure = { type: "image", x: startX, y: startY, size: imageSize };
        }
        if (selectedElement === "text") {
            const fontSize = Math.abs(endX - startX);
            newFigure = { type: "text", x: startX, y: startY, fontSize: fontSize };
        }

        figures.push(newFigure);
        clearAndDraw(canvas);
    }
}

function getCursorPosition(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const position = document.getElementById("position");
    position.innerText = `Cursor position: x: ${Math.floor(+x)}, ${Math.floor(+y)}`;
}

function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        canvas.addEventListener('mousedown', function(event) {
            handleMouseDown(event, canvas);
        });
        
        canvas.addEventListener('mousemove', function(event) {
            handleMouseMove(event, canvas);
            getCursorPosition(event, canvas);
        });
        
        canvas.addEventListener('mouseup', function(event) {
            handleMouseUp(event, canvas);
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

            };
        }
    }
}

init();
