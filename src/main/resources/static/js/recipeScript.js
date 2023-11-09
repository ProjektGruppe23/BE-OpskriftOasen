function sendMessage(queryPrefix) {
    let message;
    if(document.getElementById('added-ingredients') !== null)
    {
        console.log('Jeg er i added-ingredients')
        const ingredientNames = document.getElementsByClassName('ingredient-name')
        message = [];
        for(const ingredientName of ingredientNames) {
            message.push(ingredientName.innerText)
        }
    }
    else if(document.getElementById("message") === null)
    {
        console.log('Jeg er i null')
        message = "";
    }
    else
    {
        console.log('Jeg er i else')
        message = document.getElementById("message").value;
    }
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


