const newPartyForm = document.querySelector("#new-party-form");
const partyContainer = document.querySelector("#party-container");

const PARTIES_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/parties";
const GUESTS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/guests";
const RSVPS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/rsvps";
const GIFTS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/gifts";

// GET all parties
const getAllParties = async () => {
  try {
    const response = await fetch(PARTIES_API_URL);
    const parties = await response.json();
    console.log (parties)
    return parties;
  } catch (error) {
    console.error(error);
  }
  };

// GET single party by id
const getPartyById = async (id) => {
  try {
    const response = await fetch(`${PARTIES_API_URL}/${id}`);
    const party = await response.json();
    console.log(party)
    return party;
  } catch (error) {
    console.error(error);
  }
  };

// GET - /api/workshop/guests/party/:partyId - get guests by party id
const getGuestById = async(id) => {
  try {
    const guestsResponse = await fetch(`${GUESTS_API_URL}/party/${id}`);
    const guests = await guestsResponse.json();
    console.log(guests)
    return guests;
  } catch (error) {
    console.error(error)
  }
  };

// GET - /api/workshop/rsvps/party/:partyId - get RSVPs by partyId
const getRsvpsById = async(id) => {
  try {
    const rsvpsResponse = await fetch(`${RSVPS_API_URL}/party/${id}`);
    const rsvps = await rsvpsResponse.json();
    console.log(rsvps)
    return rsvps; 
  } catch (error){
    console.error(error)
  }
  };

// GET - get all gifts by party id - /api/workshop/parties/gifts/:partyId -BUGGY?
const getAllGiftByPartyId = async (id) => {
  try{
    const giftsResponse = await fetch(`${PARTIES_API_URL}/parties/gifts/${id}`);
    const gifts = await giftsResponse.json();
    console.log(gifts)
    return gifts; 
  } catch (error) {
    console.error(error)
  }
  };
  
// delete party
const deleteParty = async (id) => {
  // your code here
};

// render a single party by id
const renderSinglePartyById = (party) => {
  // try {
    // create new HTML element to display party details
    const partyDetailsElement = document.createElement("div");
    partyDetailsElement.classList.add("party-details");
    partyDetailsElement.innerHTML = `
            <h2>${party.name}</h2>
            <p>${party.event}</p>
            <p>${party.city}</p>
            <p>${party.state}</p>
            <p>${party.country}</p>
            <h3>Guests:</h3>
            <ul>
            ${guests
              .map(
                (guest, index) => `
              <li>
                <div>${guest.name}</div>
                <div>${rsvps[index].status}</div>
              </li>
            `
              )
              .join('')}
          </ul>
            <button class="close-button">Close</button>
        `;
    partyContainer.appendChild(partyDetailsElement);

    // add event listener to close button
    const closeButton = partyDetailsElement.querySelector(".close-button");
    closeButton.addEventListener('click', (partyDetailsElement) => {
      partyDetailsElement.remove();
    });
  // } catch (error) {
  //   console.error(error);
  // }
};

// render all parties
const renderParties = async (parties) => {
  try {
    partyContainer.innerHTML = '';
    parties.forEach((party) => {
      const partyElement = document.createElement('div');
      partyElement.classList.add('party');
      partyElement.innerHTML = `
                <h2>${party.name}</h2>
                <p>${party.description}</p>
                <p>${party.date}</p>
                <p>${party.time}</p>
                <p>${party.location}</p>
                <button class="details-button" data-id="${party.id}">See Details</button>
                <button class="delete-button" data-id="${party.id}">Delete</button>
            `;
      partyContainer.appendChild(partyElement);

      // see details
      const detailsButton = partyElement.querySelector(".details-button");
      detailsButton.addEventListener("click", (event) => {
        event.preventDefault();
        renderSinglePartyById(party);
      });

      // delete party
      const deleteButton = partyElement.querySelector(".delete-button");
      deleteButton.addEventListener("click",(event) => {
        event.preventDefault();
        removeParty(party.id)
      });
    });
  } catch (error) {
    console.error(error);
  }
};
const init = async() => {

  const parties = await getAllParties();
  const party = await getPartyById();
  renderParties(parties)
  renderSinglePartyById(party)

};

init();