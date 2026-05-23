const jogo = {
    /* Def variaveis */
    palavraSecreta: '',
    linhaActual: 0,
    colunaActual: 0,
    palpiteActual: [],
    letra: '',
    FimdoJogo: false,
    dificuldade: 'dificil',
    palavras: [] // lista vazia
};

let timeoutMensagem;

function iniciarComDificuldade(dificuldade) {
    jogo.dificuldade = dificuldade;
    jogo.palavras = dificuldade === 'facil' ? PALAVRAS_FACIL : PALAVRAS_DIFICIL;

    // esconder o menu para começar o jogo
    document.getElementById('menu-dificuldade').style.display = 'none';
    document.getElementById('jogo').style.display = 'flex';

    iniciarJogo();
}
/* -----------------INICIAR O JOGO----------------- */

function iniciarJogo() 
{
    procurarPalavra();

    // limpar antigo
    document.getElementById('display').innerHTML = '';
    document.getElementById('teclado').innerHTML = '';
    document.getElementById('mensagem').innerHTML = '';

    criarDisplay();
    criarTeclado();

    document.getElementById('reiniciar').style.display = 'block';
}

/* -----------------ESCOLHER PALAVRA----------------- */

function procurarPalavra() {

    const indice = Math.floor(Math.random() * jogo.palavras.length);
    jogo.palavraSecreta = jogo.palavras[indice];

}

/* -----------------INPUT USER----------------- */

function lidarTecla(tecla)
{
    if(jogo.FimdoJogo){
        return;
    }

    if (tecla === 'ENTER') {
        submeterPalpite();
        return;
    } 

    if (tecla === '⌫') {
        apagarLetra();
        return;
    }

    if (/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]$/.test(tecla)) {
        addLetra(tecla);
    }

}

/* -----------------ADICIONAR LETRAS ----------------- */

function addLetra(letra)
{
    if (jogo.colunaActual >= 5 || jogo.FimdoJogo) return;

    jogo.palpiteActual.push(letra);
    
    actualizarTile(jogo.linhaActual,jogo.colunaActual,letra);

    jogo.colunaActual++;
}

/* -----------------APAGAR LETRAS ----------------- */

function apagarLetra()
{
    if(jogo.colunaActual <= 0 || jogo.FimdoJogo) return;

    jogo.colunaActual--;
    
    jogo.palpiteActual.pop();

    actualizarTile(jogo.linhaActual,jogo.colunaActual,'');

}

/* -----------------SUBMETER PALPITE ----------------- */

function submeterPalpite()
{
    if (jogo.colunaActual < 5)
    {
        mostrarMensagem('Palavra incompleta!', 'erro', 2000);
        return;
    }
    const palpite = jogo.palpiteActual.join('');

    if (!jogo.palavras.includes(palpite)) 
    {
        mostrarMensagem('Palavra não existe!', 'erro', 2000);
        return;
    }

    const resultado = verificarPalpite();
    actualizarTiles(resultado);
    actualizarTeclado(resultado);

    if(palpite === jogo.palavraSecreta)
    {
        terminarJogo(true);
        return;
    }

    if(jogo.linhaActual >= 5)
    {
        terminarJogo(false);
        return;
    }

    // avançar na linha
    jogo.linhaActual++;
    jogo.colunaActual = 0;
    jogo.palpiteActual = [];

}

/* -----------------VERIFICAR PALPITE ----------------- */

function verificarPalpite()
{
    const resultado = Array(5).fill('ausente');
    const letraSecreta = [...jogo.palavraSecreta];
    const letraPalpite = [...jogo.palpiteActual];

    const palavra = jogo.palpiteActual.join('');

    // 1º verificar letras certas e no lugar certo
    for (let i = 0; i < 5; i++)
    {
        if (letraPalpite[i] === letraSecreta[i])
        {
            resultado[i] = 'certo';
            letraSecreta[i] = null;
            letraPalpite[i] = null;
        }
    }

    // 2º verificar letras certas no lugar errado
    for(let i = 0; i < 5; i++)
    {
        if (!letraPalpite[i]) continue;
        const id = letraSecreta.indexOf(letraPalpite[i]);
        if (id !== -1)
        {
            resultado[i] = 'presente';
            letraSecreta[id] = null;
        }
    }

    return resultado;

}

/* -----------------TERMINAR JOGO ----------------- */

function terminarJogo(vitoria)
{
    jogo.FimdoJogo = true;

    document.getElementById('reiniciar').style.display = 'block';

    if(vitoria) {
        mostrarMensagem(`Parabéns!🥰 Acertaste em ${jogo.linhaActual + 1} tentativa(s).`, 'sucesso', 4000);
    } else {
        mostrarMensagem(`Perdeste 😢 A palavra era: ${jogo.palavraSecreta}`, 'derrota', 4000);
    }
}

/* -----------------REINICIAR JOGO ----------------- */

function reiniciarJogo()
{
    jogo.palavraSecreta = '';
    jogo.linhaActual = 0;
    jogo.colunaActual = 0;
    jogo.palpiteActual = [];
    jogo.FimdoJogo = false;

    document.getElementById('display').innerHTML = '';
    document.getElementById('teclado').innerHTML = '';
    document.getElementById('reiniciar').style.display = 'none';
    document.getElementById('mensagem').style.display = 'none';

    document.getElementById('menu-dificuldade').style.display = 'block';
    document.getElementById('jogo').style.display = 'none';

    iniciarJogo();

}

/* ----------------- EVENTOS ----------------- */

function addEventos()
{
    document.addEventListener('keydown', (event) => {
        const tecla = event.key.toUpperCase();

        if (tecla === 'BACKSPACE')
        {
            lidarTecla('⌫');
            return;
        }

        if (tecla === 'ENTER')
        {
            lidarTecla('ENTER');
            return;
        }

        lidarTecla(tecla);

    });
}

/* ----------------- INICIAR ----------------- */

addEventos();
