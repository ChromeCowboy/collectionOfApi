const url = "https://api.publicapis.org/entries";
const card = document.querySelector(".card");
const dropdown = document.querySelector(".dropdown");
// const dropdown = document.getElementById("drop");
const item = document.querySelector(".item");

const shuffle = document.querySelector(".shuffle");
const random = document.getElementById("random");
const empty = document.querySelector(".emptyRandom");

async function getEntries() {
  try {
    let data = await fetch(url);
    return await data.json();
  } catch (error) {
    console.log(error);
  }
}

const init = async () => {
  let data = await getEntries();
  let entries = data.entries;

  let arr = [];
  let linkArray = [];
  let descriptionArray = [];
  let array;

  const displayDropdown = (entries) => {
    const dropdowns = entries.map((dropdownEntry) => {
      const { API: api, Link: link, Description: description } = dropdownEntry;

      if (api) {
        arr.push(api);
      }
      if (link) {
        linkArray.push(link);
      }
      if (description) {
        descriptionArray.push(description);
      }
    });

    shuffle.addEventListener("click", function () {
      let randomAPI = arr[Math.floor(Math.random() * linkArray.length)];
      let randomLink = linkArray[Math.floor(Math.random() * linkArray.length)];
      let randomDescription =
        descriptionArray[Math.floor(Math.random() * linkArray.length)];

      // let randomItem = [randomAPI, randomLink, randomDescription];

      empty.innerHTML = `
      <div onclick="window.open('${randomLink}','_blank')" class="inside-card">
      <h3 class="link-title" id="${randomAPI}">${randomAPI}</h3>
      <p>Description: ${randomDescription}</p>
    </div> 
      `;
    });

    let array = arr.sort();

    const seperateTitles = (array) => {
      const alphabet = array
        .map((eachItem) => {
          const seperatedItems = eachItem;

          return `
            <li class="item"><a href="#${seperatedItems}">${seperatedItems}</a></li>
               `;
        })
        .join("");
      item.innerHTML = alphabet;
    };
    seperateTitles(array);
  };
  displayDropdown(entries);

  const displayEntry = (entries) => {
    // map over each individual object, in the entries array
    const newEntry = entries
      .map((entryItem) => {
        const { API: api, Description: description, Link: link } = entryItem;

        return `
          <div onclick="window.open('${link}','_blank')" class="inside-card">
            <h3 class="link-title" id="${api}">${api}</h3>
            <p>Description: ${description}</p>
          </div>
        `;
      })
      .join("");

    card.innerHTML = newEntry;
  };
  displayEntry(entries);
};

window.addEventListener("DOMContentLoaded", init());
