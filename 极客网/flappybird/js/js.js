$(document).ready(function($) {

	var $Banner = $("#banner");
	var $HeadBird = $("#headbird");
	var $Head = $("#head");
	var $Start = $("#start");

	var $Bird = $('#bird'); 
	// $("#begin").hide(); //暂时隐藏

// 开始界面
	var GroundMoveTimer = null;
	GroundMoveTimer = setInterval(GroundMove,30);
	setInterval(HeadMove,200);

	$Start.click(StartGame);
	function GroundMove() {
		$Banner.css('left',parseInt($Banner.css('left')) - 4 +'px' ); 
		if(parseInt($Banner.css('left')) < -20) {
			$Banner.css('left','10px');
		}
	}
	function HeadMove() {
		if (parseInt($Head.css('top'))==0) {
			$Head.css('top','-8px');
		}
		else {
			$Head.css('top','0px');
		}
		if($HeadBird.attr('src')=='img/bird0.png') {
			$HeadBird.attr('src','img/bird1.png');
		}
		else {
			$HeadBird.attr('src','img/bird0.png');
		}
	}

// 开始游戏
	function StartGame() {
		$("#begin").hide();
		$Bird.fadeIn();
		$('#score').fadeIn();
		BFlyTimer = setInterval(BirdFly,30);
		AddPipeTimer = setInterval(AddPipe,1600);
		PipesMoveTimer = setInterval(PipesMove,30);
	}
	$("#begin").click(function (ev) { //解决一个小bug
		ev.stopPropagation();
	})
// 鸟的动画
	var iSpeed =2; //类似重力
	var aBirdPic = new Array(); //定义一个数组储存鸟的图片
	aBirdPic = ['img/bird0.png','img/bird1.png','img/up_bird0.png','img/up_bird1.png','img/down_bird0.png','img/down_bird1.png',] ;

	var BirdTimer = null; 
	BirdTimer = setInterval(BirdPic(aBirdPic[0],aBirdPic[1]),150);

	var BFlyTimer = null;
	
	
	function BirdFly() {
		if (parseInt($Bird.css('top')) >394) {
			$Bird.css('top','394px');
			Death();
		}
		else if (parseInt($Bird.css('top')) <0) {
			$Bird.css('top',0);
			iSpeed = 2;
		}
		else if (parseInt($Bird.css('top')) <= 394) {
			SpeedJudge();
			$Bird.css('top',parseInt($Bird.css('top')) + iSpeed++ +'px');
		}
	}
	function BirdPic(a,b) {
		if($Bird.attr('src') == a) {
			$Bird.attr('src',b);
		}
		else {
			$Bird.attr('src',a);
		}
	}
	function SpeedJudge() {
		if (iSpeed > 0) {
			clearInterval(BirdTimer);
			BirdTimer = setInterval(BirdPic(aBirdPic[4],aBirdPic[5]),150);
		}
		else {
			clearInterval(BirdTimer);
			BirdTimer = setInterval(BirdPic(aBirdPic[2],aBirdPic[3]),150);
		}
	}
	$(document).click(function() {
		clearInterval(BFlyTimer);
		iSpeed = -12;
		SpeedJudge();
		BFlyTimer = setInterval(BirdFly,30);
	})

//水管 
	var $Pipes = $("#pipes");

// 动态添加水管
	var AddPipeTimer =null;

	 function AddPipe () {
	var $UpPipe = $(".uppipe");
	var $DownPipe = $(".downpipe");
		var $Pipe = $(".pipe");
		 var index = $UpPipe.length - 1;
		 var $NewLi = $('<li class="pipe"><p class="uppipe"></p><p></p><p></p><p></p><p class="downpipe"></p></li>');
		$Pipes.append($NewLi);

		//令每两根水管之间的距离相同
		$($Pipe[$Pipe.length - 1]).css('left',$($Pipe[$Pipe.length - 2]).position().left + 220 + 'px');
		//令水管的长度随机
		$($UpPipe[$Pipe.length - 1]).height(parseInt(Math.random()*160));
		$($DownPipe[$Pipe.length - 1]).height(160 - $($UpPipe[$Pipe.length - 1]).height());
	}

// 水管移动
	var PipesMoveTimer = null;
	function PipesMove() {
		var $Pipe = $(".pipe");
		$Pipe.each(function() {
			$(this).css('left',$(this).position().left - 4 + 'px');
		})
	}

// 死亡（碰撞）判定
	setInterval(Collision,30);
	function Collision() {
		var $Pipe = $(".pipe");
		$($Pipe).each(function () { 
			//判断鸟的高度是不是在水管的高度范围内
			if ($Bird.position().top < parseInt($(this).find("p:first-child").height() + 60) || (423 - $Bird.position().top) < parseInt(260 - $(this).find("p:first-child").height())) {
				//判断鸟的left值和水管的left值是否在碰撞范围
				if (parseInt($(this).position().left) < 110 && parseInt($(this).position().left) >10) {
					Death();
				}
			}
		});
	}
	function Death() {
		clearInterval(BFlyTimer);
		clearInterval(PipesMoveTimer);
		clearInterval(GroundMoveTimer);
		clearInterval(AddPipeTimer);
		clearInterval(ScoreTimer);
		$('#gameover').fadeIn();
		$('#score').animate({
			top : '126px',
			left : '180px',
		},500)
	}
	$('#ok').click(function (ev) {
		$('#gameover').fadeOut();
		　location.reload();
		ev.stopPropagation();
	})

// 分数统计
	var ScoreTimer = null;
	ScoreTimer = setInterval(Score,30)
	function Score() {
		var score = 0;
		var $Pipe = $(".pipe");
		$Pipe.each(function() {
			if ($(this).position().left <18) {
				score++;
			}
			$('#score').html(score);
		}) 

	}

//外挂
	var $Help = $("#help");
	var $Wrap = $("#wrap");
	$(document).keydown(function (e) {
		if (e.keyCode == 32) {
			if ($Help.is(':checked')) {
				$Help.removeAttr('checked');
			}
			else {
				$Help.attr('checked','checked');
				$(document).unbind('click');
				clearInterval(BFlyTimer);
				$(document).bind('mousemove',BirdHelper);
			}
		}
	})	
	
	function BirdHelper(e) {
		$Bird.css('left',e.pageX -$Wrap.offset().left -20);
		$Bird.css('top',e.pageY - $Wrap.offset().top -15);
	}
}); 