const productsData = [
    {
      id: "1",
      title: "Shampoo Seda",
      price: 22.15,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_919914-MLU70955904275_082023-O.webp",
      permalink: "https://produto.mercadolivre.com.br/MLB-1660788416-shampoo-seda-liso-perfeito-325ml-_JM#polycard_client=search-nordic&position=28&search_layout=grid&type=item&tracking_id=ed61ff57-c25c-48a2-8a0a-5fb5dd46c3b2&wid=MLB1660788416&sid=search",
    },
    {
      id: "2",
      title: "Shampoo ClearMen",
      price: 29.90,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_999259-MLU72675211972_112023-O.webp",
      permalink: "https://www.mercadolivre.com.br/shampoo-anticaspa-limpeza-profunda-sports-men-400ml-clear/p/MLB19161483#polycard_client=search-nordic&searchVariation=MLB19161483&wid=MLB3339348451&position=3&search_layout=grid&type=product&tracking_id=e2d5bdd4-a6f5-420a-b74a-0bca3ea2f2e4&sid=search",
    },
    {
      id: "3",
      title: "Condionador Elseve",
      price: 41.90,
      thumbnail: "https://images-americanas.b2w.io/produtos/7492240654/imagens/condicionador-elseve-glycolic-gloss-400ml/7492240654_1_large.jpg",
      permalink: "https://produto.mercadolivre.com.br/MLB-3615713951-condicionador-sela-gloss-elseve-glycolic-gloss-400ml-_JM#polycard_client=search-nordic&position=22&search_layout=grid&type=item&tracking_id=a30dc606-8102-47d8-84fb-beaf3d0402d1&wid=MLB3615713951&sid=search",
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
      title: "Pasta modeladora Fox ForMen",
      price: 25.00,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_724512-MLU74259805701_012024-O.webp",
      permalink: "https://produto.mercadolivre.com.br/MLB-3413403527-pasta-modeladora-efeito-cabelo-black-150g-fox-for-men-_JM#polycard_client=search-nordic&position=16&search_layout=grid&type=item&tracking_id=e55a61f4-6eab-4a13-b311-2d98b0d4b286&wid=MLB3413403527&sid=search",
    },
    { id: "6",
      title: "Tinta Keraton ",
      price: 26.94,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_933012-MLU75592827421_042024-O.webp",
      permalink: "https://www.mercadolivre.com.br/keraton-banho-de-brilho-100-gr-1-unidade-escolha-wxz-cor-platina-prata-claro/p/MLB19493030?pdp_filters=shipping%3Afulfillment%7Cdeal%3AMLB1020501-1#polycard_client=search-nordic&searchVariation=MLB19493030&wid=MLB3700582663&position=7&search_layout=grid&type=product&tracking_id=b904956a-b678-41b7-b407-11920c08e467&sid=search",
  
    },
      { id: "7",
      title: "Pente modelador",
      price: 19.90,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_876976-MLU78004806184_082024-O.webp",
      permalink: "https://www.mercadolivre.com.br/pente-modelador-cabelo-masculino-escova-plastico-06-unidade-cor-preto/p/MLB35920560?pdp_filters=item_id:MLB3663433235#is_advertising=true&searchVariation=MLB35920560&position=2&search_layout=grid&type=pad&tracking_id=d4544aa4-557e-467a-990b-0725b1bd206d&is_advertising=true&ad_domain=VQCATCORE_LST&ad_position=2&ad_click_id=OWIxM2JjYjAtN2UxMS00YmQ1LWExZGQtNzJiZWVmNTk4NjE0",
  
    },
    { id: "8",
      title: "Amparador de pelos Mondial",
      price: 141.00,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_698446-MLU77105247689_062024-O.webp",
      permalink: "https://www.mercadolivre.com.br/aparador-de-pelos-super-groom-10-preto-azul-bg-03-mondial/p/MLB24001849?searchVariation=MLB24001849#polycard_client=search-nordic&searchVariation=MLB24001849&wid=MLB5322745758&position=2&search_layout=grid&type=product&tracking_id=e4e7ddde-89b6-4e71-bf00-08f6af9312f4&sid=search",
    },
    { id: "9",
      title: "Maquina de cabelo Dragão",
      price: 79.00,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_807014-MLA79931034513_102024-O.webp",
      permalink: "https://www.mercadolivre.com.br/rezzet-maquina-maquininha-de-barbear-cortar-cabelo-acabamento-dourada-potente/p/MLB20638750?pdp_filters=item_id:MLB3881715203#is_advertising=true&searchVariation=MLB20638750&position=2&search_layout=grid&type=pad&tracking_id=b8142e94-f18b-4621-987b-18a5d32d7b32&is_advertising=true&ad_domain=VQCATCORE_LST&ad_position=2&ad_click_id=OTUwMGRlZWEtNWY4MC00OGJmLWEzZmMtNGEyMmM0NjJmMjZj",
    },
    
    
  ];
  
  export default productsData;