import sidebarController from "./sidebarController";
import mainController from "./mainController";
import taskModal from "./taskModal";

const displayController = (() => {
    const render = () => {
        _renderHeader();
        sidebarController.render();
        mainController.render();

        _registerEventListeners();
    }

    const _renderHeader = () => {
        const contentDiv = document.querySelector('.content');
        const header = document.createElement('header');
        contentDiv.appendChild(header);

        // Header text
        const headerText = document.createElement('h1');
        headerText.textContent = 'ToDo List';
        header.appendChild(headerText);

        // Create Item Button
        const button = document.createElement('button');
        button.textContent = 'Add Task';
        button.classList.add('add-task-header');
        header.appendChild(button);
    }

    const _addListItem = () => {
        const modal = taskModal();
        modal.render();
    } 

    const _registerEventListeners = () => {
        const addListItemButton = document.querySelector('.add-task-header');
        addListItemButton.addEventListener('click', _addListItem);
    }

    return {
        render,
    };
})();

export default displayController;