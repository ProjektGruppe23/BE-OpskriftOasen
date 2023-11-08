function sendMessage(queryPrefix) {
    const message = document.getElementById("message").value;
    const responseElement = document.getElementById("response");
    console.log("Message to send:", message);
    fetch(`http://localhost:8080/chat?message=${queryPrefix}${message}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('message')) {
                const messageContent = data[0].message.content;
                console.log("Message content:", messageContent);
                responseElement.innerHTML = messageContent;
            } else {
                console.error("Invalid response data format.");
            }
        })
        .catch(error => console.error("Error:", error));
}


