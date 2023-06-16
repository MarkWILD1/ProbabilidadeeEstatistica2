document.getElementById("addNumber").addEventListener("click", addNumber);
document.getElementById("sortNumbers").addEventListener("click", sortNumbers);
document.getElementById("inputAmplitude").addEventListener("input", updateAmplitudeTable);

const numbers = [];

function updateNumberCount() {
    const count = numbers.length;  // a quantidade de números é o tamanho da lista
    document.getElementById('count').textContent = "Quantidade de números: " + count;
}


function addNumber() {
    const inputNumber = document.getElementById("inputNumber");
    const number = parseInt(inputNumber.value);

    if (!isNaN(number)) {
        numbers.push(number);
        updateNumberCount();
        updateList();
    }

    inputNumber.value = "";
}

function sortNumbers() {
    numbers.sort((a, b) => a - b);
    updateList();
}

function calculateSum(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
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

function calculateStatistics() {
    console.log('Calculating statistics...');

    if (numbers.length > 0) {
        const mean = calculateMean(numbers);
        const sum = calculateSum(numbers);
        const variance = calculateVariance(numbers, mean);
        const stdDev = Math.sqrt(variance);
        const median = calculateMedian(numbers);  // Calcula a mediana

        document.getElementById('sum').textContent = "Soma: " + sum;
        document.getElementById('mean').textContent = "Media: " + mean.toFixed(2);
        document.getElementById('variance').textContent = "Variancia: " + variance.toFixed(2);
        document.getElementById('stdDev').textContent = "Desvio Padrão: " + stdDev.toFixed(2);
        document.getElementById('median').textContent = "Mediana: " + median.toFixed(2); // Exibe a mediana
    } else {
        document.getElementById('mean').textContent = "Media: N/A";
        document.getElementById('variance').textContent = "Variancia: N/A";
        document.getElementById('stdDev').textContent = "Desvio Padrão: N/A";
        document.getElementById('median').textContent = "Mediana: N/A";  // Exibe 'N/A' para mediana se a lista estiver vazia
        document.getElementById('sum').textContent = "Soma: N/A";
    }
}


function calculateMean(numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
}

function calculateVariance(numbers, mean) {
    return numbers.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / numbers.length;
}

function calculateMedian(numbers) {
    if (numbers.length === 0) return 0;

    numbers.sort((a, b) => a - b);

    const half = Math.floor(numbers.length / 2);

    if (numbers.length % 2)
        return numbers[half];
    else
        return (numbers[half - 1] + numbers[half]) / 2.0;
}


function updateList() {
    const numberList = document.getElementById("numberList");
    numberList.innerHTML = "";

    if (numbers.length > 0) {
        let listText = "";
        
        numbers.forEach((number, index) => {
            listText += number;
            if (index < numbers.length - 1) {  // Se não for o último número, adicione " - "
                listText += " - ";
            }
        });

        numberList.textContent = listText;
    }

    updateFrequencyTable();
    calculateStatistics(); // Isso deve chamar calculateStatistics sempre que a lista for atualizada
}


const inputNumber = document.getElementById("inputNumber");

inputNumber.addEventListener("keyup", function(event) {
    // Número 13 é a tecla Enter
    if (event.keyCode === 13) {
        event.preventDefault();
        // Chame a função addNumber quando Enter for pressionado
        addNumber();
    }
});





