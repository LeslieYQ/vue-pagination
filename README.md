[中文](./chinese.md)

# vue-pagination

**Compatibility Note:** `vue-pagination` requires Vue.js 1.0.0+ 


### Introduction

`vue-pagination` is the pagination for [Vue.js](http://vuejs.org). It imitate [jquery pagination](http://mricle.com/JqueryPagination/Demo) with Vue.js.


### Configuration

```
import Vue from 'vue'
import Resource from 'vue-resource'
import Pagination from 'vue-pagination'

Vue.use(Pagination);
```

### initialization

```
let page = new Pagination({
	pageSize: 10,
    remote: {
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

it's similar to the [jquery pagination](http://mricle.com/JqueryPagination/Demo), but not perfect。

### Field

```
<span class="show" v-for="item in list">{{item}}</span>
<button type="button" @click="reset">reset</button>
<pagination :page-data.sync="list" url="/api/getData" name="first"></pagination>

```

### Event


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

### Methods

#### restart

#####Arguments

* name: String | number

The name can be either a String or an Object.

If a String, it's pagination's prop.

If a number, it's pagination's order.

````
<pagination :page-data.sync="list" url="/api/getData" name="first"></pagination>
````


#### reset

##### 参数

* options: Object

* name: String | number

This's replace not extend, means that pagination will use new options you give;

options like this:

````
{
	pageSize: 10,
    remote: {
        pageIndexName: 'pageIndex',
        pageSizeName: 'pageSize',
        params: {},
        url: '', //
        totalName: 'total',
        offset: -1,
        dataKey: 'data'
    }
}
````

name  is alias page component，like 'first', 'sord'

````
<pagination :page-data.sync="list" url="/api/getData" name="first"></pagination>
````


#### setParams

##### 参数

* params: Object

* name: String | number

注意这里是replace This's replace not extend, means that pagination will use new options's remote params you give;

params 

````
{
	type: 1
}
````

name is  alias page component，like 'first', 'sord'
````
<pagination :page-data.sync="list" url="/api/getData" name="first"></pagination>
````


### Todo

* Add methods(reset, setOptions ...)




### Development Setup

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