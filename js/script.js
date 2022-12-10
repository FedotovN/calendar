const maxAmountOfCells = 35;
const doc = document;
const names = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь", "Октябрь","Ноябрь","Декабрь"]
let content = doc.getElementById("content"),
    header = doc.getElementById("header"),
    monthDisplay = doc.getElementById("monthDisplay"),
    yearDisplay = doc.getElementById("yearDisplay"),
    forwButton = doc.getElementById("forward"),
    backButton = doc.getElementById("backward"),
    currDate = new Date()
window.onload = () =>{
    fillTable()
    forwButton.addEventListener(('click'), (e)=>{
        e.preventDefault()
        currDate.setMonth(currDate.getMonth()+1)
        fillTable()
    })
    backButton.addEventListener(('click'), (e)=>{
        e.preventDefault()
        currDate.setMonth(currDate.getMonth()-1)
        fillTable()
    })
}
function fillTable(){
    content.innerHTML = ""
    let currDay = currDate.getDate(),
        firstDayOfMonth = new Date(currDate.getFullYear(), currDate.getMonth(), 1).getDay(),
        currMonth = names[currDate.getMonth()],
        currYear = currDate.getFullYear(),
        lastDateOfPrevMonth = new Date(currYear, currDate.getMonth(), 0).getDate(),
        lastDateOfMonth = new Date(currYear, currDate.getMonth()+1, 0).getDate(),
        lastDayOfMonth = new Date(currYear, currDate.getMonth(), lastDateOfMonth).getDay()
    monthDisplay.innerText = currMonth
    yearDisplay.innerText = currYear
    let trueDate = new Date()
    for(let i = firstDayOfMonth; i > 0; i--){
        if(content.childNodes.length < maxAmountOfCells){
            el = doc.createElement('span')
            el.className = "inactive"
            el.innerText = `${lastDateOfPrevMonth - i + 1}`
            content.appendChild(el)
        }
    }
    for(let i = 1; i <= lastDateOfMonth; i++){
        if(content.childNodes.length < maxAmountOfCells){
            el = doc.createElement('span')
            if(i == trueDate.getDate() && currDate.getMonth() == trueDate.getMonth()) el.className = "active"
            else el.classList += " day"
            el.innerText = `${i}`
            content.appendChild(el)
        }
    }

    for(let i = lastDayOfMonth; i < 6; i++){
        if(content.childNodes.length < maxAmountOfCells){
            el = doc.createElement('span')
            el.className = "inactive"
            el.innerText = `${i - lastDayOfMonth + 1}`
            content.appendChild(el)
        }
    }
}

