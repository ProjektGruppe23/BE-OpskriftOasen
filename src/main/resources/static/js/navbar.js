function loadNavbar()
{
    fetch('../html/navbar.html') //load the template
        .then(response => response.text())
        .then(data =>
        {
            const navbarContainer = document.getElementById('navbar');
            navbarContainer.innerHTML = data
        })
        .catch(error => console.error('Error loading navbar:', error))
}