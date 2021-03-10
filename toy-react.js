/*
 * @Description: toy-react
 * @Purpose: Powered By Fantastic Artwork Vue.js @ Evan You.
 * @Version: 2.6.1
 * @Author: PONY ZHANG
 * @Date: 2021-03-09 23:42:51
 * @LastEditors: PONY ZHANG
 * @LastEditTime: 2021-03-10 23:48:42
 * @motto: 「あなたに逢えなくなって、錆びた時計と泣いたけど…」
 * @topic: # Carry Your World #
 * @Github: Epic-Deno
 * @Blogs: https://epic-deno.github.io/deno.github.io/
 * @Pony: http://scorpionz.gitee.io/pony-zhang/
 * @Juejin: https://juejin.im/user/1151943917713623
 * @Zhihu: https://www.zhihu.com/people/zhang-zhen-36-44
 */

const RENDER_TO_DOM = Symbol("render to dom")
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(component) {
        let range = document.createRange();
        range.setStart(this.root, this.root.childNodes.length);
        range.setEnd(this.root, this.root.childNodes.length);
        component[RENDER_TO_DOM](range);

    }

    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}

class TextWrapper {
    constructor(context) {
        this.root = document.createTextNode(context)
    }

    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }

}

export class Component {
    constructor(type) {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.children.push(component)
    }

    [RENDER_TO_DOM](range) {
        this.render()[RENDER_TO_DOM](range);
    }

    // get root() {
    //     if(!this._root) {
    //         this._root = this.render().root;
    //     } 

    //     return this._root;
    // }
}

export function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === "string") {
        e = new ElementWrapper(type);
    } else {
        e = new type;
    }

    for (let p in attributes) {
        e.setAttribute(p, attributes[p]);
    }
    const insertChildren = (children) => {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child) //文本转成text节点
            }
            if ((typeof child === "object") && (child instanceof Array)) {
                insertChildren(child)
            } else {
                e.appendChild(child);
            }

        }
    }
    insertChildren(children);

    return e;
}

export function render(component, parentElement) {
    // parentElement.appendChild(component.root);
    let range = document.createRange();
    range.setStart(parentElement, 0);
    range.setEnd(parentElement, parentElement.childNodes.length);
    range.deleteContents();
    component[RENDER_TO_DOM](range);
}