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

        homeList.appendChild(_createNavItem('All Tasks'));
        homeList.appendChild(_createNavItem('Today'));
        homeList.appendChild(_createNavItem('Next 7 Days'));

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
        projects.classList.add('projects');
        projectSection.appendChild(projects);

        //  New Project Button
        const button = document.createElement('button');
        button.classList.add('add-project');
        button.textContent = 'Add Project' 
        projectSection.appendChild(button);

    }

    const _createNavItem = (text) => {
        const item = document.createElement('li');
        const title = document.createElement('div');

        title.textContent = text;
        item.appendChild(title);

        return item;
    }

    return {
        render,
    }
})();

export default sidebarController;