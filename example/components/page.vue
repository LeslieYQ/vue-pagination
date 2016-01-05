<template>
	<pagination></pagination>
</template>

<script>
	 export default{
	 	events:{
	        'pagination-success' : function(res){
	            console.log(res);
	        },
	        'pagination-error': function(err){
	        	console.log(err)
	        }
	    },
	 }
</script>