import projectDisplay from "./projectDisplay";
import allTasksDisplay from "./allTasksDisplay";
import listController from "./listController";

const mainController = (() => {
    const contentDiv = document.querySelector('.content');
    let currentDisplay = 'today';

    const render = () => {
        const main = document.createElement('main');
        contentDiv.appendChild(main);

        _registerSubscribers();
        _renderHome('today');
    }

    const _renderProject = projectData => {
        const project = projectDisplay(projectData);
        currentDisplay = listController.getListAll().indexOf(projectData);
        project.render();
    }

    const _renderHome = category => {
        const display = allTasksDisplay(category);
        currentDisplay = category;
        display.render();
    }

    const _handleListDeleted = index => {
        if (currentDisplay === +index) _renderProject(listController.getList(0));
    }

    const _registerSubscribers = () => {
        const SHOW_HOME = 'home category pressed';
        const SHOW_PROJECT = 'project pressed';
        const NEW_LIST = 'new list created';
        const LIST_DELETED = 'list has been deleted';


        PubSub.subscribe(SHOW_HOME, (msg, data) => _renderHome(data));
        PubSub.subscribe(SHOW_PROJECT, (msg, data) => _renderProject(data));
        PubSub.subscribe(NEW_LIST, (msg, data) => _renderProject(data));
        PubSub.subscribe(LIST_DELETED, (msg, data) => _handleListDeleted(data));
    }

    return {
        render,
    }
})();

export default mainController;