// Script bağlantı kontrol
// console.log('script connected')

const container = document.querySelector(".container")
// console.log(container)

const totalInfoText = document.querySelector('.infoText')
// console.log(totalInfoText)
const count = document.getElementById('count')
// console.log(count)
const totalPrice = document.getElementById('totalPrice');
// console.log(totalPrice)
const movieSelectBox = document.getElementById('movie')
console.log(movieSelectBox.selectedIndex)
const seats = document.querySelectorAll('.seat:not(reserved)')
// console.log(seats)

// VERİ TABANI KAYIT FONKS.

const readFromDatabase = () => {

    const dbSelectedMovie = JSON.parse(localStorage.getItem('selectedMovie'))
    // console.log(dbSelectedMovie)

    if (dbSelectedMovie) {
        movieSelectBox.selectedIndex = dbSelectedMovie
    }

    const dbSelectedSeats = JSON.parse(localStorage.getItem('seatIndex'))
    // console.log(dbSelectedSeats)

    if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
        totalInfoText.classList.add('open')
        seats.forEach((seat, index) => {
            if (dbSelectedSeats.includes(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
}

readFromDatabase()

const saveToDatabase = (seatsindexs) => {
    // console.log(seatsindexs)

    localStorage.setItem('seatIndex', JSON.stringify(seatsindexs))
    localStorage.setItem('selectedMovie', JSON.stringify(movieSelectBox.selectedIndex))
}

// toplam fiyat hesaplama
const calcTotal = () => {

    // veri tabanı işlemleri

    // seçilen koltukların verisini tespit etme
    const selectedSeats = container.querySelectorAll('seat.selected')
    // console.log(selectedSeats)

    const allSelectedSeatsArray = []

    selectedSeats.forEach((selectedSeat) => {
        allSelectedSeatsArray.push(selectedSeat);
    });
    // console.log(allSelectedSeatsArray)

    const allSeatsArray = []

    seats.forEach((seat) => {
        allSeatsArray.push(seat)
    })
    // console.log(allSeatsArray)

    let selectedSeatsIndexs = allSelectedSeatsArray.map((selectedSeat) => {
        return allSeatsArray.indexOf(selectedSeat)
    })
    // console.log(selectedSeatsIndexs)

    // hesaplama işlemleri

    // seçili olan koltuk sayısını içeren koltukları tespit ederek bulduk
    const selectedSeatsCount = container.querySelectorAll('.seat.selected').length
    // console.log(selectedSeatsCount)

    // seçili koltuk var ise toplam fiyatı yaz/sil ekleme-görüntüleme
    if (selectedSeatsCount > 0) {
        totalInfoText.classList.add('open')
    } else {
        totalInfoText.classList.remove('open')
    }

    // koltuk sayıısı yazan text
    count.innerText = selectedSeatsCount

    totalPrice.innerText = selectedSeatsCount * movieSelectBox.value
    // console.log(totalPrice)
    saveToDatabase(selectedSeatsIndexs)
}

container.addEventListener('click', (e) => {
    // hedef elemanın yolu
    // console.log(e.target.offsetParent)
    const clickSeat = e.target.offsetParent
    // console.log(clickSeat)

    if (clickSeat.classList.contains('seat') &&
        !clickSeat.classList.contains('reserved')) {
        clickSeat.classList.toggle("selected")
    }
    calcTotal()
});

movieSelectBox.addEventListener('change', () => {
    // console.log(movieSelectBox.value)
    calcTotal()
})