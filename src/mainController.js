import projectDisplay from "./projectDisplay";

const mainController = (() => {
    const contentDiv = document.querySelector('.content');
    
    const render = () => {
        const main = document.createElement('main');
        contentDiv.appendChild(main);

        _registerSubscribers();
    }

    const _renderProject = (projectData) => {
        const project = projectDisplay(projectData);
        project.render();
    }

    const _renderHome = (category) => {
        if (category === 'today') _renderToday();
        if (category === 'week') _renderWeek();
    }

    const _renderToday = () => {
        const main = document.querySelector('main')
        main.textContent = '';

        const header = document.createElement('h2');
        header.textContent = 'Today';
        main.appendChild(header);
    }

    const _renderWeek = () => {
        const main = document.querySelector('main')
        main.textContent = '';

        const header = document.createElement('h2');
        header.textContent = 'Next 7 Days';
        main.appendChild(header);
    }

    const _registerSubscribers = () => {
        const SHOW_HOME = 'home category pressed';
        const SHOW_PROJECT = 'project pressed';
        const NEW_LIST = 'new list created';

        PubSub.subscribe(SHOW_HOME, (msg, data) => _renderHome(data));
        PubSub.subscribe(SHOW_PROJECT, (msg, data) => _renderProject(data));
        PubSub.subscribe(NEW_LIST, (msg, data) => _renderProject(data));
    } 

    return {
        render,
    }
})();

export default mainController;