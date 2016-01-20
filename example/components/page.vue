<template>
	<div style="margin: 50px">
		<p>返回数据显示</p>
		<span class="show" v-for="item in list">{{item}}</span>
	</div>
	<button type="button" @click="reset">reset</button>
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
	 		reset(){
	 			this.$page.restart('first');
	 		}
	 	}
	 }
</script>