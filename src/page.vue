<style lang="stylus">
	.lj-pagination
		font-size 12px
		text-align center
		.lj-ibfo,.lj-jump,.lj-page
			float left
		.lj-page
			margin 0
			li
				list-style none
				border 1px solid #e6e6e6
				background #f8f8f8
				margin-right 10px
				float left
				&.active
					color red
				span
					height 18px
					line-height 18px
					padding 0 5px
					display inline-block
					cursor pointer

</style>
<template>
	<div class="lj-pagination">
		<div class="lj-info" v-if="showInfo"></div>
		<div class="lj-jump" v-if="showJump">
			<input type="text" v-model="pageJump"/>
			<span>搜索</span>
		</div>
		<ul class="lj-page" v-if="showList">
			<li @click="first" v-show="pageStart != 1"><span>首页</span></li>
			<li @click="prev" v-show="pageStart != 1"><span>上一页</span></li>
			<li :class="{'active': el == pageStart}" @click="pagePath(el)" v-for="el in pageList"><span>{{el}}</span></li>
			<li @click="next" v-show="pageStart != pageLimit.max"><span>下一页</span></li>
			<li @click="last" v-show="pageStart != pageLimit.max"><span>尾页</span></li>
		</ul>
	</div>
</template>
<script>
	let options = {
		pageSize : 10,
		remote : {
			pageIndexName : 'pageIndex',
			pageSizeName : 'pageSize',
			params : {},
			url : '',
			totalName: 'total',
			offset: 0
		},
		pageSizeItems : [5,10,15,20],
		showInfo : false,
		showJump : false,
		listNumber: 7
	}

	function getData(index, size, page){
		let params = {
			[options.remote.pageIndexName] : index + options.remote.offset,
			[options.remote.pageSizeName]: size
		};
		Object.assign(params, options.remote.params);
		let ajax = this.$ajax || this.$http;
		ajax.get(options.remote.url, params).then(function(res){
			let resData = res.data;
			page.pageData = resData[options.remote.dataKey]
			page.pageLimit.total = resData[options.remote.totalName];
			if(page.pageLimit.total% options.pageSize == 0 ){
				page.pageLimit.max = Math.floor(page.pageLimit.total/ options.pageSize);
			}else{
				page.pageLimit.max = Math.floor(page.pageLimit.total/ options.pageSize + 1 );
			}
			
			pageListInit(index, page);
		},function(error){
			console.log(error);
		})
	}
	function pageListInit (now, page){
		let arr = [];
		for(let i =1; i <= page.pageLimit.max; i++){
			arr.push(i)
		}
		if(now < options.listNumber){
			page.pageList = arr.slice(0, 9);
			
		}else if(now > page.pageLimit.max - options.listNumber +1){
			page.pageList = arr.slice(- 9);
		}else{
			let start = now - 1 - Math.floor(options.listNumber/2);
			page.pageList = arr.slice(start, start + options.listNumber);
		}
	}
	export default{
		data () {
			return {
				showJump : false,
				showInfo: false,
				pageJump: '',
				pageList: [1],
				pageStart: 1,
				showList: true,
				pageLimit : {
					min: 1,
					max: 10,
					total: 1
				}
			}
		},
		ready (){
			Object.assign(options, this.$ajaxOptions);
			getData(1 ,10, this);
		},
		methods: {
			pagePath (page){
				this.pageStart = page;
				getData(this.pageStart,options.pageSize, this.$ajax, this);
			},
			first (){
				this.pageStart = 1;
			},
			last () {
				this.pageStart = page.max
			},
			prev (){
				this.pageStart > page.pageLimit.min ? this.pageStart --: this.pageStart = 1;
			},
			next (){
				this.pageStart < page.pageLimit.max ? this.pageStart ++ : this.pageStart = page.max;
			}
		}
	}
</script>