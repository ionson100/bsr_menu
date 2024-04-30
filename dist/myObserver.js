"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObserverItem = exports.InstanceHub = void 0;
class ObserverItem {
  constructor(_ref) {
    let {
      id,
      element,
      idRoot,
      elementMenu,
      name,
      tag
    } = _ref;
    this.id = id;
    this.element = element;
    this.idRoot = idRoot;
    this.elementMenu = elementMenu;
    this.name = name;
    this.tag = tag;
  }
}
exports.ObserverItem = ObserverItem;
class MyObserver {
  constructor(classRoot, classItem) {
    this.root = undefined;
    this.listItem = [];
    this.lastActionMoveId = undefined;
    this.lastActionAddId = undefined;
    this.classRoot = classRoot;
    this.classItem = classItem;
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
        if (this.root !== undefined) {
          this._innerClearState();
        }
        if (this.classRoot) {
          observerItem.elementMenu.classList.add(this.classRoot);
        }
      } else {
        if (this.classItem) {
          observerItem.elementMenu.classList.add(this.classItem);
        }
      }
      this.listItem.push(observerItem);
    }
  }
  _innerValue(o) {
    if (this.classRoot) {
      o.elementMenu.classList.remove(this.classRoot);
    }
    if (this.classItem) {
      o.elementMenu.classList.remove(this.classItem);
    }
    o.element.style.visibility = 'hidden';
  }
  ClickSelect(tag, funClick) {
    this.listItem.forEach(a => {
      this._innerValue(a);
    });
    this._innerClearState();
    if (funClick) {
      funClick(tag);
    }
  }
  _innerClearState() {
    this.root = undefined;
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
    });
    return res;
  }
  MoveMenu(observerItem) {
    if (this.lastActionMoveId === observerItem.id) return;
    const tempListRoot = [];
    let b = false;
    this.listItem.forEach(a => {
      if (b === false) {
        if (a.idRoot !== observerItem.idRoot) {
          tempListRoot.push(a);
        } else {
          b = true;
        }
      }
    });
    this.listItem.forEach(a => {
      this._innerValue(a);
    });
    this._innerClearState();
    tempListRoot.forEach(e => {
      this._innerAdd(e);
    });
    this.lastActionMoveId = observerItem.id;
  }
  clearClick(callback) {
    this.listItem.forEach(a => {
      this._innerValue(a);
    });
    this._innerClearState();
    if (callback) {
      callback();
    }
  }
}
const InstanceHub = exports.InstanceHub = new MyObserver('root-123-selected', 'item-123-selected');