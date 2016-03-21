/**
 * 
 * @authors yuqiu (yuqiu@luojilab.com)
 * @date    2015-11-25 11:21:04
 * @version $Id$
 */

import Vue from 'vue'
import Resource from 'vue-resource'
import Pagination from '../src/main.js'
import Page from './components/page.vue'
Vue.use(Pagination);
Vue.use(Resource);

let page = new Pagination({
    pageSize: 10,
    remote: {
        pageIndexName: 'pageIndex',
        pageSizeName: 'pageSize',
        params: {
            query: 'test'
        },
        url: '',
        totalName: 'total',
        offset: -1,
        dataKey: 'data'
    }
});

//page.init();
new Vue({
    el: 'body',
    data: {
        pageListData: []
    },
   components:{
    page: Page
   },
   ready(){
    //console.log(this)
   },
    methods: {
        loading () {
            this.pageListData = [1,2]
        }
    }
});

