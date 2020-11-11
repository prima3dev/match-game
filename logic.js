let attempts = 0;
let status = 0;
let arrOne = [];
let arrtwo = [];
let finalarray = [];
let firstclick;
let counter = 0;
let chance = 0;
let score = 0;
let highscore;
let replay;

let i = 0;
let j = 0;
function randomNumber(arrayName = null, num = null) {
    i = num;
    let x = Math.floor((Math.random() * 8) + 1);
    for (; i < 8; i++) {
        if (!arrayName.includes(x)) {
            arrayName.push(x);
        }
        else {
            randomNumber(arrayName, i);
        }
    }
}

function sleep(secondAttribute, firstAttribute, time) {
    setTimeout(() => {
        if (firstclick == 1) {
            for (let s = 0; s < classes.length; s++) {
                let temp = document.querySelector(`.${classes[s]}`);
                temp.setAttribute('src', `./images/retrowave/png/001-computer.png`);
            }
            firstclick = 0;
        }
        else {
            secondAttribute.target.setAttribute('src', `./images/retrowave/png/001-computer.png`);
            firstAttribute.target.setAttribute('src', `./images/retrowave/png/001-computer.png`);
            temp1.length = 0;
            tempAttribute.length = 0;
            counter = 0;
            classLists.length = 0;
        }
    }, time);

}



let classes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];
const play = document.querySelector('.submit');
play.addEventListener('click', function () {
    status = 1;
    firstclick = 1;
    if (status == 1) {
        play.disabled = true;
    }
    randomNumber(arrOne, j);
    randomNumber(arrtwo, j);
    finalarray = arrOne.concat(arrtwo);
    j = 8;
    console.log(finalarray);
    for (let k = 0; k < classes.length; k++) {
        let temp = document.querySelector(`.${classes[k]}`);
        temp.setAttribute('data-number', `${finalarray[k]}`);
        temp.setAttribute('src', `./images/retrowave/png/${finalarray[k]}.png`);
    }
    sleep(null, null, 2000);
});


let temp1 = [];
let classLists = [];
let tempAttribute = [];
let AttributeClass;
let imgName;
let stringnames;

for (let i = 0; i < classes.length; i++) {
    const row = document.querySelector(`.${classes[i]}`);
    row.addEventListener('click', andy);
}

function andy(e) {
    {
        if (status == 1) {
            tempAttribute.push(e);
            stringnames = e.target.classList.value;
            classLists.push(stringnames.slice(6));
            temp1.push(e.target.dataset.number);
            if (temp1[0] != temp1[1] && classLists[0] != classLists[1]) {
                imgName = e.target.dataset.number;
                counter++;
                switch (counter) {
                    case 1:
                        e.target.setAttribute('src', `./images/retrowave/png/${imgName}.png`);
                        attempts = parseInt(e.target.dataset.attempt);
                        let secondInstance = document.querySelectorAll(`[data-number="${imgName}"]`);
                        secondInstance.forEach((value) => {
                            value.dataset.attempt = attempts + 1;
                        });
                        break;

                    case 2:
                        e.target.setAttribute('src', `./images/retrowave/png/${imgName}.png`);
                        sleep(tempAttribute[1], tempAttribute[0], 400);
                    default:
                        break;
                }
            }
            else if (temp1[0] == temp1[1] && classLists[0] != classLists[1]) {
                imgName = e.target.dataset.number;
                console.log(tempAttribute);
                e.target.setAttribute('src', `./images/retrowave/png/${imgName}.png`);
                for (let i = 0; i < classLists.length; i++) {
                    const rmvListener = document.querySelector(`.${classLists[i]}`);
                    rmvListener.removeEventListener('click', andy);
                }
                calculateScore(classLists);
                temp1.length = 0;
                tempAttribute.length = 0;
                counter = 0;
                classLists.length = 0;
                console.log(score);
                chance++;
                if (chance == 8) {
                    setHighScore();
                    changesRoundComplete();
                    animate();
                }
            }
            else {
                e.target.setAttribute('src', `./images/retrowave/png/001-computer.png`);
                temp1.length = 0;
                tempAttribute.length = 0;
                counter = 0;
                classLists.length = 0;
            }

        }
    }
}

function changesRoundComplete() {
    let scoreRefContainer = document.querySelector(".score-container");
    let matchContainer = document.querySelector(".match-container");
    matchContainer.classList.add("col-md-8");
    scoreRefContainer.classList.add("col-md-4");
    scoreRefContainer.style.display = "block";
    let btn = document.querySelector('.submit-container');
    btn.innerHTML = "<button class='replay'>Replay</button>";
    replay = document.querySelector(".replay");
    replay.addEventListener('click', function () {
        location.reload();
    });
}

function setHighScore() {
    console.log(score, highscore);
    let tempHigh = localStorage.getItem('highscore');
    if (tempHigh < score) {
        console.log(highscore, score);
        highscore = Math.floor(score);
        localStorage.setItem('highscore', highscore);
    }
    if(tempHigh==null){
        tempHigh = 0;
    }
    let highScoreRef = document.querySelector('.high-score');
    highScoreRef.innerHTML = `High-Score ${tempHigh}`;
}


let scoreRef = document.querySelector(`.score`);
let animateCount = 0;
let intervalId;
function animate() {
    intervalId = setInterval(display, 30);
}


function display() {
    if (animateCount <= score) {
        scoreRef.innerHTML = `${animateCount}`;
        animateCount++;
    } else {
        clearInterval(intervalId);
    }
}


function calculateScore(classLists) {
    let ref = document.querySelector(`.${classLists[0]}`);
    if (ref.dataset.attempt == 2) {
        score = score + 12.5;
    }
    else if (ref.dataset.attempt == 3) {
        score = score + 8;
    }
    else if (ref.dataset.attempt == 4) {
        score = score + 5;
    }
    else if (ref.dataset.attempt == 5) {
        score = score + 2.5;
    }
    else if (ref.dataset.attempt >= 6) {
        score = score + 0;
    }
}


