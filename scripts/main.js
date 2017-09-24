$(document).ready(function(){

	$html_body=$('html,body');
	var $window=$(window);
	var $skillName=$('.skill-name');
	var $lxNav_section=$('.lx-nav-section');
	var firstSectionHeight=$lxNav_section.eq(1).offset().top;
	var $hobbyBtn=$('.hobby-bookmark');
	var $hobbyImgBox= $('.hobby-image-box');
	var $hobbyImgClose = $('.hobby-img-close');

	var imgAddr = ['Leshan01.jpg','Leshan02.jpg','chongqing.jpg','fuzhou.jpg','xiamen.jpeg','kunming.jpg','qujing.jpeg','dali.jpeg','xian.jpg','qingdao1.jpg'];

	// -----------------------
	//响应式

	//职业技能 中间圆圈skill-name响应式
	// var width_skillName = $('.skill-content-item').width()* 0.1;
	// $('.skill-name').css({
	// 	'width': width_skillName,
	// 	'height': width_skillName,
	// 	'-ms-border-radius': width_skillName*0.5,
	// 	'-webkit-border-radius': width_skillName*0.5,
	// 	'-moz-border-radius': width_skillName*0.5,
	// 	'border-radius':  width_skillName*0.5
	//  });
	//------------------------

	// $('img').on("load",function(){
		
	// 	alert("laod finish");
	// });
	// $('img.img-first').load(function(){
		
	// 	alert("laod finish");
	// });


	//点击header上的按键 滑动到对应的Section
	var scrollToSection=function(){

		$lxNav_section=$('.lx-nav-section');
		$header_item=$('.header-item');
		//fixed导航栏的item
		$lxNav_Item=$('.lx-nav-item');
		//fixed导航栏
		$lxNav_wrap=$('.lx-nav-wrap');

		//根据点击顶部header导航栏得到对应的section
		var getTargetSectionByNav=function(data){
			var targetTop;
			$lxNav_section.each(function(){
				if ($(this).attr('data-lx-nav') == data) {					
					//需要定位top高度值
					targetTop=$(this).offset().top;
					console.log("top--"+targetTop);
				}
				
			});
			return targetTop;
		}

		//给header按钮绑定事件
		$header_item.click(function(e){
			var el=$(this);

			//取到点击按键的data-lx-nav自定义属性值
			console.log(el.attr('data-lx-nav'));
			var data=el.attr('data-lx-nav');
			var targetTop=getTargetSectionByNav(data);
			console.log(targetTop);			
			if (targetTop == 0 ) {
				return false;
			}else{
				$html_body.animate({scrollTop: targetTop}, 800);
				//$lxNav_wrap.fadeIn('fast');
				$lxNav_Item.each(function(){
					if ($(this).attr('data-lx-nav') == data ) {
						$(this).parent().parent().find('a').removeClass('active');
						$(this).addClass('active');
					}
				});
				if(Math.round(targetTop) == Math.round(firstSectionHeight)){
					$('.skill-score').find('rect').each(function(){
						var $target=$(this);
						var score=$(this).attr('data-skill-score');
						skillDataBar($target, score);
					});
				}
			}
			
		});
	}

	//职业技能数据条增长
	var skillDataBar=function(el,data){
		//console.log(data);
		el.css({
			width:data
		});
	}
	//不同的技能可以设置不同的值
	$skillName.hover(function(){
		var el=$(this);
		var $target=el.parent().find('.skill-score').find('rect');
		var score=$target.attr('data-skill-score');
		skillDataBar($target, score);
	}); 
	$skillName.click(function(){
		var el=$(this);
		var $target=el.parent().find('.skill-score').find('rect');
		var score=$target.attr('data-skill-score');
		skillDataBar($target, '1%');
		return false;
	}); 
	$window.scroll(function(){
		if($window.scrollTop() >= firstSectionHeight){
			$('.skill-score').find('rect').each(function(){
				var $target=$(this);
				var score=$(this).attr('data-skill-score');
				skillDataBar($target, score);
			});	
		}
	});

	//hobby-box
	$hobbyBtn.click(function(){
		var $el=$(this);
		var data = $(this).attr('data-img');
		var num = $(this).attr('data-num');
		$hobbyBtn.each(function(){
			$(this).css("display","block");
		});
		$el.css("display","none");
		$hobbyImgBox.each(function(index, el){
			$(el).css({
				'display':'none'
			});
		});
		//console.log(num);
		$hobbyImgBox.eq(num).css({
			'display':'block'
		});
		
		if (num <5 ) {
			$hobbyImgBox.eq(num).animate({'left':'13%'},300);
		}else{
			$hobbyImgBox.eq(num).animate({'right':'13%'},300);
		}
		//$hobbyImgBox.eq(num).animate({'left':'13%'},500);
		$hobbyImgClose.eq(num).css({
			'display':'block'
		});
		
		//叉位置	
		var leftOrRight;
		if (num < 5) {
			//console.log(num);
			// $hobbyImgBoxLeft.css({
			// 	'left': '14%'
			// });
			//$hobbyImgBoxLeft.addClass('hobby-afterImgBox-afterSlider');
			//$hobbyImgClose.attr('data-img-num', num);
			$hobbyImgClose.removeClass('position-right position-left');
			$hobbyImgClose.addClass('position-right');
			leftOrRight = ((num*19)/90).toFixed(2)*100;
			//console.log(leftOrRight+'%');
			$hobbyImgClose.css('top' , leftOrRight + '%' );
			$hobbyImgClose.css('-ms-border-radius' , '0 40px 40px 0');
			$hobbyImgClose.css('-moz-border-radius' , '0 40px 40px 0');
			$hobbyImgClose.css('-webkit-border-radius' , '0 40px 40px 0');
			$hobbyImgClose.css('border-radius' , '0 40px 40px 0');

		}else{
			num -= 5;
			$hobbyImgClose.removeClass('position-right position-left');
			$hobbyImgClose.addClass('position-left');
			leftOrRight = ((num*19)/90).toFixed(2)*100;
			$hobbyImgClose.css('top' , leftOrRight + '%' );
			$hobbyImgClose.css('-ms-border-radius' , '40px 0 0 40px');
			$hobbyImgClose.css('-moz-border-radius' , '40px 0 0 40px');
			$hobbyImgClose.css('-webkit-border-radius' , '40px 0 0 40px');
			$hobbyImgClose.css('border-radius' , '40px 0 0 40px');
			num += 5;
		}

		$hobbyImgBox.each(function(index, el){
			
			if (index<5 && index != num) {
				$(el).css({
					'left':'0%'
				});
				
			}else if(index>=5 && index != num){
				$(el).css({
					'right':'0%'
				});
				//console.log(el);
			}
		});
		return false;
	});
	$hobbyImgClose.click(function(){
		$hobbyImgBox.css({
			'display':'none'
		});
		$hobbyBtn.each(function(){
			$(this).css("display","block");
		});
		return false;
	});
	

	//lx-nav插件
	$(document).lxnav({
		navWidth:'90%',  
		preAndNextBox_Top: '50px',
		preAndNextBox_Right: '2%',
		exceptClick:'.hobby-bookmark',
		afterScroll:function(targetTop){
			if(Math.round(targetTop) == Math.round(firstSectionHeight)){
				$('.skill-score').find('rect').each(function(){
					var $target=$(this);
					var score=$(this).attr('data-skill-score');
					skillDataBar($target, score);
				});
			}
		}
	});

	scrollToSection();

	//加载图片
	for (var i = 0; i < imgAddr.length; i++) {
		$hobbyImgBox.eq(i).find('img').attr('src', './icons/'+ imgAddr[i] );
		console.log("Image"+i+" finish!");
	}

});