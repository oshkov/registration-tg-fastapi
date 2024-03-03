// Предпросмотр фото и проверка на размер файла
function preview(MAX_MB_SIZE, MAX_PHOTO_AMOUNT) {
    let inputPhotos = document.getElementById('photo_input')    // Input из html
    let amountPhotos = inputPhotos.files.length                 // Общее количество фото

    // Очистка от старых фото
    let previewImgsBlock = document.getElementById('preview_imgs')
    previewImgsBlock.innerHTML = ''                      // Очистка блока с предпросмотром фото

    // Проверка на количество фото
    if (amountPhotos <= MAX_PHOTO_AMOUNT) {

        // Вывод фото в html
        num = 0
        while (amountPhotos > num) {
            photo = inputPhotos.files[num]

            // Проверка фото на размер, если размер больше MAX_MB_SIZE, то все фото отменяются
            if (photo.size > MAX_MB_SIZE * 1024 * 1024) {
                inputPhotos.value = ''                               // Очистка инпута
                previewImgsBlock.innerHTML = ''                      // Очистка блока с предпросмотром фото
                alert(`Размер фото не должен превышать ${MAX_MB_SIZE}мб!\n\n${photo.name} превышает допустимый размер для загрузки!`)
                return
            }
            
            htmlBlock = `
            <div class="image_block" id="image_block${num}">
                <img src="${URL.createObjectURL(photo)}">
            </div>
            `

            preview_imgs.insertAdjacentHTML('afterbegin', htmlBlock);
            num += 1
        }

        document.getElementById('input-file-btn').textContent = `Выбрано ${amountPhotos} фото`

    } else {
        alert(`Нельзя загружать более ${MAX_PHOTO_AMOUNT} фото!`)
        inputPhotos.value = ''                  // Очистка инпута
        previewImgsBlock.innerHTML = ''         // Очистка блока с предпросмотром фото
    }
}


// Функция вывода результатов поиска
function autocompleteCity(input, array) {

	// Вывод результатов при клике
    input.addEventListener("click", function() {
        // Закрытие прошлых результатов
        closeAllLists()
        let listResults = document.querySelector(".autocomplete-items")
		let inputValue = input.value

		// Затемнение тени под поиском
		document.querySelector(".autocomplete").style = 'filter: drop-shadow(0px 5px 17px rgba(34, 60, 80, 0.2))'

		// Если строка поиска пуста, то результаты не выводятся
		if (inputValue === '') {
			return
		}

        // Поиск по массиву
		let num = 0		// Счетчик для кнопок результатов
        for (i = 0; i < array.length; i++) {
            // Проверка на совпадение
            if (array[i].substr(0, inputValue.length).toUpperCase() == inputValue.toUpperCase()) {
				// Скругление полей поиска
                input.style = 'border-radius: 22px 22px 0px 0px;'

                // Добавление блока
                let htmlCity = `<div class="city city-${i}" id="${i}">${array[i]}</div>`
                listResults.insertAdjacentHTML('beforeend', htmlCity);

				let result = document.getElementsByClassName('city')
				result[num].addEventListener("click", function() {
					console.log(this.id);
					input.value = array[this.id]
				});
				num++
            }
        }

		try {
			// Сглаживание нижних краев последнего результата для красоты
			resultArray = document.querySelectorAll('.city')
			lastResult = resultArray[resultArray.length-1]
			lastResult.style = 'border-radius: 0px 0px 22px 22px'
		} catch (error) {
			return
		}
    })


	// Вывод результатов при вводе
    input.addEventListener("input", function() {
        // Закрытие прошлых результатов
        closeAllLists()
        let listResults = document.querySelector(".autocomplete-items")
		let inputValue = input.value

		// Затемнение тени под поиском
		document.querySelector(".autocomplete").style = 'filter: drop-shadow(0px 5px 17px rgba(34, 60, 80, 0.2))'

        // Поиск по массиву
		let num = 0		// Счетчик для кнопок результатов
        for (i = 0; i < array.length; i++) {
            // Проверка на совпадение
            if (array[i].substr(0, inputValue.length).toUpperCase() == inputValue.toUpperCase()) {
				// Скругление полей поиска
                input.style = 'border-radius: 22px 22px 0px 0px;'

                // Добавление блока
                let htmlCity = `<div class="city city-${i}" id="${i}">${array[i]}</div>`
                listResults.insertAdjacentHTML('beforeend', htmlCity);

				let result = document.getElementsByClassName('city')
				result[num].addEventListener("click", function() {
					input.value = array[this.id]
				});
				num++
			}
		}

		try {
			// Сглаживание нижних краев последнего результата для красоты
			resultArray = document.querySelectorAll('.city')
			lastResult = resultArray[resultArray.length-1]
			lastResult.style = 'border-radius: 0px 0px 22px 22px'
		} catch (error) {
			return
		}
    })


	// Если клик в любое место сайта, то поиск закрывается
	document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });

    // Функция очистки списка в случае клика в любое место кроме списка
    function closeAllLists(element) {
        if (element != input) {

			// Очистка блока с результатами
            let cities_list = document.querySelector(".autocomplete-items");
            cities_list.innerHTML = ''

			// Скругление всех углов поиска
            input.style = 'border-radius: 22px;'
			document.querySelector(".autocomplete").style = 'filter: drop-shadow(0px 3px 24px rgba(34, 60, 80, 0.1))'

			// console.log('Список очистился')
        }
    }
}