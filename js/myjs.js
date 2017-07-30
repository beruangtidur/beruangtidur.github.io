//global variable
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

// active class
var anchor    = document.querySelectorAll('nav a');
var navI =  document.querySelectorAll('nav li a');

for (var z = 0; z < navI.length; z++) {
  navI[z].setAttribute('href', 'javascript:void(0)');
}
function active(e){
  for (var y = 0; y < anchor.length; y++) {
      if (anchor[y].classList.contains('active')) {
        anchor[y].classList.remove('active');
      }
    }
    e.classList.add('active');
  }

// inactive class
window.onclick = function(event) {
                  if (!event.target.matches('nav a')) {
                     for (var m = 0; m < anchor.length; m++) {
                       if (anchor[m].classList.contains('active')) {
                         anchor[m].classList.remove('active');
                       }
                     }
                  }
                 }

//scroll into specified element
var posY =0,
    interval = 30;

    function recentPos(){
      document.documentElement.scrollTop;document.body.scrollTop;
      posY = document.body.scrollTop + document.documentElement.scrollTop ;

      return posY
    }
window.onscroll = function () {recentPos()};
// end deteksi posisi sekarang

//
// scrollDown
//
function scrollDown(id){
  var target = document.getElementById(id).offsetTop - 60;

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
  var target = document.getElementById(id).offsetTop - 50;

  var scrollAnimate = setTimeout(function(){
                          scrollUp (id);
                      },0);
  if (posY > target){
    posY = posY - interval ;
    window.scrollTo(0, posY);
  }else if (posY <= target){
    clearTimeout(scrollAnimate);
  }
}

//
// FixedNav
//
window.onscroll = function() {
  recentPos();
  var header = document.getElementById('header');
  var nav    = document.getElementsByTagName('nav');
  if (posY > header.offsetHeight) {
    nav[0].className = 'fixedNav';
  } else {
    nav[0].className = '';
  }
};
