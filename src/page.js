let optionsDefault = {
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
	let params = {
		[optionsDefault.remote.pageIndexName]: index + optionsDefault.remote.offset, [optionsDefault.remote.pageSizeName]: size
	};
	Object.assign(params, optionsDefault.remote.params);
	let ajax = page.$ajax || page.$http;
	ajax.get(optionsDefault.remote.url, params).then(function(res) {
		var resData = res.data;
		page.pageData = resData[optionsDefault.remote.dataKey]
		page.pageLimit.total = resData[optionsDefault.remote.totalName];
		if (page.pageLimit.total % optionsDefault.pageSize == 0) {
			page.pageLimit.max = Math.floor(page.pageLimit.total / optionsDefault.pageSize);
		} else {
			page.pageLimit.max = Math.floor(page.pageLimit.total / optionsDefault.pageSize + 1);
		}

		pageListInit(index, page);
	}, function(error) {
		console.log(error);
	})
};

function pageListInit(now, page) {
	let arr = [];
	for (let i = 1; i <= page.pageLimit.max; i++) {
		arr.push(i)
	}
	if (now < optionsDefault.listNumber) {
		page.pageList = arr.slice(0, 9);

	} else if (now > page.pageLimit.max - optionsDefault.listNumber + 1) {
		page.pageList = arr.slice(-9);
	} else {
		let start = now - 1 - Math.floor(optionsDefault.listNumber / 2);
		page.pageList = arr.slice(start, start + optionsDefault.listNumber);
	}
};

export default {
	replace: true,
  	inherit: false,
	template: '<div class="lj-pagination"><div class="lj-info" v-if="showInfo"></div><div class="lj-jump" v-if="showJump"><input type="text" v-model="pageJump"/><span>搜索</span></div><ul class="lj-page" v-if="showList"><li @click="first" v-show="pageStart != 1"><span>首页</span></li><li @click="prev" v-show="pageStart != 1"><span>上一页</span></li><li :class="{\'active\': el == pageStart}" @click="pagePath(el)" v-for="el in pageList"><span>{{el}}</span></li><li @click="next" v-show="pageStart != pageLimit.max"><span>下一页</span></li><li @click="last" v-show="pageStart != pageLimit.max"><span>尾页</span></li></ul></div>',
	data: function() {
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
		}
	},
	ready: function() {
		console.log(this.$ajaxOptionsDefault);
		Object.assign(optionsDefault, this.$ajaxOptionsDefault);
		getData(1, 10, this);
	},
	methods: {
		pagePath: function(page) {
			this.pageStart = page;
			getData(this.pageStart, optionsDefault.pageSize, this);
		},
		first: function() {
			this.pageStart = 1;
		},
		last: function() {
			this.pageStart = this.pageLimit.max
		},
		prev: function() {
			this.pageStart > this.pageLimit.min ? this.pageStart-- : this.pageStart = 1;
		},
		next: function() {
			this.pageStart < this.pageLimit.max ? this.pageStart++ : this.pageStart = this.max;
		}
	}
}