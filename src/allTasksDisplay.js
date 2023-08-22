import PubSub from "pubsub-js";
import taskModal from "./taskModal";
import listController from "./listController";

const allTasksDisplay = () => {
    const main = document.querySelector('main');

    const render = () => {
        //  Clear main
        main.textContent = '';

        //  Heading Text
        const header = document.createElement('h2');
        header.textContent = 'Today';
        main.appendChild(header);

        //  Render items
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('tasks');
        main.appendChild(itemDiv);
        _renderListItems();

        // Create Item Button
        const button = document.createElement('button');
        button.textContent = 'Add Task';
        button.classList.add('add-task');
        main.appendChild(button);

        // _registerEventListeners();
        // _registerSubscribers();
    }

    const _renderListItems = () => {
        const itemsDiv = document.querySelector('.tasks');
        itemsDiv.textContent = '';

        const items = _filterItems();

        console.log(items);

        // console.log(allLists
        //     .map(list => list.getItems()
        //     .filter(item => item.getDueDate().setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0))));

        // const items = listController.getListAll().filter(item => )

        // project.getItems().forEach(item => {
        //     //  Task Container
        //     const itemDiv = document.createElement('div');
        //     itemDiv.classList.add('task');
        //     itemDiv.dataset.title = item.getTitle();
        //     itemsDiv.appendChild(itemDiv);

        //     //  Task Complete button
        //     const completeButton = document.createElement('button');
        //     completeButton.textContent = 'complete';
        //     completeButton.classList.add('complete-button');
        //     itemDiv.appendChild(completeButton);
        //     completeButton.addEventListener('click', _completeButtonPressed);

        //     //  Title
        //     const itemTitle = document.createElement('div');
        //     itemTitle.textContent = item.getTitle();
        //     itemTitle.classList.add('title');
        //     itemDiv.appendChild(itemTitle);

        //     //  Task Complete button
        //     const deleteButton = document.createElement('button');
        //     deleteButton.textContent = 'delete';
        //     deleteButton.classList.add('delete-button');
        //     itemDiv.appendChild(deleteButton);
        //     deleteButton.addEventListener('click', _deleteButtonPressed);
        // });
    }

    const _filterItems = () => {
        const today = (new Date()).setHours(0, 0, 0, 0); 
        const lists = listController.getListAll();
        const items = lists.map(list => list.getItems()).flat();
        return items.filter(item => item.getDueDate() === today);
    }

    // const _addListItem = () => {
    //     taskModal.render(project);
    // } 

    // const _completeButtonPressed = (e) => {
    //     const taskTitle = e.target.parentNode.dataset.title;
    //     project.removeItem(taskTitle);
    //     _renderListItems();
    // } 
    
    // const _deleteButtonPressed = (e) => {
    //     const taskTitle = e.target.parentNode.dataset.title;
    //     project.removeItem(taskTitle);
    //     _renderListItems();
    // }

    // const _handleNewItemEvent = (title) => {
    //     if (title === project.getTitle()) _renderListItems();
    // } 

    // const _registerEventListeners = () => {
    //     const addListItemButton = document.querySelector('.add-task');
    //     addListItemButton.addEventListener('click', _addListItem);
    // }

    // const _registerSubscribers = () => {
    //     const NEW_ITEM = 'new list item created';
    //     PubSub.subscribe(NEW_ITEM, (msg, data) => _handleNewItemEvent(data));
    // }

    return {
        render,
    }
}

export default allTasksDisplay;