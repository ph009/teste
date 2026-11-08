/*
 * @channel — boards and threads.
 * Post format: [author, body, options?]
 *   author: internal tag; the same tag gives the same ID within a thread (per day)
 *   options: { name, mail ("sage"/"age"/...), gap (minutes after previous post), aa (true = ASCII art), body }
 * Calendar: weekdays follow the in-game calendar; the year is always shown as "200X".
 * Fan-made content. All posts are original writing set during the New Gen cases.
 */
window.BBS = {
  site: "@channel",
  worldStart: [2008, 9, 12], // Oct 12 (month is 0-based) — two days after Vampbuyer

  boards: [
    { id: "figure", cat: "Hobby", name: "Figure/Eroge Board", noname: "Anonymous Prophet", theme: "",
      mascot: "(ಠ ಠ)つ", mascotSub: "eeeeeee",
      slogan: "A shelf full of plastic is an otaku's castle.",
      rules: ["Duplicate threads are prohibited.", "Thread names should be easy to search.", "No posting leaked scans before release day."] },
    { id: "incident", cat: "News", name: "Incidents Board", noname: "It is I, Anonymous!", theme: "t-night",
      mascot: "(ll´Д`ll)", mascotSub: "!!!!",
      slogan: "Every case, every rumor, every night.",
      rules: ["New Gen discussion goes in the numbered General thread.", "No real names, addresses or photos of victims.", "Post sources. Blogs are not sources."] },
    { id: "occult", cat: "Hobby", name: "Occult Board", noname: "A Nameless Oracle", theme: "t-occult",
      mascot: "(◎_◎)", mascotSub: "...",
      slogan: "If you feel a gaze, do not turn around.",
      rules: ["Paranormal, urban legends and conspiracies.", "Do not post where you live, even as a joke.", "Delusions welcome. Proof even more welcome."] },
    { id: "vip", cat: "Chat", name: "News VIP Board", noname: "The Following Post Will Be Presented By Anonymous", theme: "t-vip",
      mascot: "(・∀・)", mascotSub: "VIP",
      slogan: "VIP is a place for VIPs only.",
      rules: ["No pic = didn't happen.", "Be nice to NEETs. Or don't.", "Fishing threads will be sunk."] },
    { id: "netgame", cat: "PC", name: "Online Games Board", noname: "Anonymous Logged In", theme: "t-field",
      mascot: "(`・ω・´)", mascotSub: "LV50",
      slogan: "Sleep is a debuff.",
      rules: ["MMORPGs and online games.", "RMT and account trading = ban.", "Guild drama goes in its own thread."] },
    { id: "quake", cat: "News", name: "Earthquake Board", noname: "Anonymous Who Felt It", theme: "t-quake",
      mascot: "((((；ﾟДﾟ))))", mascotSub: "",
      slogan: "Time, place, intensity. Then panic.",
      rules: ["Post the time and area of every tremor.", "No prophecies. No doomsday dates."] },
  ],

  news: [
    ["200X/10/11", "Heavy load on the server due to traffic in the Shibuya threads. Some boards may be slow."],
    ["200X/10/10", "Reminder: posting victims' photos or real names results in a permanent ban."],
    ["200X/09/20", "New board opened: Earthquake Board."],
    ["200X/08/01", "@channel is operating normally. Thank you, ● supporters."],
  ],

  threads: [
    /* =============================================================== */
    { board: "incident", key: "1223737200", start: "2008/10/11 23:40",
      title: "[Shibuya] New Gen General Part 22 [Vampbuyer]",
      posts: [
        ["op", "General thread for the string of Shibuya incidents people are calling \"New Generation Madness\" (New Gen).\n\nKnown so far (dates are when the news broke):\n09/07  Group Dive\n09/19  Manchild\n09/29  Cruc-affixion\n10/10  Vampbuyer\n\nRules: no corpse pics, no real names, sources or GTFO.\nNext thread by >>950\nPrev: [Shibuya] New Gen General Part 21"],
        ["a", ">>1 thx for the new thread", { gap: 1, mail: "sage" }],
        ["b", "so the Taboo! listing was legit? someone actually put that up for auction??", { gap: 2 }],
        ["c", ">>3\nthe listing got pulled in like an hour but people screencapped it\nand the words on the wall in the pic. you know the ones", { gap: 3 }],
        ["d", "Whose eyes are those eyes?", { gap: 1 }],
        ["e", ">>5\nstop posting that ffs (;´Д`)", { gap: 1, mail: "sage" }],
        ["f", "Calling it now. That phrase is gonna be on T-shirts by next week.", { gap: 4 }],
        ["g", ">>7\nalready saw some kid at the crossing yelling it at his friends\nShibuya never changes", { gap: 2 }],
        ["h", "", { gap: 5, aa: true, body:
"New Gen News Bear (ll´(ｪ)`ll)\n\nNo.1  Group Dive       ﾉﾉﾉ---(o|||||´□`)o\nNo.2  Manchild         ＼(||`□´||;;＼)\nNo.3  Cruc-affixion    †|†|(@□@)|†|†\nNo.4  Vampbuyer        ξ--(;´ξ`;)---ξ\nNo.? ...to be continued!!! (ﾟдﾟ)ｶﾞｸﾌﾞﾙ" }],
        ["i", ">>9\nthe bear is back lmao\nalso \"to be continued\" is not funny anymore", { gap: 2 }],
        ["j", "Serious question. Does anyone actually think this is ONE guy? The methods are all completely different.", { gap: 6 }],
        ["k", ">>11\nthe police seem to think they're unrelated. separate teams on each case", { gap: 3 }],
        ["j", ">>12\nThen why is it always Shibuya, always within a few weeks, always this theatrical?", { gap: 2 }],
        ["l", ">>13\nbecause Shibuya is full of attention whores and copycats", { gap: 1, mail: "sage" }],
        ["m", "Cruc-affixion still gets me. Witnesses heard hammering in the middle of the night and nobody saw anyone. How do you nail someone to a concrete wall without being seen", { gap: 9 }],
        ["n", ">>15\ninvisible man confirmed (ﾟ∀ﾟ)", { gap: 1 }],
        ["m", ">>16\nlaugh all you want. read the reports. nobody saw ANYONE.", { gap: 2 }],
        ["o", "the Group Dive video on MewTube is still up btw. it's been mirrored like 40 times", { gap: 14 }],
        ["p", ">>18\nwatched it once. never again. they were smiling.", { gap: 3 }],
        ["q", ">>18\nsomeone in the video mutters something right before the jump. people are saying it's THE phrase. listen with headphones", { gap: 4 }],
        ["e", ">>20\nnope. nope nope nope", { gap: 1, mail: "sage" }],
        ["r", "if that's true then the phrase was there from case No.1\nwhich means Vampbuyer didn't start it\nwhich means it's all connected", { gap: 3 }],
        ["k", ">>22\nor the audio is just noise and everyone hears what they want to hear\nclassic", { gap: 2 }],
        ["s", "I live near Center Gai. There are cops literally everywhere now. This isn't just tabloid hype.", { gap: 22 }],
        ["t", "Anybody else notice the dates? 7, 19, 29, 10...\nI'm making a table, don't laugh", { gap: 18 }],
        ["i", ">>25\nhere comes the bedroom detective", { gap: 1 }],
        ["u", ">>25\nif you predict the next one the cops will be knocking on YOUR door lol", { gap: 2 }],
        ["v", "Phantasm fans are claiming FES predicted Cruc-affixion in a song. there's a thread on Figure/Eroge of all places", { gap: 30 }],
        ["w", ">>28\nwhy is a band thread on the figure board", { gap: 1 }],
        ["v", ">>29\n@channel logic. don't ask", { gap: 2 }],
        ["x", "Is there anyone here who lives alone in Shibuya? Lately I feel like something is looking at me when I'm at my PC", { gap: 41 }],
        ["e", ">>31\nturn around", { gap: 1 }],
        ["x", ">>32\nnot funny at all", { gap: 1 }],
        ["y", ">>31\nclose the curtain, cover the webcam, go to bed. you're fine", { gap: 3 }],
        ["x", ">>34\nI don't have curtains. my place is kind of... unusual", { gap: 5 }],
        ["z", "kb check? are we near the limit yet", { gap: 50, mail: "sage" }],
        ["op", ">>36\nnot even close. keep posting, but with sources.", { gap: 6 }],
      ]
    },

    /* =============================================================== */
    { board: "figure", key: "1223352000", start: "2008/10/07 09:20",
      title: "[Prophecy] Phantasm & FES General [New Gen] 44",
      posts: [
        ["op", "Thread for discussing Phantasm, FES-tan, and whether their songs \"predict\" the New Gen incidents.\n\nPrev thread hit 1000. Be civil.\nLyrics leaks = instant report."],
        ["a", "first for FES-sama (*´Д`)ﾊｧﾊｧ", { gap: 1, mail: "sage" }],
        ["b", "so is anyone going to the live this Sunday? I got a ticket off a guy at the station lol", { gap: 6 }],
        ["c", ">>3\nenjoy getting your wallet stolen by goths", { gap: 2, mail: "sage" }],
        ["d", "I read the new lyrics twice. It's vague as hell. You can match ANY news story to them if you squint.", { gap: 9 }],
        ["e", ">>5\nthe stake imagery came out BEFORE Cruc-affixion though. explain that", { gap: 3 }],
        ["d", ">>6\nCrosses and stakes are in like half of all goth songs ever written", { gap: 2 }],
        ["f", "Calling it precognition is taking it way too far. Just enjoy the music.", { gap: 7 }],
        ["g", "RIP the composer, nobody ever mentions him. it's always FES FES FES", { gap: 11 }],
        ["h", "FES-tan's voice cured my insomnia and gave me a reason to live\nit's a trap and I'm happy in it (;´Д`)", { gap: 5 }],
        ["i", "Phantasm fans are honestly scary. Went to one live and everyone was chanting in sync like a cult", { gap: 13 }],
        ["j", ">>11\nanti detected", { gap: 1 }],
        ["i", ">>12\nnot anti, just saying what I saw. they all had the same face. like they were brainwashed", { gap: 3 }],
        ["k", "", { gap: 4, aa: true, body:
"　　 ∧＿∧\n　　（ ´_ゝ`）　＜ Neither prophecy nor coincidence.\n　　/　　 　|　　　It's marketing.\n　 /　　.i　 |\n　 し―-Ｊ" }],
        ["l", ">>14\nfinally someone sane", { gap: 1 }],
        ["m", "Off topic but is anyone else waiting on the Seira Orgel 1/8 scale reissue? The Blood Swallowtail stuff sells out instantly", { gap: 20 }],
        ["n", ">>16\nwrong thread but yes. I camped outside the shop last time and still lost", { gap: 3 }],
        ["o", ">>16\nseira-tan is my wife and that figure is our wedding photo", { gap: 2 }],
        ["p", "Gero Froggy collab announced. I don't even like frogs but I'll buy it", { gap: 15 }],
        ["e", "Back on topic. If the next case lines up with a song again, will you guys still call it coincidence?", { gap: 24 }],
        ["d", ">>20\nYes.", { gap: 1 }],
        ["q", ">>20\nif it lines up I'm buying every CD they ever released and moving into a bunker", { gap: 3 }],
      ]
    },

    /* =============================================================== */
    { board: "occult", key: "1223785200", start: "2008/10/12 13:20",
      title: "Whose eyes are those eyes? Analysis Thread",
      posts: [
        ["op", "Thread for analyzing the phrase from the Vampbuyer case.\n\nWhose eyes are those eyes?\n\nWho is it for? The victim? The police? Us?\nRule: analysis only. No panic posting."],
        ["a", "Reading 1: It's addressed to the VICTIM. \"The eyes you see the world with, are they really yours?\"", { gap: 6 }],
        ["b", "Reading 2: It's for whoever looks at the scene. The cops, the photographers, the people at home staring at the pic. \"You're watching. But whose gaze is it?\"", { gap: 4 }],
        ["c", ">>3\nok that one actually gave me chills", { gap: 2 }],
        ["d", "There are tons of yokai tied to eyes. Mokumokuren, the eyes that appear in old paper walls. Dodomeki. It's a very Japanese fear.", { gap: 10 }],
        ["e", ">>5\nMokumokuren is EXACTLY the feeling of being watched in your own room. this fits way too well", { gap: 3 }],
        ["f", "I think it's about delusion. If you can't tell whose eyes you're looking through, you can't tell if what you see is real.", { gap: 8 }],
        ["g", ">>7\nphilosophy has arrived ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!", { gap: 1 }],
        ["h", "Weird fact: a lot of people say they started feeling watched AFTER reading the phrase. Suggestion? Or...", { gap: 14 }],
        ["i", ">>9\nnocebo effect, confirmation bias. go to sleep", { gap: 2 }],
        ["j", "Saw it spray-painted on a shutter near the station this morning. Not a crime scene, just a random shutter. Someone's spreading it.", { gap: 22 }],
        ["k", ">>11\nkids think it's edgy. next week it'll be on Crunchy-kun sticks", { gap: 3 }],
        ["l", "", { gap: 5, aa: true, body:
"　　　　　 ＿＿＿＿＿\n　　　　／　　　　　＼\n　　　／　 ●　　 ●　 ＼\n　　　|　　　　　　　　 |　＜ whose eyes are those eyes?\n　　　＼　　 ＿＿　　 ／\n　　　　 ＼＿＿＿＿＿／" }],
        ["c", ">>13\nSTOP", { gap: 1 }],
        ["m", "Neuroscience angle: the brain fills in most of what you \"see\". Half your vision is made up. Controlled delusion, basically.", { gap: 17 }],
        ["f", ">>15\nexactly!! delusion. the phrase asks if your reality is your own or something put there by someone else", { gap: 4 }],
        ["n", ">>16\nput there by someone else... like someone projecting images into your head? ok this thread just became sci-fi", { gap: 3 }],
        ["o", "Last night I woke up and swore there were dozens of eyes on my wall. Turned on the light and nothing. Normal?", { gap: 30 }],
        ["i", ">>18\nsleep paralysis. totally normal. stop reading this thread before bed", { gap: 2 }],
        ["o", ">>19\nI wasn't paralyzed. I got up. they stayed there until I hit the light switch", { gap: 6 }],
        ["p", ">>20\nsee a psychiatrist. I say this with love", { gap: 3, mail: "sage" }],
      ]
    },

    /* =============================================================== */
    { board: "occult", key: "1222090800", start: "2008/09/22 22:40",
      title: "The 8 deaths from July's M3 quake were the REAL first New Gen case",
      posts: [
        ["op", "Hear me out.\n\nIn July there was a magnitude 3 quake centered on Shibuya. Magnitude THREE. Eight people died.\nSince when does an M3 kill eight people?\n\nTwo months later: Group Dive.\nI think the quake victims were the first New Gen case and it was covered up as a natural disaster."],
        ["a", "tinfoil hat thread", { gap: 2, mail: "sage" }],
        ["b", ">>1\nan M3 can kill people if something falls on them. old buildings, bad luck", { gap: 4 }],
        ["op", ">>3\nEIGHT people? in a quake most of Tokyo didn't even feel?", { gap: 3 }],
        ["c", "I remember that night. The tremor was weird. Short, sharp, and only in Shibuya. My cousin in Shinjuku felt nothing.", { gap: 9 }],
        ["d", ">>5\nquakes don't stop at ward borders lol", { gap: 1 }],
        ["c", ">>6\nthat's my point", { gap: 2 }],
        ["e", "Taxi driver told me there's a machine under Shibuya that makes the quakes. Said a foreign company built it. Then he went quiet the rest of the ride.", { gap: 15 }],
        ["f", ">>8\nthis is my favorite one. give it a company name and it's a movie", { gap: 2 }],
        ["g", "Shibuya feels like a stage set lately. The crowd at the crossing looks like extras walking on cue.", { gap: 21 }],
        ["h", ">>10\nnot sure if urban legend or depression", { gap: 2, mail: "sage" }],
        ["i", "the fact that nobody in the news will even mention the 8 deaths anymore is what bugs me", { gap: 26 }],
      ]
    },

    /* =============================================================== */
    { board: "vip", key: "1223829000", start: "2008/10/13 01:30",
      title: "I live in a container on a rooftop and I think someone is watching me",
      posts: [
        ["op", "So I'm a student (on paper lol) and I spend basically all day in my room playing online and watching anime.\nFor the past few days I feel a gaze. At the PC, in the shower, even when I'm asleep.\nIt's just paranoia, right? Tell me it's paranoia."],
        ["a", "paranoia", { gap: 1 }],
        ["b", "paranoia\n\n/thread", { gap: 1 }],
        ["c", ">>1\npic of room", { gap: 1 }],
        ["op", ">>4\nnot posting a pic. but it's... a container. on top of a building.", { gap: 3 }],
        ["d", ">>5\n？？？？？？", { gap: 1 }],
        ["e", ">>5\nYOU LIVE IN A SHIPPING CONTAINER\n\nwwwwwwwwwwwwwwww", { gap: 1 }],
        ["f", ">>5\nmost advanced NEET base I've ever seen", { gap: 1 }],
        ["op", ">>6-8\nmy parents own the building and let me live up top. it's comfy. PC, figure shelf, nobody bugging me.", { gap: 4 }],
        ["g", ">>9\nwhat's your favorite figure", { gap: 2 }],
        ["op", ">>10\nSeira-tan from Blood Swallowtail obviously. limited edition. she's my wife.", { gap: 2 }],
        ["h", ">>11\nmystery solved. nobody's watching you. it's Seira on the shelf staring at you 24/7", { gap: 1 }],
        ["a", ">>12\nbest post in the thread wwww", { gap: 1 }],
        ["op", ">>12\nno. Seira-tan is an angel, she would never scare me. it's something else.", { gap: 3 }],
        ["i", "OP, are you reading the New Gen threads a lot by any chance?", { gap: 6 }],
        ["op", ">>15\n...a bit. why?", { gap: 2 }],
        ["i", ">>16\nbecause a lot of people are getting like this. read too much, start seeing things. log off.", { gap: 3 }],
        ["op", "Bizarre update.\nHad to go out to buy food today. A girl in a school uniform I have NEVER seen in my life greeted me like she'd known me since we were kids.\nAnd smiled.\nI ran.", { gap: 140 }],
        ["d", ">>18\ndelusion, good work (ﾟ∀ﾟ)", { gap: 1 }],
        ["j", ">>18\nDUDE A GIRL SAID HI TO YOU AND YOU RAN\n\nthis is the most VIP thing that has ever happened on this board", { gap: 1 }],
        ["k", ">>18\nlet me guess, she was cute. you're gonna regret this forever", { gap: 2 }],
        ["op", ">>21\nshe was. doesn't matter. how did she know my name? 3D is dangerous. I don't trust 3D.", { gap: 3 }],
        ["e", "", { gap: 2, aa: true, body:
"　　 ∧＿∧\n　　（ ・∀・）　＜ this is literally an eroge route\n　　（　∪ ∪\n　　と＿_）＿）" }],
        ["l", ">>22\nwhat if SHE is the one watching you", { gap: 5 }],
        ["op", ">>24\nstop scaring me", { gap: 1 }],
        ["op", "One more. I just heard footsteps on the roof outside the container. At 2am.\nNot opening the door.", { gap: 50 }],
        ["m", ">>26\nopen it and take a pic", { gap: 1 }],
        ["n", ">>26\nDON'T OPEN IT", { gap: 1 }],
        ["o", ">>26\nseriously call the cops if you're scared. not a joke", { gap: 2 }],
        ["op", ">>29\nit stopped. thanks guys. you're alright. sleeping with the lights on.\nif I disappear tell Seira-tan I loved her.", { gap: 9 }],
        ["a", ">>30\ngoodnight, container commander", { gap: 1 }],
      ]
    },

    /* =============================================================== */
    { board: "vip", key: "1223874000", start: "2008/10/13 14:00",
      title: "Shibuya Crossing is chanting \"whose eyes are those eyes\" right now lmao",
      posts: [
        ["op", "Just walked through the scramble. A group of like 30 kids started chanting it in unison and then everyone around them joined in.\nThis city is broken (ﾟ∀ﾟ)"],
        ["a", "pic or it didn't happen", { gap: 1 }],
        ["b", ">>1\nit's on the jumbotron ad too now. some clothing brand slapped it on a shirt in like two days", { gap: 3 }],
        ["c", "the convenience store by my place had Crunchy-kun sticks with it written on them\nI'm not even joking", { gap: 5 }],
        ["d", ">>4\nwinner stick or loser stick?", { gap: 1 }],
        ["c", ">>5\n\"whose eyes are those eyes? try again!\"", { gap: 1 }],
        ["e", "wwwwwwwwwwwwwwwwwwwww", { gap: 0 }],
        ["f", "People died. This is a murder scene message and you guys are turning it into a meme.", { gap: 6 }],
        ["g", ">>8\nwelcome to the internet. first time?", { gap: 1, mail: "sage" }],
        ["h", "my little sister says it's the new greeting at her middle school\nI'm scared for the future", { gap: 9 }],
        ["i", "", { gap: 3, aa: true, body:
"　　　 ＿＿_\n　　 ／⌒　　⌒＼\n　／（ ●） （●）＼　 ＜ whose eyes? MY eyes\n／::::::⌒（__人__）⌒::::＼\n|　　　　 |r┬-|　　　 |\n＼　　　 `ー'´　　 ／" }],
        ["j", ">>11\nput that thing away", { gap: 1 }],
        ["k", "honestly the chanting is creepier than the murders. a thousand people saying it at once and smiling", { gap: 12 }],
        ["l", ">>13\nsmiling... like the Group Dive video...", { gap: 2 }],
        ["k", ">>14\nwhy would you say that", { gap: 1 }],
      ]
    },

    /* =============================================================== */
    { board: "netgame", key: "1222428600", start: "2008/09/26 20:30",
      title: "[ESO] Esoteric Online Guild Recruitment Thread Part 33",
      posts: [
        ["op", "Recruitment thread for Esoteric Online guilds.\nTemplate:\n[Server]\n[Guild]\n[Active hours]\n[Comment]"],
        ["a", "[Server] Ishtar\n[Guild] Night Swallowtail\n[Active hours] 22:00–05:00 (yes)\n[Comment] Daily players only. No drama.", { gap: 10 }],
        ["b", ">>2\n22 to 5 is pro NEET hours lol", { gap: 3 }],
        ["a", ">>3\nthose are the real hours. everyone else is a casual", { gap: 2 }],
        ["c", "Is anyone else lagging like crazy since yesterday? Feels like all of Shibuya's connection is bad", { gap: 18 }],
        ["d", ">>5\nsame. someone said a tremor damaged the cables", { gap: 4 }],
        ["e", "lf paladin for raid tonight. must have Lv45+. tank gear check at the gate", { gap: 25 }],
        ["f", ">>7\nthere's a Lv50 paladin who's always online in the Kingdom square. never talks to anyone except one guildmate. ask him", { gap: 6 }],
        ["e", ">>8\nthe one with the long sword on his back? he ignored my whisper lol", { gap: 3 }],
        ["g", "Guys, some guy in world chat kept spamming the same phrase at me. \"whose eyes are those eyes?\"\nblocked him and he came back on another account", { gap: 35 }],
        ["h", ">>10\nreport to a GM. it's a troll riding the news", { gap: 2 }],
        ["g", ">>11\nI reported it. the GM said there's no record of any message sent to me.", { gap: 20 }],
        ["i", ">>12\n((((；ﾟДﾟ))))ｶﾞｸｶﾞｸﾌﾞﾙﾌﾞﾙ", { gap: 1 }],
      ]
    },

    /* =============================================================== */
    { board: "quake", key: "1223575000", start: "2008/10/10 03:01",
      title: "[Intensity 2] Shibuya shaking AGAIN? [Local only]",
      posts: [
        ["op", "Just now!! Shibuya shook!!\nAnyone feel it?"],
        ["a", "felt it!", { gap: 0 }],
        ["b", "felt it in Udagawacho. short but sharp", { gap: 0 }],
        ["c", "Dogenzaka, felt it", { gap: 1 }],
        ["d", "Why is it only ever Shibuya? My friend in Shinjuku felt nothing again", { gap: 3 }],
        ["e", "These local ones have been happening since July. Remember the M3 that killed 8 people? Nobody talks about it anymore", { gap: 4 }],
        ["f", "Too frequent. Once a week now. This is a warning sign of something big", { gap: 6 }],
        ["g", ">>7\nno prophecies here. read the rules", { gap: 1, mail: "sage" }],
        ["h", "The Meteorological Agency doesn't even record half of these. What kind of quake is THAT local?", { gap: 10 }],
        ["i", ">>9\nunderground construction? there's that huge new building going up", { gap: 3 }],
        ["j", "I swear the tremors happen close to the New Gen dates. Probably a coincidence.", { gap: 17 }],
        ["e", ">>11\n...I hadn't thought of that", { gap: 2 }],
        ["g", ">>11\ntake it to the occult board", { gap: 1 }],
        ["k", "FELT IT AGAIN, 3:58", { gap: 25 }],
        ["a", ">>14\nfelt it. the glass on my desk rattled", { gap: 0 }],
        ["l", "Shibuya people: keep an emergency kit ready. Water, flashlight, radio. Costs nothing.", { gap: 6 }],
      ]
    },
  ],

  /* "All Things New Gen" summary blog */
  newgen: {
    headlines: [
      "The Earthquake Two Months Before It All Started",
      "Bizarre Serial Incidents: 4 So Far",
      "Hammering Heard Near the Wall, No One Seen",
      "Blood Listed on an Auction Site?!",
      "One Killer or Many? @channel Is Divided",
      "\"Group Dive\" \"Manchild\" \"Cruc-affixion\" \"Vampbuyer\"",
      "That Phrase Is Now Being Chanted at the Crossing",
    ],
    article: {
      date: "10/12/200X (Sun)",
      title: "The Earthquake Two Months Before It All Started",
      name: "The Following Post Will Be Presented By Anonymous",
      body: "In July, an earthquake of magnitude 3 hit with Shibuya as its epicenter.\nIt barely registered anywhere else. And yet, eight people died...\n\nSome on @channel now count those eight as the true \"case zero\" of New Gen.\nThe official word is still \"unfortunate accidents\". Make of that what you will (ll´(ｪ)`ll)",
    },
    bookmarks: ["Templates Ume", "cococodayo", "everyday-buriburi", "konkitsune-concon", "byby.net-not", "NEWS-SWEN", "memo-momoume", "GOOD! COME! COME!", "HIKKI-Nikki", "Trick2watori", "NYOKINYOKI-MOON"],
  },

  /* Anonymous replies that show up after you post */
  autoReplies: {
    generic: [
      ">>{n}\nwhat", ">>{n}\ndelusion, good work", ">>{n}\nsource?", ">>{n}\nthis", ">>{n}\nwwwwww",
      ">>{n}\nagreed", ">>{n}\ngo to sleep", ">>{n}\npic or it didn't happen", ">>{n}\nI don't get it but ok",
      ">>{n}\nnewfag detected, lurk more", ">>{n}\nnot taking the bait (´_ゝ`)",
    ],
    creepy: [
      ">>{n}\nyou're being watched", ">>{n}\nwho's next to you right now?",
      ">>{n}\nwhose eyes are those eyes?", ">>{n}\ndid you look behind you?", ">>{n}\n…",
    ],
  },
};
