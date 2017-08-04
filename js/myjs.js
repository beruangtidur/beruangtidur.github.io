//
//SLIDESHOW
//
var slideIndex = 1,
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


// active class when scroll into specified div
var anchor    = document.querySelectorAll('nav a');

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
    interval = 20;

    function recentPos(){
      document.documentElement.scrollTop;document.body.scrollTop;
      posY = document.body.scrollTop || document.documentElement.scrollTop || self.pageYOffset;

      return posY
    }
    function targetPos(id) {
        var elm = document.getElementById(id);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    function smoothScroll(id) {
        var startY = recentPos();
        var stopY = targetPos(id);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
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

anchor[0].onclick = function() {smoothScroll('about'); return false;}
anchor[1].onclick = function() {smoothScroll('blog'); return false;}
anchor[2].onclick = function() {smoothScroll('special'); return false;}
