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

it's similar to the [jquery pagination](http://mricle.com/JqueryPagination/Demo), but not perfect。

### Field

```
<span class="show" v-for="item in list">{{item}}</span>
<button type="button" @click="reset">reset</button>
<pagination :page-data.sync="list" url="/api/getData" name="first"></pagination>

```

### Event

At present uses the callback function to handle the data returned.

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