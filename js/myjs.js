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


    var smoothScr = {
        iterr         : 30, // set timeout miliseconds ..decreased with 1ms for each iteration
        tm            : null, //timeout local variable
        stopShow      : function(){
                          clearTimeout(this.tm); // stop the timeout
                          this.iterr = 30; // reset milisec iterator to original value
                        },
        getRealTop    : function (el){ // helper function instead of jQuery
                          var elm = el;
                          var realTop = 0;
                          do{
                            realTop += elm.offsetTop;
                            elm = elm.offsetParent;
                          }
                          while(elm);
                          return realTop;
                        },
        getPageScroll : function(){  // helper function instead of jQuery
                          var pgYoff = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
                          return pgYoff;
                        },
        anim          : function(id){ // the main func

                          this.stopShow(); // for click on another button or link
                          var eOff, pOff, tOff, scrVal, pos, dir, step;

                          eOff = document.getElementById(id).offsetTop; // element offsetTop

                          tOff =  this.getRealTop(document.getElementById(id).parentNode); // terminus point

                          pOff = this.getPageScroll(); // page offsetTop

                          if (pOff === null || isNaN(pOff) || pOff === 'undefined') pOff = 0;

                          scrVal = eOff - pOff; // actual scroll value;

                          if (scrVal > tOff){
                            pos = (eOff - tOff - pOff);
                            dir = 1;
                          }
                          if (scrVal < tOff){
                            pos = (pOff + tOff) - eOff;
                            dir = -1;
                          }
                          if(scrVal !== tOff){
                            step = ~~((pos / 4) +1) * dir;

                            if(this.iterr > 1) this.iterr -= 1;
                            else this.itter = 0; // decrease the timeout timer value but not below 0

                            window.scrollBy(0, step);
                            this.tm = window.setTimeout(function(){
                               smoothScr.anim(id);
                            }, this.iterr);
                          }
                          if(scrVal === tOff){
                            this.stopShow(); // reset function values
                            return;
                          }
        }
    }
// -------------------------end scroll into specified element-------------------------------------------//


// recentPos
var posY     = 0,
    interval = 20;

    function recentPos(){
      document.documentElement.scrollTop;document.body.scrollTop;
      posY = document.body.scrollTop || document.documentElement.scrollTop ;

      return posY
    }

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

anchor[0].onclick = function() {smoothScr.anim('about');}
anchor[1].onclick = function() {smoothScr.anim('blog');}
anchor[2].onclick = function() {smoothScr.anim('special');}
