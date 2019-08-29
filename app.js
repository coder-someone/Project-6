let key_pad = document.querySelector('#qwerty');
let phrase = document.querySelector('#phrase');
let ul = phrase.querySelector('ul');
const strt_div = document.querySelector(".start");
let phrases = [
    'Shot In the Dark',
    'On the Same Page',
    'Break The Ice',
    'My Cup of Tea',
    'Man of Few Words'
];

let missed = 0;
let life= 4;
let rand;

function reset_game(){
    missed = 0;
    let button_nos = key_pad.querySelectorAll('button');
    for(let i=0;i<button_nos.length;i++)
        button_nos[i].className = '';
    let letter_nos = ul.querySelectorAll('li');
    for(let i=0;i<letter_nos.length;i++)
        ul.removeChild(letter_nos[i]);
}

function reset_life(){
    life= 4
    let lives_nos = document.querySelectorAll('.tries')
    for(let i=0;i<lives_nos.length;i++)
        lives_nos[i].querySelector('img').src ="images/liveHeart.png";
}

function getRandomPhraseAsArray(arr){
    rand =Math.floor(Math.random()*arr.length);
    let new_arr=[];
    for(let i=0;i<arr[rand].length;i++)
        new_arr.push(arr[rand][i]);
    return new_arr;
}

function addPhraseToDisplay(arr) {
    for(let i=0;i<arr.length;i++){
        let li = document.createElement('li');
        if(arr[i] === ' ')
            li.className = 'space';
        else{
            li.textContent = arr[i];
            li.className = 'letter';
        }
        ul.appendChild(li); 
    } 
}

function checkLetter(pressed_key){
    let guess = null;
    for(let i=0;i<current_phrase.length;i++){
        if(pressed_key === current_phrase[i]){
            document.querySelectorAll('li')[i].className +=' show';
            guess = pressed_key;
        }
    }  
    return guess;
}

function checkWin() {
    let show_nos = document.querySelectorAll('.show');
    let letter_nos = document.querySelectorAll('.letter');
    if(missed === 5){
        strt_div.style.opacity = 1;
        strt_div.style.display = '';
        strt_div.className = 'start lose';
        strt_div.querySelector('.title').textContent ='Game Over';
        strt_div.querySelector('.btn__reset').textContent ='Reset Game';
    }
    else if(show_nos.length === letter_nos.length){
        strt_div.style.opacity = 1;
        strt_div.style.display = '';
        strt_div.className = 'start win';
        strt_div.querySelector('.title').textContent ='You Win';
        strt_div.querySelector('.btn__reset').textContent ='Reset Game';
    }
        
}
function setting_phrase(){
    //Getting a random phrase and displaying the character
    current_phrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(current_phrase);
    //converting the selected phrase letters to lower case
    for(let i=0; i<current_phrase.length;i++)
        current_phrase[i] = current_phrase[i].toLowerCase(); 
}



//Setting the start button and reset button
strt_div.addEventListener('click', (ev)=> {
    if(ev.target.tagName === 'A'){
        if(ev.target.textContent === 'Start Game'){
            strt_div.style.opacity = 0;
            setting_phrase();
        }
        //Reset button
        if(ev.target.textContent === 'Reset Game'){ 
            reset_game();
            reset_life();
            setting_phrase();
            }
        setTimeout(()=>{
            strt_div.style.display = 'none';
        },300);
    }
});


//setting the class to matched and unmatched character
key_pad.addEventListener('click', (ev)=> {
    if(ev.target.tagName === 'BUTTON'){
        ev.target.className = 'chosen';
        const key = ev.target.textContent;
        let letterFound = checkLetter(key);
        //When selected character is not matching  
        if(letterFound === null){
            missed++;
            let lives = document.querySelectorAll('.tries')[life];
            lives.querySelector('img').src ="images/lostHeart.png";
            life--;
            ev.target.className = 'wrong_chosen';
        }
        else
            ev.target.className = 'chosen';
        checkWin(); 
    }   
});