//создаем класс. Имя пишем с большой буквы. Класс это шаблон для сотрудников, изолированный внутри класса 
export default class Worker {   //export default экспортируем код в другой файл чтобы можно было работать удобней
    //создаем конструктор и записываем туда переменные, которые нам нужны из обьекта
    //через this записывает значения внутри конструктора и толькое его 
    constructor (name, surename, lastname, workStart, birthData, post, fullName, workFinish) {
        this.name = name 
        this.surename = surename 
        this.lastname = lastname 
        this.workStart = workStart 
        this.birthData = birthData 
        this.post = post 
        this.fullName = [name, surename, lastname]
        this.workFinish = workStart + 4
    }

    //Записываем функции без самого названия function и вставляем вместо worker this, чтобы прилепить их к конструктору

    // вытаскиваем из обьекта его ФИО


    get FIO () {
        return this.surename + ' ' + this.name + ' ' + this.lastname
    }


    // вытаскиваем из обьекта его стаж работы 
   /*  getWorkPeriod() {
        const currentTime = new Date()
        return currentTime.getFullYear() - this.workStart
    } */


    // вытаскиваем из обьекта его дату рождения 
    getbirthDataString() {
        const yyyy = this.birthData.getFullYear();
        let mm = this.birthData.getMonth() + 1;
        let dd = this.birthData.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '.' + mm + '.' + yyyy; 
    }


    // вытаскиваем из обьекта его возраст 
    getAge() {
        const today = new Date()
        let age = today.getFullYear() - this.birthData.getFullYear();
        let m = today.getMonth() - this.birthData.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < this.birthData.getDate())) {
            age--;
        }
        return age;
    }

    // вычисляем отучился студент 4 годя или нет
    getWorkPeriod() {
        //создаем переменные для дат которые будем вычислять
        const todayMonth = new Date().getMonth() + 1
        const todayYear = new Date().getFullYear()
        const finishWork = this.workStart + 4
        let kurs = ''

        if (todayMonth > 9) {
            if (todayYear - this.workStart + 1 > 4 ) {
                kurs = 'завершил'
                return this.workStart + '-' + finishWork + ' ('+ kurs +')'
            } else {
                kurs = todayYear - this.workStart + 1
                return this.workStart + '-' + finishWork + ' ('+ kurs + 'курс)'
            }
        } else {
            if (todayYear - this.workStart > 4) {
                kurs = 'закончил'
                return this.workStart + '-' + finishWork + ' ('+ kurs +')'
            } else {
                kurs = todayYear - this.workStart + 1
                return this.workStart + '-' + finishWork + ' ('+ kurs + 'курс)'
            }
        }

    }

        
}






