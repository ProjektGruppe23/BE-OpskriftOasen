const sIngredientButtons = document.querySelectorAll('#suggested-ingredients div');
const addedIngredientsDiv = document.getElementById("added-ingredients");
const addIngredientButton = document.getElementById("add-button");
const inputIngredient = document.getElementById("input-field");

let num = 0;

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
    event.target.setAttribute('hidden', true)
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
            sIngredient.removeAttribute('hidden');
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

addIngredientButton.addEventListener('click', addInputIngredient);
