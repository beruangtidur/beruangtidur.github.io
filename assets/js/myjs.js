var anchor = document.querySelectorAll('a');
for (var i = 0; i < anchor.length; i++) {
  anchor[i].setAttribute('target', '_blank');
}
// give target _blank to all link
