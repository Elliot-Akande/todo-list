import listController from "./listController";

const mainController = (() => {
    const contentDiv = document.querySelector('.content');
    
    const render = () => {
        const main = document.createElement('main');
        contentDiv.appendChild(main);

        _registerSubscribers();
    }

    const _renderHome = (category) => {
        console.log({category});
    }

    const _renderProject = (project) => {
        console.log({project});
    }

    const _registerSubscribers = () => {
        const SHOW_HOME = 'home category pressed';
        const SHOW_PROJECT = 'project pressed';

        PubSub.subscribe(SHOW_HOME, (msg, data) => _renderHome(data));
        PubSub.subscribe(SHOW_PROJECT, (msg, data) => _renderProject(data));
    } 

    return {
        render,
    }
})();

export default mainController;