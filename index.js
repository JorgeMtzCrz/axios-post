const theNames = document.querySelectorAll('.the-name')
const theOccupations = document.querySelectorAll('.the-occupation')
const theWeapons = document.querySelectorAll('.the-weapon')

document.querySelector('#character-form').onsubmit = async event => {
    event.preventDefault()
    const name = document.querySelector('.the-name').value
    const occupation = document.querySelector('.the-occupation').value
    const weapon = document.querySelector('.the-weapon').value
    const characterInfo = {
        name,
        occupation,
        weapon
    }
    try {
        const {
            data
        } = await axios.post(
            'https://ih-crud-api.herokuapp.com/characters',
            characterInfo
        )
        const {
            name,
            id
        } = data
        const newCharacterHTML = `
        <li>
          <h3>${name}</h3>
          <p>id: ${id}</p>
        </li>
         `
        document.querySelector('#characters-list').innerHTML += newCharacterHTML
        document.querySelector('#character-form').reset
    } catch (err) {
        console.error(err)
    }
}

//Get Character
document.querySelector('#getButton').onclick = async event => {
    document.querySelector('#updateForm').style.display = 'block'
    const theId = document.querySelector('#theCharId').value
    try {
        const {
            data
        } = await axios.get(
            `https://ih-crud-api.herokuapp.com/characters/${theId}`
        )
        theNames[1].value = data.name
        theOccupations[1].value = data.occupation
        theWeapons[1].value = data.weapon

        document.querySelector('#characters-list').innerHTML = ""
        document.querySelector('#characters-list').innerHTML += updatedCharacterHTML
    } catch (err) {
        document.querySelector('#updateForm').style.display = 'none'
        if (err.response.status === 404) {
            const errorMessage = `There's no character with id: ${theId}. Try some other ID.`
            const errDiv = document.createElement('div')
            errDiv.innerHTML = errorMessage
            document.body.appendChild(errDiv)
        }
    }
}

document.querySelector('#updateForm').onsubmit = async event => {
    event.preventDefault()
    try {
        const theId = document.querySelector('#theCharId').value
        const updatedCharacterInfo = {
            name: theNames[1].value,
            occupation: theOccupations[1].value,
            weapon: theWeapons[1].value
        }

        const {
            data: {
                name,
                id
            }
        } = await axios.patch(
            `https://ih-crud-api.herokuapp.com/characters/${theId}`,
            updatedCharacterInfo)
        document.querySelector('#updateForm').reset()
        const updatedCharacterHTML = `
      <h2>Updated character with ID ${theId}:</h2>
      <li>
          <h3>${name}</h3>
          <p>id: ${id}</p>
      </li>
      `
        document.querySelector('#characters-list').innerHTML = ""
        document.querySelector('#characters-list').innerHTML += updatedCharacterHTML

    } catch (err) {
        console.log(err)
    }
}