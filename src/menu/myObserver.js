export class ObserverItem {

    constructor({id, element, idRoot, elementMenu, name,tag}) {
        this.id = id;
        this.element = element;
        this.idRoot = idRoot ?? "superRoot"
        this.elementMenu = elementMenu;
        this.name = name;
        this.tag=tag;


    }
}

export class MyObserver {
    constructor(selectColor) {
        this.selectColor = selectColor
        this.root = undefined;
        this.listItem = []
        this.lastActionMoveId = undefined;
        this.lastActionAddId = undefined;
        console.log('*************init**********')
    }

    Add(observerItem) {
        if (this.lastActionAddId !== observerItem.id) {
            this._innerAdd(observerItem);
            this.lastActionAddId = observerItem.id;
        }
    }

    _innerAdd(observerItem) {
        if (this._hasList(observerItem) === false) {

            if (observerItem.idRoot === "superRoot") {
                if(this.root!==undefined){
                    this._innerClearState();
                }
                this.root = observerItem.id;
            }
            this.listItem.push(observerItem)
            observerItem.elementMenu.style.background = this.selectColor
        }
    }

    _innerValue(o) {
        o.element.style.visibility = 'hidden';
        o.elementMenu.style.background = '';
    }

    ClickSelect(tag, funClick) {
        this.listItem.forEach(a => {
            this._innerValue(a)
        })
        this._innerClearState()
        if (funClick) {
            funClick(tag)
        }
    }

    _innerClearState() {
        this.root=undefined
        this.listItem.length = 0;
        this.lastActionMoveId = undefined;
        this.lastActionAddId = undefined;
    }

    _hasList(item) {
        let res = false;
        this.listItem.forEach(a => {
            if (a.id === item.id) {
                res = true;
            }
        })
        return res;
    }
    MoveMenu(observerItem) {

        if (this.lastActionMoveId === observerItem.id) return;
        const tempListRoot = [];
        let b = false;
        this.listItem.forEach((a) => {
            if (b === false) {
                if (a.idRoot !== observerItem.idRoot) {
                    tempListRoot.push(a)
                } else {
                    b = true;
                }
            }
        })

        this.listItem.forEach(a => {
            this._innerValue(a)
        })

        this._innerClearState()
        tempListRoot.forEach(e => {
            this._innerAdd(e);
        })
        this.lastActionMoveId = observerItem.id;

    }
    clearClick(){
        this.listItem.forEach(a => {
            this._innerValue(a)
        })

        this._innerClearState()
    }
}




