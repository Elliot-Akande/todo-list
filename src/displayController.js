import sidebarController from "./sidebarController";

const displayController = (() => {
    const contentDiv = document.querySelector('.content');

    const render = () => {
        _renderHeader();
        sidebarController.render();
        _renderMain();
    }

    const _renderHeader = () => {
        const header = document.createElement('header');
        contentDiv.appendChild(header);

        const headerText = document.createElement('h1');
        headerText.textContent = 'ToDo List';
        header.appendChild(headerText);
    }

    const _renderMain = () => {
        const main = document.createElement('main');
        contentDiv.appendChild(main);
    }

    return {
        render,
    };
})();

export default displayController;