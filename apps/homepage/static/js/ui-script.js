$(function (){
	layerPopup();
	toggleContent();
	tabContent();
	accordion();
	dropDown();
	
	gnb();
	windowResize();

	// admin
	nav();
});

var popupOpenFunc = function (target){
	$('[' + target + ']').addClass('active');
	$('[' + target + ']').attr('tabindex',0).focus();
	// $('body').css('overflow','hidden');
}
var popupCloseFunc = function (target){
	$('[' + target + ']').removeClass('active');
	$('[' + target + ']').removeAttr('tabindex');
	// $('body').css('overflow','');
}

var layerPopup = function (){
	// open
	var openTrigger = $('[data-layer-href]');
	openTrigger.on('click', function (){
		var layerHref = $(this).attr('data-layer-href');
		if ($('[' + layerHref + ']').hasClass('active')){
			$('[' + layerHref + ']').removeClass('active')
			// $('body').css('overflow','');
		} else {
			$('[' + layerHref + ']').addClass('active');
			$('[' + layerHref + ']').attr('tabindex',0).focus();
			// $('body').css('overflow','hidden');
		}
		
	})
	// close
	var closeTrigger = $('[data-layer-close]');
	closeTrigger.on('click', function (e){
		// e.preventDefault();
		$(this).closest('.layer-popup').removeClass('active');
		$(this).closest('.layer-popup').removeAttr('tabindex');
		// $('body').css('overflow','');
	})
}


var toggleContent = function (){
	var $el = $('.toggleCont');
	var $trigger = $el.find('.trigger,.btn-search-close');
	$trigger.on('click', function (){
		var par = $(this).closest('.toggleCont');
		if (par.hasClass('active')){
			par.removeClass('active');
		} else {
			par.siblings('.toggleCont').removeClass('active')
			par.addClass('active');
		}
	})
}

var tabContent = function (){
	// active
	var openTrigger = $('[data-tab-href]');
	openTrigger.on('click', function (){
		var tabHref = $(this).attr('data-tab-href');

		// tab list
		$(this).closest('li').siblings('li').removeClass('active');
		$(this).closest('li').addClass('active');

		// tab content
		$('[' + tabHref + ']').siblings('').removeClass('active')
		$('[' + tabHref + ']').addClass('active');
	})
}

var accordion = function (){
	var $el = $('.accordion-list');
	var openTrigger = $el.find('.acc-trigger');
	openTrigger.on('click', function (){
		var par = $(this).closest('li');
		if (par.length > 0){
			if (!par.hasClass('active')){
				par.siblings('').removeClass('active')
				par.siblings('').find('.acc-target').slideUp(150);
				par.addClass('active');
				par.find('.acc-target').slideDown(150);
			} else {
				par.removeClass('active');
				par.find('.acc-target').slideUp(150);
			}
		}
	})
	$el.each(function (){
		$el.find('>.active .acc-target').css('display','block');
	})

	var $el2 = $('.accordion-wrap');
	var opentrigger2 = $el2.find('.trigger button');
	opentrigger2.on('click', function (){
		var par = $(this).closest('.tbody');
		if (!par.hasClass('active')){
			par.siblings('').removeClass('active')
			par.siblings('').find('.target').slideUp(150);
			par.addClass('active');
			par.find('.target').slideDown(150);
		} else {
			par.removeClass('active');
			par.find('.target').slideUp(150);
		}
	})


}


// admin
var nav = function (){
	var $el = $('.navigation');
	$el.find('.dep01 > li > a').on('click', function (e){
		var par = $(this).closest('li');
		if(par.hasClass('length')) {
			e.preventDefault();
			if (par.hasClass('active')) {
				par.find('>ul').slideUp(150);
				par.removeClass('active');
			} else {
				if (par.hasClass('on')) {
					if (par.find('>ul').is(':visible')){
						par.find('>ul').slideUp(150);
					} else {
						par.find('>ul').slideDown(150);
						par.siblings('li').removeClass('active');
						par.siblings('li').find('>ul').slideUp(150);
					}
				} else {
					par.find('>ul').slideDown(150);
					par.siblings('li').removeClass('active');
					par.siblings('li').find('>ul').slideUp(150);
					par.addClass('active');
				}
			}
		}
	});
	
	$el.find('li').each(function (){
		if ($(this).find('>ul').length > 0) {
			$(this).addClass('length');
			$(this).find('>ul').hide(0, function (){
				$(this).removeAttr('style');
			});
		}
	})
}

