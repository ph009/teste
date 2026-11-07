/*
 * @ちゃんねる — dados das boards e threads.
 * Formato do post: [autor, corpo, opções?]
 *   autor: rótulo interno que fixa o ID dentro da thread (mesmo rótulo = mesmo ID)
 *   opções: { name, mail, gap (minutos desde o post anterior), aa (true = arte ASCII) }
 * Conteúdo de fã, ambientado em Shibuya, setembro–outubro de 2008.
 */
window.BBS = {
  site: "@ちゃんねる",
  boards: [
    { id: "news", cat: "ニュース", name: "事件・事故＠ちゃんねる", pt: "Incidentes & Acidentes",
      noname: "名無しさん＠アットちゃんねる",
      rules: ["Notícias de crimes, incidentes e acidentes.", "Proibido postar dados pessoais de vítimas e suspeitos.", "Threads sobre a 'New Generation' vão na thread geral numerada."] },
    { id: "occult", cat: "趣味", name: "オカルト＠ちゃんねる", pt: "Ocultismo",
      noname: "本当にあった怖い名無し",
      rules: ["Paranormal, lendas urbanas, teorias da conspiração.", "Se você sentir que está sendo observado, não poste o endereço da sua casa."] },
    { id: "vip", cat: "雑談", name: "ニュー速VIP＠ちゃんねる", pt: "News VIP",
      noname: "以下、名無しにかわりましてVIPがお送りします",
      rules: ["VIP é um lugar para gente VIP.", "Threads de 'me ajudem' só com print. Sem print = pesca.", "Sejam gentis com os NEETs. Ou não."] },
    { id: "anime", cat: "趣味", name: "アニメ＠ちゃんねる", pt: "Anime",
      noname: "名無しさん＠お腹いっぱい。",
      rules: ["Discussão de anime em exibição e passado.", "Spoilers só com aviso.", "Guerras de waifu vão para o fundo do mar."] },
    { id: "jishin", cat: "ニュース", name: "地震＠ちゃんねる", pt: "Terremotos",
      noname: "名無しさん＠地震いっぱい",
      rules: ["Relatos de tremores. Poste horário e região.", "Nada de pânico. Nada de profecias. (Sim, estamos falando de você, 'seis anos depois')."] },
    { id: "net", cat: "PC", name: "ネットゲーム＠ちゃんねる", pt: "Jogos Online",
      noname: "名無しさん＠ログイン中",
      rules: ["MMORPG e jogos online em geral.", "RMT e venda de contas = ban."] },
  ],

  news: [
    ["2008/10/04", "Servidor sobrecarregado devido ao volume de acessos nas threads sobre os incidentes de Shibuya. Pedimos desculpas."],
    ["2008/09/29", "Lembrete: postar endereços, fotos ou nomes reais de pessoas envolvidas resultará em ban permanente."],
    ["2008/09/15", "Nova board aberta: 地震＠ちゃんねる (Terremotos)."],
    ["2008/08/01", "@ちゃんねる funcionando normalmente. Agradecemos aos ●doadores."],
  ],

  threads: [
    /* =============================================================== */
    { board: "news", key: "1222527600", start: "2008/09/28 00:12",
      title: "【渋谷】ニュージェネ連続事件 総合スレ Part14【集団ダイブ】",
      posts: [
        ["op", "Thread geral sobre os incidentes ocorridos em Shibuya que a mídia agora chama de \"New Generation\" (ニュージェネ).\n\n■ Resumo até agora\n１. 集団ダイブ (Mergulho em grupo) — Vários jovens saltaram juntos do alto de um prédio próximo ao cruzamento. Testemunhas dizem que eles estavam SORRINDO.\n２. Em todos os locais apareceu escrita a mesma frase.\n\n■ Proibido\n・Postar fotos dos corpos\n・Postar nomes reais\n\nPróxima thread: >>950 cria\nAnterior: 【渋谷】ニュージェネ連続事件 総合スレ Part13"],
        ["a", ">>1 乙\nfinalmente a thread nova", { gap: 1 }],
        ["b", "Eu estava em Shibuya naquela noite. Juro que ouvi um barulho tipo \"pof pof pof\" e depois todo mundo gritando", { gap: 2 }],
        ["c", ">>3\nfoto ou não aconteceu", { gap: 1 }],
        ["b", ">>4\nvocê quer mesmo uma foto daquilo? vai pra Shock Site", { gap: 3, mail: "sage" }],
        ["d", "O que me assusta é a frase.\nTodo mundo sabe qual é, né?\n\n「その目、だれの目？」", { gap: 4 }],
        ["e", ">>6\npare de escrever isso aqui pqp", { gap: 1 }],
        ["f", "Cara, por que \"New Generation\"? Quem inventou esse nome?", { gap: 6 }],
        ["a", ">>8\nfoi um programa de TV de tarde. Ficou porque soa como nome de banda", { gap: 2 }],
        ["g", "Meu chute: seita. Algum grupo de autoajuda que convenceu eles a pular. Pessoas normais não pulam sorrindo", { gap: 5 }],
        ["h", ">>10\nseita que faz todo mundo pular NO MESMO SEGUNDO? coordenação bizarra", { gap: 2 }],
        ["d", "Gente, vocês já repararam nas datas?\nTem padrão. Eu tô montando uma tabela.", { gap: 7 }],
        ["i", ">>12\nlá vem o detetive de quarto kkkkkk", { gap: 1 }],
        ["j", "", { gap: 3, aa: true, body:
"　　 ∧＿∧\n　　（　´∀｀）　＜　Pulei de alegria\n　　（　　　　）\n　　｜ ｜　|\n　　（_＿）＿）" }],
        ["e", ">>14\nnão tem graça. morreu gente", { gap: 1, mail: "sage" }],
        ["k", "Minha prima estuda no colégio Suimei e disse que os professores proibiram os alunos de andar sozinhos depois das 19h", { gap: 9 }],
        ["l", ">>16\nnão posta nome de escola, idiota", { gap: 2 }],
        ["k", ">>17\nfoi mal, só queria avisar", { gap: 3 }],
        ["d", "Tabela feita. Ainda não confio 100% mas olha só:\nincidente 1 → 7 de setembro? (fonte: blog)\nalguém confirma a data exata?\nSe o padrão se mantém, o próximo vem no fim do mês.", { gap: 15 }],
        ["m", ">>19\nse você acertar o próximo, a polícia vai bater na SUA porta lol", { gap: 2 }],
        ["n", "Vocês leram aquele blog de \"Shogun\"? O cara diz que sabe quem tá por trás", { gap: 8 }],
        ["a", ">>21\nShogun é lenda urbana. Um moleque rico que manda em Shibuya. Tá bom.", { gap: 2 }],
        ["o", "Gente, eu acho que o mais bizarro é: ninguém viu NINGUÉM empurrando. Câmeras também não. Então ou é suicídio coletivo ou...", { gap: 6 }],
        ["p", ">>23\nou...?", { gap: 1 }],
        ["o", ">>24\nou alguma coisa que a gente não consegue ver", { gap: 4 }],
        ["e", "tô fechando o navegador. boa noite", { gap: 3, mail: "sage" }],
        ["q", "minha mãe trabalha perto do 109 e disse que tem policial pra todo lado. não é só jornal sensacionalista", { gap: 18 }],
        ["r", "Alguém tem o link do vídeo da TV? Apagaram do NicoNico", { gap: 11 }],
        ["s", ">>28\nprocura \"ニュージェネ 映像\" mas não abre de madrugada sozinho, sério", { gap: 4 }],
        ["d", "Atualização: fiquei sabendo que em pelo menos um dos casos a frase foi escrita com algo que NÃO era tinta.\nNão vou falar o quê.", { gap: 25 }],
        ["i", ">>30\nfonte: vozes da sua cabeça", { gap: 1 }],
        ["t", "Shibuya tá estranha há meses. Seis anos depois do terremoto e ainda parece que a cidade não sarou", { gap: 13 }],
        ["u", ">>32\nfalando nisso, alguém sentiu o tremor de ontem às 3 e pouco?", { gap: 3 }],
        ["v", ">>33\nsenti! achei que era caminhão. vai lá na board de terremotos", { gap: 2 }],
        ["w", "Eu acho que vocês ficam alimentando a paranoia. Do ponto de vista estatístico, Shibuya tem milhões de pessoas passando por dia.", { gap: 20 }],
        ["d", ">>35\nentão me explica a frase em todos os locais, senhor estatístico", { gap: 4 }],
        ["w", ">>36\nimitadores. copycat. clássico.", { gap: 2 }],
        ["x", "Gente, alguém me tranquiliza: tem alguém aqui que mora sozinho em Shibuya? Ultimamente eu sinto que tem alguém me olhando quando eu tô no PC", { gap: 31 }],
        ["e", ">>38\nolha pra trás", { gap: 1 }],
        ["x", ">>39\nnão tem graça pra caralho", { gap: 1 }],
        ["y", ">>38\nfecha a cortina, desliga a webcam, dorme. tá tudo bem", { gap: 3 }],
        ["x", ">>41\nnão tenho cortina. eu moro num lugar meio... diferente", { gap: 5 }],
        ["z", "next thread quando? já tá chegando no limite de KB?", { gap: 40, mail: "sage" }],
        ["op", ">>43\nainda longe. postem o que souberem, mas com fonte.", { gap: 6 }],
      ]
    },

    /* =============================================================== */
    { board: "occult", key: "1222880100", start: "2008/10/02 02:15",
      title: "「その目、だれの目？」について考察するスレ",
      posts: [
        ["op", "Thread para analisar a frase que aparece nos locais dos incidentes de Shibuya.\n\n「その目、だれの目？」\n(De quem são esses olhos?)\n\nO que significa? Para quem é? Por que \"olhos\"?\nRegra: sem pânico, só análise."],
        ["a", "Interpretação 1: o autor está perguntando para a VÍTIMA. Tipo \"esses olhos com os quais você vê o mundo, são mesmo seus?\"", { gap: 6 }],
        ["b", "Interpretação 2: é para quem LÊ. A gente. Quem está olhando a cena. \"Você está assistindo, mas de quem é o olhar?\"", { gap: 4 }],
        ["c", ">>3\nisso me deu calafrio de verdade", { gap: 2 }],
        ["d", "Na tradição japonesa tem muito yokai ligado a olhos. 百々目鬼 (Dodomeki), 目目連 (Mokumokuren — os olhos nas paredes de papel)...", { gap: 10 }],
        ["e", ">>5\nMokumokuren é exatamente a sensação de estar sendo observado em casa. Combina demais", { gap: 3 }],
        ["f", "Eu acho que é sobre ilusão. Se você não sabe de quem é o olho, você não sabe se o que você vê é real.", { gap: 8 }],
        ["g", ">>7\n哲学ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!", { gap: 1 }],
        ["h", "Fato estranho: várias pessoas aqui dizem que sentem que estão sendo olhadas DEPOIS de ler a frase. Efeito psicológico ou...", { gap: 14 }],
        ["i", ">>9\nsugestão, efeito nocebo, viés de confirmação. dorme que passa", { gap: 2 }],
        ["j", "Eu vi a frase pichada num muro perto da estação. Não na cena de crime, num muro qualquer. Alguém espalhando?", { gap: 22 }],
        ["k", ">>11\nmodinha. adolescentes acham descolado. daqui a pouco vende em camiseta", { gap: 3 }],
        ["l", "", { gap: 5, aa: true, body:
"　　　　　　 ＿＿＿＿＿\n　　　　　／　　　　　 ＼\n　　　　／　 ●　　　●　 ＼\n　　　 |　　　　　　　　　|　 ＜ その目、だれの目？\n　　　　＼　　　＿＿　　 ／\n　　　　　 ＼＿＿＿＿＿／" }],
        ["c", ">>13\nPARA", { gap: 1 }],
        ["m", "Sobre os olhos: tem uma teoria de neurociência que diz que o cérebro \"completa\" o que a gente vê. Ou seja, metade do que você vê é invenção sua. Delírio controlado.", { gap: 17 }],
        ["f", ">>15\nexato!! é isso. delírio. 妄想. a frase pergunta se a realidade é sua ou é imposta por outro", { gap: 4 }],
        ["n", ">>16\nimposta por outro... tipo alguém projetando imagens na sua cabeça? ok agora a thread virou ficção científica", { gap: 3 }],
        ["o", "Ontem à noite eu acordei e jurei que tinha um monte de olhos na parede do meu quarto. Liguei a luz e nada. Normal ter isso?", { gap: 30 }],
        ["i", ">>18\nparalisia do sono. normalíssimo. para de ler esta thread antes de dormir", { gap: 2 }],
        ["o", ">>19\nmas eu não estava paralisado. eu levantei. eles continuaram lá até eu ligar a luz", { gap: 6 }],
        ["p", ">>20\nmoço. procure um psiquiatra. digo com carinho.", { gap: 3, mail: "sage" }],
      ]
    },

    /* =============================================================== */
    { board: "vip", key: "1223139600", start: "2008/10/05 02:00",
      title: "最近誰かに見られてる気がするんだが",
      posts: [
        ["op", "Sinto que alguém está me observando ultimamente\n\nSou estudante (de nome, kkk) e passo a maior parte do tempo no meu quarto jogando online e vendo anime.\nDe uns dias pra cá eu sinto um olhar. No PC, no banho, até quando estou dormindo.\nÉ só paranoia, né? Me falem que é paranoia."],
        ["a", "paranoia", { gap: 1 }],
        ["b", "paranoia\n\nfim de thread", { gap: 1 }],
        ["c", ">>1\nfoto do quarto", { gap: 1 }],
        ["op", ">>4\nnão vou postar foto. mas é... tipo... um contêiner. em cima de um prédio.", { gap: 3 }],
        ["d", ">>5\n？？？？？？？", { gap: 1 }],
        ["e", ">>5\nVOCÊ MORA NUM CONTÊINER?\n\nkkkkkkkkkkkkk", { gap: 1 }],
        ["f", ">>5\nisso é o quarto de NEET mais avançado que eu já vi", { gap: 1 }],
        ["op", ">>6-8\nmeus pais têm a empresa dona do prédio. me deixaram morar no topo. é confortável. tem PC, tem minha coleção de figures. e não tem ninguém me enchendo.", { gap: 4 }],
        ["g", ">>9\nde ricaço pra ricaço, que figure é a sua favorita", { gap: 2 }],
        ["op", ">>10\nSeira-tan de Blood Swallowtail, óbvio. edição limitada. ela é minha esposa.", { gap: 2 }],
        ["h", ">>11\nok, tudo explicado. ninguém te observa. é a Seira na prateleira olhando pra você 24h", { gap: 1 }],
        ["a", ">>12\nkkkkkkkkk melhor resposta da thread", { gap: 1 }],
        ["op", ">>12\nnão. a Seira-tan é um anjo, ela nunca me daria medo. é outra coisa.", { gap: 3 }],
        ["i", "OP, me fala uma coisa, você anda lendo as threads da New Generation?", { gap: 6 }],
        ["op", ">>15\n...um pouco. por quê?", { gap: 2 }],
        ["i", ">>16\nporque muita gente tá ficando assim. lê demais, começa a ver coisa. desliga isso.", { gap: 3 }],
        ["op", "Atualização bizarra.\nHoje fui obrigado a sair pra comprar comida. Uma garota de uniforme que eu NUNCA vi na vida me cumprimentou como se me conhecesse desde criança.\nE sorriu.\nEu fugi.", { gap: 140 }],
        ["d", ">>18\n妄想乙", { gap: 1 }],
        ["j", ">>18\nMANO UMA GAROTA TE CUMPRIMENTOU E VOCÊ FUGIU\n\nisso é a coisa mais VIP que já aconteceu nesta board", { gap: 1 }],
        ["k", ">>18\ndeixa eu adivinhar, ela era bonita? você vai morrer de remorso", { gap: 2 }],
        ["op", ">>21\nera. mas isso não importa. como ela sabia meu nome? 3D é perigoso. não confio em 3D.", { gap: 3 }],
        ["e", "", { gap: 2, aa: true, body:
"　　　　 ∧＿∧\n　　　 （ ・∀・）　　 ＜ Isso é uma GAL GAME de verdade\n　　　 （　∪ ∪\n　　　 と＿_）＿）" }],
        ["l", ">>22\ngente, e se ela é a pessoa que te observa?", { gap: 5 }],
        ["op", ">>24\npara de me assustar", { gap: 1 }],
        ["m", "OP, quantos anos você tem e há quanto tempo não fala com outro ser humano por mais de 5 minutos?", { gap: 7 }],
        ["op", ">>26\n17. e... sem comentários.", { gap: 2 }],
        ["n", ">>27\nainda dá tempo de virar normal. vai pra aula amanhã", { gap: 2 }],
        ["op", "Mais uma. Agora há pouco eu ouvi passos no telhado do lado de fora do contêiner. Às 2 da manhã.\nNão vou abrir a porta.", { gap: 50 }],
        ["o", ">>29\nabre e tira foto", { gap: 1 }],
        ["p", ">>29\nNÃO ABRE", { gap: 1 }],
        ["q", ">>29\nsério, liga pra polícia se tiver medo. não é piada", { gap: 2 }],
        ["op", ">>32\nparou. obrigado gente. vocês são legais. vou dormir de luz acesa.\nse eu sumir, digam à Seira-tan que eu a amei.", { gap: 9 }],
        ["a", ">>33\nboa noite, comandante do contêiner", { gap: 1 }],
      ]
    },

    /* =============================================================== */
    { board: "anime", key: "1222095600", start: "2008/09/22 23:00",
      title: "ブラッドスワローテイル Blood Swallowtail 第8話",
      posts: [
        ["op", "Thread de discussão do episódio 8 de Blood Swallowtail.\n\n・Spoilers do episódio liberados nesta thread\n・Discussão de figures: thread de figures\n・Seira é de todos (não briguem)"],
        ["a", "Seira-tan nesse episódio... eu chorei", { gap: 2 }],
        ["b", "A animação da luta caiu muito. Estúdio sem orçamento?", { gap: 3 }],
        ["c", ">>3\no episódio 8 sempre é o filler barato, normal", { gap: 2 }],
        ["d", "O rumor é que o próximo lote de figures da Seira vai ser ainda mais limitado. Vou acampar na Akiba.", { gap: 9 }],
        ["e", ">>5\nas edições limitadas sempre esgotam em 10 minutos. leva barraca", { gap: 2 }],
        ["f", "Quem acha que a Seira vai morrer no final levanta a mão\n\n　ノ", { gap: 6 }],
        ["a", ">>7\nnão diga isso nem de brincadeira. se a Seira morrer, eu morro também", { gap: 1 }],
        ["g", ">>8\n毎回こいつ (todo ep esse cara)", { gap: 2 }],
        ["h", "O detalhe da trilha no fim do episódio... aquele piano. Quem compôs?", { gap: 12 }],
        ["i", ">>10\nmesmo compositor do OP. O CD sai em novembro", { gap: 3 }],
        ["j", "", { gap: 4, aa: true, body:
"　　　＿＿＿_\n　　 ／　　 　 　＼\n　／　 ─　 　 ─＼\n／ 　　（●） 　（●） ＼　　 ＜ Seira-tan hshs\n|　 　 　 （__人__）　　 |\n＼　　　 ｀ ⌒´ 　 ／" }],
        ["b", ">>12\nporra de AA", { gap: 1, mail: "sage" }],
        ["k", "Fora do assunto, mas vocês viram que a loja de figures de Shibuya fechou cedo por causa dos incidentes? Medo da New Generation chegou na cultura otaku", { gap: 20 }],
        ["a", ">>14\nnem Shibuya é seguro pra comprar figure mais. o mundo acabou", { gap: 2 }],
      ]
    },

    /* =============================================================== */
    { board: "jishin", key: "1223012345", start: "2008/10/03 03:14",
      title: "【震度2】渋谷で地震多すぎじゃね？【また】",
      posts: [
        ["op", "Agora!! Tremeu em Shibuya!!\nSentiram?"],
        ["a", "揺れた！ (tremeu!)", { gap: 0 }],
        ["b", "tremeu aqui em Udagawacho. curto mas forte", { gap: 0 }],
        ["c", "揺れた (Dogenzaka)", { gap: 1 }],
        ["d", "Por que só Shibuya treme assim? Meu primo em Shinjuku não sentiu nada", { gap: 3 }],
        ["e", ">>5\nShibuya ainda tem falhas do Grande Terremoto de seis anos atrás. Pelo menos é o que dizem", { gap: 4 }],
        ["f", "Tá muito frequente. Toda semana uma vez. Isso é prenúncio de algo grande", { gap: 6 }],
        ["g", ">>7\nnada de profecia aqui. leia as regras", { gap: 1, mail: "sage" }],
        ["h", "A agência meteorológica nem registra metade desses. Tremor local? Que tipo de tremor é tão LOCAL?", { gap: 10 }],
        ["i", ">>9\nconstrução subterrânea? Tem aquele prédio novo enorme sendo construído", { gap: 3 }],
        ["j", "Eu tenho a impressão que os tremores acontecem perto das datas dos incidentes da New Generation. Mas deve ser coincidência.", { gap: 17 }],
        ["e", ">>11\n...não tinha pensado nisso", { gap: 2 }],
        ["g", ">>11\nnão traz isso pra cá. vai pra board de ocultismo", { gap: 1 }],
        ["k", "揺れた！！！！ de novo, 3:58", { gap: 25 }],
        ["a", ">>14\nsenti. o copo na mesa fez barulho", { gap: 0 }],
        ["l", "Pessoal de Shibuya: deixem um kit de emergência pronto. Água, lanterna, rádio. Não custa.", { gap: 6 }],
      ]
    },

    /* =============================================================== */
    { board: "vip", key: "1222700000", start: "2008/09/30 00:53",
      title: "将軍（ショーグン）って知ってる奴いる？",
      posts: [
        ["op", "Alguém aqui sabe quem é o tal do \"Shogun\"?\nVi em vários blogs que é um cara que ninguém nunca viu, mas que \"comanda\" Shibuya.\nTem quem diga que ele tem relação com os incidentes."],
        ["a", "lenda urbana nível homem-do-saco", { gap: 2 }],
        ["b", ">>1\ndizem que ele é jovem. que ele está doente. que ele nunca sai de um quarto. tipo um NEET supremo", { gap: 4 }],
        ["c", ">>3\nentão o OP da thread do contêiner é o Shogun kkkkkkk", { gap: 1 }],
        ["d", ">>4\nkkkkkkkkkk com Seira-tan na prateleira", { gap: 1 }],
        ["e", "Rumor que eu ouvi: tem um grupo de pessoas com \"poderes\" e o Shogun é o líder deles. A New Generation seria uma briga interna.", { gap: 9 }],
        ["f", ">>6\npoderes LOL. chuunibyou detectado", { gap: 1 }],
        ["g", "", { gap: 3, aa: true, body:
"　　　　　 ＿＿\n　　　　　/　　 ＼\n　　　　/　 ´_ゝ`)　＜ Meu braço direito... está selado...\n　　　 /　　　　|\n　　 　し'￣￣￣" }],
        ["e", ">>7 >>8\npodem rir. mas olha como ninguém consegue explicar o mergulho em grupo", { gap: 4 }],
        ["h", "Uma amiga minha diz que viu umas pessoas andando com espadas gigantes em Shibuya de madrugada. Ninguém mais via, só ela.", { gap: 15 }],
        ["f", ">>10\ncosplay. ou sua amiga precisa parar de beber", { gap: 1 }],
        ["h", ">>11\nela não bebe. e ela diz que as espadas \"pareciam feitas de vontade\". ela tá assustada de verdade", { gap: 5 }],
        ["i", "Uma espada que só algumas pessoas veem... isso é muito anime. Mas o tipo de anime que eu queria que fosse real", { gap: 7 }],
        ["j", ">>13\ncuidado com o que você deseja", { gap: 2 }],
      ]
    },

    /* =============================================================== */
    { board: "net", key: "1222400000", start: "2008/09/26 21:30",
      title: "【MMO】ギルドメンバー募集スレ Part33",
      posts: [
        ["op", "Thread para recrutamento de guildas em MMORPGs.\nFormato:\n【Jogo】\n【Servidor】\n【Guilda】\n【Horário】\n【Comentário】"],
        ["a", "【Jogo】 Esoteric Online\n【Servidor】 Ishtar\n【Guilda】 Night Swallowtail\n【Horário】 22h–5h (sim)\n【Comentário】 Só gente que joga todo dia. Sem drama.", { gap: 10 }],
        ["b", ">>2\n22h até 5h é horário de NEET profissional lol", { gap: 3 }],
        ["a", ">>3\né o horário da gente de verdade, o resto é amador", { gap: 2 }],
        ["c", "Alguém mais tá tendo lag pesado desde ontem? Parece que a conexão de Shibuya inteira tá ruim", { gap: 18 }],
        ["d", ">>5\naqui também. Dizem que é por causa do tremor que danificou cabos", { gap: 4 }],
        ["e", "Gente, no chat do jogo um cara ficou mandando a mesma frase pra mim. 「その目、だれの目？」\nbloqueei e ele voltou com outra conta", { gap: 35 }],
        ["f", ">>7\ndenuncia pro GM. é troll pegando carona na notícia", { gap: 2 }],
        ["e", ">>8\ndenunciei. o GM disse que não existe registro de nenhuma mensagem para mim.", { gap: 20 }],
        ["g", ">>9\n((((；ﾟДﾟ))))ｶﾞｸｶﾞｸﾌﾞﾙﾌﾞﾙ", { gap: 1 }],
      ]
    },

    /* =============================================================== */
    { board: "occult", key: "1221836400", start: "2008/09/19 23:40",
      title: "渋谷の都市伝説を集めるスレ",
      posts: [
        ["op", "Lendas urbanas de Shibuya. Cole aqui tudo o que você já ouviu.\nVou começar: a estátua do Hachiko vira a cabeça quando ninguém está olhando."],
        ["a", "Tem um prédio na colina onde, num certo andar, o elevador abre num corredor que não existe.", { gap: 5 }],
        ["b", "A garota que você vê na tela do PC atrás de você no reflexo. Clássico.", { gap: 4 }],
        ["c", "\"Os terremotos de Shibuya são causados por uma máquina debaixo da terra.\" — ouvi de um taxista", { gap: 8 }],
        ["d", ">>4\neste é o meu favorito. deixa mais concreto, tipo com nome de empresa", { gap: 2 }],
        ["c", ">>5\nele só disse \"uma empresa estrangeira\". e depois mudou de assunto e ficou quieto o resto da corrida", { gap: 6 }],
        ["e", "O Grande Terremoto de Shibuya teve uma quantidade de sobreviventes estranhamente específica. Tipo, a mesma idade. Lenda?", { gap: 14 }],
        ["f", ">>7\nnunca ouvi isso. fonte?", { gap: 1 }],
        ["e", ">>8\nnão lembro. mas lembro que me deu muito medo na época", { gap: 9 }],
        ["g", "Shibuya é tipo um palco. Tudo parece encenado demais. As pessoas passando no cruzamento parecem figurantes.", { gap: 22 }],
        ["h", ">>10\nnão sei se é uma lenda ou um diagnóstico de depressão", { gap: 2, mail: "sage" }],
      ]
    },
  ],

  /* Respostas automáticas: os "anônimos" que aparecem depois que você posta */
  autoReplies: {
    generic: [
      ">>{n}\nmeio estranho, mas ok", ">>{n}\n妄想乙", ">>{n}\nfonte?", ">>{n}\nisso", ">>{n}\nwww",
      ">>{n}\nconcordo", ">>{n}\nvai dormir", ">>{n}\ntem print?", ">>{n}\nnão entendi nada mas tá bom",
      ">>{n}\nnovato detectado, lê as regras", ">>{n}\n釣られないぞ (não vou morder a isca)",
    ],
    creepy: [
      ">>{n}\nvocê está sendo observado(a)", ">>{n}\nquem está aí do seu lado agora?",
      ">>{n}\nde quem são esses olhos?", ">>{n}\nvocê olhou pra trás?", ">>{n}\n…",
    ],
  },
};
