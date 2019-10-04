
function mockTrocable() {
    return JSON.stringify({
        "trocableId": 2691,
        "name": "Samsung Galaxy S7 Edge 32GB Dourado Muito Bom  ",
        "priceInCents": 94900,
        "image": {
            "thumbnail": "https://imagens.trocafone.com/images/phones/th-s7-edge-dourado-1.png",
            "big": "https://imagens.trocafone.com/images/phones/dt-s7-edge-dourado-1.png"
        },
        "features": {
            "condition": "Muito Bom",
            "color": "Dourado",
            "storage": "32gb",
            "sims": "un chip"
        },
        "url": "https://www.trocafone.com/celulares/samsung/galaxy-s/galaxy-s7/m/galaxy-s7-edge#604-samsung-galaxy-s7-edge-32gb-dourado-muito-bom-6",
        "subtitle": null,
        "description": "Capture imagens com uma qualidade que só o Galaxy S5 pode proporcionar. O novo sensor do aparelho possui foco automático rápido, de 0,3 segundos, permitindo que você fotografe ações e movimentos enquanto eles acontecem. A tecnologia HDR, com resolução máxima de até 16MP, oferece um tom rico às imagens capturadas pelo S5. Ela é indicada para situações em que ocorra contraluz, pouca ou nenhuma luz. Também vale quando houver sombra. Outro recurso sensacional é o Foco Seletivo, que permite às imagens um foco específico, deixando o plano de fundo borrado, como em fotos profissionais. Além disso, você pode fazer filmes com resolução Ultra HD ou 4K. Imagens e vídeos muito mais claros e naturais. <\/br><\/br> O Galaxy S5 vem com leitor de digitais integrado ao botão Home para você ter mais segurança.  Ele resiste a suor, chuva, líquidos, areia e poeira. Assim, você tem muito mais liberdade para estar com seu telefone em qualquer lugar. Este é o Samsung Galaxy S5, pensado especialmente para você."
    })
}

function mockAccessories() {
    return JSON.stringify({
        modelId: 1321,
        name: "Capinha iphone",
        subtitle: "Capinha iphone roja",
        description: "Leve seu carregador portátil sempre com você e mantenha seu smartphone sempre carregado! <br /> <br />Com o power bank você não vai precisar se preocupar em como manter a duração da bateria do seu aparelho durante todo o dia.<ul><li>pepito</li><li>juancito</li></ul>",
        category: "charger",
        trocables: [
            {
                trocableId: 321322,
                name: "Capiña iphone red",
                priceInCents: 13400,
                image: {
                    thumbnail:
                        "https://static.fnac-static.com/multimedia/Images/ES/NR/21/a1/11/1155361/1540-1.jpg",
                    big:
                        "https://static.fnac-static.com/multimedia/Images/ES/NR/21/a1/11/1155361/1540-1.jpg"
                },
                features: {
                    "condition": "Novo",
                    "color": "red"
                }
            },
            {
                trocableId: 321323,
                name: "Capiña iphone blue",
                priceInCents: 15600,
                image: {
                    thumbnail:
                        "https://static.k-tuin.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/f/u/funda-iphone-8-silicone-case-azul-noche.jpg",
                    big:
                        "https://static.k-tuin.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/f/u/funda-iphone-8-silicone-case-azul-noche.jpg"
                },
                features: {
                    "condition": "Muito Bom",
                    "color": "blue",
                    "storage": "32gb"
                }
            }
        ]
    });
}


module.exports = {
    mockTrocable: mockTrocable,
    mockAccessories: mockAccessories,
}