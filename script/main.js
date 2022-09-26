import Worker from './script.js' // импортируем таким образов в дргой файл код из соседнего файла // создаем переменную с дубликатом класса, только так это работает, или через массив 

//массив сотрудников 
const workers = [
/*     new Worker('Артем', 'Голобородько', 'Алексеевич', 2010, new Date(1989, 8, 25), 'Программист'),
    new Worker('Иван', 'Сельниченко', 'Дмитриевич', 2016, new Date(2010, 6, 15), 'Повар'),
    new Worker('Игорь', 'Кувшинников', 'Вячеславович', 2008, new Date(1988, 4, 12), 'Слесарь'), */
]

//сохраняем наших студентов
let arr = 'Cтуденты';
let work = workers;
function saveList(arr, work) {
    window.localStorage.setItem(arr, JSON.stringify(work))
}
    

//ищем нашу таблицу $-означает что это DOM элемент 

const $workersList = document.getElementById('workers-list'),
    $workersListTHAll = document.querySelectorAll('.workers_table th')

let column = '',
    columnDir = false


//создаем для наших сотрудников данные строки в таблицу  

function newWorkerTR(worker, obj,) {
    //создаем элементы
    const $workerTR = document.createElement('tr'),
        $fioTd = document.createElement('td'),
        $workStartTd = document.createElement('td'),
        $birthDataTd = document.createElement('td'),
        $postTd = document.createElement('td'),
        $buttonDisable = document.createElement('button')


    $workerTR.classList.add('.tr-group')
    $buttonDisable.classList.add('btn', 'btn-disable')
    $buttonDisable.textContent = 'x'

    //добавляем элементы в таблицу 

    $fioTd.textContent = worker.FIO;
    $birthDataTd.textContent = worker.getbirthDataString() + ' (' + worker.getAge() + ' лет)';
    $workStartTd.textContent = worker.getWorkPeriod();
    $postTd.textContent = worker.post;

    //добавляем элементы 
    $workerTR.append($fioTd),
        $workerTR.append($birthDataTd),
        $workerTR.append($workStartTd),
        $workerTR.append($postTd),
        $workerTR.append($buttonDisable)
        
       

    //кнока удаления из списка ПОСМОТОРЕТЬ ВИДЕО ТУДУ
    $buttonDisable.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
            for (let i = 0; i < work.length; i++) { //пробигаемся по массвиву workers        
                if ($workerTR == $workerTR) {
                    work.splice(i, 1)
                    break
                }
            }
            saveList(arr, work)
            $workerTR.remove();
        }
    });

    return $workerTR
}


//добавляем из формы в таблицу данные 
document.getElementById('add-worker').addEventListener('submit', function (event) {

    event.preventDefault() //надо чтобы прервать отправку налево и сделать ее внутреннеей. 

    const inp_name = document.getElementById('input-name')
    const inp_surname = document.getElementById('input-surename')
    const inp_lastname = document.getElementById('input-lastname')
    const inp_workstart = document.getElementById('input-workStart')
    const inp_birthdate = document.getElementById('input-birthData')
    const inp_post = document.getElementById('input-post')

    let mass = [inp_surname, inp_name, inp_lastname, inp_workstart, inp_birthdate, inp_post]

    if (checkRequired(mass) === false) {
        if (StudyStart(inp_workstart, 2000, Number(new Date().getFullYear())) === true) {
            if (BirthDateStart(inp_birthdate, new Date(1900, 1, 1), new Date()) === true) {
                workers.push(new Worker(
                    document.getElementById('input-name').value,
                    document.getElementById('input-surename').value,
                    document.getElementById('input-lastname').value,
                    Number(document.getElementById('input-workStart').value), // забираем число преобразуя ее из строки в число
                    new Date(document.getElementById('input-birthData').value), // преобразуем данные в дату из чисел полученных из даты дня рождения
                    document.getElementById('input-post').value,
                ))
                render()
            }
        }
    }

    saveList(arr, work)

    //чистим форму после отправки - рабочий код
    document.addEventListener('submit', (e) => {
        e.target.reset();
    });

})

