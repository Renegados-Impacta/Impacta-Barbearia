const productsData = [
    {
      id: "1",
      title: "Shampoo Seda",
      price: 14.43,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_919914-MLU70955904275_082023-O.webp",
      permalink: "https://www.mercadolivre.com.br/shampoo-liso-perfeito-325ml-seda/p/MLB19176720?pdp_filters=item_id:MLB3343501000#wid=MLB3343501000&sid=search&intervention_type=MARKET&position=3&search_layout=grid&type=cart_intervention&tracking_id=a7ff8580-15ce-467c-87e0-18a3e99e2eec",
    },
    {
      id: "2",
      title: "Shampoo ClearMen",
      price: 18.50,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_999259-MLU72675211972_112023-O.webp",
      permalink: "https://www.mercadolivre.com.br/shampoo-anticaspa-limpeza-profunda-sports-men-400ml-clear/p/MLB19161483#polycard_client=search-nordic&searchVariation=MLB19161483&wid=MLB3339348451&position=3&search_layout=grid&type=product&tracking_id=e2d5bdd4-a6f5-420a-b74a-0bca3ea2f2e4&sid=search",
    },
    {
      id: "3",
      title: "Condionador Elseve",
      price: 22.90,
      thumbnail: "https://images-americanas.b2w.io/produtos/7492240654/imagens/condicionador-elseve-glycolic-gloss-400ml/7492240654_1_large.jpg",
      permalink: "https://www.mercadolivre.com.br/condicionador-loreal-paris-elseve-glycolic-gloss-400ml/p/MLB32487045?pdp_filters=shipping%3Afulfillment%7Cdeal%3AMLB1020501-1#polycard_client=search-nordic&searchVariation=MLB32487045&wid=MLB4440888036&position=5&search_layout=grid&type=product&tracking_id=ddd1e05f-69a7-4571-8e79-9a74ccf932dd&sid=search",
    },
    {
      id: "4",
      title: "Gel Fixador Clear Men",
      price: 31.80,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_766435-MLB49202518506_022022-O.webp",
      permalink: "https://www.mercadolivre.com.br/gel-fixador-aco-prolongada-controle-de-caspa-clear-men-300g/p/MLB18953216?pdp_filters=shipping%3Afulfillment%7Cdeal%3AMLB1020501-1#polycard_client=search-nordic&searchVariation=MLB18953216&wid=MLB4467429386&position=16&search_layout=grid&type=product&tracking_id=ab2f4163-86c1-4242-9316-f7a90414b5f4&sid=search",
    },
    {
      id: "5",
      title: "Pasta modeladora FoxMen",
      price: 25.00,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_724512-MLU74259805701_012024-O.webp",
      permalink: "https://www.mercadolivre.com.br/fox-for-men-pasta-modeladora-efeito-cabelo-black-150g/p/MLB30482240?pdp_filters=shipping%3Afulfillment%7Cdeal%3AMLB1020501-1#polycard_client=search-nordic&searchVariation=MLB30482240&wid=MLB4714864622&position=2&search_layout=grid&type=product&tracking_id=9063d3c9-6beb-4d2b-ae26-dc9543be4d7c&sid=search",
    },
    { id: "6",
      title: "Tinta Keraton ",
      price: 42.90,
      thumbnail: "https://a-static.mlcdn.com.br/800x560/keraton-banho-de-brilho-cafe-castanho-escuro-kert/seikiperfumaria/21687/eb8645ac31c7ec28636aac0f14ff1142.jpeg",
      permalink: "https://www.mercadolivre.com.br/keraton-banho-de-brilho-100-gr-1-unidade-escolha-wxz-cor-platina-prata-claro/p/MLB19493030?pdp_filters=shipping%3Afulfillment%7Cdeal%3AMLB1020501-1#polycard_client=search-nordic&searchVariation=MLB19493030&wid=MLB3700582663&position=7&search_layout=grid&type=product&tracking_id=b904956a-b678-41b7-b407-11920c08e467&sid=search",
  
    },
      { id: "7",
      title: "Pente modelador",
      price: 19.90,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_876976-MLU78004806184_082024-O.webp",
      permalink: "https://www.mercadolivre.com.br/pente-modelador-cabelo-masculino-escova-plastico-06-unidade-cor-preto/p/MLB35920560?pdp_filters=item_id:MLB3663433235#is_advertising=true&searchVariation=MLB35920560&position=2&search_layout=grid&type=pad&tracking_id=d4544aa4-557e-467a-990b-0725b1bd206d&is_advertising=true&ad_domain=VQCATCORE_LST&ad_position=2&ad_click_id=OWIxM2JjYjAtN2UxMS00YmQ1LWExZGQtNzJiZWVmNTk4NjE0",
  
    },
    { id: "8",
      title: "Kit barbeador Mondial",
      price: 139.90,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_698446-MLU77105247689_062024-O.webp",
      permalink: "https://www.mercadolivre.com.br/kit-barbeador-aparador-mondial-multi-groom-10-em-1-branco-cor-pretoazul-110v220v/p/MLB25838062?pdp_filters=item_id:MLB5211735068#is_advertising=true&searchVariation=MLB25838062&position=1&search_layout=grid&type=pad&tracking_id=32b59a18-0ff8-4f7a-89de-e350405316f4&is_advertising=true&ad_domain=VQCATCORE_LST&ad_position=1&ad_click_id=YTI3N2U0MWUtOTA1ZC00M2U2LThhYmYtZjE4Yjg4MjYxOWUx",
    },
    { id: "9",
      title: "Maquina de cabelo Dragão",
      price: 79.00,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_807014-MLA79931034513_102024-O.webp",
      permalink: "https://www.mercadolivre.com.br/rezzet-maquina-maquininha-de-barbear-cortar-cabelo-acabamento-dourada-potente/p/MLB20638750?pdp_filters=item_id:MLB3881715203#is_advertising=true&searchVariation=MLB20638750&position=2&search_layout=grid&type=pad&tracking_id=b8142e94-f18b-4621-987b-18a5d32d7b32&is_advertising=true&ad_domain=VQCATCORE_LST&ad_position=2&ad_click_id=OTUwMGRlZWEtNWY4MC00OGJmLWEzZmMtNGEyMmM0NjJmMjZj",
    },
    
    
  ];
  
  export default productsData;