const range = document.querySelector("input[type='range']")
const valueLabelTamanho = document.getElementById('valueLabelTamanho')
const senha = document.querySelector("input[type='text']")
const checkLetrasMaiusculas = document.querySelector("#letrasMaiusculas")
const checkLetrasMinusculas = document.querySelector("#letrasMinusculas")
const checkCaracteresEspeciais = document.querySelector("#caracteresEspeciais")
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz'
const caracteresEspeciais = `"!@#$%¨&*()-_=+{}[]/~|;:§`
const numeros = '0123456789'
const TIPO_NUMERO = 0
const TIPO_LETRA_MAIUSCULA = 1
const TIPO_LETRA_MINUSCULA = 2
const TIPO_CARACTERE_ESPECIAL = 3
const LISTA_TIPO = [TIPO_NUMERO, TIPO_LETRA_MAIUSCULA, TIPO_LETRA_MINUSCULA, TIPO_CARACTERE_ESPECIAL]

// inicializando valores
window.onload = () => {
    senha.value = ''
    valueLabelTamanho.innerHTML = range.value
}

/**
 * valor passado do input range para o id
 * do elemento span que foi feito para mostrar
 * o valor
 * @param {integer} value 
 * @param {string} idHtml 
 */
function visualizaValor(value, idHtml) {
    document.getElementById(idHtml).innerHTML = value
}

/**
 * ao clicar gera uma senha aleatória
 * de acordo com as opções marcadas pelo usuário
 * por padrão serão gerados somente números
 * 
 * @returns {string} senha aleatória
 */
function gerarSenha() {
    // inicializando listas
    let listaTiposSelecionados = []
    let listaTiposSelecionadosSort = []

    // limpando input senha
    senha.value = ''

    // tipo padrão
    listaTiposSelecionados.push(TIPO_NUMERO)

    // verifica os tipos marcados para adicionar a lista tipos selecionados
    checkLetrasMaiusculas.checked ? listaTiposSelecionados.push(TIPO_LETRA_MAIUSCULA) : ''
    checkLetrasMinusculas.checked ? listaTiposSelecionados.push(TIPO_LETRA_MINUSCULA) : ''
    checkCaracteresEspeciais.checked ? listaTiposSelecionados.push(TIPO_CARACTERE_ESPECIAL) : ''

    // embaralha a lista para que não comece sempre com o mesmo tipo
    listaTiposSelecionadosSort = embaralhaLista(listaTiposSelecionados)

    // adiciona o primeiro tipo aleatório sendo um dos selecionados ou o tipo padrão (número)
    listaTiposSelecionadosSort.forEach(e => {
        switch (e) {
            case 0:
                senha.value += getNumeroAleatorio()
                break
            case 1:
                senha.value += checkLetrasMaiusculas.checked ? getLetraMaiusculaAleatoria() : getNumeroAleatorio()
                break
            case 2:
                senha.value += checkLetrasMinusculas.checked ? getLetraMinusculaAleatoria() : getNumeroAleatorio()
                break
            case 3:
                senha.value += checkCaracteresEspeciais.checked ? getCaractereEspecialAleatorio() : getNumeroAleatorio()
                break
        }
    })

    const max = range.value - senha.value.length

    /**
     * menos a quantidade de tipos ja incluidos
     * pois logo que marcado o checkbox já é
     * colocado um valor do tipo escolhido
     */
    for (let i = 1; i <= max; i++) {

        /**
         * fonte do cálculo a seguir
         * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
         * vai gerar um tipo aleatório para concatenar na senha
         */
        const tipoAleatorio = Math.floor(Math.random() * listaTiposSelecionados.length)
        const elementoTipo = listaTiposSelecionados[tipoAleatorio]

        /**
         * verifica o tipo gerado aleatório para concanetar na senha
         * caso o tipo esteja selecionado concatena aquele tipo,
         * caso não, gera um número aleatório para completar a senha
         */
        switch (elementoTipo) {
            case 0:
                senha.value += getNumeroAleatorio()
                break
            case 1:
                senha.value += getLetraMaiusculaAleatoria()
                break
            case 2:
                senha.value += getLetraMinusculaAleatoria()
                break
            case 3:
                senha.value += getCaractereEspecialAleatorio()
                break
        }
    }
}

/**
 * Para embaralhar todos os tipos de lista
 * retornando com os mesmos valores
 * porém em ordem diferente
 * @param {array} lista 
 * @returns {array} lista embaralhada 
 */
function embaralhaLista(lista) {
    // Loop em todos os elementos
    for (let i = lista.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    // Retornando lista com aleatoriedade
    return lista;
}

function getNumeroAleatorio() {
    return numeros[Math.floor(Math.random() * numeros.length)]
}

function getLetraMaiusculaAleatoria() {
    return letrasMaiusculas[Math.floor(Math.random() * letrasMaiusculas.length)]
}

function getLetraMinusculaAleatoria() {
    return letrasMinusculas[Math.floor(Math.random() * letrasMinusculas.length)]
}

function getCaractereEspecialAleatorio() {
    return caracteresEspeciais[Math.floor(Math.random() * caracteresEspeciais.length)]
}

/**
 * método para copiar a senha como se estivesse copiando com um CTRL + C 
 * e podendo após ser copiado usar o comando CTRL + V para colar onde quiser
 */
function copiarSenha() {
    senha.select()
    senha.setSelectionRange(0, 9999); // para dispositivos móveis
    navigator.clipboard.writeText(senha.value);
    alert("Senha copiada com sucesso!")
}