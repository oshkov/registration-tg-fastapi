const MAX_MB_PHOTO_SIZE = 5             // Максимальный размер фото в МБ
const MAX_PHOTO_AMOUNT = 3              // Максимальное количество загруженных фото
let CITIES_ARRAY = ['Москва', 'Казань', 'Калининград', 'Санкт-Петербург'];
let tg = window.Telegram.WebApp


// Скрипт для вывода списка городов
autocompleteCity(document.getElementById("city_input"), CITIES_ARRAY);

// Предпросмотр фото после выбора и проверка на размер фото
let photoInput = document.getElementById('photo_input')
photoInput.addEventListener('change', () => preview(MAX_MB_PHOTO_SIZE, MAX_PHOTO_AMOUNT))


// Переход от запроса имени к запросу возраста
let continueUsername = document.getElementById('continue_username')
continueUsername.addEventListener('click', function() {
    // Проверка на ввод имени
    let inputUsername = document.getElementById('username_input')
    if (inputUsername.value === '') {
        document.getElementById('error_username').textContent = 'Это обязательное поле'
        inputUsername.style = 'border: 2px solid red'
        return
    }

    // Убирается лого
    document.getElementById('corbots_logo').style.display = 'none'

    // Переход на следующий вопрос
    document.getElementById('username_form').style.display = 'none'
    document.getElementById('age_form').style.display = 'block'
})


// Переход от запроса возраста к запросу гендера
let continueAge = document.getElementById('continue_age')
continueAge.addEventListener('click', function() {
    // Проверка на ввод возраста
    let inputAge = document.getElementById('age_input')
    if (inputAge.value === '') {
        document.getElementById('error_age').textContent = 'Это обязательное поле'
        inputAge.style = 'border: 2px solid red'
        return
    } else if (inputAge.value < 18) {
        document.getElementById('error_age').textContent = 'Минимальный возраст 18 лет'
        inputAge.style = 'border: 2px solid red'
        return
    } else if (inputAge.value > 80) {
        document.getElementById('error_age').textContent = 'Максимальный возраст 80 лет'
        inputAge.style = 'border: 2px solid red'
        return
    }

    // Переход на следующий вопрос
    document.getElementById('age_form').style.display = 'none'
    document.getElementById('gender_form').style.display = 'block'
})


// Переход от запроса гендера к запросу города
let continueGender = document.getElementById('continue_gender')
continueGender.addEventListener('click', function() {
    // Проверка на выбор пола
    let inputGenderMale = document.getElementById('input_male')
    let inputGenderFemale = document.getElementById('input_female')

    if (inputGenderMale.checked === false && inputGenderFemale.checked === false) {
        document.getElementById('error_gender').textContent = 'Укажите свой пол'
        return
    }

    // Переход на следующий вопрос
    document.getElementById('gender_form').style.display = 'none'
    document.getElementById('city_form').style.display = 'block'
})


// Переход от запроса города к запросу предпочтений
let continueCity = document.getElementById('continue_city')
continueCity.addEventListener('click', function() {
    // Проверка на ввод города
    let inputCity = document.getElementById('city_input')
    if (inputCity.value != 'Казань') {
        document.getElementById('error_city').textContent = 'Выберите город из предложенных'
        return
    }

    // Переход на следующий вопрос
    document.getElementById('city_form').style.display = 'none'
    document.getElementById('preferences_form').style.display = 'block'
})


// Переход от запроса предпочтений к запросу целей
let continuePreferences = document.getElementById('continue_preferences')
continuePreferences.addEventListener('click', function() {
    // Проверка на выбор предпочтений
    let inputPreferMale = document.getElementById('input_with_male')
    let inputPreferFemale = document.getElementById('input_with_female')
    let inputPreferEveryone = document.getElementById('input_with_everyone')
    if (inputPreferMale.checked === false && inputPreferFemale.checked === false && inputPreferEveryone.checked === false) {
        document.getElementById('error_prefer').textContent = 'Укажите предпочтения'
        return
    }

    document.getElementById('preferences_form').style.display = 'none'
    document.getElementById('target_form').style.display = 'block'
})


// Переход от запроса целей к запросу О себе
let continueTarget = document.getElementById('continue_target')
continueTarget.addEventListener('click', function() {
    // Проверка на выбор цели
    let inputTargetCommunication = document.getElementById('communication')
    let inputTargetParty = document.getElementById('party')
    let inputTarget18 = document.getElementById('18+')
    let inputTargetDate = document.getElementById('date')
    let inputTargetSerious = document.getElementById('serious')
    if (inputTargetCommunication.checked === false &&
        inputTargetParty.checked === false &&
        inputTarget18.checked === false &&
        inputTargetDate.checked === false &&
        inputTargetSerious.checked === false ) {
        document.getElementById('error_target').textContent = 'Укажите хотя бы одну цель'
        return
    }

    // Переход на следующий вопрос
    document.getElementById('target_form').style.display = 'none'
    document.getElementById('photo_form').style.display = 'block'
})


// Переход от запроса целей к запросу О себе
let continuePhoto = document.getElementById('continue_photo')
continuePhoto.addEventListener('click', function() {
    // Проверка на наличие фото
    let inputPhotos = document.getElementById('photo_input')
    console.log(inputPhotos.value)
    if (inputPhotos.value === '') {
        document.getElementById('error_photo').textContent = 'Необходимо загрузить фото'
        return
    }

    // Переход на следующий вопрос
    document.getElementById('photo_form').style.display = 'none'
    document.getElementById('about_form').style.display = 'block'
})


// Обработка нажатия на кнопку регистрации
let registrateButton = document.getElementById('registrate')
registrateButton.addEventListener('click', function() {
    event.preventDefault() // Отмена отправки формы по умолчанию

    // Отправка формы
    let form = document.getElementById('form')
    form.submit()

    // Закрытие веб-приложения с регистрацией
    tg.close();
})