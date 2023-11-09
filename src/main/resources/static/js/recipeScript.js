const resultContainer = document.getElementById('resultContainer');


function displayImage(imageUrl) {
    resultContainer.innerHTML = "";
    resultContainer.innerHTML = `<img src="${imageUrl}" alt="Search Result" style="max-width: 80%;">`;
}

function displayError(message) {
    resultContainer.innerHTML = `<p>${message}</p>`;
}

function sendMessage(queryPrefix) {
    let message;
    if(document.getElementById("message") === null)
    {
        message = "";
    } else
    {
        message = document.getElementById("message").value;
    }
    const responseElement = document.getElementById("response");
    console.log("Message to send:", message);
    fetch(`http://localhost:8080/chat?message=${queryPrefix}${message}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('message')) {
                const messageContent = data[0].message.content;
                const firstSentence = messageContent.split('\n')[0];
                console.log("First sentence:", firstSentence);
                console.log("Message content:", messageContent);
                responseElement.innerHTML = messageContent;
                searchImages(firstSentence);
            } else {
                console.error("Invalid response data format.");
            }
        })
        .catch(error => console.error("Error:", error));
}


function searchImages(query) {
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&key=${apiKey}&searchType=image`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.items && data.items.length > 0) {
                const imageUrl = data.items[0].link;
                displayImage(imageUrl);
            } else {
                displayError('No images found.');
            }
        })
        .catch(error => {
            displayError('Error fetching images.');
            console.error(error);
        });
}





