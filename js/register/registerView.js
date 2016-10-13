define(function(){
	var $ = Dom7;
	
	function render(params){
		bindEvents(params.bindings);
	};

	function bindEvents(bindings){
		for(var i in bindings){
			$(bindings[i].element).on(bindings[i].event,bindings[i].handler)
		}
	};
	
	return{
		render:render
	};
});
