document.getElementById("charactersButton").addEventListener("click", fetchAll);
document.getElementById("searchButton").addEventListener("click", search);

function fetchAll() {
    let url = "https://rickandmortyapi.com/api/character";
    fetchCharacters(url);
}

function search() {
    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;
    const species = document.getElementById("species").value;
    const type = document.getElementById("type").value;
    const gender = document.getElementById("gender").value;

    let url = new URL("https://rickandmortyapi.com/api/character");
    if (name) url.searchParams.append("name", name);
    if (status) url.searchParams.append("status", status);
    if (species) url.searchParams.append("species", species);
    if (type) url.searchParams.append("type", type);
    if (gender) url.searchParams.append("gender", gender);

    fetchCharacters(url.toString());
}

function fetchCharacters(url) {
    let allCharacters = [];

    function fetchPage(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                allCharacters = allCharacters.concat(data.results);
                if (data.info.next) {
                    fetchPage(data.info.next);
                } else {
                    fillTable(allCharacters);
                }
            })
            .catch(error => console.error("Error fetching ", error));
    }

    fetchPage(url);
}

function fillTable(characters) {
    const tableBody = document.querySelector("#resultsTable tbody");
    tableBody.innerHTML = "";

    characters.forEach(character => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = character.name;
        row.appendChild(nameCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = character.status;
        row.appendChild(statusCell);

        const speciesCell = document.createElement("td");
        speciesCell.textContent = character.species;
        row.appendChild(speciesCell);

        const typeCell = document.createElement("td");
        typeCell.textContent = character.type || "N/A";
        row.appendChild(typeCell);

        const genderCell = document.createElement("td");
        genderCell.textContent = character.gender;
        row.appendChild(genderCell);

        tableBody.appendChild(row);
    });
}
