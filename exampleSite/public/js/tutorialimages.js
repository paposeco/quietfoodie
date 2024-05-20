var addClassesToImages = (function () {
  var articles = document.querySelectorAll("article");
  if (articles[0].className === "single") {
    var singlepage = document.querySelector(".singlepagecontent");
    var singlepagechildren = singlepage.children;
    var articlediv = void 0;
    var singleDivParas = [];
    for (var i = 0; i < singlepagechildren.length; i++) {
      if (singlepagechildren[i].nodeName === "P") {
        singleDivParas.push(singlepagechildren[i]);
      }
    }
    var singleDivParasWithImages = [];
    for (var i = 0; i < singleDivParas.length; i++) {
      if (
        singleDivParas !== null &&
        singleDivParas[i] !== null &&
        singleDivParas[i].firstChild !== null &&
        singleDivParas[i].firstChild.nodeName === "IMG"
      ) {
        singleDivParasWithImages.push(singleDivParas[i]);
      }
    }
  } else {
    articles.forEach(function (article) {
      var articlechildren = article.children;
      var articleDiv = null;
      var _loop_1 = function (i) {
        if (
          articlechildren[i].nodeName === "DIV" &&
          articlechildren[i].className === ""
        ) {
          articleDiv = articlechildren[i];
          return "break";
        }
      };
      for (var i = 0; i < articlechildren.length; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break") break;
      }
      var articleDivParas = [];
      var articleDivChildren = articleDiv !== null ? articleDiv.children : null;
      if (articleDivChildren !== null) {
        for (var i = 0; i < articleDivChildren.length; i++) {
          if (articleDivChildren[i].nodeName === "P") {
            articleDivParas.push(articleDivChildren[i]);
          }
        }
      }
    });
  }
})();
