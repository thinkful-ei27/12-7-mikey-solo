'use strict';
/* global $*/
const STORE = {
 
  item : [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  
  ],

};
console.log(STORE[Object.keys(STORE)[Object.keys(STORE).length-1]]);
console.log(Object.keys(STORE).length);


function generateItemElement(item, itemIndex, template) {
  // console.log('look at me');
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;

}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
 
  return items.join('');
}


function renderShoppingList() {
  const listIWant = STORE[Object.keys(STORE)[Object.keys(STORE).length-1]];
  const shoppingListItemsString = generateShoppingItemsString(listIWant);
  console.log(shoppingListItemsString);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  console.log('`renderShoppingList` ran');
}




function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.item.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.item[itemIndex].checked = !STORE.item[itemIndex].checked;
}

function deleteItemFromList(itemIndex) {
  console.log('deleting item...', itemIndex);
  STORE['item'].splice(itemIndex, 1);
  console.log(STORE);
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}
function toggleNeededVsAll(){
  const limitedArray = []
  STORE.item.map((item  =>{
    if (item.checked === false) {
      
      limitedArray.push(item);
    }
    
    STORE.item2 = limitedArray;

    renderShoppingList();
  }));
  // console.log('`toggleNeededVsAll` ran');

}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', function (event) {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItemFromList(itemIndex);
    renderShoppingList();
  });
}

function handleNeededVsAllButton(){
  console.log('`handleNeededVsAllButton` ran ');
  $('.container').on('click', '.js-view-all-button', function(){
    
    const totalList = Object.keys(STORE).length === 1;
    const neededList = toggleNeededVsAll(STORE.item);  
    totalList ? renderShoppingList(neededList): 
      delete STORE[Object.keys(STORE)[Object.keys(STORE).length-1]];
    renderShoppingList();
    // console.log(event, 'All button clicked');
  });
//checked is true, removes from dom
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleNeededVsAllButton();

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);