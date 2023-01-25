const colorButtons = document.querySelectorAll(".btn");
const gridSizeButtons = document.querySelectorAll(".gridsizebtn");
let color = "black"

function newGrid(numCells = 16) {
    let cellWidth = 40/numCells + "rem";
    let cellHeight = 40/numCells + "rem";
    const grid = document.getElementById("grid");
    let divArray = [];

    for (let i = 0; i < numCells; i++) {
        divArray[i] = document.createElement("div");
        grid.appendChild(divArray[i]);

        for (let j = 0; j < numCells; j++) {
            const newDiv = document.createElement("div");
            const classAtt = document.createAttribute("class");

            classAtt.value = "gridcell";
            newDiv.setAttributeNode(classAtt);
            const widthHeightAtt = document.createAttribute("style");
            widthHeightAtt.value = `width: ${cellWidth}; height: ${cellHeight};`;
            newDiv.setAttributeNode(widthHeightAtt);
            divArray[i].appendChild(newDiv);
        }
    }
    onStart();
}

function resetGrid() {
    let allCells = document.querySelectorAll(".gridcell").forEach(cell => {
        cell.style.backgroundColor = "white";
    })
    const grid = document.getElementById("grid");
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    newGrid();
}

window.addEventListener("DOMContentLoaded", event => {
    newGrid();
})

function gridColor() {
    console.log("triggers colorGrid")
    switch (color) {
        case "rainbow":
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.classList.remove("opaque");
            break;
        case "opaque":
            if (this.style.backgroundColor.match(/rgba/)) {
                let currOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currOpacity + 0.1})`;
                    this.classList.add("opaque");
                }
            } else if (this.classList === "opaque" && this.style.backgroundColor === "rgb(0, 0, 0)") {
                return;
            } else {
                this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            }
            break;
        case "eraser":
            this.style.backgroundColor = "#fff";
            this.classList.remove("opaque");
            break;
        case "black":
            this.style.backgroundColor = "#000";
            this.classList.remove("opaque");
            break;
        
        default:
            this.style.backgroundColor = color;
            this.classList.remove("opaque");
            break;
    }
}

function changeColor(e) {
    console.log("triggers changeColor")
    colorButtons.forEach(button => button.classList.remove("selected"))
    e.target.classList.add("selected")
    switch (e.target.innerText.toLowerCase()) {
        case "rainbow":
            color = "rainbow";
            break;
        case "opaque":
            color = "opaque";
            break;
        case "eraser":
            color = "eraser";
            break;
        default:
            color = "black";
            break;
    }
}

function saveUserColor(e) {
    color = e.target.value;
}

colorButtons.forEach(colorButtons => colorButtons.addEventListener('click', changeColor));

function onStart() {
    let gridPixels = document.querySelectorAll(".gridcell");
    gridPixels.forEach(gridPixels => gridPixels.addEventListener("mouseover", gridColor));
}

function gridSizeChange(num) {
    let allCells = document.querySelectorAll(".gridcell").forEach(cell => {
        cell.style.backgroundColor = "white";
    })
    const grid = document.getElementById("grid");
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    newGrid(num);    
}


gridSizeButtons.forEach(button => {
    button.addEventListener("click", function() {
        gridSizeButtons.forEach(b => b.classList.remove("selected"))
        this.classList.add("selected");
        gridSizeChange(this.dataset.size);
    });
});
