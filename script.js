document.getElementById("addNumber").addEventListener("click", addNumber);
document.getElementById("sortNumbers").addEventListener("click", sortNumbers);
document.getElementById("inputAmplitude").addEventListener("input", updateAmplitudeTable);

const numbers = [];

function addNumber() {
    const inputNumber = document.getElementById("inputNumber");
    const number = parseInt(inputNumber.value);

    if (!isNaN(number)) {
        numbers.push(number);
        updateList();
    }

    inputNumber.value = "";
}

function sortNumbers() {
    numbers.sort((a, b) => a - b);
    updateList();
}

function updateList() {
    const numberList = document.getElementById("numberList");
    numberList.innerHTML = "";

    numbers.forEach((number) => {
        const listItem = document.createElement("li");
        listItem.textContent = number;
        numberList.appendChild(listItem);
    });

    updateFrequencyTable();
}

function updateFrequencyTable() {
    const frequencyTableBody = document.getElementById("frequencyTable").querySelector("tbody");
    frequencyTableBody.innerHTML = "";
    
    const frequencyMap = calculateFrequency(numbers);
    const totalCount = numbers.length;

    for (const [number, frequency] of frequencyMap.entries()) {
        const row = document.createElement("tr");
        
        const numberCell = document.createElement("td");
        numberCell.textContent = number;
        row.appendChild(numberCell);
        
        const frequencyCell = document.createElement("td");
        frequencyCell.textContent = frequency;
        row.appendChild(frequencyCell);

        const relativeFrequencyCell = document.createElement("td");
        relativeFrequencyCell.textContent = (frequency / totalCount).toFixed(2);
        row.appendChild(relativeFrequencyCell);

        frequencyTableBody.appendChild(row);
    }
}

function updateAmplitudeTable() {
    const amplitudeTableBody = document.getElementById("amplitudeTable").querySelector("tbody");
    amplitudeTableBody.innerHTML = "";
    
    const amplitude = parseInt(document.getElementById("inputAmplitude").value);
    
    if (isNaN(amplitude) || amplitude <= 0) {
        return;
    }

    const amplitudeMap = calculateFrequencyWithAmplitude(numbers, amplitude);

    for (const [range, frequency] of amplitudeMap.entries()) {
        const row = document.createElement("tr");
        
        const rangeCell = document.createElement("td");
        rangeCell.textContent = range;
        row.appendChild(rangeCell);
        
        const frequencyCell = document.createElement("td");
        frequencyCell.textContent = frequency;
        row.appendChild(frequencyCell);

        amplitudeTableBody.appendChild(row);
    }
}

function calculateFrequency(numbers) {
    const frequencyMap = new Map();

    numbers.forEach((number) => {
        if (frequencyMap.has(number)) {
            frequencyMap.set(number, frequencyMap.get(number) + 1);
        } else {
            frequencyMap.set(number, 1);
        }
    });

    return frequencyMap;
}

function calculateFrequencyWithAmplitude(numbers, amplitude) {
    const frequencyMap = new Map();

    numbers.forEach((number) => {
        const minRange = Math.floor(number / amplitude) * amplitude;
        const maxRange = minRange + amplitude - 1;

        const range = [minRange, maxRange];

        if (frequencyMap.has(range.toString())) {
            frequencyMap.set(range.toString(), frequencyMap.get(range.toString()) + 1);
        } else {
            frequencyMap.set(range.toString(), 1);
        }
    });

    return frequencyMap;
}

function updateDateTime() {
    const dateTimeElement = document.getElementById("dateTime");
    const now = new Date();
    dateTimeElement.innerHTML = now.toLocaleString();
}

updateDateTime();
setInterval(updateDateTime, 1000);
