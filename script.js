const button = document.getElementById("button");
button.addEventListener("click", search);

const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", cancel);

const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  search();
});

function cancel() {
  const resultsList = document.getElementById("results");
  resultsList.innerHTML = "";
}

function search() {
  const input = document.getElementById("input");
  const searchTerm = input.value.trim();
  const resultsList = document.getElementById("results");
  resultsList.innerHTML = "";

  const form = document.getElementById("form");
  form.reset();

  if (searchTerm === "") {
    alert("Pogreška - unos ne može biti prazan ");
    return;
  }

  const url = `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${searchTerm}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultsList.innerHTML = "";
      const list = document.createElement("ul");
      list.className = "resultsList";

      if (data.resultCount === 0) {
        const noResults = document.createElement("li");
        noResults.textContent = "Nema rezultata pretrage";
        list.appendChild(noResults);
      } else {
        for (let i = 0; i < data.results.length; i++) {
          const artist = data.results[i].artistName;
          const genre = data.results[i].primaryGenreName;
          const genreText = genre ? genre : "Nepoznat žanr";
          const resultItem = document.createElement("li");
          resultItem.textContent = `${artist} - ${genreText}`;
          list.appendChild(resultItem);
        }
      }

      resultsList.appendChild(list);
    });
}
