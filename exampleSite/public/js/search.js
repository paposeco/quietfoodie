const searchFunction = (function() {
  let searchIndex;
  let pagesIndex;
  const getdata = async function() {
    try {
      const response = await fetch("/index.json");
      try {
        pagesIndex = await response.json();
        searchIndex = lunr(function() {
          this.field("title");
          this.field("content");
          this.ref("uri");
          pagesIndex.forEach((page) => this.add(page));
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const userquery = async function(searchquery) {
    await getdata();
    const searchonindex = searchIndex.search(searchquery);
    return searchonindex;
  };
  const handlesubmit = async function(event) {
    event.preventDefault();
    if (document.querySelector(".searchresults") !== null) {
      document.querySelector(".searchresults").remove();
    }
    const form = document.querySelector("form");
    if (form !== null) {
      const formdata = new FormData(form);
      let searchquery = "";
      formdata.forEach((value) => {
        searchquery = value;
      });
      const resultsarray = await userquery(searchquery);
      const resultsdiv = document.createElement("div");
      const button = document.createElement("button");
      button.addEventListener("click", function(event) {
        resultsdiv.remove();
      });
      button.textContent = "x";
      const divtitle = document.createElement("h2");
      divtitle.textContent = "Search Results";
      resultsdiv.classList.add("searchresults");
      const contentdiv = document.getElementById("content");
      if (contentdiv !== null) {
        contentdiv.appendChild(resultsdiv);
      }
      const divheader = document.createElement("div");
      divheader.setAttribute("id", "searchresultsheader");
      resultsdiv.appendChild(divheader);
      divheader.appendChild(divtitle);
      divheader.appendChild(button);
      if (resultsarray.length === 0) {
        const para = document.createElement("p");
        para.textContent = "No results found.";
        resultsdiv.appendChild(para);
      } else {
        const ul = document.createElement("ul");
        resultsdiv.appendChild(ul);
        resultsarray.forEach((element) => {
          const pagecontent = pagesIndex.find(
            (page) => page.uri === element.ref
          );
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.setAttribute("href", element.ref);
          if (pagecontent !== undefined) {
            console.log(pagecontent.title);
            let pagetitle = "";
            if (pagecontent.title.includes("&amp;")) {
              pagetitle = pagecontent.title.replace("&amp;", "&");
            } else {
              pagetitle = pagecontent.title;
            }
            let pagetitle39 = "";
            if (pagetitle.includes("&#39;")) {
              pagetitle39 = pagetitle.replace("&#39;", "'");
            } else {
              pagetitle39 = pagetitle;
            }
            a.textContent = pagetitle39;
          }
          li.appendChild(a);
          ul.appendChild(li);
        });
      }
    }
  };
  return { handlesubmit };
})();
const form = document.querySelector("form");
if (form !== null) {
  form.addEventListener("submit", searchFunction.handlesubmit);
}
//# sourceMappingURL=search.js.map
