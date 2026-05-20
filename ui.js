/* -----------------CRIAR O DISPLAY----------------- */

function criarDisplay()
{
    const display = document.getElementById('display');

    for (let l = 0; l < 6; l++)
    {
        const row = document.createElement('div');
        row.classList.add('row');

        for(let col = 0; col < 5; col++)
        {
            const tile = document.createElement('div');
            tile.id = `tile-${l}-${col}`;
            tile.classList.add('tile');
            row.appendChild(tile);
        }

        display.appendChild(row);
    }
}

/* -----------------ACTUALIZAR TILE----------------- */

function actualizarTile(linha,col,letra)
{
    const tile = document.getElementById(`tile-${linha}-${col}`);
    tile.textContent = letra;
}

/* -----------------ACTUALIZAR TILES----------------- */

function actualizarTiles(resultado)
{
    for(let i = 0; i < resultado.length; i++) {
        const tile = document.getElementById(`tile-${jogo.linhaActual}-${i}`);
        tile.classList.add(resultado[i]);
    }
}

/* -----------------CRIAR TECLADO----------------- */

function criarTeclado()
{
    const linhasTeclado = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    const teclado = document.getElementById('teclado');
    teclado.classList.add('teclado');

    linhasTeclado.forEach(linha => {
        const row = document.createElement('div');
        row.classList.add('row');

        linha.forEach(tecla => {
            const btn = document.createElement('button');
            btn.id = `tecla-${tecla}`;
            btn.textContent = tecla;
            btn.classList.add('tecla');
            if (tecla === 'ENTER' || tecla === '⌫'){
                btn.classList.add('tecla-especial');
            }
            btn.type = 'button';
            btn.onclick = () => {
                btn.blur();
                if (tecla === 'ENTER') submeterPalpite();
                else if (tecla === '⌫') apagarLetra();
                else addLetra(tecla);
            };
            row.appendChild(btn);
        });

        teclado.appendChild(row);
    });
}

/* -----------------ACTUALIZAR TECLADO----------------- */

function actualizarTeclado(resultado)
{
    for (let i = 0; i < resultado.length; i++)
    {
        const letra = jogo.palpiteActual[i];
        const tecla = document.getElementById(`tecla-${letra}`);

        if(!tecla) {
            continue;
        }

         if (resultado[i] === 'certo') {

            tecla.classList.remove(
                'presente',
                'ausente'
            );

            tecla.classList.add('certo');

        } else if (
            resultado[i] === 'presente'
        ) {

            if (!tecla.classList.contains('certo')) {

                tecla.classList.remove('ausente');

                tecla.classList.add('presente');
            }

        } else {

            if (
                !tecla.classList.contains('certo') &&
                !tecla.classList.contains('presente')
            ) {

                tecla.classList.add('ausente');
            }
        }
    }
}

/* ----------------- MENSAGENS ----------------- */

function mostrarMensagem(texto,tipo,duracao = 3000) 
{
    const msg = document.getElementById('mensagem');
    msg.textContent = texto;
    msg.className = '';
    msg.classList.add(tipo);
    msg.style.display = 'block';

    clearTimeout(timeoutMensagem);

    timeoutMensagem = setTimeout(() => {msg.style.display = 'none';}, duracao);

}