var dropDown = function () {
	var $el  = $('.dropDown');
	//active
	$(document).on('click', '.dropDown >.trigger', function (){
		var par = $(this).closest('.dropDown');
		if (par.find('>.target').length){
			if (!par.hasClass('active')){
				par.addClass('active');
				par.find('>.target').slideDown(150);
			} else {
				par.removeClass('active')
				par.find('>.target').slideUp(150);
			}
		}
	});
	$(document).on('click', '.dropDown >.target a', function (){
		var textVal = $(this).text();
		var par = $(this).closest('.dropDown');
		par.find('.trigger').text(textVal);
		par.removeClass('active')
		par.find('>.target').slideUp(150);
	});
	

	$(document).on('click', '.dropDown-close', function (){
		var par = $(this).closest('.dropDown');
		par.removeClass('active')
		par.find('>.target').slideUp(150);
	});
	$(document).mouseup(function (e){
		if($el.has(e.target).length === 0){
			$el.removeClass('active');
			$el.find('.target').stop().slideUp(150);
		}
	});
}
var windowSize = '';
var desktop = '';
var mobile = '';
var windowResize = function (){
	$(window).resize(function (){
		windowSize = window.innerWidth;
		if (windowSize > 1239){
			desktop = true;
			mobile = false;
		} else {
			desktop = false;
			mobile = true;

		}
	}).resize();
}


var gnb = function (){
	var $el = $('#header');
	var $gnb = $('#gnb');
	var dep01 = $('#gnb .dep01');
	var dep02 = $('#gnb .dep02');
	var trigger = $('#gnb-trigger');

	//pc
	$gnb.on('mouseenter focusin', function (){
		if (trigger.is(':hidden')){
			$(this).addClass('active');
			$el.addClass('active');
			dep02.stop().slideDown(150, function (){
				$(this).attr('style', 'display:block;');
			});
		}
	})
	$gnb.on('mouseleave focusout', function (){
		if (trigger.is(':hidden')){
			$(this).removeClass('active');
			$el.removeClass('active');
			dep02.stop().slideUp(150, function (){
				$(this).attr('style', 'display:none;');
			});
			trigger.removeClass('active');
		}
	});

	//mobile
	dep01.find('>li').each(function (){
		if ($(this).find('.dep02').length){
			$(this).addClass('length');
			if ($(this).hasClass('active')) {
				windowSize = window.innerWidth;
				if (windowSize < 1239){
					$(this).find('.dep02').css('display','block');
				} else {
					$(this).find('.dep02').css('display','');

				}
			}
		}
	});

	$(window).resize(function (){
		dep01.find('>li').each(function (){
			if ($(this).find('.dep02').length){
				$(this).addClass('length');
				if ($(this).hasClass('active')) {
					windowSize = window.innerWidth;
					if (windowSize < 1239){
						$(this).find('.dep02').css('display','block');
					} else {
						$(this).find('.dep02').css('display','');
					}
				}
			}
		});
	}).resize();

	dep01.find('>li>a').on('click', function (e){
		var par = $(this).closest('li');
		if (par.hasClass('length')){
			if (trigger.is(':visible')){
				if (par.hasClass('active')){
					par.removeClass('active');
					par.find('.dep02').stop().slideUp(150, function (){
						$(this).attr('style', 'display:none;');
					});
				} else {
					par.siblings('li').removeClass('active');
					par.siblings('li').find('.dep02').slideUp(150, function (){
						$(this).attr('style', 'display:none;');
					});
					par.addClass('active');
					par.find('.dep02').stop().slideDown(150, function (){
						$(this).attr('style', 'display:block;');
					});
				}
			}
		}
	})


	trigger.on('click', function (){
		if ($(this).hasClass('active')) {
			$el.removeClass('active');
			$(this).removeClass('active');
		} else {
			$el.addClass('active');
			$(this).addClass('active');
		};
	});
}

/*** layerpopup focus out prevent ***/
$(document).ready(function() {
	var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable], video";

	// dropdown open 시 key 입력 event
	$('.layer-popup').keydown(function(event) {
		trapTabKey($(this), event);
	})


	//focusout prevent event
	function trapTabKey(obj, evt) {
		// if tab or shift-tab pressed
		if (evt.which == 9) {
			// get list of all children elements in given object
			var o = obj.find('*');
			// get list of focusable items
			var focusableItems;
			focusableItems = o.filter(focusableElementsString).filter(':visible')
			// get currently focused item
			var focusedItem;
			focusedItem = $(':focus');
			// get the number of focusable items
			var numberOfFocusableItems;
			numberOfFocusableItems = focusableItems.length
			// get the index of the currently focused item
			var focusedItemIndex;
			focusedItemIndex = focusableItems.index(focusedItem);
			if (evt.shiftKey) {
				//back tab
				// if focused on first item and user preses back-tab, go to the last focusable item
				if (focusedItemIndex == 0) {
					focusableItems.get(numberOfFocusableItems - 1).focus();
					evt.preventDefault();
				}
			} else {
				//forward tab
				// if focused on the last item and user preses tab, go to the first focusable item
				if (focusedItemIndex == numberOfFocusableItems - 1) {
					focusableItems.get(0).focus();
					evt.preventDefault();
				}
			}
		}
	}
	$('[datepicker]').datepicker();
});



