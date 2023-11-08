const sIngredientButtons = document.querySelectorAll('#suggested-ingredients div');
const addedIngredientsDiv = document.getElementById("added-ingredients");
const addedIngredientRemoveButtons = document.querySelectorAll('#added-ingredients button')


function addSIngredient(event)
{
    console.log("I have been clicked");
    const sIngredientText = event.target.innerText;
    event.target.setAttribute('hidden', true)
    const classNameNum = event.target.className;
    addToIngredientsList(`${sIngredientText} \n`, classNameNum);

}

function addToIngredientsList(ingredientText, classNameNumber)
{
    const ingredientBox = document.createElement('div');
    ingredientBox.className = `ingredientbox${classNameNumber}`
    const ingredientName = document.createElement('div');
    ingredientName.className = classNameNumber;
    ingredientName.innerText = ingredientText;
    ingredientBox.appendChild(ingredientName);
    const ingredientRemove = document.createElement('button');
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

function removeIngredient(event)
{
    console.log("I have been removed");
    const classNameNumberRemoveButton = event.target.className;
    const bigDiv = document.getElementsByClassName(`ingredientbox${classNameNumberRemoveButton}`)
    const sIngredient = document.getElementsByClassName(classNameNumberRemoveButton)
    sIngredient.setAttribute('hidden', false)
    bigDiv.element.remove();
}

for (const button of sIngredientButtons) {
    button.addEventListener('click', addSIngredient);
}

for (const button of addedIngredientRemoveButtons) {
    button.addEventListener('click', removeIngredient);
}

document.addEventListener("DOMContentLoaded", classNameToSIngredient)





/*
const sIngredientButtons = document.getElementsByClassName("s-ingredient");
const addedIngredientsDiv = document.getElementById("added-ingredients");

function addSIngredient(event) {
    console.log("I have been clicked");
    const sIngredientText = event.target.innerText;
    event.target.setAttribute('hidden', true);
    addedIngredientsDiv.innerHTML += `${sIngredientText}\n`;
}

// Loop through all .s-ingredient elements and add a click event listener to each
for (const button of sIngredientButtons) {
    button.addEventListener('click', addSIngredient);
}*/