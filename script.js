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

let tiposAceitoUsuario = '' // concatena aqui os tipos escolhidos pelo usuário

function visualizaValor(value, id) {
    document.getElementById(id).innerHTML = value
}

function gerarSenha() {
    let minTiposAceitos = 1
    let maxTiposAceitos = minTiposAceitos

    checkLetrasMaiusculas.checked ? maxTiposAceitos++ : null
    checkLetrasMinusculas.checked ? maxTiposAceitos++ : null
    checkCaracteresEspeciais.checked ? maxTiposAceitos++ : null

    // inicializando input senha
    senha.value = ''

    for (let i = 1; i <= range.value; i++) {

        // fonte do cálculo a seguir
        // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        // vai gerar um tipo aleatório para concatenar na senha
        const tipoAleatorio = Math.floor(Math.random() * (maxTiposAceitos + 1 - minTiposAceitos) + minTiposAceitos)

        // verifica o tipo gerado aleatório para concanetar na senha
        switch (tipoAleatorio) {
            case 1:
                senha.value += Math.floor(Math.random() * 10) // gera um número aleatório de 0 a 10
                break
            case 2:
                senha.value += arrayLetrasMaiusculas[Math.floor(Math.random() * arrayLetrasMaiusculas.length + 1)]
                break
            case 3:
                senha.value += arrayLetrasMinusculas[Math.floor(Math.random() * arrayLetrasMinusculas.length + 1)]
                break
            case 4:
                senha.value += arrayCaracteresEspeciais[Math.floor(Math.random() * arrayCaracteresEspeciais.length + 1)]
                break
        }

    }
}

// método para copiar a senha como se estivesse copiando com um CTRL + C 
// e podendo após ser copiado usar o comando CTRL + V para colar onde quiser
function copiarSenha() {
    senha.select()
    senha.setSelectionRange(0, 9999); // para dispositivos móveis
    navigator.clipboard.writeText(senha.value);
    alert("Senha copiada com sucesso!")
}