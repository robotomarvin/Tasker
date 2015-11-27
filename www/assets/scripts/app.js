var time = 300;
var left_done = function(){
	$('.page-right').css("display", "none");
	$('.page-middle').css("display", "none");
}
var middle_done = function(){
	$('.page-left').css("display", "none");
	$('.page-right').css("display", "none");
}
var right_done = function(){
	$('.page-left').css("display", "none");
	$('.page-middle').css("display", "none");
}
var show_left = function(){
	$('.page-left').css("display", "block");
	$('.page-right').css("display", "block");
	$('.page-middle').css("display", "block");
	$('.page-left').animate({
    	left: "0"
  	}, time);
	$('.page-middle').animate({
    	left: "100%"
  	}, time);
	$('.page-right').animate({
    	left: "200%"
  	}, time, left_done);
	$('.page-left .header').animate({
    	left: "0"
  	}, time);
	$('.page-middle .header').animate({
    	left: "100%"
  	}, time);
	$('.page-right .header').animate({
    	left: "200%"
  	}, time);
}
var show_middle = function(){
	$('.page-left').css("display", "block");
	$('.page-right').css("display", "block");
	$('.page-middle').css("display", "block");
	$('.page-left').animate({
    	left: "-100%"
  	}, time);
	$('.page-middle').animate({
    	left: "0"
  	}, time);
	$('.page-right').animate({
    	left: "100%"
  	}, time, middle_done);
	$('.page-left .header').animate({
    	left: "-100%"
  	}, time);
	$('.page-middle .header').animate({
    	left: "0"
  	}, time);
	$('.page-right .header').animate({
    	left: "100%"
  	}, time);
}
var show_right = function(){
	$('.page-left').css("display", "block");
	$('.page-right').css("display", "block");
	$('.page-middle').css("display", "block");
	$('.page-left').animate({
    	left: "-200%"
  	}, time);
	$('.page-middle').animate({
    	left: "-100%"
  	}, time);
	$('.page-right').animate({
    	left: "0"
  	}, time, right_done);
	$('.page-left .header').animate({
    	left: "-200%"
  	}, time);
	$('.page-middle .header').animate({
    	left: "-100%"
  	}, time);
	$('.page-right .header').animate({
    	left: "0"
  	}, time);
}
$(document).ready(function(){
	middle_done();
	if($('.page-left').length > 0){
		var left = new Hammer($('.page-left')[0]);
		left.on( "swipeleft", show_middle );
	}
	if($('.page-middle').length > 0){
		var middle = new Hammer($('.page-middle')[0]);
		middle.on( "swipeleft", show_right );
		middle.on( "swiperight", show_left );
	}
	if($('.page-right').length > 0){
		var right = new Hammer($('.page-right')[0]);
		right.on( "swiperight", show_middle );
	}
	$('.page-show-middle').click(function(){
		show_middle();
	});
	$('.page-show-left').click(function(){
		show_left();
	});
	$('.page-show-right').click(function(){
		show_right();
	});
	$('.page-hide-right').click(function(){
		$(this).closest('.page').removeClass('page-right-show');
		$('.over').hide();
	});
	$('.show-filter').click(function(e){
		$('.page-right').addClass('page-right-show');
		$('.over').show();
		e.stopPropagation();
	});
	$('.over').click(function(){
		if($('.page-right').hasClass('page-right-show')){
			$('.page-right').removeClass('page-right-show');
		}
		$('.over').hide();
	});
});