import projectDisplay from "./projectDisplay";
import allTasksDisplay from "./allTasksDisplay";

const mainController = (() => {
    const contentDiv = document.querySelector('.content');
    
    const render = () => {
        const main = document.createElement('main');
        contentDiv.appendChild(main);

        _registerSubscribers();
        _renderHome('today');
    }

    const _renderProject = (projectData) => {
        const project = projectDisplay(projectData);
        project.render();
    }

    const _renderHome = (category) => {
        const display = allTasksDisplay(category);
        display.render();
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