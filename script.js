
const cards = document.querySelector(".cards")
const btnAdd = document.getElementById("btn")
const title = document.getElementById("title")
const desc = document.getElementById("desc")
const url = document.getElementById("url")
const form = document.getElementById("form-add")

function afficherCards() {
  axios.get("http://localhost:4000/portfolio")
    .then(res => {
      cards.innerHTML = '';
      res.data.forEach(card => {
        const div = document.createElement('div')
        div.classList.add('card-item')
        div.innerHTML = `
          <h3>${card.title}</h3>
          <p>${card.desc}</p>
          <img src="${card.url}" alt="${card.title}" style="width:100%; border-radius: 8px; max-height: 200px; object-fit: cover;" />
          <button class="btn-delete" data-id="${card.id}">🗑️</button>
        `;
        cards.appendChild(div);
      })
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data-id");
          supprimercard(id);
        })
      })
    }).catch(err => console.error(err));
}
afficherCards()
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const newCard = {
    title: title.value,
    desc: desc.value,
    url: url.value
  }

  axios.post('http://localhost:4000/portfolio', newCard).then(() => {
      form.reset()
      afficherCards()
    }).catch(err => console.error(err))
})
function supprimercard(id) {
  axios.delete(`http://localhost:4000/portfolio/${id}`)
    .then(() => afficherCards())
    .catch(err => console.error(err))
}




