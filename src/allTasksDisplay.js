import PubSub from "pubsub-js";
import taskModal from "./taskModal";
import listController from "./listController";
import { isWithinInterval, isSameDay } from "date-fns";

const allTasksDisplay = (timePeriod) => {
    const main = document.querySelector('main');

    const render = () => {
        //  Clear main
        main.textContent = '';

        //  Heading Text
        const header = document.createElement('h2');
        header.textContent = timePeriod === 'today' ? 'Today' : 'Next 7 Days';
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

        const items = _filterItems();

        items.forEach(item => {
            //  Task Container
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('task');
            itemDiv.dataset.index = item.itemIndex;
            itemDiv.dataset.list = item.listIndex;
            itemsDiv.appendChild(itemDiv);

            //  Task Complete button
            const completeButton = document.createElement('button');
            completeButton.textContent = 'complete';
            completeButton.classList.add('complete-button');
            itemDiv.appendChild(completeButton);
            completeButton.addEventListener('click', _completeButtonPressed);

            //  Title
            const itemTitle = document.createElement('div');
            itemTitle.textContent = item.data.getTitle();
            itemTitle.classList.add('title');
            itemDiv.appendChild(itemTitle);

            //  Description
            if (item.data.getDescription()) {
                const itemDescription = document.createElement('div');
                itemDescription.textContent = item.data.getDescription();
                itemDescription.classList.add('description');
                itemDiv.appendChild(itemDescription);
            }

            //  Date
            const dueDate = document.createElement('div');
            dueDate.textContent = item.data.getDueDate().toLocaleDateString('en-GB');
            dueDate.classList.add('dueDate');
            itemDiv.appendChild(dueDate);

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

    const _filterItems = () => {
        const today = new Date();
        today.setHours(12, 0, 0, 0);

        //  Get array of all objects containing a task and the project it belongs to
        const lists = listController.getListAll();
        const items = lists.map(list => list.getItems().map(item => {
            return {
                data: item,
                itemIndex: list.getItems().indexOf(item),
                listIndex: listController.getListAll().indexOf(list),
            }
        })).flat();

        if (timePeriod === 'week') {
            const nextWeek = new Date(today.valueOf());
            nextWeek.setDate(nextWeek.getDate() + 7);

            return items.filter(item => isWithinInterval(item.data.getDueDate(), {
                start: today,
                end: nextWeek,
            }));
        }

        return items.filter(item => isSameDay(item.data.getDueDate(), today));
    }


    const _addListItem = () => {
        const modal = taskModal();
        modal.setDefaultDate('today');
        modal.render();
    }

    const _completeButtonPressed = (e) => {
        _deleteButtonPressed(e);
    }

    const _editButtonPressed = (e) => {
        const taskIndex = e.target.parentNode.dataset.index;
        const listIndex = e.target.parentNode.dataset.list;
        const task = listController.getList(listIndex).getItems()[taskIndex]

        const modal = taskModal(task);
        modal.render();
    }

    const _deleteButtonPressed = (e) => {
        const taskIndex = e.target.parentNode.dataset.index;
        const projectIndex = e.target.parentNode.dataset.list;
        listController.getList(projectIndex).removeItem(taskIndex);
        _renderListItems();
    }

    const _handleNewItemEvent = () => {
        _renderListItems();
    }

    

    const _registerEventListeners = () => {
        const addListItemButton = document.querySelector('.add-task');
        addListItemButton.addEventListener('click', _addListItem);
    }

    const _registerSubscribers = () => {
        const NEW_ITEM = 'new list item created';
        const ITEM_UPDATED = 'item values updated';
        const LIST_DELETED = 'list has been deleted';

        PubSub.subscribe(NEW_ITEM, _renderListItems);
        PubSub.subscribe(ITEM_UPDATED, _renderListItems);
        PubSub.subscribe(LIST_DELETED, _renderListItems);
    }

    return {
        render,
    }
}

export default allTasksDisplay;