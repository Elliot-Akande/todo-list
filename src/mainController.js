const mainController = (() => {
    const contentDiv = document.querySelector('.content');
    
    const render = () => {
        const main = document.createElement('main');
        contentDiv.appendChild(main);
    }

    return {
        render,
    }
})();

export default mainController;