const sIngredientButtons = document.querySelectorAll('#suggested-ingredients div');
const addedIngredientsDiv = document.getElementById("added-ingredients");
const addIngredientButton = document.getElementById("add-button");
const inputIngredient = document.getElementById("input-field");

let num = 0;

function showLoadingPopup() {
    alert("Tak for dit input, vent venligst 2-5 minutter alt efter netvaerkshastighed for at chat GPT kan trylle noget magisk frem til dig!");
}

function sendMessage(message) {
    console.log(`Message sent: ${message}`);
    // Add the AJAX call or message sending logic here.
}

function handleChatButtonClick() {
    showLoadingPopup();
    sendMessage('giv mig max 5 forskellige opskrifter ud fra disse ingredienser:');
}

function addInputIngredient()
{
    const inputText = inputIngredient.value;
    console.log(inputText);
    addToIngredientsList(`${inputText} \n`, `input${num}`);
    num++;
    inputIngredient.value = "";
}

function addSIngredient(event)
{
    console.log("I have been clicked");
    const sIngredientText = event.target.innerText;
    event.target.style.display = 'none';
    const classNameNum = event.target.className;
    addToIngredientsList(`${sIngredientText} \n`, classNameNum);

}

function addToIngredientsList(ingredientText, classNameNumber)
{
    const ingredientBox = document.createElement('div');
    ingredientBox.className = `ingredientbox${classNameNumber}`
    const ingredientName = document.createElement('div');
    ingredientName.className = 'ingredient-name';
    ingredientName.innerText = ingredientText;
    ingredientBox.appendChild(ingredientName);
    const ingredientRemove = document.createElement('BUTTON');
    ingredientRemove.innerText = "X";
    ingredientRemove.className = classNameNumber;
    ingredientBox.appendChild(ingredientRemove);
    addedIngredientsDiv.appendChild(ingredientBox);

}

function classNameToSIngredient()
{
    for (let i = 0; i < sIngredientButtons.length; i++)
    {
        sIngredientButtons[i].className = `${i}`;
    }
}

function removeIngredient(event) {
    console.log("I have been removed");
    const classNameNumberRemoveButton = event.target.className;
    const bigDiv = document.getElementsByClassName(`ingredientbox${classNameNumberRemoveButton}`);
    const sIngredients = document.getElementsByClassName(classNameNumberRemoveButton);

    if(sIngredients.length > 0) {
        for (const sIngredient of sIngredients) {
            sIngredient.style.display = '';
        }
    }

    if (bigDiv.length > 0) {
        bigDiv[0].remove();
    }
}

for (const button of sIngredientButtons) {
    button.addEventListener('click', addSIngredient);
}

addedIngredientsDiv.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        removeIngredient(event);
    }
});

document.addEventListener("DOMContentLoaded", classNameToSIngredient);

document.addEventListener("DOMContentLoaded", function() {
    const chatButton = document.getElementById("chat-button");
    chatButton.addEventListener('click', handleChatButtonClick);
});

addIngredientButton.addEventListener('click', addInputIngredient);
