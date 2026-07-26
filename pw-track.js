/* PW — camada de medição de conversão (dataLayer / GTM)
   Eventos empurrados para o dataLayer; o GTM os encaminha para GA4 e Meta Pixel.
   Nada dispara sem IDs reais no GTM — seguro para rodar em preview. */
(function(){
  window.dataLayer = window.dataLayer || [];
  function push(o){ try{ window.dataLayer.push(o); }catch(e){} }

  // page_view — com o tipo da página (data-page no <body>)
  var b = document.body;
  push({ event:'page_view', page_type: b.getAttribute('data-page') || 'geral' });

  // view_item — páginas de produto marcam data-track-view + data-item + data-value
  if (b.hasAttribute('data-track-view')){
    push({ event:'view_item', item_name: b.getAttribute('data-item') || '', value: Number(b.getAttribute('data-value')||0), currency:'BRL' });
  }

  // cliques instrumentados por data-ev (contact / begin_checkout)
  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-ev]');
    if(!el) return;
    var o = { event: el.getAttribute('data-ev') };
    if(el.dataset.item)  o.item_name = el.dataset.item;
    if(el.dataset.value){ o.value = Number(el.dataset.value); o.currency = 'BRL'; }
    push(o);
  }, true);

  // envio do formulário da isca → generate_lead
  var f = document.querySelector('form[data-ev="generate_lead"]');
  if(f){ f.addEventListener('submit', function(){ push({ event:'generate_lead', item_name:'Planilha do Orçamento Real' }); }); }
})();
