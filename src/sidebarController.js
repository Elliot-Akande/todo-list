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

        // Inbox 
        const inbox = _createNavItem('inbox', 'Inbox');
        listController.newList('Inbox');
        inbox.dataset.index = 0;
        inbox.addEventListener('click', _projectPressed);
        homeList.appendChild(inbox);

        // Other home items
        const today = _createNavItem('today', 'Today');
        today.classList.add('all-tasks');
        homeList.appendChild(today);
        const week = _createNavItem('week', 'Next 7 Days');
        week.classList.add('all-tasks');
        homeList.appendChild(week);

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

    const _createNavItem = (category, text) => {
        const item = document.createElement('li');
        const title = document.createElement('div');

        title.textContent = text;
        title.dataset.category = category;
        item.appendChild(title);

        return item;
    };

    const _renderNewProject = data => {
        const projectSection = document.querySelector('.projects-div');

        //  Project container
        const project = document.createElement('div');
        project.classList.add('project');
        project.dataset.index = listController.getListAll().indexOf(data);
        projectSection.appendChild(project);

        //  Title
        const projectTitle = document.createElement('div');
        projectTitle.classList.add('title');
        projectTitle.textContent = data.getTitle();
        project.appendChild(projectTitle);

        //  Edit button
        const EditButton = document.createElement('button');
        EditButton.textContent = 'edit';
        EditButton.classList.add('edit-button');
        project.appendChild(EditButton);
        EditButton.addEventListener('click', _editButtonPressed);

        //  Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.classList.add('delete-button');
        project.appendChild(deleteButton);
        deleteButton.addEventListener('click', _deleteButtonPressed);

        project.addEventListener('click', _projectPressed);
    }; 

    const _homeItemPressed = (e) => {
        const category = e.target.dataset.category;

        const SHOW_HOME = 'home category pressed';
        PubSub.publish(SHOW_HOME, category);
    };

    const _projectPressed = (e) => {
        const index = e.currentTarget.dataset.index;
        const project = listController.getList(index);
        
        const SHOW_PROJECT = 'project pressed';
        PubSub.publish(SHOW_PROJECT, project);
    };

    const _addProjectPressed = (e) => {
        const modal = projectModal();
        modal.render();
    };

    const _editButtonPressed = (e) => {
        e.stopPropagation();

        const index = e.target.parentNode.dataset.index;
        const project = listController.getList(index);

        const modal = projectModal(project);
        modal.render();
    }

    const _deleteButtonPressed = (e) => {
        e.stopPropagation();

        const index = e.target.parentNode.dataset.index;
        listController.removeList(index);

        const LIST_DELETED = 'list has been deleted';
        PubSub.publish(LIST_DELETED, index);

        _removeProject(index);
    }

    const _updateProject = index => {
        const titleDiv = document.querySelector(`.project[data-index='${index}']>.title`);
        titleDiv.textContent = listController.getList(index).getTitle();
    }

    const _removeProject = index => {
        const project = document.querySelector(`.project[data-index='${index}']`);
        project.remove();

        const projectSection = document.querySelector('.projects-div');
        projectSection.textContent = '';
        listController.getListAll().slice(1).forEach(list => _renderNewProject(list));
    }

    const _registerEventListeners = () => {
        //  Home item listeners
        const homeItems = document.querySelectorAll('.home-section .all-tasks');
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
        const LIST_TITLE_UPDATE = 'list title updated';
        
        PubSub.subscribe(NEW_LIST, (msg, data) => _renderNewProject(data));
        PubSub.subscribe(LIST_TITLE_UPDATE, (msg, data) => _updateProject(data));
    }


    return {
        render,
    }
})();

export default sidebarController;