const form=document.querySelector('#addItemForm');
const input=document.querySelector('#newItem');
const todoList=document.querySelector('#todo');
const completedList=document.querySelector('#completed');
const deleteFinished=document.querySelector('#deleteAll');
let listWorkingItems=[];
let listCompletedItems=[];

//parse the JSON
const checkWorking=localStorage.getItem('listWorkingItems',JSON.stringify(listWorkingItems));
const checkCompleted=localStorage.getItem('listCompletedItems',JSON.stringify(listCompletedItems));

//look for saved values in localStorage for current items
//  OR create the complered items list in local storage
if(checkWorking === null){
    localStorage.setItem('listWorkingItems','');
}else if(checkWorking !== ''){
    listWorkingItems=JSON.parse(localStorage.getItem('listWorkingItems'));
    for(item in listWorkingItems){
        addItemToList(listWorkingItems[item],'working');
    }
}

//look for saved values in localStorage for completed items
//  OR create the completed items list in local storage
if(checkCompleted === null){
    localStorage.setItem('listCompletedItems','');
}else if(checkCompleted !== ''){
    listCompletedItems=JSON.parse(localStorage.getItem('listCompletedItems'));
    for(item in listCompletedItems){
        addItemToList(listCompletedItems[item],'working');
    }
}

//this function will add a list item and a button to either list depending
//  on the values passed. This function accepts 'working' or 'completed' for the listType.
function addItemToList(inputValue,listType){
    const addItem=document.createElement('li');
    const removeBtn=document.createElement('button');
    if(listType==='working'){
        removeBtn.innerText='Mark Complete';
    }else if(listType==='completed'){
        removeBtn.innerText='Delete'
    }
    addItem.innerText=inputValue + '   ';
    addItem.id=inputValue;
    addItem.appendChild(removeBtn);

    if(listType==='working'){
        todoList.appendChild(addItem);
    }else if(listType==='completed'){
        completedList.appendChild(addItem);
    }
}

//this function adds a new to-do item to the list
form.addEventListener('submit', function(newItem){
    newItem.preventDefault();
    userInput=input.value;
    //create list items
    addItemToList(userInput,'working');
    
    //add items to local storage
    listWorkingItems.push(userInput);
    localStorage.setItem('listWorkingItems',JSON.stringify(listWorkingItems));
    
    //clear the input
    input.value='';
})

//this function listens for a user clicking the "Mark Complete" Button
todoList.addEventListener('click',function(finish){
    if (finish.target.tagName === 'BUTTON'){

        //create list items
        let changeLI=finish.target.parentElement.id;
        addItemToList(changeLI,'completed');

        //add items to local storage for completed list
        listCompletedItems.push(changeLI);
        localStorage.setItem('listCompletedItems',JSON.stringify(listCompletedItems));

        //remove item from the WorkingList and local storage
        listWorkingItems.splice(listWorkingItems.indexOf(changeLI), 1);
        localStorage.setItem('listWorkingItems',JSON.stringify(listWorkingItems));

        finish.target.parentElement.remove();
    }
})

//this function deletes only a single item permanently
completedList.addEventListener('click',function(deleted){
    if (deleted.target.tagName === 'BUTTON'){

        //select list item
        let deleteLI=deleted.target.parentElement.id;

        //remove item from the WorkingList and update localStorage
        listCompletedItems.splice(listCompletedItems.indexOf(deleteLI), 1);
        localStorage.setItem('listCompletedItems',JSON.stringify(listCompletedItems));

        deleted.target.parentElement.remove();
    }
})

//this function clears the entire completed list, but leaves the todo list untouched
deleteFinished.addEventListener('click', function(event){
    if(confirm('This action will delete all completed items history. Continue?')){
        //there is a known violation for handling time on this while-loop. I do not know how to fix it yet.
        while(completedList.firstChild){
            completedList.removeChild(completedList.firstChild);
        }
        delete localStorage.listCompletedItems;
        listCompletedItems=[];
        
    }   
})