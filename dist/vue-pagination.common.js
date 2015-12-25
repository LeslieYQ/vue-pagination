'use strict';

function __$styleInject(css) {
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}

var babelHelpers = {};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var optionsDefault = {
	pageSize: 10,
	remote: {
		pageIndexName: 'pageIndex',
		pageSizeName: 'pageSize',
		params: {},
		url: '',
		totalName: 'total',
		offset: 0
	},
	pageSizeItems: [5, 10, 15, 20],
	showInfo: false,
	showJump: false,
	listNumber: 7
};

function getData(index, size, page) {
	var _params;

	var params = (_params = {}, babelHelpers.defineProperty(_params, optionsDefault.remote.pageIndexName, index + optionsDefault.remote.offset), babelHelpers.defineProperty(_params, optionsDefault.remote.pageSizeName, size), _params);
	Object.assign(params, optionsDefault.remote.params);
	var ajax = page.$ajax || page.$http;
	ajax.get(optionsDefault.remote.url, params).then(function (res) {
		var resData = res.data;
		page.pageData = resData[optionsDefault.remote.dataKey];
		page.pageLimit.total = resData[optionsDefault.remote.totalName];
		if (page.pageLimit.total % optionsDefault.pageSize == 0) {
			page.pageLimit.max = Math.floor(page.pageLimit.total / optionsDefault.pageSize);
		} else {
			page.pageLimit.max = Math.floor(page.pageLimit.total / optionsDefault.pageSize + 1);
		}

		pageListInit(index, page);
	}, function (error) {
		console.log(error);
	});
};

function pageListInit(now, page) {
	var arr = [];
	for (var i = 1; i <= page.pageLimit.max; i++) {
		arr.push(i);
	}
	if (now < optionsDefault.listNumber) {
		page.pageList = arr.slice(0, 9);
	} else if (now > page.pageLimit.max - optionsDefault.listNumber + 1) {
		page.pageList = arr.slice(-9);
	} else {
		var start = now - 1 - Math.floor(optionsDefault.listNumber / 2);
		page.pageList = arr.slice(start, start + optionsDefault.listNumber);
	}
};

var Page = {
	replace: true,
	inherit: false,
	template: '<div class="lj-pagination"><div class="lj-info" v-if="showInfo"></div><div class="lj-jump" v-if="showJump"><input type="text" v-model="pageJump"/><span>搜索</span></div><ul class="lj-page" v-if="showList"><li @click="first" v-show="pageStart != 1"><span>首页</span></li><li @click="prev" v-show="pageStart != 1"><span>上一页</span></li><li :class="{\'active\': el == pageStart}" @click="pagePath(el)" v-for="el in pageList"><span>{{el}}</span></li><li @click="next" v-show="pageStart != pageLimit.max"><span>下一页</span></li><li @click="last" v-show="pageStart != pageLimit.max"><span>尾页</span></li></ul></div>',
	data: function data() {
		return {
			showJump: false,
			showInfo: false,
			pageJump: '',
			pageList: [1],
			pageStart: 1,
			showList: true,
			pageLimit: {
				min: 1,
				max: 10,
				total: 1
			}
		};
	},
	ready: function ready() {
		console.log(this.$ajaxOptionsDefault);
		Object.assign(optionsDefault, this.$ajaxOptionsDefault);
		getData(1, 10, this);
	},
	methods: {
		pagePath: function pagePath(page) {
			this.pageStart = page;
			getData(this.pageStart, optionsDefault.pageSize, this);
		},
		first: function first() {
			this.pageStart = 1;
		},
		last: function last() {
			this.pageStart = this.pageLimit.max;
		},
		prev: function prev() {
			this.pageStart > this.pageLimit.min ? this.pageStart-- : this.pageStart = 1;
		},
		next: function next() {
			this.pageStart < this.pageLimit.max ? this.pageStart++ : this.pageStart = this.max;
		}
	}
};

__$styleInject(".lj-pagination{\n\tfont-size: 12px;\n\ttext-align: center;\n}\n.lj-pagination .lj-ibfo,.lj-pagination .lj-jump,.lj-pagination .lj-page{\n\tfloat: left;\n}\n.lj-pagination .lj-page{\n\tmargin: 0;\n}\n.lj-pagination .lj-page li{\n\tlist-style: none;\n\tborder: 1px solid #e6e6e6;\n\tbackground: #f8f8f8;\n\tmargin-right: 10px;\n\tfloat: left;\n}\n.lj-pagination .lj-page li.active{\n\tcolor: red;\n}\n.lj-pagination .lj-page li span{\n\theight: 18px;\n\tline-height: 18px;\n\tpadding: 0 5px;\n\tdisplay: inline-block;\n\tcursor: pointer;\n}\n");

var Vue = undefined;

var Pagination = (function () {
	function Pagination() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$pageSize = _ref.pageSize;
		var pageSize = _ref$pageSize === undefined ? 10 : _ref$pageSize;
		var _ref$remote = _ref.remote;
		var remote = _ref$remote === undefined ? {
			pageIndexName: 'pageIndex',
			pageSizeName: 'pageSize',
			params: {},
			url: '',
			totalName: 'total',
			offset: 0
		} : _ref$remote;
		var _ref$pageSizeItems = _ref.pageSizeItems;
		var pageSizeItems = _ref$pageSizeItems === undefined ? [5, 10, 15, 20] : _ref$pageSizeItems;
		var _ref$showInfo = _ref.showInfo;
		var showInfo = _ref$showInfo === undefined ? false : _ref$showInfo;
		var _ref$showJump = _ref.showJump;
		var showJump = _ref$showJump === undefined ? false : _ref$showJump;
		babelHelpers.classCallCheck(this, Pagination);

		this._options = {
			pageSize: pageSize,
			remote: remote,
			pageSizeItems: pageSizeItems,
			showJump: showJump,
			showInfo: showInfo
		};
	}

	babelHelpers.createClass(Pagination, [{
		key: 'init',
		value: function init() {
			Vue.prototype.$ajaxOptionsDefault = this._options;
			if (typeof window !== 'undefined' && window.document) {
				//window.document.head.append();
			}
			Vue.component('pagination', Vue.extend(Page));
		}
	}]);
	return Pagination;
})();

Pagination.install = function (externalVue) {
	Vue = externalVue;
	if (typeof window !== 'undefined' && window.jQuery) {
		Vue.ajax = jQuery;
		Vue.prototype.$ajax = jQuery;
	}
};

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Pagination);
}

module.exports = Pagination;