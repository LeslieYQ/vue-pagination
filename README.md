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
        url: '/api/getData',
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
<pagination></pagination>
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
	 	events:{
	        'pagination-success' : function(res){
	            console.log(res);
	            this.list = res.data.data;
	        },
	        'pagination-error': function(err){
	        	console.log(err)
	        }
	    },
	 }
```

### Todo

* Add methods(reset, restart, setOptions ...)




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