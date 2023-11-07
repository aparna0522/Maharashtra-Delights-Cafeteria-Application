let right = document.getElementsByClassName("right");
let totalPages = null;
let currIndex = 0

function setTotalPages() {
    totalPages = right.length;
    currIndex = totalPages - 1;
    // console.log("Called");
}

var z = 1;

function turnRight() {
    if (!totalPages)
        return;

    if (currIndex < 0) {
        for (let i = 0; i < totalPages; i++) {
            right[i].style.zIndex = 'auto';
            right[i].classList.remove('flip');
        }
        currIndex = totalPages - 1;
        return;
    }

    let zIndex = 0;
    for (let i = 0; i < currIndex; i++) {
        right[i].style.zIndex = zIndex;
        zIndex++;
    }
    zIndex = totalPages;
    for (let i = currIndex; i < totalPages; i++) {
        right[i].style.zIndex = zIndex;
        zIndex--;
        setTimeout(function () {
            right[i].classList.add('flip');
        }, 300);
    }
    currIndex--;
}

function turnLeft() {
    if (!totalPages)
        return;

    if (currIndex == totalPages - 1) {
        for (let i = totalPages - 1; i >= 0; i--) {
            right[i].classList.add('flip');
            right[i].style.zIndex = 'auto';
        }
        right[0].style.zIndex = 1;
        currIndex = -1;
        return;
    }

    currIndex++;

    let zIndex = 0;
    for (let i = 0; i <= currIndex; i++) {
        right[i].classList.remove('flip');
        setTimeout(function () {
            right[i].style.zIndex = zIndex;
        }, 300);
        zIndex++;
    }

    zIndex = totalPages;
    for (let i = currIndex + 1; i < totalPages; i++) {
        right[i].style.zIndex = zIndex;
        zIndex--;
    }
}