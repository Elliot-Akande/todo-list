import PubSub from "pubsub-js";
import listController from "./listController";
import projectModal from "./projectModal";

const sidebarController = (() => {
    const contentDiv = document.querySelector('.content');

    const render = () => {
        const sidebar = document.createElement('nav');
        contentDiv.appendChild(sidebar);

        //  Home Section
        const homeSection = document.createElement('div');
        homeSection.classList.add('home-section');
        sidebar.appendChild(homeSection);

        const homeHeader = document.createElement('h2');
        homeHeader.textContent = 'Home';
        homeHeader.classList.add('header');
        homeSection.appendChild(homeHeader);
        
        //  Home List
        const homeList = document.createElement('ul');
        homeSection.appendChild(homeList);

        homeList.appendChild(_createNavItem('all', 'All Tasks'));
        homeList.appendChild(_createNavItem('today', 'Today'));
        homeList.appendChild(_createNavItem('week', 'Next 7 Days'));

        //  Project Section
        const projectSection = document.createElement('div');
        projectSection.classList.add('project-section');
        sidebar.appendChild(projectSection);

        const projectHeader = document.createElement('h2');
        projectHeader.textContent = 'Projects';
        projectHeader.classList.add('header');
        projectSection.appendChild(projectHeader);

        //  Projects div
        const projects = document.createElement('div');
        projects.classList.add('projects-div');
        projectSection.appendChild(projects);

        //  New Project Button
        const button = document.createElement('button');
        button.classList.add('add-project');
        button.textContent = 'Add Project' 
        projectSection.appendChild(button);


        _registerEventListeners();
        _registerSubscribers();
    };

    const _renderNewProject = (msg, data) => {
        const projectSection = document.querySelector('.projects-div');

        const project = document.createElement('div');
        project.classList.add('project');
        project.dataset.title = data.getTitle();
        projectSection.appendChild(project);

        const projectTitle = document.createElement('div');
        projectTitle.classList.add('title');
        projectTitle.textContent = data.getTitle();
        project.appendChild(projectTitle);

        project.addEventListener('click', _projectPressed);
    }; 

    const _createNavItem = (category, text) => {
        const item = document.createElement('li');
        const title = document.createElement('div');

        title.textContent = text;
        title.dataset.category = category;
        item.appendChild(title);

        return item;
    };

    const _homeItemPressed = (e) => {
        const category = e.target.dataset.category;

        const SHOW_HOME = 'home category pressed';
        PubSub.publish(SHOW_HOME, category);
    };

    const _projectPressed = (e) => {
        const title = e.currentTarget.dataset.title;
        const project = listController.getList(title);
        
        const SHOW_PROJECT = 'project pressed';
        PubSub.publish(SHOW_PROJECT, project);
    };

    const _addProjectPressed = (e) => {
        projectModal.render();
    };

    const _registerEventListeners = () => {
        //  Home item listeners
        const homeItems = document.querySelectorAll('.home-section li');
        homeItems.forEach(item => item.addEventListener('click', _homeItemPressed));
        
        //  Project listeners
        const projects = document.querySelectorAll('.project');
        projects.forEach(item => item.addEventListener('click', _projectPressed));

        //  Add project listener
        const addProjectButton = document.querySelector('.add-project');
        addProjectButton.addEventListener('click', _addProjectPressed);
    };


    const _registerSubscribers = () => {
        const NEW_LIST = 'new list created';

        PubSub.subscribe(NEW_LIST, _renderNewProject);
    }


    return {
        render,
    }
})();

export default sidebarController;