const links=document.querySelectorAll('.navigation__link');


links.forEach(item=>item.addEventListener('click', function(){
	document.getElementById("navi-toggle").checked=false;
}))