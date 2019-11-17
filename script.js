let userName = '';

function getUserRepo(){
    fetch('https://api.github.com/users/' + userName + '/repos?per_page=10')
    .then(response => {
        if(response.ok){
            return response.json();
        }else{
            // skips next .then and goes to .catch
            throw new Error();
        }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => errorHandle());
};

function displayResults(responseJson){
    resetResults();
    for(let i = 0; i < responseJson.length; i++){
        $('.results').append(
            `<h2>Repo Name: ${responseJson[i].name}</h2>
            <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>`
          )
    }
    $('.results').removeClass('hidden');
};

function resetResults(){
    $('.results').empty();
};

function grabUserName(){
    userName = $('#UserInput').val();
};

function submitUser(){
    $('form').submit(event =>{
        event.preventDefault();
        grabUserName();
        getUserRepo();
    });
};

function errorHandle() {
    resetResults();
    $('.results').append(`<h3>User Not Found!</h3>`);
    $('.results').removeClass('hidden');
};

function masterControl(){
    submitUser();
};

$(masterControl);