//создаем функцию сортировки таблици по алфавиту при нажатии на шапку таблицы

function getSotrWorkers(prop, dir) {
    const workersCopy = [...workers]
    return workersCopy.sort(function (workerA, workerB) {
        if (!dir == false ? workerA[prop] < workerB[prop] : workerA[prop] > workerB[prop])
            return -1;
            saveList(arr, work)
    })
}

//создаем фильтр 

function filter(arrList, prop, value) {
    let result = [],
        copy = [...arrList]
    for (const item of copy) {
        if (String(item[prop]).toLowerCase().includes(value) == true) result.push(item)
    }
    return result
    saveList(arr, work)

}

function getFilter() {
    //получение значения из инпута(ввода) ФИЛЬТРАЦИЯ
    const inpFio = document.getElementById('filter-fio').value.toLowerCase().trim(),
        inpWorkStart = document.getElementById('filter-workStart').value.toLowerCase().trim(),
        inpFinish = document.getElementById('filter-finish').value.trim(),
        inpPost = document.getElementById('filter-post').value.toLowerCase().trim()

        saveList(arr, work)
    return {
        inpFio,
        inpWorkStart,
        inpFinish,
        inpPost
    }
}


//создаем функцию для сортровка массива по параметрам 
function render() {

    let workersCopy = [...workers] //создаем копию массива с которым будем работать
    $workersList.innerHTML = '' //очистка листа, чтобы поиск обновлялся и не накапливался

    workersCopy = getSotrWorkers(column, columnDir)

    workersCopy = filter(workersCopy, 'fullName', getFilter().inpFio)
    workersCopy = filter(workersCopy, 'workStart', getFilter().inpWorkStart)
    workersCopy = filter(workersCopy, 'workFinish', getFilter().inpFinish)
    workersCopy = filter(workersCopy, 'post', getFilter().inpPost)


    //чистим форму после отправки - рабочий код
    document.addEventListener('submit', (e) => {
        e.target.reset();
    });


    for (const worker of workersCopy) { //запускаем поиск по массиву 
        $workersList.append(newWorkerTR(worker))

    }

}

//чтобы кнопка отправки не перегружала страницу мы ищем форму по ай ди и убираем самбит.

document.getElementById('filter-worker').addEventListener('submit', function (events) {
    events.preventDefault()
    render(workers)

})


//поиск элементов для клика на названиях шапки таблицы
$workersListTHAll.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        columnDir = !columnDir
        render()
    })
})


//Проверка на минимальный год
function StudyStart(inputElements, min, max) {
    let correct_start = true
    if (inputElements.value < min) {
        showError(inputElements, 'Дата поступления не может быть раньше 2000 года');
        correct_start = false
    } else if (inputElements.value > max) {
        showError(inputElements, 'Дата поступления не может быть больше текущего года');
        correct_start = false
    }
    return correct_start
}

//Проверка на минимальный год
function BirthDateStart(inputElements, min, max) {
    let correct_date = true
    if (new Date(inputElements.value) < min) {
        showError(inputElements, 'Дата рождения не может быть меньше 01.01.1900');
        correct_date = false
    } else if (new Date(inputElements.value) > max) {
        showError(inputElements, 'Дата рождения не может быть больше текущей даты');
        correct_date = false
    }
    return correct_date
}


// Показываем ошибку под полем
function showError(input, message) {
    let plaseholder = input.getAttribute('placeholder')
    alert(message + ' ' + 'поле:' + ' ' + plaseholder);
}


// Проверка на заполнение полей
function checkRequired(inputElements) {
    let isRequired = false;
    inputElements.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, 'Требуется задать значение')
            isRequired = true;
        } else { }
    })
    return isRequired;
}


   //пытаюсь достать и записать данные из памяти
   const workList = localStorage.getItem(arr)
   const studentList = JSON.parse(workList) 
   //запускаем поиск по массиву 
   for (const worker of studentList) { 
     workers.push (
       new Worker (worker.name, worker.surename, worker.lastname, worker.workStart, new Date(worker.birthData), worker.post),
     )
   }

render(workers)


