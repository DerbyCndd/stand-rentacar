import type { Vehicle, RentalCar } from "./types";

export const seedVehicles: Vehicle[] = [
  {
    id: "v1", brand: "BMW", model: "Série 1 116d", year: 2012, km: 165000, price: 10900, fuel: "Diesel", gearbox: "Manual", body: "hatch", color: "#5b5f63", seats: 5, engine: "2.0 116d", power: "116 cv",
    features: [
      "Jantes de liga leve 17\"", "Teto estrelado com iluminação ambiente", "Vidros escuros", "Suspensão rebaixada", "Volante multifunções", "Computador de bordo",
      "Bancos com design desportivo", "Painel de instrumentos BMW", "Climatização", "Sistema de áudio integrado", "Vidros elétricos", "Retrovisores exteriores", "Fecho centralizado", "Direção assistida",
    ],
    description: "Visual personalizado com identidade desportiva: teto estrelado, suspensão rebaixada e jantes de 17\". Excelente apresentação exterior e interior, revisão efetuada e pronto para circular. Garantia de 18 meses. Financiamento possível, aceite em até 24h, por aproximadamente 160 €/mês. Aceitamos Título de Residência e CPLP.",
    status: "disponivel", featured: true, isNew: false,
    colors: [{ name: "Cinzento mate", hex: "#5b5f63", qty: 1 }],
    photos: ["/cars/bmw-116d-01.jpg","/cars/bmw-116d-02.jpg","/cars/bmw-116d-03.jpg","/cars/bmw-116d-04.jpg","/cars/bmw-116d-05.jpg","/cars/bmw-116d-06.jpg","/cars/bmw-116d-07.jpg","/cars/bmw-116d-08.jpg","/cars/bmw-116d-09.jpg","/cars/bmw-116d-10.jpg","/cars/bmw-116d-11.jpg","/cars/bmw-116d-12.jpg","/cars/bmw-116d-13.jpg","/cars/bmw-116d-14.jpg","/cars/bmw-116d-15.jpg","/cars/bmw-116d-16.jpg","/cars/bmw-116d-17.jpg","/cars/bmw-116d-18.jpg","/cars/bmw-116d-19.jpg","/cars/bmw-116d-20.jpg","/cars/bmw-116d-21.jpg","/cars/bmw-116d-22.jpg","/cars/bmw-116d-23.jpg","/cars/bmw-116d-24.jpg"],
  },
  {
    id: "v2", brand: "Mercedes-Benz", model: "Classe A 180 AMG Pack Night", year: 2017, km: 129000, price: 18900, fuel: "Diesel", gearbox: "Automática", body: "hatch", color: "#f2f2f0", seats: 5, engine: "1.5 CDI", power: "109 cv",
    features: [
      "Pack desportivo AMG", "Pack Night com detalhes exteriores em preto", "Teto panorâmico", "Navegação GPS", "Caixa automática", "Jantes especiais AMG", "Faróis com assinatura luminosa Mercedes-Benz",
      "Bancos desportivos", "Volante desportivo multifunções", "Sistema multimédia com ecrã central", "Computador de bordo", "Ar condicionado", "Comandos no volante", "Acabamentos interiores desportivos",
      "Vidros elétricos", "Retrovisores exteriores elétricos", "Fecho centralizado",
    ],
    description: "Versão AMG Pack Night com presença elegante e desportiva, teto panorâmico e caixa automática. Motor diesel eficiente para o dia a dia. Excelente apresentação exterior e interior, revisão efetuada e pronto para circular. Garantia de 18 meses. Financiamento possível, aceite em até 24h, por apenas 239 €/mês. Aceitamos Título de Residência e CPLP.",
    status: "disponivel", featured: true, isNew: false,
    colors: [{ name: "Branco", hex: "#f2f2f0", qty: 1 }],
    photos: ["/cars/mercedes-a180-01.jpg","/cars/mercedes-a180-02.jpg","/cars/mercedes-a180-03.jpg","/cars/mercedes-a180-04.jpg","/cars/mercedes-a180-05.jpg","/cars/mercedes-a180-06.jpg","/cars/mercedes-a180-07.jpg","/cars/mercedes-a180-08.jpg","/cars/mercedes-a180-09.jpg","/cars/mercedes-a180-10.jpg","/cars/mercedes-a180-11.jpg","/cars/mercedes-a180-12.jpg","/cars/mercedes-a180-13.jpg","/cars/mercedes-a180-14.jpg","/cars/mercedes-a180-15.jpg","/cars/mercedes-a180-16.jpg","/cars/mercedes-a180-17.jpg","/cars/mercedes-a180-18.jpg","/cars/mercedes-a180-19.jpg","/cars/mercedes-a180-20.jpg","/cars/mercedes-a180-21.jpg","/cars/mercedes-a180-22.jpg","/cars/mercedes-a180-23.jpg","/cars/mercedes-a180-24.jpg","/cars/mercedes-a180-25.jpg","/cars/mercedes-a180-26.jpg","/cars/mercedes-a180-27.jpg","/cars/mercedes-a180-28.jpg"],
  },
  {
    id: "v3", brand: "Smart", model: "Forfour 1.0", year: 2017, km: 248000, price: 7900, fuel: "Gasolina", gearbox: "Automática", body: "hatch", color: "#e8651a", seats: 4, engine: "1.0", power: "71 cv",
    features: ["Caixa automática","Jantes de liga leve em preto","Carroçaria bicolor com acabamento desportivo","5 portas e 4 lugares","Bancos dianteiros em tecido","Volante multifunções","Computador de bordo","Rádio integrado","Comandos de climatização de fácil acesso","Direção assistida","Fecho centralizado","Vidros elétricos"],
    description: "Design urbano com uma combinação de cores que não passa despercebida. Dimensões compactas, ideais para estacionar em espaços reduzidos e para as deslocações diárias na cidade. Excelente apresentação, revisão efetuada e pronto para circular. Possibilidade de financiamento, por apenas 129 €/mês. Garantia de 18 meses. Aceitamos Título de Residência e CPLP.",
    status: "disponivel", featured: false, isNew: false,
    colors: [{ name: "Laranja e preto", hex: "#e8651a", qty: 1 }],
    photos: ["/cars/smart-forfour-01.jpg","/cars/smart-forfour-02.jpg","/cars/smart-forfour-03.jpg","/cars/smart-forfour-04.jpg","/cars/smart-forfour-05.jpg","/cars/smart-forfour-06.jpg","/cars/smart-forfour-07.jpg","/cars/smart-forfour-08.jpg","/cars/smart-forfour-09.jpg","/cars/smart-forfour-10.jpg","/cars/smart-forfour-11.jpg"],
  },
  {
    id: "v4", brand: "Mercedes-Benz", model: "Classe A AMG", year: 2015, km: 153000, price: 13900, fuel: "Gasolina", gearbox: "Manual", body: "hatch", color: "#c8321f", seats: 5, engine: "1.6", power: "122 cv",
    features: ["Pack desportivo AMG","Jantes de liga leve de 18\"","Sensores de estacionamento","Faróis dianteiros com projetores","Luzes diurnas","Sistema multimédia com ecrã central","Computador de bordo","Ar condicionado","Volante multifunções","Bancos desportivos","Vidros elétricos","Fecho centralizado"],
    description: "Design AMG com presença desportiva e marcante, em vermelho. Compacto e versátil para a cidade e viagens. Excelente apresentação, revisão efetuada e pronto para circular. Possibilidade de financiamento, por apenas 190 €/mês. Garantia de 18 meses. Aceitamos Título de Residência e CPLP.",
    status: "disponivel", featured: false, isNew: false,
    colors: [{ name: "Vermelho", hex: "#c8321f", qty: 1 }],
    photos: ["/cars/mercedes-a-amg-vermelho-01.jpg","/cars/mercedes-a-amg-vermelho-02.jpg","/cars/mercedes-a-amg-vermelho-03.jpg","/cars/mercedes-a-amg-vermelho-04.jpg"],
  },
  {
    id: "v5", brand: "Volkswagen", model: "Golf 8 GTI Clubsport", year: 2023, km: 65000, price: 44900, fuel: "Gasolina", gearbox: "Automática", body: "hatch", color: "#b3122a", seats: 5, engine: "2.0 TSI Turbo", power: "300 cv",
    features: ["Caixa automática DSG","Jantes especiais em preto","Faróis Full LED","Digital Cockpit","Navegação integrada","Apple CarPlay e Android Auto","Volante desportivo multifunções","Bancos desportivos","Iluminação ambiente LED multicolor","Câmara de marcha-atrás","Sensores de estacionamento","Dupla saída de escape","Pinças de travão vermelhas","Teto panorâmico","Vidros escurecidos","Spoiler traseiro","Ar condicionado automático","Modos de condução"],
    description: "Versão GTI Clubsport com personalidade desportiva e exclusiva: motor 2.0 TSI Turbo de 300 cv, design agressivo e excelente combinação de performance, tecnologia e conforto. Excelente apresentação, revisão efetuada e pronto para circular. Possibilidade de financiamento, por apenas 449 €/mês. Garantia de 18 meses. Aceitamos Título de Residência e CPLP.",
    status: "disponivel", featured: true, isNew: false,
    colors: [{ name: "Vermelho", hex: "#b3122a", qty: 1 }],
    photos: ["/cars/golf-8-gti-clubsport-01.jpg","/cars/golf-8-gti-clubsport-02.jpg","/cars/golf-8-gti-clubsport-03.jpg","/cars/golf-8-gti-clubsport-04.jpg","/cars/golf-8-gti-clubsport-05.jpg","/cars/golf-8-gti-clubsport-06.jpg","/cars/golf-8-gti-clubsport-07.jpg"],
  },
  {
    id: "v6", brand: "MINI", model: "Cooper Clubman Hampton 50 Anos", year: null, km: null, price: 9900, fuel: "Diesel", gearbox: "Manual", body: "hatch", color: "#2b3550", seats: 5, engine: "2.0 Diesel Stage 1", power: "143 cv (≈180 cv)",
    features: ["Versão especial Hampton 50 Anos","Bancos em pele","Som premium Harman Kardon","Navegação GPS","Duplo teto panorâmico","Faróis Xenon","Sensores de estacionamento traseiros","Luzes de nevoeiro","Vidros escurecidos","Modo de condução Sport","Dupla saída de escape","Apoio de braço dianteiro","Volante multifunções","Computador de bordo","Acabamentos interiores exclusivos Hampton"],
    description: "Edição especial Hampton, criada para celebrar os 50 anos da MINI. Motor 2.0 Diesel com Stage 1, atingindo aproximadamente 180 cv. Duplo teto panorâmico e som Harman Kardon. Excelente apresentação exterior e interior, revisão efetuada e pronto para circular. Financiamento aceite em até 24h, por aproximadamente 150 €/mês. Garantia de 18 meses. Aceitamos Título de Residência e CPLP.",
    status: "disponivel", featured: false, isNew: false,
    colors: [{ name: "Azul escuro", hex: "#2b3550", qty: 1 }],
    photos: ["/cars/mini-clubman-hampton-01.jpg","/cars/mini-clubman-hampton-02.jpg","/cars/mini-clubman-hampton-03.jpg","/cars/mini-clubman-hampton-04.jpg","/cars/mini-clubman-hampton-05.jpg","/cars/mini-clubman-hampton-06.jpg","/cars/mini-clubman-hampton-07.jpg","/cars/mini-clubman-hampton-08.jpg","/cars/mini-clubman-hampton-09.jpg","/cars/mini-clubman-hampton-10.jpg","/cars/mini-clubman-hampton-11.jpg","/cars/mini-clubman-hampton-12.jpg","/cars/mini-clubman-hampton-13.jpg","/cars/mini-clubman-hampton-14.jpg","/cars/mini-clubman-hampton-15.jpg","/cars/mini-clubman-hampton-16.jpg","/cars/mini-clubman-hampton-17.jpg","/cars/mini-clubman-hampton-18.jpg","/cars/mini-clubman-hampton-19.jpg"],
  },
  {
    id: "v7", brand: "Audi", model: "A3 Limousine S-Line RS3 Styling", year: 2017, km: 175000, price: 19900, fuel: "Diesel", gearbox: "Manual", body: "sedan", color: "#0c0c0e", seats: 5, engine: "1.6 TDI", power: "115 cv",
    features: ["Pack exterior S-Line","Kit RS3 Styling exterior","Lip frontal desportivo","Difusor traseiro desportivo","Quatro saídas de escape","Bancos desportivos em pele e Alcântara","Volante desportivo multifunções","Acabamentos interiores S-Line","Carroçaria Limousine"],
    description: "Transformação exterior RS3 Styling com presença marcante: elegância executiva e personalidade desportiva, numa silhueta Limousine. Interior com ambiente premium e inspiração desportiva. Motor 1.6 TDI de 115 cv, eficiente no dia a dia. Excelente apresentação exterior e interior, revisão efetuada e pronto para circular. Garantia de 18 meses. Financiamento aceite em até 24h, por apenas 249 €/mês. Aceitamos Título de Residência e CPLP.",
    status: "disponivel", featured: false, isNew: false,
    colors: [{ name: "Preto", hex: "#0c0c0e", qty: 1 }],
    photos: ["/cars/audi-a3-limousine-01.jpg","/cars/audi-a3-limousine-02.jpg","/cars/audi-a3-limousine-03.jpg","/cars/audi-a3-limousine-04.jpg","/cars/audi-a3-limousine-05.jpg","/cars/audi-a3-limousine-06.jpg","/cars/audi-a3-limousine-07.jpg","/cars/audi-a3-limousine-08.jpg","/cars/audi-a3-limousine-09.jpg"],
  },
  {
    id: "v8", brand: "Fiat", model: "Punto", year: null, km: null, price: null, fuel: null, gearbox: "Manual", body: "hatch", color: "#5b5d63", seats: 5, engine: "A confirmar", power: "A confirmar",
    features: ["5 portas", "Caixa manual", "Bancos em tecido"],
    description: "Fiat Punto de 5 portas em cinzento, com caixa manual e interior em tecido. Preço sob consulta: contacte-nos para saber o valor, o ano, os quilómetros e as condições de financiamento. Garantia de 18 meses e aceitamos Título de Residência e CPLP.",
    status: "disponivel", featured: false, isNew: false,
    colors: [{ name: "Cinzento", hex: "#5b5d63", qty: 1 }],
    photos: ["/cars/fiat-punto-01.jpg","/cars/fiat-punto-02.jpg","/cars/fiat-punto-03.jpg","/cars/fiat-punto-04.jpg","/cars/fiat-punto-05.jpg","/cars/fiat-punto-06.jpg","/cars/fiat-punto-07.jpg","/cars/fiat-punto-08.jpg","/cars/fiat-punto-09.jpg","/cars/fiat-punto-10.jpg","/cars/fiat-punto-11.jpg"],
  },
];

export const seedRentals: RentalCar[] = [];

export const rentalExtras = [
  { id: "driver", label: "Motorista profissional", price: 60, per: "dia" },
  { id: "insurance", label: "Seguro de danos completo", price: 15, per: "dia" },
  { id: "gps", label: "GPS / navegação", price: 5, per: "dia" },
  { id: "seat", label: "Cadeira de bebé", price: 5, per: "dia" },
  { id: "airport", label: "Entrega no aeroporto", price: 25, per: "único" },
] as const;
