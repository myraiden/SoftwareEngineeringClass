//1. Select the section with an id of container without using querySelector.
const containerID=document.getElementById('container');

// 2. Select the section with an id of container using querySelector.
const containerQuery=document.querySelector('#container');

// 3. Select all of the list items with a class of “second”.
const listAllSecond=document.querySelectorAll('.second');

// 4. Select a list item with a class of third, but only the list item inside of the ol tag.
const ol=document.querySelector('ol');
const olThird=ol.getElementsByClassName('third');

// 5. Give the section with an id of container the text “Hello!”.
containerQuery.append('Hello!');

// 6. Add the class main to the div with a class of footer.
const divFooter=document.querySelector('.footer');
divFooter.classList.add('main');

// 7. Remove the class main on the div with a class of footer.
divFooter.classList.remove('main');

// 8. Create a new li element.
const newLi=document.createElement('li');

// 9. Give the li the text “four”.
newLi.innerText="four";

// 10. Append the li to the ul element.
const ul=document.querySelector('ul');
ul.append(newLi);

// 11. Loop over all of the lis inside the ol tag and give them a background color of “green”.
const listItems=ol.querySelectorAll('li');
for(let lis of listItems){
    lis.style.color='green';
}
// 12. Remove the div with a class of footer
divFooter.remove();

