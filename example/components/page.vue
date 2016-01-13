<template>
	<div style="margin: 50px">
		<p>返回数据显示</p>
		<span class="show" v-for="item in list">{{item}}</span>
	</div>
	<button type="button" @click="reset">reset</button>
	<pagination></pagination>
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
	 			list:[1,2,3]
	 		}
	 	},
	 	methods:{
	 		reset(){
	 			this.$page.restart();
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
</script>