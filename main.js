function alternarFormulario() {
   const formulario =  document.getElementById('formulariolancamento');
   const display = formulario.style.display;
   formulario.style.display = display === 'block' ? 'none' : 'block';


   const botaoNovoLancamento = document.getElementById('novolancamento');
   const texto = botaoNovoLancamento.firstChild;
   texto.data = texto.data.trim() === 'Esconder' ? 'Novo lançamento' : 'Esconder';
}