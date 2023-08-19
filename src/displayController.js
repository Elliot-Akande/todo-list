import sidebarController from "./sidebarController";
import mainController from "./mainController";

const displayController = (() => {
    const render = () => {
        _renderHeader();
        sidebarController.render();
        mainController.render();
    }

    const _renderHeader = () => {
        const contentDiv = document.querySelector('.content');
        const header = document.createElement('header');
        contentDiv.appendChild(header);

        const headerText = document.createElement('h1');
        headerText.textContent = 'ToDo List';
        header.appendChild(headerText);
    }

    return {
        render,
    };
})();

export default displayController;