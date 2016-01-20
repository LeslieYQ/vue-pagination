import Page from './page.js'
import './page.css'

let Vue ;
let page ;

class Pagination {
	constructor ({
		pageSize = 10,
		remote = {
			pageIndexName : 'pageIndex',
			pageSizeName : 'pageSize',
			params : {},
			url :  '',
			totalName: 'total',
			offset: 0
		},
		pageSizeItems = [5,10,15,20],
		showInfo = false,
		showJump = false
	} = {}) {
		this._options = {
			pageSize: pageSize,
			remote: remote,
			pageSizeItems: pageSizeItems,
			showJump: showJump,
			showInfo: showInfo
		};
	}

	init (){
		Vue.prototype.$ajaxOptionsDefault = this._options;
		Vue.prototype.$page = this;
		if (typeof window !== 'undefined' && window.document) {
  			//require(__dirname + '/page.css')
		}
		
		Vue.component('pagination', Vue.extend(Page.pagination))
	}

	restart(name = 0){
		Page.restart(name);
	}
}

Pagination.install = function (externalVue){
	Vue = externalVue;
	if (typeof window !== 'undefined' && window.jQuery) {
		Vue.ajax = jQuery;
		Vue.prototype.$ajax = jQuery;
	}	
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Pagination)
}

export default Pagination