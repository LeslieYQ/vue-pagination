<template>
	<div style="margin: 50px">
		<p>返回数据显示</p>
		<span class="show" v-for="item in list">{{item}}</span>
	</div>
	<button type="button" @click="restart">restart</button>
	<button type="button" @click="setParams">set params</button>
	<button type="button" @click="reset">reset options</button>
	<pagination :page-data.sync="list" url="/api/getData" name="first"></pagination>
	<div style="margin: 50px">
		<p>返回数据显示</p>
		<span class="show" v-for="item in list2">{{item}}</span>
	</div>
	<pagination :page-data.sync="list2" url="/api/getData" name="second"></pagination>
</template>
<style>
	.show{
		padding: 5px 10px;
		border: 1px solid red
	}
</style>

<script>
	 export default{
	 	data (){
	 		return{
	 			list:[1,2,3],
	 			list2: []
	 		}
	 	},
	 	methods:{
	 		restart(){
	 			this.$page.restart('first');
	 		},
	 		setParams(){
	 			this.$page.setParams({
	 				change: 1
	 			}, 'first');
	 		},
	 		reset(){
	 			this.$page.reset({
	 				pageSize: 20,
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
			    }}, 'first');
	 		}
	 	}
	 }
</script>