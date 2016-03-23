/*!
 * vue-pagination v0.3.3
 * (c) 2016Leslie Yu qiu
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.VuePagination = factory();
}(this, function () { 'use strict';

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

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = function () {
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
    }();

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

    babelHelpers.extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    babelHelpers;

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
    var vueObj = { length: 0 };

    function getData(pageIndex) {
        var _params,
            _this = this;

        var params = (_params = {}, babelHelpers.defineProperty(_params, this.$optionsDefault.remote.pageIndexName, pageIndex + this.$optionsDefault.remote.offset), babelHelpers.defineProperty(_params, this.$optionsDefault.remote.pageSizeName, this.$optionsDefault.pageSize), _params);
        babelHelpers.extends(params, this.$optionsDefault.remote.params);
        var ajax = this.$ajax || this.$http;
        ajax.get(this.$optionsDefault.remote.url, params).then(function (res) {
            var resData = res.data;
            _this.pageData = _this.$optionsDefault.remote.dataKey ? resData[_this.$optionsDefault.remote.dataKey] : resData;
            _this.pageLimit.total = resData[_this.$optionsDefault.remote.totalName];
            if (_this.pageLimit.total % _this.$optionsDefault.pageSize == 0) {
                _this.pageLimit.max = Math.floor(_this.pageLimit.total / _this.$optionsDefault.pageSize) || 5;
            } else {
                _this.pageLimit.max = Math.floor(_this.pageLimit.total / _this.$optionsDefault.pageSize + 1) || 5;
            }
            pageListInit.call(_this, pageIndex);
        }, function (error) {
            console.error(error);
        });
    };

    function pageListInit(now) {
        var arr = [];
        for (var i = 1; i <= this.pageLimit.max; i++) {
            arr.push(i);
        }
        if (now < this.$optionsDefault.listNumber) {
            this.pageList = arr.slice(0, 9);
        } else if (now > this.pageLimit.max - optionsDefault.listNumber + 1) {
            this.pageList = arr.slice(-9);
        } else {
            var start = now - 1 - Math.floor(optionsDefault.listNumber / 2);
            this.pageList = arr.slice(start, start + optionsDefault.listNumber);
        }
    };

    var pagination = {
        replace: true,
        inherit: false,
        props: ['pageData', 'url', 'name'],
        template: '<div class="lj-pagination"><div class="lj-info" v-if="showInfo"></div><div class="lj-jump" v-if="showJump"><input type="text" v-model="pageJump"/><span>search</span></div>' + '<ul class="lj-page" v-if="showList"><li @click="first" v-show="pageStart != 1"><span>first</span></li><li @click="prev" v-show="pageStart != 1" class="button"><span>Prev</span></li><li :class="{\'active\': el == pageStart}" @click="pagePath(el)" v-for="el in pageList"><span>{{el}}</span></li>' + '<li @click="next" v-show="pageStart != pageLimit.max" class="button"><span>Next</span></li><li @click="last" v-show="pageStart != pageLimit.max"><span>Last</span></li></ul></div>',
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
            this.$optionsDefault = {};
            babelHelpers.extends(this.$optionsDefault, optionsDefault, this.$ajaxOptionsDefault);
            if (this.url) {
                this.$optionsDefault.remote.url = this.url;
            }
            if (this.name) {
                vueObj[this.name] = this;
                vueObj.length++;
            } else {
                vueObj[vueObj.length] = this;
                vueObj.length++;
            }
            getData.call(this, 1, 10);
        },

        methods: {
            pagePath: function pagePath(pageNumber) {
                this.pageStart = pageNumber;
                getData.call(this, this.pageStart);
            },
            first: function first() {
                this.pageStart = 1;
                getData.call(this, this.pageStart);
            },
            last: function last() {
                this.pageStart = this.pageLimit.max;
                getData.call(this, this.pageStart);
            },
            prev: function prev() {
                this.pageStart > this.pageLimit.min ? this.pageStart-- : this.pageStart = 1;
                getData.call(this, this.pageStart);
            },
            next: function next() {
                this.pageStart < this.pageLimit.max ? this.pageStart++ : this.pageStart = this.max;
                getData.call(this, this.pageStart, optionsDefault.pageSize);
            }
        }
    };

    var restart = function restart(name) {
        var pageInstance = vueObj[name];
        if (!pageInstance) {
            console.error('没有实例，检查你的参数,后面是所有实例集合', vueObj);
            return;
        }
        pageInstance.pageStart = 1;
        getData.call(pageInstance, pageInstance.pageStart);
    };

    var reset = function reset(options, name) {
        var pageInstance = vueObj[name];
        if (!pageInstance) {
            console.error('没有实例，检查你的参数,后面是所有实例集合', vueObj);
            return;
        }
        pageInstance.$optionsDefault = options;
        if (pageInstance.url) {
            pageInstance.$optionsDefault.remote.url = pageInstance.url;
        }
        pageInstance.pageStart = 1;
        getData.call(pageInstance, pageInstance.pageStart);
    };

    var setParams = function setParams(params, name) {
        var pageInstance = vueObj[name];
        if (!pageInstance) {
            console.error('没有实例，检查你的参数,后面是所有实例集合', vueObj);
            return;
        }
        pageInstance.$optionsDefault.remote.params = params;
        pageInstance.pageStart = 1;
        getData.call(pageInstance, pageInstance.pageStart);
    };

    var Page = {
        pagination: pagination,
        restart: restart,
        setParams: setParams,
        reset: reset
    };

    __$styleInject(".lj-pagination{\n\tmargin: 10px 0;\n\tcolor: #282F31;\n}\n\n.lj-page{\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 1px solid #e6e6e6;\n\tborder-radius: 3px;\n\tdisplay: inline-block;\n}\n\n.lj-page:after{\n\tcontent: \" \";\n\tdisplay: table;\n\tclear: both;\n}\n\n\n.lj-page li{\n\tfloat: left;\n\tborder-right: 1px solid #e6e6e6;\n\tdisplay: inline-block;\n\tcursor: pointer;\n}\n\n.lj-page li:last-of-type{\n\tborder-right: none;\n}\n\n.lj-page li:hover{\n\tbackground: #00cff5;\n\tcolor:  white;\n}\n\n.lj-page li.active{\n\tbackground: #00cff5;\n\tcolor:  white;\n}\n\n.lj-page li span{\n\tpadding: 1em;\n\tdisplay: inline-block;\n}");

    var Vue = undefined;

    var Pagination = function () {
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

    		Vue.prototype.$ajaxOptionsDefault = this._options;
    		Vue.prototype.$page = this;
    		Vue.component('pagination', Vue.extend(Page.pagination));
    	}

    	babelHelpers.createClass(Pagination, [{
    		key: 'restart',
    		value: function restart() {
    			var name = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    			Page.restart(name);
    		}
    	}, {
    		key: 'reset',
    		value: function reset(options) {
    			var name = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    			Page.reset(options, name);
    		}
    	}, {
    		key: 'setParams',
    		value: function setParams(params) {
    			var name = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    			Page.setParams(params, name);
    		}
    	}]);
    	return Pagination;
    }();

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

    return Pagination;

}));
//# sourceMappingURL=vue-pagination.js.map