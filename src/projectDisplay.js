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

        project.getItems().forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('task');
            itemsDiv.appendChild(itemDiv);

            const itemTitle = document.createElement('div');
            itemTitle.textContent = item.getTitle();
            itemTitle.classList.add('title');
            itemDiv.appendChild(itemTitle);
        });

        console.log('re-render');
    }

    const _addListItem = () => {
        taskModal.render(project);
    } 

    const _handleNewItemEvent = (title) => {
        if (title === project.getTitle()) _renderListItems();
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

export default projectDisplay;