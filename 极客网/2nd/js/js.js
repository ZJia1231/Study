// window.onscroll = window.onresize = window.onload= function() {
// 		var scrollTop = document.body.scrollTop;
// 		var oLogin_0 = document.getElementById('login_0');
// 		var t = (document.documentElement.clientHeight - oLogin_0.offsetHeight)/2;
// 		oLogin_0.style.top = scrollTop + t + 'px';
// 
// }
// 用固定定位代替js使登录框居中解决抖动问题

window.onload = function() {
	var oHeaderLogin = document.getElementById('header_login');
	var oLogin = document.getElementById('login');
	var oLogin_0 = document.getElementById('login_0');
	var oLoginExit = document.getElementById('login_exit');
	var oL_text = document.getElementById('l_text');
	var oL_pwd = document.getElementById('l_pwd');

	oLogin.style.height = document.body.scrollHeight + 'px';

// 关闭登录窗口
	oLogin.onclick = fExit;
	oLoginExit.onclick = fExit;
	function fExit() {
		oLogin.style.display = 'none';
		oL_text.value = '';
		oL_pwd.value = '';
	}

// 打开登录窗口
	oHeaderLogin.onclick = function () {
	oLogin.style.display = 'block';
	}
	oLogin_0.onclick = function(ev) {
		var oEvent = ev || event;		
		// oEvent.preventDefault();
		oEvent.stopPropagation();
	}

// banner轮播
	var oBanner = document.getElementById('banner');
	var oBannerUl = document.getElementById('banner_ul');
	var oBannerLi = oBannerUl.getElementsByTagName('li');
	var	oBtnLeft = document.getElementById('banner_left');
	var	oBtnRight = document.getElementById('banner_right');
	var oBtnList = document.getElementById('banner_list');
	var oBtnLi = oBtnList.getElementsByTagName('li');
	var timer = null;
	var iSpeed = -10;

	oBannerUl.innerHTML += oBannerUl.innerHTML;
	oBannerUl.style.width = oBannerLi[0].offsetWidth * oBannerLi.length + 'px';

	window.onresize = Reset;
	window.onload = Reset;

	timer = setInterval(Cycle,30);
	oBtnLeft.onmouseover = function() {
		clearInterval(timer);
		timer = setInterval(Cycle,30);
		iSpeed = -10;
	}
	oBtnRight.onmouseover = function() {
		clearInterval(timer);
		timer = setInterval(Cycle,30);
		iSpeed = 10;
	}

	for (var i = 0; i < oBtnLi.length; i++) {
		oBtnLi[i].index = i;
		oBtnLi[i].onclick =function () {
			oBannerUl.style.left = -(oBannerLi[0].offsetWidth * this.index) + 'px';
			clearInterval(timer);
		}
	}

	oBanner.onmouseout = function () {
		clearInterval(timer);
		timer = setInterval(Cycle,30);
	}
	function Reset() {
		for (var i = 0; i < oBannerLi.length; i++) {
			oBannerLi[i].style.width = document.body.clientWidth + 'px';
		}
		oBannerUl.style.left = '0';
	}
	function Cycle() {
		oBannerUl.style.left = oBannerUl.offsetLeft + iSpeed + 'px';
		if (oBannerUl.offsetLeft >= 0) {
		oBannerUl.style.left = -(oBannerLi[0].offsetWidth * oBannerLi.length/2) + 'px';
		}
		else if(oBannerUl.offsetLeft <= -(oBannerLi[0].offsetWidth * oBannerLi.length/2)) {
			oBannerUl.style.left = '0px';
		}
	}

// 搜索框验证
	var oSearch = document.getElementById('search');
	var oInputText = oSearch.getElementsByTagName('input')[0];
	var oSearchMsg = document.getElementById('search_msg');
	var re = /[\w\s]/g;
	oInputText.onkeyup = function() {
		if (re.test(oInputText.value)) {
			oSearchMsg.style.visibility = 'visible';
		}
		else {
			oSearchMsg.style.visibility = 'hidden';	
			oInputBtn.onclick =PutIn;
		}
	}

// 搜索盒子
	var	oList = document.getElementById('list');
	var oInputBtn = oSearch.getElementsByTagName('input')[1];
	var oListUl = document.getElementById('list_ul');
	var	oListLi_0 = oListUl.getElementsByTagName('li');


	function PutIn () {
		oList.style.visibility = 'visible'
		var oListLi = document.createElement('li');
		oListLi.innerHTML = oInputText.value;
		if (oListLi_0.length==0) {
			oListUl.appendChild(oListLi);
		}
		else {
			var k =true;
			for (var i = 0; i <oListLi_0.length; i++) {
				if (oListLi.innerText == oListLi_0[i].innerText) {
					k = flase;
				}
			}
			if (k) {
				oListUl.insertBefore(oListLi,oListLi_0[0]);
			}
		}
	}
	// oInputBtn.onclick =function () {
	// 	var oListLi = document.createElement('li');
	// 	var oAjax = null;
	// 	if (window.XMLHttpRequest) {
	// 		oAjax = new XMLHttpRequest();
	// 	}
	// 	else {
	// 		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	// 	}
	// 	oAjax.open('GET','https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy?wd='+oInputText.value,true);
	// 	oAjax.send();
	// 	oAjax.onreadystatechange = function() {
	// 		if (oAjax.readyState == 4) {
	// 			if (oAjax.status == 200) {
	// 				var oData = oAjax.contentWindow.name;
	// 				alert(oAjax.readyState);
	// 				alert(oAjax.status);
	// 				alert(oData);
	// 					for (var i = 0; i < oData.s.length; i++) {
	// 						oListLi.innerHTML = oData.s[i];
	// 						oListUl.appendChild(oListLi);
	// 					}
	// 			}
	// 		}
	// 	}
	// }
	// 不会解决跨域问题......
}