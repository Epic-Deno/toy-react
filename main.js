/*
 * @Description: 主函数
 * @Purpose: Powered By Fantastic Artwork Vue.js @ Evan You.
 * @Version: 2.6.1
 * @Author: PONY ZHANG
 * @Date: 2021-03-08 13:05:18
 * @LastEditors: PONY ZHANG
 * @LastEditTime: 2021-03-10 00:05:18
 * @motto: 「あなたに逢えなくなって、錆びた時計と泣いたけど…」
 * @topic: # Carry Your World #
 * @Github: Epic-Deno
 * @Blogs: https://epic-deno.github.io/deno.github.io/
 * @Pony: http://scorpionz.gitee.io/pony-zhang/
 * @Juejin: https://juejin.im/user/1151943917713623
 * @Zhihu: https://www.zhihu.com/people/zhang-zhen-36-44
 */
import { createElement, render, Component } from './toy-react'

class MyComponent extends Component {
   render() {
       return <div>
           <h1>my component</h1>
           { this.children }
       </div>
   }
}



render(<MyComponent id="a" class="b"> 
        <div>abc</div>
        <div></div>
        <div></div>
</MyComponent>, document.body);