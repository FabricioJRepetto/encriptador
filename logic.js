const encodeBtn = document.getElementById('encode'),
    decodeBtn = document.getElementById('decode'),
    copyBtn = document.getElementById('copy-button'),
    message = document.getElementById('message'),
    noMessage = document.getElementById('no-message'),
    finalMessageContainer = document.getElementById('final-message'),
    input = document.getElementById('input');

let showingImage = true

const replaceSpecialChars = (text) => {
    let cleanText = text.replaceAll(/[àáäâã]/g, 'a')
        .replaceAll(/[èéëê]/g, 'e')
        .replaceAll(/[ìíïî]/g, 'i')
        .replaceAll(/[òóöôõ]/g, 'o')
        .replaceAll(/[ùúüû]/g, 'u')

    return cleanText
}

const showMessage = () => {
    if (message && noMessage && showingImage) {
        // ocultar imagen "sin mensaje"
        noMessage.style.display = 'none'
        // mostrar contenedor del mensaje final
        message.style.display = 'flex'
    }
}

const typeMessage = (text) => {
    const ele = finalMessageContainer
    ele.textContent = ''

    let i = 0
    const typerInt = setInterval(() => {
        ele.append(text[i], text[i + 1] || '')

        i += 2
        if (i >= text.length) {
            clearInterval(typerInt)
        }
    }, 2);
}

const encodeMessage = () => {
    if (input?.value.length > 0 && finalMessageContainer) {
        // pasar input a minusculas
        const text = input.value.toLowerCase()
        // checkear caracteres especiales (reemplazarlos?)
        let cleanText = replaceSpecialChars(text)

        // encriptar
        // replaceAll
        let newMessage = cleanText.replaceAll('e', 'enter')
            .replaceAll('i', 'imes')
            .replaceAll('a', 'ai')
            .replaceAll('o', 'ober')
            .replaceAll('u', 'ufat')

        // "for of" loop
        // for (const letter of text) {
        //     if (letter === 'e') {
        //         newMessage += 'enter'
        //     } else if (letter === 'i') {
        //         newMessage += 'imes'
        //     } else if (letter === 'a') {
        //         newMessage += 'ai'
        //     } else if (letter === 'o') {
        //         newMessage += 'ober'
        //     } else if (letter === 'u') {
        //         newMessage += 'ufat'
        //     } else {
        //         newMessage += letter
        //     }
        // }        

        // setear mensaje final
        // finalMessageContainer.textContent = newMessage
        typeMessage(newMessage)

        // ocultar imagen y mostrar mensaje
        showMessage()
    }
}

const decodeMessage = () => {
    if (input?.value.length > 0 && message && noMessage && finalMessageContainer) {
        // pasar input a minusculas
        const text = input.value.toLowerCase()
        // checkear caracteres especiales
        // retornar error
        if (/[àáäâèéëêìíïîòóöôùúüû]/g.test(text)) {
            alert('El texto contiene caracteres especiales, por lo tanto, no está encriptado.')
            return
        }
        // reemplazar y continuar
        // let cleanText = replaceSpecialChars(text)        

        // desencriptar
        let newMessage = text.replaceAll('enter', 'e')
            .replaceAll('imes', 'i')
            .replaceAll('ai', 'a')
            .replaceAll('ober', 'o')
            .replaceAll('ufat', 'u')

        // setear mensaje final
        finalMessageContainer.innerText = newMessage

        // ocultar imagen y mostrar mensaje
        showMessage()
    }
}

const copyToClipboard = () => {
    const text = finalMessageContainer.innerText

    if (navigator?.clipboard?.writeText) {
        return navigator.clipboard.writeText(text);
    }
};

encodeBtn && encodeBtn.addEventListener('mouseup', encodeMessage)
encodeBtn && decodeBtn.addEventListener('mouseup', decodeMessage)
copyBtn && copyBtn.addEventListener('mouseup', copyToClipboard)