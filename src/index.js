/**
 * 
 * @authors yuqiu (yuqiu@luojilab.com)
 * @date    2015-12-22 16:50:03
 * @version $Id$
 */
import Page from './page.vue'
let Vue ;
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
		showJump = false,
		success = function(){

		}
	} = {}) {
		
		Vue.prototype.$ajaxOptions = {
			pageSize: pageSize,
			remote: remote,
			pageSizeItems: pageSizeItems,
			showJump: showJump,
			showInfo: showInfo,
			success: success
		};
	}
}

Pagination.install = function (externalVue){
	Vue = externalVue;
	let viewDef = {
		twoWay: true,
		bind () {
			let PageVue = Vue.extend(Page);
			let page = new PageVue({
				data: {
					pageData: this.vm[this.expression]
				}
			});
			let self =this;
			if (typeof window !== 'undefined' && window.jQuery) {
				Vue.ajax = jQuery;
				Vue.prototype.$ajax = jQuery;
			}
			page.$watch('pageData', function(val){
				self.set(val);
			})
			page.$mount(this.el);
		},
		update (value) {
			//console.log(this.twoWay);
		}
	}	

	externalVue.directive('page', viewDef)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Pagination)
}

export default Pagination