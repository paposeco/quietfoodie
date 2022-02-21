var addClassesToImages = (function() {
  var articles = document.querySelectorAll("article");
  if (articles[0].className === "single") {
    var singlepage = document.querySelector(".singlepagecontent");
    var singlepagechildren = singlepage.children;
    var articlediv = void 0;
    var _loop_1 = function(i) {
      if (
        singlepagechildren[i].nodeName === "DIV" &&
        singlepagechildren[i].className === ""
      ) {
        articlediv = singlepagechildren[i];
        var articledescription_1 = singlepage.querySelector(".description");
        var displaydescription_1 = document.createElement("div");
        displaydescription_1.classList.add("displaydescription");
        displaydescription_1.textContent = "> Click to read fluff <";
        displaydescription_1.addEventListener("click", function(event) {
          if (articledescription_1 !== null && articledescription_1.hidden) {
            displaydescription_1.textContent = "> Hide <";
            articledescription_1.hidden = false;
          } else {
            if (articledescription_1 !== null) {
              displaydescription_1.textContent = "> Click to read fluff <";
              articledescription_1.hidden = true;
            }
          }
        });
        articlediv.insertBefore(displaydescription_1, articledescription_1);
        return "break";
      }
    };
    for (var i = 0; i < singlepagechildren.length; i++) {
      var state_1 = _loop_1(i);
      if (state_1 === "break") break;
    }
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
    for (var i = 0; i < singleDivParasWithImages.length - 3; i++) {
      var currentpara = singleDivParasWithImages[i];
      var sibling = currentpara.nextSibling;
      if (sibling !== null) {
        var nextsibling = sibling.nextSibling;
        if (nextsibling !== null) {
          var nextsiblingchild = nextsibling.firstChild;
          if (
            nextsiblingchild !== null &&
            nextsiblingchild.nodeName === "IMG"
          ) {
            currentpara.classList.add("tutorialimage");
            nextsibling.classList.add("tutorialimage");
          }
        }
      }
    }
  } else {
    articles.forEach(function(article) {
      var articlechildren = article.children;
      var articleDiv = null;
      var _loop_2 = function(i) {
        if (
          articlechildren[i].nodeName === "DIV" &&
          articlechildren[i].className === ""
        ) {
          articleDiv = articlechildren[i];
          var articledescription_2 = article.querySelector(".description");
          var displaydescription_2 = document.createElement("div");
          displaydescription_2.classList.add("displaydescription");
          displaydescription_2.textContent = "> Click to read fluff <";
          displaydescription_2.addEventListener("click", function(event) {
            if (articledescription_2 !== null && articledescription_2.hidden) {
              displaydescription_2.textContent = "> Hide <";
              articledescription_2.hidden = false;
            } else {
              if (articledescription_2 !== null) {
                displaydescription_2.textContent = "> Click to read fluff <";
                articledescription_2.hidden = true;
              }
            }
          });
          articleDiv.insertBefore(displaydescription_2, articledescription_2);
          return "break";
        }
      };
      for (var i = 0; i < articlechildren.length; i++) {
        var state_2 = _loop_2(i);
        if (state_2 === "break") break;
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
      var paraWithImages = [];
      for (var i = 0; i < articleDivParas.length; i++) {
        if (
          articleDivParas[i] !== null &&
          articleDivParas[i].firstChild.nodeName === "IMG"
        ) {
          paraWithImages.push(articleDivParas[i]);
        }
      }
      for (var i = 0; i < paraWithImages.length - 2; i++) {
        var currentpara = paraWithImages[i];
        var sibling = currentpara.nextSibling;
        if (sibling !== null) {
          var nextsibling = sibling.nextSibling;
          if (nextsibling !== null) {
            var nextsiblingchild = nextsibling.firstChild;
            if (
              nextsiblingchild !== null &&
              nextsiblingchild.nodeName === "IMG"
            ) {
              currentpara.classList.add("tutorialimage");
              nextsibling.classList.add("tutorialimage");
            }
          }
        }
      }
    });
  }
})();
