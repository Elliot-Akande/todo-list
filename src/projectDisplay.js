import PubSub from "pubsub-js";
import taskModal from "./taskModal";

const projectDisplay = (project) => {
    const main = document.querySelector('main');

    const render = () => {
        //  Clear main
        main.textContent = '';

        //  Heading Text
        const header = document.createElement('h2');
        header.textContent = project.getTitle();
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

        _registerEventListeners();
        _registerSubscribers();
    }

    const _renderListItems = () => {
        const itemsDiv = document.querySelector('.tasks');
        itemsDiv.textContent = '';

        project.getItems().forEach((item, index) => {
            //  Task Container
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('task');
            itemDiv.dataset.index = index;
            itemsDiv.appendChild(itemDiv);

            //  Task Complete button
            const completeButton = document.createElement('button');
            completeButton.textContent = 'complete';
            completeButton.classList.add('complete-button');
            itemDiv.appendChild(completeButton);
            completeButton.addEventListener('click', _completeButtonPressed);

            //  Title
            const itemTitle = document.createElement('div');
            itemTitle.textContent = item.getTitle();
            itemTitle.classList.add('title');
            itemDiv.appendChild(itemTitle);

            //  Description
            if (item.getDescription()) {
                const itemDescription = document.createElement('div');
                itemDescription.textContent = item.getDescription();
                itemDescription.classList.add('description');
                itemDiv.appendChild(itemDescription);
            }

            //  Date
            const date = item.getDueDate();
            if (date instanceof Date && !isNaN(date)) {
                const dueDate = document.createElement('div');
                dueDate.textContent = date.toLocaleDateString('en-GB');
                dueDate.classList.add('dueDate');
                itemDiv.appendChild(dueDate);
            }

            //  Edit button
            const EditButton = document.createElement('button');
            EditButton.textContent = 'edit';
            EditButton.classList.add('edit-button');
            itemDiv.appendChild(EditButton);
            EditButton.addEventListener('click', _editButtonPressed);

            //  Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.classList.add('delete-button');
            itemDiv.appendChild(deleteButton);
            deleteButton.addEventListener('click', _deleteButtonPressed);
        });
    }

    const _addListItem = () => {
        const modal = taskModal();
        modal.setDefaultList(project);
        modal.render();
    }

    const _completeButtonPressed = (e) => {
        _deleteButtonPressed(e);
    }

    const _editButtonPressed = (e) => {
        const index = e.target.parentNode.dataset.index;
        const task = project.getItems()[index];

        const modal = taskModal(task);
        modal.render();
    }

    const _deleteButtonPressed = (e) => {
        const taskIndex = e.target.parentNode.dataset.index;
        project.removeItem(taskIndex);
        _renderListItems();
    }

    const _handleNewItemEvent = (title) => {
        if (title === project.getTitle()) _renderListItems();
    }

    const _rerenderTitle = () => {
        const titleDiv = main.querySelector('h2');
        titleDiv.textContent = project.getTitle();
    }

    const _registerEventListeners = () => {
        const addListItemButton = document.querySelector('.add-task');
        addListItemButton.addEventListener('click', _addListItem);
    }

    const _registerSubscribers = () => {
        const NEW_ITEM = 'new list item created';
        const ITEM_UPDATED = 'item values updated';
        const LIST_TITLE_UPDATE = 'list title updated';

        PubSub.subscribe(NEW_ITEM, (msg, data) => _handleNewItemEvent(data));
        PubSub.subscribe(ITEM_UPDATED, _renderListItems);
        PubSub.subscribe(LIST_TITLE_UPDATE, _rerenderTitle);
    }

    return {
        render,
    }
}

export default projectDisplay;