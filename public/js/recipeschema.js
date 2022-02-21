var isocooktime = function(cooktime) {
  var time = Number(cooktime.substring(0, cooktime.indexOf(" ")));
  var units = cooktime.substring(cooktime.indexOf(" ") + 1);
  var isotime = "";
  var halfhour = time % Math.floor(time);
  if (halfhour === 0) {
    if (units === "minutes") {
      if (time > 60) {
        var hours = Math.floor(time / 60);
        var minutes = time - hours * 60;
        isotime = "PT".concat(hours, "H").concat(minutes, "M");
      } else {
        isotime = "PT".concat(time, "M");
      }
    } else {
      isotime = "PT".concat(time, "H");
    }
  } else {
    var hours = Math.floor(time);
    isotime = "PT".concat(hours, "H30M");
  }
  return isotime;
};
var insertSchema = (function() {
  var yieldSpan = document.querySelector(".yield");
  var cookTimeSpan = document.querySelector(".duration");
  var publishdate = document.querySelector(".publishdate");
  var selectImage = document.querySelector("img"); // first image
  var recipeName = document.querySelector(".postTitle");
  var recipeIngredientsLi = document.querySelectorAll("article li");
  var isotime = "";
  if (cookTimeSpan !== null && cookTimeSpan.textContent !== null) {
    isotime = isocooktime(cookTimeSpan.textContent);
  }
  var ingredients = [];
  if (recipeIngredientsLi !== null) {
    for (var i = 0; i < recipeIngredientsLi.length; i++) {
      ingredients.push('"'.concat(recipeIngredientsLi[i].textContent, '"'));
    }
  }
  var paras = document.querySelectorAll("div.singlepagecontent p");
  var instructionsPara = [];
  var instructions = [];
  var paraWithImages = [];
  if (paras !== null) {
    for (var i = 0; i < paras.length - 1; i++) {
      var textcontent = paras[i].textContent;
      if (textcontent !== "" && paras[i].children.length === 0) {
        instructionsPara.push('"'.concat(textcontent, '"'));
      }
    }
    for (var i = 0; i < instructionsPara.length; i++) {
      instructions.push(
        '{"@type": "HowToStep",\n"text": '.concat(instructionsPara[i], "}")
      );
    }
    for (var i = 0; i < paras.length; i++) {
      if (paras[i].firstChild.nodeName === "IMG") {
        paraWithImages.push(paras[i]);
      }
    }
    for (var i = 0; i < paraWithImages.length - 3; i++) {
      var currentpara = paraWithImages[i];
      var sibling = currentpara.nextElementSibling;
      if (sibling !== null) {
        var nextsibling = sibling.nextElementSibling;
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
  }
  var ascript = document.createElement("script");
  var head = document.querySelector("head");
  ascript.setAttribute("type", "application/ld+json");
  ascript.textContent =
    '{\n  "@context": "https://schema.org",\n  "@type": "Recipe",\n  "author": "Punched Potatoes",\n  "totalTime": "'
      .concat(isotime, '",\n  "datePublished": "')
      .concat(publishdate.textContent, '",\n  "image": "')
      .concat(selectImage.src, '",\n  "recipeIngredient": [')
      .concat(Array.from(ingredients), '],\n  "name": "')
      .concat(recipeName.textContent, '",\n  "recipeInstructions": [')
      .concat(Array.from(instructions), '],\n  "recipeYield": "')
      .concat(yieldSpan.textContent, '"\n}');
  if (head !== null) {
    head.appendChild(ascript);
  }
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
  if (postcontent !== null) {
    postcontent.insertBefore(displaydescription, description);
  }
})();
