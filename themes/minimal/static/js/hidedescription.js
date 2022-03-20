var hideDescription = (function() {
  var sectionExists = document.querySelector("section");
  if (sectionExists === null) {
    var postcontent = document.querySelector(".singlepagecontent");
    var description = document.querySelector(".description");
    var displaydescription = document.createElement("div");
    displaydescription.classList.add("displaydescription");
    displaydescription.textContent = "> Click to read fluff <";
    displaydescription.addEventListener("click", function(event) {
      if (description !== null) {
        if (description.hidden) {
          displaydescription.textContent = "> Hide <";
          description.hidden = false;
        } else {
          displaydescription.textContent = "> Click to read fluff <";
          description.hidden = true;
        }
      }
    });
    if (postcontent !== null && description !== null) {
      postcontent.insertBefore(displaydescription, description);
    }
  } else {
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
          if (articledescription_1 !== null && articledescription_1 !== null) {
            articlediv.insertBefore(displaydescription_1, articledescription_1);
          }
          return "break";
        }
      };
      for (var i = 0; i < singlepagechildren.length; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break") break;
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
              if (
                articledescription_2 !== null &&
                articledescription_2.hidden
              ) {
                displaydescription_2.textContent = "> Hide <";
                articledescription_2.hidden = false;
              } else {
                if (articledescription_2 !== null) {
                  displaydescription_2.textContent = "> Click to read fluff <";
                  articledescription_2.hidden = true;
                }
              }
            });
            if (articledescription_2 !== null) {
              articleDiv.insertBefore(
                displaydescription_2,
                articledescription_2
              );
            }
            return "break";
          }
        };
        for (var i = 0; i < articlechildren.length; i++) {
          var state_2 = _loop_2(i);
          if (state_2 === "break") break;
        }
      });
    }
  }
})();
