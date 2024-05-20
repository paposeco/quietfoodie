const isocooktime = function (cooktime) {
  console.log(params.timezone)
  const time = Number(cooktime.substring(0, cooktime.indexOf(" ")));
  const units = cooktime.substring(cooktime.indexOf(" ") + 1);
  let isotime = "";
  const halfhour = time % Math.floor(time);
  if (halfhour === 0) {
    if (units === "minutes") {
      if (time > 60) {
        const hours = Math.floor(time / 60);
        const minutes = time - hours * 60;
        isotime = "PT".concat(hours, "H").concat(minutes, "M");
      } else {
        isotime = "PT".concat(time, "M");
      }
    } else {
      isotime = "PT".concat(time, "H");
    }
  } else {
    const hours = Math.floor(time);
    isotime = "PT".concat(hours, "H30M");
  }
  return isotime;
};
const insertSchema = (function () {
  const yieldSpan = document.querySelector(".yield");
  const cookTimeSpan = document.querySelector(".duration");
  const publishdate = document.querySelector(".publishdate");
  const selectImage = document.querySelector("img"); // first image
  const recipeName = document.querySelector(".postTitle");
  const recipeIngredientsLi = document.querySelectorAll("article li");
  let isotime = "";
  if (cookTimeSpan !== null && cookTimeSpan.textContent !== null) {
    isotime = isocooktime(cookTimeSpan.textContent);
  }
  const ingredients = [];
  if (recipeIngredientsLi !== null) {
    for (var i = 0; i < recipeIngredientsLi.length; i++) {
      ingredients.push('"'.concat(recipeIngredientsLi[i].textContent, '"'));
    }
  }
  const paras = document.querySelectorAll("div.singlepagecontent p");
  const instructionsPara = [];
  const instructions = [];
  if (paras !== null) {
    for (var i = 0; i < paras.length - 1; i++) {
      const textcontent = paras[i].textContent;
      if (textcontent !== "" && paras[i].children.length === 0) {
        instructionsPara.push('"'.concat(textcontent, '"'));
      }
    }
    for (var i = 0; i < instructionsPara.length; i++) {
      instructions.push(
        '{"@type": "HowToStep",\n"text": '.concat(instructionsPara[i], "}")
      );
    }
  }
  const ascript = document.createElement("script");
  const head = document.querySelector("head");
  const authorsname = document.querySelector('meta[name="author"]').content;
  ascript.setAttribute("type", "application/ld+json");
  ascript.textContent =
    '{\n  "@context": "https://schema.org",\n  "@type": "Recipe",\n  "author": ' +
    authorsname +
    ',\n  "totalTime": "'
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
})();
