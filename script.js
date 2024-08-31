const buttons = document.getElementsByClassName('btn');
const clear = document.getElementById('clear');
const delete1 = document.getElementById('delete');
const total = document.getElementById('equal');
const display = document.getElementById('display');
const toggleHistoryButton = document.getElementById('toggle-history');
const historyDiv = document.getElementById('history');
const clearHistory = document.getElementById('clrscr');
const historyEntries = document.getElementById('history-entries');

Array.from(buttons).forEach(button => {
    button.addEventListener('click', () => {
        let value = button.getAttribute('data-value');
        if (value) {
            updateDisplay(value);
        }
    });
});

function islastOperator() {
    if ('+-*/%'.includes(display.value.slice(-1))) {
        return true;
    } else {
        return false;
    }
}

function updateDisplay(value) {
    if (value === '.') {
        const last = display.value.split(/[\+,\-,\%,\/,\*]/).pop();
        if (last.includes('.')) {
            return;
        }
        display.value += value;
    } else if ('+-*%/'.includes(value)) {
        if (islastOperator() && value !== '-') {
            display.value = display.value.slice(0, -1) + value;
        } else {
            display.value += value;
        }
    } else if (display.value.length > 0 || value == '-' || value == "+") {
        display.value += value;
    } else {
        display.value += value;
    }
}

function totalsum() {
    try {
        let sum = eval(display.value);
        if (isFinite(sum)) {
            const round_value = Math.round(sum * 10000000) / 10000000;
            addHistory(`${display.value} = ${round_value}`);
            display.value = round_value;
        }
    } catch (e) {
        display.value = 'Error';
    }
}

function deletelast() {
    display.value = display.value.slice(0, -1);
}

function clearScreen() {
    display.value = "";
}

total.addEventListener('click', totalsum);
delete1.addEventListener('click', deletelast);
clear.addEventListener('click', clearScreen);

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if ('0123456789'.includes(key)) {
        updateDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        updateDisplay(key);
    } else if (key === '.') {
        updateDisplay(key);
    } else if (key === 'Enter') {
        totalsum();
    } else if (key === 'Escape') {
        clearScreen();
    } else if (key === 'Backspace') {
        deletelast();
    }else if(key ==='h'){
        showhistory()
        console.log('jeeo');
         }
         else if(key === 'c'){
            clearHistory1()
         }
});
const showhistory = (e) => {
    const computedStyle = window.getComputedStyle(historyDiv);
    if (computedStyle.display === 'none') {
        historyDiv.style.display = 'inline-block'; 
        toggleHistoryButton.value = 'Hide History';
    } else {
        historyDiv.style.display = 'none'; 
        toggleHistoryButton.value = 'Show History';
    }
}
toggleHistoryButton.addEventListener('click', showhistory);

function addHistory(entry) {
    const historyEntry = document.createElement('div');
    historyEntry.textContent = entry;
    historyEntries.appendChild(historyEntry);
    historyEntries.scrollTop = historyEntries.scrollHeight; 
}
let clearHistory1 = () => {
    historyEntries.innerHTML = '';
}
clearHistory.addEventListener('click',clearHistory1 );
