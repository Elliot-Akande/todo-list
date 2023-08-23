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
            itemDiv.dataset.title = item.data.getTitle();
            itemDiv.dataset.list = item.list;
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

            //  Task Complete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.classList.add('delete-button');
            itemDiv.appendChild(deleteButton);
            deleteButton.addEventListener('click', _deleteButtonPressed);
        });
    }

    const _filterItems = () => {
        const today = (new Date()).setHours(0, 0, 0, 0);

        const lists = listController.getListAll();
        const items = lists.map(list => list.getItems().map(item => {
            return {
                list: list.getTitle(),
                data: item,
            }
        })).flat();

        return items.filter(item => item.data.getDueDate() === today);
    }

    const _addListItem = () => {
        taskModal.render('Inbox', 'today');
    }

    const _completeButtonPressed = (e) => {
        const taskTitle = e.target.parentNode.dataset.title;
        const projectTitle = e.target.parentNode.dataset.list;
        listController.getList(projectTitle).removeItem(taskTitle);
        _renderListItems();
    }

    const _deleteButtonPressed = (e) => {
        const taskTitle = e.target.parentNode.dataset.title;
        const projectTitle = e.target.parentNode.dataset.list;
        listController.getList(projectTitle).removeItem(taskTitle);
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
        PubSub.subscribe(NEW_ITEM, (msg, data) => _handleNewItemEvent(data));
    }

    return {
        render,
    }
}

export default allTasksDisplay;