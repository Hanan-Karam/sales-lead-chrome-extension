// DOM variables
const inputElement = document.getElementById('input-el');
const saveInputButton = document.getElementById('save-input-btn');
const leadsList = document.getElementById('leads-list');
const deleteButton = document.getElementById('delete-btn');
const saveTabButton = document.getElementById('save-tab-btn');

//initial variables
let leadsArray = [];
let leads = JSON.parse(localStorage.getItem("leadsArray"));
console.log(leads)
//localStorage.clear();


//functions
//function for the save the input into the leads array and render it
function saveInput(){
    //console.log("Save button was clicked");
    leadsArray.push(inputElement.value);
    inputElement.value ="";
    localStorage.setItem("leadsArray", JSON.stringify(leadsArray));
    //console.log(leadsArray)
    renderLeadsList();
    //leadsArray = [];
    //console.log(localStorage.getItem("leadsArray"));
}


//function to render the inputs into the ui
function renderLeadsList(){ 
    let listItems = "";    
    for(let i = 0; i < leadsArray.length; i++){
        listItems += `
        <li>
        <a href=${leadsArray[i]} target="_blank">
        ${leadsArray[i]}
        </a>
        </li>
        `
    }
    leadsList.innerHTML = listItems;
}

//working with local storage to get the saved leads
if(leads){
    leadsArray = leads;
    renderLeadsList();
}

//deleting the leads from the local storage and from the ui
function deleteLeads(){
    localStorage.clear();
    leadsArray = [];
    renderLeadsList();
}

//function to save the current tab link
function saveTab(){
    //console.log("save tab button");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0]
        leadsArray.push(activeTab.url);
        inputElement.value ="";
        localStorage.setItem("leadsArray", JSON.stringify(leadsArray));
        renderLeadsList();
    })
}


// for(let i = 0; i < leadsArray.length; i++){
//     listItems = document.createElement('li');
//     listItems.textContent = leadsArray[i];
//     leadsList.appendChild(listItems); 
// }

//better performance => using innrHTML


//Event Listeners
saveInputButton.addEventListener('click', saveInput);
deleteButton.addEventListener('dblclick', deleteLeads);
saveTabButton.addEventListener('click', saveTab)