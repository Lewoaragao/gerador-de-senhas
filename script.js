const range = document.querySelector("input[type='range']")
const valueLabelTamanho = document.getElementById('valueLabelTamanho')
const senha = document.querySelector("input[type='text']")
const checkLetrasMaiusculas = document.querySelector("#letrasMaiusculas")
const checkLetrasMinusculas = document.querySelector("#letrasMinusculas")
const checkCaracteresEspeciais = document.querySelector("#caracteresEspeciais")
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz'
const caracteresEspeciais = `"!@#$%¨&*()-_=+{}[]/~|;:§`
const arrayLetrasMaiusculas = letrasMaiusculas.split('')
const arrayLetrasMinusculas = letrasMinusculas.split('')
const arrayCaracteresEspeciais = caracteresEspeciais.split('')

// inicializando valores
window.onload = () => {
    senha.value = ''
    valueLabelTamanho.innerHTML = range.value
}

function visualizaValor(value, id) {
    document.getElementById(id).innerHTML = value
}

function gerarSenha() {
    let maxTiposAceitos = 1
    let listaTipos = []

    // limpando input senha
    senha.value = ''
    senha.value = getNumeroAleatorio()

    if(checkLetrasMaiusculas.checked) {
        maxTiposAceitos++
        listaTipos.push(1)
        senha.value += getLetraMaiusculaAleatoria()
    }

    if(checkLetrasMinusculas.checked) {
        maxTiposAceitos++
        listaTipos.push(2)
        senha.value += getLetraMinusculaAleatoria()
    }
    
    if(checkCaracteresEspeciais.checked) {
        maxTiposAceitos++
        listaTipos.push(3)
        senha.value += getCaractereEspecialAleatorio()
    }

    const arraySenha = senha.value.split('') // criando um array com cada elemento da senha

    /**
     * menos a quantidade de tipos ja incluidos
     * pois logo que marcado o checkbox já é
     * colocado um valor do tipo escolhido
     */
    for (let i = 1; i <= range.value - arraySenha.length; i++) {

        /**
         * fonte do cálculo a seguir
         * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
         * vai gerar um tipo aleatório para concatenar na senha
         */
        const tipoAleatorio = Math.floor(Math.random() * listaTipos.length)
        const elementoTipo = listaTipos[tipoAleatorio]

        // verifica o tipo gerado aleatório para concanetar na senha
        switch (elementoTipo) {
            case 1:
                senha.value += getLetraMaiusculaAleatoria()
                break
            case 2:
                senha.value += getLetraMinusculaAleatoria()
                break
            case 3:
                senha.value += getCaractereEspecialAleatorio()
                break
            default:
                senha.value += getNumeroAleatorio()
                break
        }

    }
}

function getNumeroAleatorio() {
    return Math.floor(Math.random() * 10) // gera um número aleatório de 0 a 9
}

function getLetraMaiusculaAleatoria() {
    return arrayLetrasMaiusculas[Math.floor(Math.random() * arrayLetrasMaiusculas.length)]
}

function getLetraMinusculaAleatoria() {
    return arrayLetrasMinusculas[Math.floor(Math.random() * arrayLetrasMinusculas.length)]
}

function getCaractereEspecialAleatorio() {
    return arrayCaracteresEspeciais[Math.floor(Math.random() * arrayCaracteresEspeciais.length)]
}

// método para copiar a senha como se estivesse copiando com um CTRL + C 
// e podendo após ser copiado usar o comando CTRL + V para colar onde quiser
function copiarSenha() {
    senha.select()
    senha.setSelectionRange(0, 9999); // para dispositivos móveis
    navigator.clipboard.writeText(senha.value);
    alert("Senha copiada com sucesso!")
}