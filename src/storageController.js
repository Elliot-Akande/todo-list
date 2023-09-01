import PubSub from "pubsub-js";
import listController from "./listController";

const storageController = (() => {
    const init = () => {
        if (!localStorage.getItem('data')) {
            _initData();
        } else {
            _populateLists();
        }

        _registerSubscribers();
    }

    const _initData = () => {
        _setData([_emptyList('Inbox')]);
    }

    const _populateLists = () => {
        listController.populate(_getData());
    }

    const _emptyList = title => {
        return {
            'title': title,
            'items': [],
        }
    }

    const _getData = () => {
        return JSON.parse(localStorage.getItem('data'));
    }

    const _setData = data => {
        localStorage.setItem('data', JSON.stringify(data));
    }

    const _newList = list => {
        const data = _getData();
        data.push(_emptyList(list.getTitle()));
        _setData(data);
    }

    const _updateList = index => {
        const data = _getData();
        data[index].title = listController.getList(index).getTitle();
        _setData(data);
    }

    const _registerSubscribers = () => {
        const NEW_LIST = 'new list created';
        const LIST_TITLE_UPDATE = 'list title updated';

        PubSub.subscribe(NEW_LIST, (msg, list) => _newList(list));
        PubSub.subscribe(LIST_TITLE_UPDATE, (msg, index) => _updateList(index));
    }

    return {
        init,
    };
})();

export default storageController;