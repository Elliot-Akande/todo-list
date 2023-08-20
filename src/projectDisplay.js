import newTaskModal from "./newTaskModal";

const projectDisplay = (project) => {
    const _project = project;
    const main = document.querySelector('main');

    const render = () => {
        //  Clear main
        main.textContent = '';

        //  Heading Text
        const header = document.createElement('h2');
        header.textContent = _project.getTitle();
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
    }

    const _renderListItems = () => {
        const itemsDiv = document.querySelector('.tasks');
        itemsDiv.textContent = '';

        _project.getItems().forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('task');
            itemsDiv.appendChild(itemDiv);

            const itemTitle = document.createElement('div');
            itemTitle.textContent = item.getTitle();
            itemTitle.classList.add('title');
            itemDiv.appendChild(itemTitle);
        });
    }

    const _addListItem = () => {
        // const title = prompt('Enter title of task');
        // const description = 'Sample description';
        // const date = '12/09/2023';
        // const priority = 'high';

        // _project.addItem(title, description, date, priority);

        newTaskModal.render();

        _renderListItems();
    } 

    const _registerEventListeners = () => {
        const addListItemButton = document.querySelector('.add-task');
        addListItemButton.addEventListener('click', _addListItem);
    }

    return {
        render,
    }
}

export default projectDisplay;