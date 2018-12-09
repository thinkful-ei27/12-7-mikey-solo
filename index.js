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
// console.log(STORE[Object.keys(STORE)[Object.keys(STORE).length-1]]);
console.log(Object.keys(STORE).length);


function generateItemElement(item, itemIndex, template) {

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
         <button class="shopping-item-delete js-item-edit">
             <span class="button-label">edit</span>
        </button>
      </div>
    </li>`;

}


function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}


function renderShoppingList() {
  const listIWant = STORE[Object.keys(STORE)[Object.keys(STORE).length-1]];
  const shoppingListItemsString = generateShoppingItemsString(listIWant);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  console.log('`renderShoppingList` ran');
  console.log(Object.keys(STORE).length);
}




function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.item.push({name: itemName, checked: false});
 
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    if(Object.keys(STORE).length > 1){ 
      delete STORE.item2; }
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function handleSearchSubmit() {
  $('.js-shopping-list-entry').keyup(function() {
    const limitedArray = [];
    const searchTerm = $('.js-shopping-list-entry').val();
    STORE.item.filter(commodity =>{
      if (commodity.name.includes(searchTerm)){
        console.log(commodity);
        limitedArray.push(commodity);
      }
      STORE.item2 = limitedArray;
      renderShoppingList();
    });
  });
}
// handleSearch submit works, the item2 object sticks around until 
// another action is taken by the user. 


function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.length >  1 ? delete STORE.item2 :
    STORE.item[itemIndex].checked = !STORE.item[itemIndex].checked;
}
// altered toggleCheckedForLastItem to delete item2 before it toggles instead of after;
// this gets rid of the bug where it would delete toggle at index of item and
// then delete item2 (check button dissasociated from item in search mode)

function deleteItemFromList(itemIndex) {
  console.log('deleting item...', itemIndex);
  STORE.item.splice(itemIndex, 1);
  delete STORE.item2;
  console.log(STORE);
}

function getItemIndexFromElement(commodity) {
  const commodityIndexString = $(commodity)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(commodityIndexString, 10);
}
function toggleNeededVsAll(){
  const limitedArray = [];
  STORE.item.map(( commodity  =>{
    if (commodity.checked === false) {
      limitedArray.push(commodity);
    }
    STORE.item2 = limitedArray;
    renderShoppingList();
  }));

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
  $('.container').on('click', '.js-view-all-button', function(){
    const totalList = Object.keys(STORE).length === 1;
    const neededList = toggleNeededVsAll(STORE.item);  
    totalList ? renderShoppingList(neededList): 
      delete STORE[Object.keys(STORE)[Object.keys(STORE).length-1]];
    renderShoppingList();
  });
//checked is true, removes from dom
}
function getEditItemIndexFromElement(commodity) {
  const commodityIndexString = $(commodity)
    .closest('#js-edit-list-form')
    .attr('data-item-index');
  return parseInt(commodityIndexString, 10);
}



function handleEditItemSubmit() {
  $('#js-edit-list-form').submit(function(event) {
    event.preventDefault();
    const itemIndex = getEditItemIndexFromElement(event.currentTarget);
    // if(Object.keys(STORE).length > 1){ 
    //   delete STORE.item2; 
    const newItemName = $('.js-shopping-list-entry').val();
    STORE.item.splice(itemIndex, 1);
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });

}

function generateEditItemString(item , itemIndex){
  console.log(item ,'edited item string ran');
  return ` <li class="js-item-index-element" data-item-index="${itemIndex}">
             <form id="js-edit-list-form" data-item-index="${itemIndex}">
            <label for="shopping-list-entry">Add an item</label>
            <input type="text" name="shopping-list-entry" class="js-shopping-list-entry" placeholder="${item.name}">
            <button type="submit" class="js-finish-entry">finished edit</button>
            </form>
            </li>`;
            
}
function findNameOfElement(commodity){
  const commodityIndexString = $(commodity)
    .closest('js-item-index-element')
    .find('.shopping-item').text();
  console.log('findNameOfElement ran');
  return commodityIndexString;


}
function renderEditShoppingList(itemIndex) {
  const listIWant = STORE[Object.keys(STORE)[Object.keys(STORE).length-1]];
  const shoppingListItemsString = generateEditItemString(listIWant[itemIndex]);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  console.log('`renderEditShoppingList` ran');
  console.log(Object.keys(STORE).length);

}

function handleEditItemClicked(){
  $('.js-shopping-list').on('click','.js-item-edit',function(event){
    if(Object.keys(STORE).length > 1){ 
      STORE.item.map( commodity => {
        const editClick = findNameOfElement(event.currentTarget);
        if(commodity.name === editClick){
          const itemIndex = STORE.item.indexOf(commodity);
          console.log(itemIndex);
        }
        else console.log('not working');
      });
      console.log('editbuttonclicked ran');
    }
    else{const itemIndex = getItemIndexFromElement(this);
      console.log('editeditemindex', itemIndex);
      renderEditShoppingList(itemIndex);}

  });
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
  handleSearchSubmit();
  handleEditItemClicked();
  handleEditItemSubmit();

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);