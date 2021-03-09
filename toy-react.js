/*
 * @Description: toy-react
 * @Purpose: Powered By Fantastic Artwork Vue.js @ Evan You.
 * @Version: 2.6.1
 * @Author: PONY ZHANG
 * @Date: 2021-03-09 23:42:51
 * @LastEditors: PONY ZHANG
 * @LastEditTime: 2021-03-10 00:12:04
 * @motto: 「あなたに逢えなくなって、錆びた時計と泣いたけど…」
 * @topic: # Carry Your World #
 * @Github: Epic-Deno
 * @Blogs: https://epic-deno.github.io/deno.github.io/
 * @Pony: http://scorpionz.gitee.io/pony-zhang/
 * @Juejin: https://juejin.im/user/1151943917713623
 * @Zhihu: https://www.zhihu.com/people/zhang-zhen-36-44
 */

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(component) {
        this.root.appendChild(component.root)
    }
}

class TextWrapper {
    constructor(context) {
        this.root = document.createTextNode(context)
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

    get root() {
        if(!this._root) {
            this._root = this.render().root;
        } 

        return this._root;
    }
}

export function createElement(type, attributes, ...children) {
    let e;
    if(typeof type === "string") {
        e = new ElementWrapper(type);
    } else  {
        e = new type;
    }
    
    for(let p in attributes) {
        e.setAttribute(p, attributes[p]);
    }
    const insertChildren = (children) => {
        for(let child of children) {
            if(typeof child === 'string') {
                child = new TextWrapper(child) //文本转成text节点
            }
            if((typeof child === "object") && (child instanceof Array)) {
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
    parentElement.appendChild(component.root)
}