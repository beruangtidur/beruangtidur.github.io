var anchor = document.querySelectorAll('a');for(var i=0;i<anchor.length;i++){anchor[i].setAttribute('target', '_blank');}
// give target _blank to all link
var sections =  document.querySelectorAll('.site-wrapper > section');
var i ;
var currentIndex = 0;

for (i = 0; i < sections.length; i++) {
  sections[i].className = "single-slide";
}
  sections[currentIndex].style.left = "0";

  //PREVSLIDE  FUNCTION
  function prevSlide() {
    var nextIndex ;

    if (currentIndex === 0 ) {
      nextIndex = sections.length - 1;
    }else {
      nextIndex = currentIndex - 1;
    }
    sections[nextIndex].style.left = "-100%";
    sections[currentIndex].style.left = "0";

    sections[nextIndex].setAttribute("class", "single-slide slideToLeft");
    sections[currentIndex].setAttribute("class", "single-slide slideOutRight");

    currentIndex = nextIndex;
  }

  //NEXTSLIDE FUNCTION
  function nextSlide() {
    var nextIndex ;

    if (currentIndex === (sections.length - 1) ) {
      nextIndex = 0;
    }else {
      nextIndex = currentIndex + 1;
    }
    sections[nextIndex].style.left = "100%";
    sections[currentIndex].style.left = "0";

    sections[nextIndex].setAttribute("class", "single-slide slideToRight");
    sections[currentIndex].setAttribute("class", "single-slide slideOutLeft");

    currentIndex = nextIndex;
  }
