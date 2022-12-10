let doc = document,
    password = doc.getElementById("passwordValue"),
    lengthInput = doc.getElementById("rangeSettings"),
    lengthBar = doc.getElementById("lengthBar"),
    lengthNumber = doc.getElementById("lengthNum"),
    genButton = doc.getElementById("genButton"),
    checkBoxes = doc.querySelectorAll(".option input")
const alphabet = {
    lowerCase: 'abcdefghijklmnopqrstuvwxyz',
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols: "!@#$%^&*(){}[].,><?/\\|:;'\"",
    numbers: "0123456789",
    incSpacing: " ",
    excDuplicate: ""
}
window.onload = () =>{
    lengthNumber.innerHTML = lengthInput.value;
    stylizeBar(lengthInput.value)
}
function stylizeBar(val){
    const s = lengthBar.style
    if(val < 15){
        s.borderColor = "#ff3434"
        s.width = "25%"
    }
    else if(val >= 15 && val < 25){
        s.width = "50%"
        s.borderColor = "#40e66a"
    }
    else{
        s.width = "97.75%"
        s.borderColor = "#00a2ff"
    }

}
lengthInput.addEventListener("input", ()=>{
    let v = lengthInput.value
    lengthNumber.innerText = v;
    stylizeBar(v)
    generatePassword()
})
genButton.addEventListener(('click'), generatePassword)
function generatePassword(){
    let currAlphabet = '',
        currPass = "",
        excludeDuplicate = ''
    checkBoxes.forEach(option => {
        if(option.checked){
            currAlphabet += alphabet[option.id]
            if(option.id === "excDuplicate") excludeDuplicate = true
        }
    })
    if(excludeDuplicate === true && currAlphabet.length === 26)
        lengthInput.value <=26 ? lengthInput.value = lengthInput.value : lengthInput.value = 26
    for(let i = 0; i < lengthInput.value; i++){
        let s = currAlphabet[(Math.random() * (currAlphabet.length-1)).toFixed(0)]
        if(excludeDuplicate)
            !currPass.includes(s) ? currPass += s : i--
        else currPass += s
    }
    password.value = currPass
}

