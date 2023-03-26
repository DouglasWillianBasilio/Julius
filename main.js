let $ = document.querySelector.bind(document);

function alternarFormulario() {
   let formulario =  document.getElementById('formulariolancamento');
   let display = formulario.style.display;
   formulario.style.display = display === 'block' ? 'none' : 'block';


   let botaoNovoLancamento = document.getElementById('novolancamento');
   let texto = botaoNovoLancamento.firstChild;
   texto.data = texto.data.trim() === 'Esconder' ? 'Novo lançamento' : 'Esconder';
}

/*CONFIGURAÇÃO DE OPÇÕES DO GRAFICO*/

const opcoesGrafico = {
    responsive: true,
				title: {
					display: true,
					text: 'Dinheiro em caixa'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Dias'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Renda'
						}
					}]
				}
};

/*TRATANDO LANÇAMENTOS*/
let lancamentosArmazenados = localStorage.getItem('lancamentos');
let lancamentos = 
    lancamentosArmazenados ? JSON.parse(lancamentosArmazenados) : [];
renderizarLancamentos();
renderizarGrafico();

function lancar(event) {
    event.preventDefault();

    const multiplicadorValor = $('#gasto').checked ? -1 : 1;
    
    let lancamento = {
        valor: parseFloat($('#valor').value) * multiplicadorValor,
        descricao: $('#descricao').value,
        datalancamento: $('#datalancamento').value
    };

    lancamentos.push(lancamento);
    armazenarLancamentos();
    limparFormulario();
    renderizarLancamentos();
    renderizarGrafico();
    $('#valor').focus();
}

function renderizarGrafico() {
    if (lancamentos){
        const lancamentosOrdenados = lancamentos.sort((a, b) => a.dataLancamento - b.dataLancamento);
    }
}

function armazenarLancamentos() {
    localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
}

function limparFormulario() {
    $('#valor').value = '';
    $('#descricao').value = '';
    $('#datalancamento').value = '';
}

function renderizarLancamentos() {
    if(lancamentos) {
        let htmlLancamentos = '';
        let dinheiroEmCaixa = 0;

        for( let i = lancamentos.length - 1; i > -1; i--){
            let lancamento = lancamentos[i];

            let valor = lancamento.valor;
            dinheiroEmCaixa += valor;
            let classeLancamento = valor > 0 ? 'entrada' : ' gasto';
            let imagemLancamento = valor > 0 ? 'mais.png' : 'menos.png';

            valor = valor.toLocaleString(undefined, {
                minimumFractionDigits: 2
            });

            let dataLancamento = new Date(lancamento.dataLancamento).toLocaleDateString();

            let html = `
                <div class="blocolancamento">
                    <img src="img/${imagemLancamento}" alt="${classeLancamento}">

                    <div class="descricaolancamento">
                        <span class="valor ${classeLancamento}"> R$ ${valor} </span>
                        <span> ${dataLancamento} </span>
                        <span> ${lancamento.descricao} </span>
                    </div>
                </div>
            `;

            htmlLancamentos += html;
        }

        $('#arealancamentos').innerHTML = htmlLancamentos;
        renderizarDinheiroEmCaixa(dinheiroEmCaixa);
    }
}

function renderizarDinheiroEmCaixa (dinheiroEmCaixa) {
    let renda = dinheiroEmCaixa.toLocaleString(undefined, {
        minimumFractionDigits: 2
    });
    $ ('#renda').innerText = ` ${renda}`;

    let cor = 'black';
    if(dinheiroEmCaixa > 0) {
        cor = 'green';
    }else if (dinheiroEmCaixa < 0 ){
        cor = 'red'
    }
    $('#renda').style.color = cor;
   
}