document.getElementById('processButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        const processedText = processText(text);
        document.getElementById('processedText').textContent = processedText;
    };

    reader.readAsText(file);
});

function processText(text) {
    const words = text.match(/\b\w+\b/g);
    const wordCount = {};

    words.forEach((word) => {
        word = word.toLowerCase();
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const mostFrequentWord = Object.keys(wordCount).reduce((a, b) =>
        wordCount[a] > wordCount[b] ? a : b
    );

    const regex = new RegExp(`\\b${mostFrequentWord}\\b`, 'gi');
    return text.replace(regex, `foo${mostFrequentWord}bar`);
}
