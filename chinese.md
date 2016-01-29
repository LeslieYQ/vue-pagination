# vue-pagination

**环境依赖** `vue-pagination` 必须在 Vue.js 1.0.0+ 

### 简介

`vue-pagination` 是 [Vue.js](http://vuejs.org)的一个分页插件。基本仿照 [jquery pagination](http://mricle.com/JqueryPagination/Demo)来写的，功能上类似，目前是基本版本，还需要优化提升。

### 配置


```
import Vue from 'vue'
import Resource from 'vue-resource'
import Pagination from 'vue-pagination'

Vue.use(Pagination);
```

### 初始化使用

```
let page = new Pagination({
    remote: {
        pageSize: 10,
        pageIndexName: 'pageIndex',
        pageSizeName: 'pageSize',
        params: {},
        url: '', //
        totalName: 'total',
        offset: -1,
        dataKey: 'data'
    }
});

page.init();

```

参数的内容类似[jquery pagination](http://mricle.com/JqueryPagination/Demo)，但并不全面，一步一步添加准备。


### 实例使用

```
<span class="show" v-for="item in list">{{item}}</span>
<button type="button" @click="reset">reset</button>
<pagination :page-data.sync="list" url="/api/getData" name="first"></pagination>

```

### 事件使用

```
export default{
	 	data (){
	 		return{
	 			list:[1,2,3]
	 		}
	 	},
	 	methods:{
	 		reset(){
	 			this.$page.restart('first');
	 		}
	 	}
	 }
```

### Api方法

#### restart

##### 参数

* name: String | number

这个参数 name可以是一个字符串或者数字，为了在一个页面区分几个插件的实例。

如果是字符串，表示的是 pagination的prop属性， 例如 'first' ，上面的 name值。

如果是数字，表示的是pagination的顺序。

不传默认使用 0。



### 计划

* 添加其他方法（setOptions等等）




### 开发环境设置以及样例查看

``` bash
# install deps
npm install

# build dist files
npm run build

# serve example app at localhost:9090/example/index.html
npm run example

```

### License

[MIT](http://opensource.org/licenses/MIT)