//
//SLIDESHOW
//
ar slideIndex = 1,
    imgTarget  = document.getElementsByClassName("slideshow"),
    counter    = 0;

// manual slideshow button
function plusDivs(n) {
  showDivs(slideIndex += n);
  counter = 0;
}

function showDivs(n) {
  var i;
  if (n > imgTarget.length) {slideIndex = 1}
  if (n < 1) {slideIndex = imgTarget.length}
  for (i = 0; i < imgTarget.length; i++) {
     imgTarget[i].style.opacity    = '0' ;
     imgTarget[i].style.transition = '1s ease-in-out';
  }
  imgTarget[slideIndex - 1].style.opacity    = '1' ;
  imgTarget[slideIndex - 1].style.transition = '1s ease-in-out';
}
showDivs(slideIndex);

//auto slideshow
setInterval(function() {
              counter++;
              if (counter >= 5) {
                plusDivs(1);
              }
            }, 1000);
// -------------------------end slideshow-------------------------------------------//


// active class
var anchor    = document.querySelectorAll('nav a');
var navI =  document.querySelectorAll('nav li a');

for (var z = 0; z < navI.length; z++) {
  navI[z].setAttribute('href', 'javascript:void(0)');
}

// active class when scroll into specified div
function scrollActive() {
  recentPos();
    if (posY < document.getElementById('about').offsetTop) {
      for (var i = 0; i < anchor.length; i++) {
        anchor[i].classList.remove('active');
      }
    }
    if (posY >= document.getElementById('about').offsetTop) {
      anchor[0].classList.add('active');
      anchor[1].classList.remove('active');
    }
    if(posY >= document.getElementById('blog').offsetTop) {
      anchor[1].classList.add('active');
      anchor[0].classList.remove('active');
      anchor[2].classList.remove('active');
    }
    if(posY >= document.getElementById('special').offsetTop) {
      anchor[2].classList.add('active');
      anchor[1].classList.remove('active');
    }
  }
// -------------------------end active class-------------------------------------------//


// recentPos
var posY     = 0,
    interval = 30;

    function recentPos(){
      document.documentElement.scrollTop;document.body.scrollTop;
      posY = document.body.scrollTop + document.documentElement.scrollTop ;

      return posY
    }

//
// scrollDown
//
function scrollDown(id){
  var target = document.getElementById(id).offsetTop;

  var scrollAnimate = setTimeout(function(){
                          scrollDown(id);
                      },0);

  if (posY >= target){
    clearTimeout(scrollAnimate);
  }else{
    posY = posY + interval ;
    window.scrollTo(0, posY);
  }
}
//
// scrollUp
//
function scrollUp(id){
  var target = document.getElementById(id).offsetTop;

  var scrollAnimate = setTimeout(function(){
                          scrollUp (id);
                      },0);
  if (posY <= target) {
      clearTimeout(scrollAnimate);
  } else {
    posY = posY - interval;
    window.scrollTo(0,posY);
  }
}
// -------------------------end scroll into specified element-------------------------------------------//


function fixedNav() {
  recentPos();
  var header = document.getElementById('header');
  var nav    = document.getElementsByTagName('nav');
  if (posY > header.offsetHeight) {
    nav[0].classList.add('fixedNav');
  } else {
    nav[0].classList.remove('fixedNav');
  };
}
// -------------------------end fixedNav when scroll-------------------------------------------//


//
// call a function
//

window.onscroll = function() {
  fixedNav();
  scrollActive();
}

anchor[0].onclick = function() {scrollDown('about');scrollUp('about') }
anchor[1].onclick = function() {scrollDown('blog');scrollUp('blog') }
anchor[2].onclick = function() {scrollDown('special');scrollUp('special') }
