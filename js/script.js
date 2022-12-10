const maxAmountOfCells = 35;
const doc = document;

const names = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь", "Октябрь","Ноябрь","Декабрь"]
let content = doc.getElementById("content"),
    header = doc.getElementById("header"),
    monthDisplay = doc.getElementById("monthDisplay"),
    yearDisplay = doc.getElementById("yearDisplay"),
    timeLasts = doc.getElementById("timeLasts"),
    currTimeDisplay = doc.getElementById("timeToDay"),
    forwButton = doc.getElementById("forward"),
    backButton = doc.getElementById("backward"),
    currDate = new Date(),
    trueDate = new Date()
setInterval(()=>{
    let temp = new Date()
    currTimeDisplay.innerHTML = `$${temp.getMinutes().toString().length < 2 ? "0" : ""}{temp.getHours()}:${temp.getMinutes().toString().length < 2 ? "0" : ""}${temp.getMinutes()}:${temp.getSeconds().toString().length < 2 ? "0" : ""}${temp.getSeconds()}`
}, 1000)
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
    function createCell(cl, t){
        el = doc.createElement('span')
        el.className = cl
        el.innerText = t
        el.addEventListener(('click'), ()=>{
            timeLasts.innerText = ""
            let trueDate = new Date()
            chosenDate = new Date(currDate.getFullYear(), currDate.getMonth(), t)
            let value = doc.createElement("li"),
                ms = (trueDate)
            value.innerText = chosenDate.toString()
            timeLasts.appendChild(value)
        })
        return el
    }
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
    for(let i = firstDayOfMonth; i > 0; i--){
        if(content.childNodes.length < maxAmountOfCells){
            content.appendChild(createCell("inactive", `${lastDateOfPrevMonth - i + 1}`, lastDateOfMonth))
        }
    }
    for(let i = 1; i <= lastDateOfMonth; i++){
        if(content.childNodes.length < maxAmountOfCells){
            let cell = createCell(
                (i == trueDate.getDate() &&
                currDate.getMonth() == trueDate.getMonth() &&
                currDate.getFullYear() == trueDate.getFullYear() ? "active" : "day"),
                `${i}`, lastDateOfMonth
            )
            content.appendChild(cell)
        }
    }
    for(let i = lastDayOfMonth; i < 6; i++){
        if(content.childNodes.length < maxAmountOfCells){
            content.appendChild(createCell("inactive", `${i - lastDayOfMonth + 1}`, lastDateOfMonth))
        }
    }

}

