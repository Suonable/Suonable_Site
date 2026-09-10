(function(){
if (window.SuonableI18n) return;
// Suonable site copy — EN key -> [ES, IT]
const dict = {
  // ——— nav / chrome
  "OTHER": ["OTROS", "ALTRO"],
  "VOCALS": ["VOZ", "VOCE"],
  "BACKING VOCALS": ["COROS", "CORI"],
  "Master Song": ["Master canción", "Master canzone"],
  "auto pan": ["auto pan", "auto pan"],
  "STOP": ["PARAR", "STOP"],
  "Show less": ["Ver menos", "Mostra meno"],
  "Show all sixteen": ["Ver las dieciséis", "Mostra tutte e sedici"],
  "Show all six": ["Ver las seis", "Mostra tutte e sei"],
  "How it works": ["Cómo funciona", "Come funziona"],
  "Features": ["Funciones", "Funzioni"],
  "Chords": ["Acordes", "Accordi"],
  "Tools": ["Herramientas", "Strumenti"],
  "Play live": ["En vivo", "Dal vivo"],
  "Privacy": ["Legal", "Privacy"],
  "Get the beta": ["Probar la beta", "Prova la beta"],
  "Home": ["Inicio", "Home"],

  // ——— hero
  "Open beta · free while it lasts": ["Beta abierta · gratis mientras dure", "Beta aperta · gratis finché dura"],
  "Make Your": ["Tus canciones,", "Le tue canzoni,"],
  "Songs": ["listas para", "pronte da"],
  "Playable": ["tocar", "suonare"],
  "Listen": ["Escucha", "Ascolta"],
  "Learn": ["Aprende", "Impara"],
  "Play": ["Toca", "Suona"],
  "Split any recording of your own into tracks by instrument and rehearse with them: isolate your part, play over it, and repeat until it comes out.": [
    "Divide cualquier grabación tuya en pistas por instrumento y ensaya con ellas: aísla tu parte, toca encima y repite hasta que salga.",
    "Dividi una tua registrazione qualsiasi in tracce per strumento e provaci: isola la tua parte, suonaci sopra e ripeti finché non viene."
  ],

  // ——— player
  "LIGHT": ["CLARO", "CHIARO"],
  "DARK": ["OSCURO", "SCURO"],
  "FROM THE TOP": ["DESDE EL INICIO", "DALL'INIZIO"],
  "BAR": ["COMPÁS", "BATTUTA"],
  "of": ["de", "di"],
  "all": ["todo", "tutto"],
  "PITCH": ["TONO", "TONO"],
  "Set click": ["Configurar clic", "Imposta click"],
  "Stems": ["Pistas", "Tracce"],
  "Resources": ["Recursos", "Risorse"],
  "generated": ["generado", "generato"],

  // ——— four steps
  "Four steps, and one of them is waiting.": ["Cuatro pasos, y uno es esperar.", "Quattro passi, e uno è aspettare."],
  "Upload a file of yours": ["Sube un archivo tuyo", "Carica un tuo file"],
  "An MP3, a WAV, last night's rehearsal recording. No official stems needed.": [
    "Un MP3, un WAV, la grabación del ensayo de anoche. No hacen falta stems oficiales.",
    "Un MP3, un WAV, la registrazione delle prove di ieri sera. Non servono stem ufficiali."
  ],
  "It comes back in six or seven tracks": ["Vuelve en seis o siete pistas", "Torna in sei o sette tracce"],
  "Drums, bass, guitar, keys, other and lead vocal — plus backing vocals when you ask, each with its own volume, mute and solo.": [
    "Batería, bajo, guitarra, teclados, otros y voz principal — más los coros si los pides, cada una con su volumen, mute y solo.",
    "Batteria, basso, chitarra, tastiere, altro e voce principale — più i cori se li chiedi, ognuna con il suo volume, mute e solo."
  ],
  "Rehearse with them": ["Ensaya con ellas", "Provaci"],
  "Solo your part, mute it and play over the band, loop eight bars, move the key without moving the tempo.": [
    "Aísla tu parte, silénciala y toca sobre la banda, repite ocho compases, cambia el tono sin cambiar el tempo.",
    "Isola la tua parte, silenziala e suona sopra la band, ripeti otto battute, cambia la tonalità senza cambiare il tempo."
  ],
  "Enjoy the automated resources": ["Aprovecha los recursos automáticos", "Sfrutta le risorse automatiche"],
  "Tempo, key, bar lines and chords arrive already found, with a click and a chord sheet built from them. Correct anything by hand — it's a starting point, not a verdict.": [
    "Tempo, tonalidad, compases y acordes llegan ya detectados, con un clic y una hoja de acordes hecha con ellos. Corrige lo que quieras a mano — es un punto de partida, no un veredicto.",
    "Tempo, tonalità, battute e accordi arrivano già rilevati, con un click e un foglio accordi costruito su di essi. Correggi ciò che vuoi a mano — è un punto di partenza, non un verdetto."
  ],
  "Every feature in detail →": ["Todas las funciones en detalle →", "Tutte le funzioni in dettaglio →"],
  "Every feature in detail": ["Todas las funciones en detalle", "Tutte le funzioni in dettaglio"],

  // ——— marquees
  "your songs": ["tus canciones", "le tue canzoni"],
  "your key": ["tu tonalidad", "la tua tonalità"],
  "your click": ["tu clic", "il tuo click"],
  "your setlist": ["tu setlist", "la tua setlist"],
  "make music yours": ["haz tuya la música", "fai tua la musica"],

  // ——— features
  "Features for every musician": ["Funciones para cada músico", "Funzioni per ogni musicista"],
  "Grouped by what you're doing.": ["Agrupadas por lo que estás haciendo.", "Raggruppate per ciò che stai facendo."],
  "The split is just the starting point. Suonable is where your music lives: lyrics, chord charts that transpose with the song, audio files, reference takes, tracks and setlists — all of it next to the song, ready to play.": [
    "La separación es solo el punto de partida. Suonable es donde vive tu música: letras, hojas de acordes que transponen con la canción, archivos de audio, tomas de referencia, pistas y setlists — todo junto a la canción, listo para tocar.",
    "La separazione è solo il punto di partenza. Suonable è dove vive la tua musica: testi, fogli accordi che traspongono con la canzone, file audio, take di riferimento, tracce e setlist — tutto accanto alla canzone, pronto da suonare."
  ],
  "Learn your part": ["Aprende tu parte", "Impara la tua parte"],
  "Solo one track": ["Aísla una pista", "Isola una traccia"],
  "Isolate the guitar, the harmony, the keys. Hear only what you have to play.": [
    "Aísla la guitarra, la armonía, los teclados. Escucha solo lo que tienes que tocar.",
    "Isola la chitarra, l'armonia, le tastiere. Ascolta solo quello che devi suonare."
  ],
  "Loop A to B": ["Bucle de A a B", "Loop da A a B"],
  "Mark two points and repeat that stretch with sample accuracy until it comes out.": [
    "Marca dos puntos y repite ese tramo con precisión de sample hasta que salga.",
    "Segna due punti e ripeti quel tratto con precisione al sample finché non viene."
  ],
  "Real transpose": ["Transposición real", "Trasposizione reale"],
  "Shift the key by semitones without changing the speed. The click and drums never transpose.": [
    "Cambia el tono por semitonos sin cambiar la velocidad. El clic y la batería nunca se transponen.",
    "Cambia la tonalità per semitoni senza cambiare la velocità. Il click e la batteria non vengono mai trasposti."
  ],
  "Lyrics and charts": ["Letras y hojas", "Testi e fogli"],
  "Store lyrics, chord charts and extra material next to each song: PDFs, a photo of a score, a reference take.": [
    "Guarda letras, hojas de acordes y material extra junto a cada canción: PDFs, la foto de una partitura, una toma de referencia.",
    "Salva testi, fogli accordi e materiale extra accanto a ogni canzone: PDF, la foto di uno spartito, una take di riferimento."
  ],
  "Dynamic chord chart": ["Hoja de acordes dinámica", "Foglio accordi dinamico"],
  "Chords placed exactly over the lyrics, transposing with the song, in several languages. Drag sections to reorder them.": [
    "Acordes colocados exactamente sobre la letra, que transponen con la canción, en varios idiomas. Arrastra las secciones para reordenarlas.",
    "Accordi posizionati esattamente sopra il testo, che traspongono con la canzone, in più lingue. Trascina le sezioni per riordinarle."
  ],
  "Rehearse with the band": ["Ensaya con la banda", "Prova con la band"],
  "The click": ["El clic", "Il click"],
  "Built from the tempo map detected in the song itself, so it follows the real tempo of the recording even when it breathes. It sounds from the first to the last second of the audio.": [
    "Construido con el mapa de tempo detectado en la propia canción, así sigue el tempo real de la grabación incluso cuando respira. Suena desde el primer hasta el último segundo del audio.",
    "Costruito sulla mappa del tempo rilevata nella canzone stessa, così segue il tempo reale della registrazione anche quando respira. Suona dal primo all'ultimo secondo dell'audio."
  ],
  "5 click voices": ["5 voces de clic", "5 voci di click"],
  "Classic, soft beep, woodblock, sticks, cowbell. Configurable accent pattern and subdivisions.": [
    "Clásico, beep suave, caja china, baquetas, cencerro. Patrón de acentos y subdivisiones configurables.",
    "Classico, beep morbido, woodblock, bacchette, campanaccio. Pattern di accenti e suddivisioni configurabili."
  ],
  "Variable tempo songs": ["Canciones de tempo variable", "Canzoni a tempo variabile"],
  "Recordings that speed up or slow down are supported.": [
    "Las grabaciones que aceleran o frenan están soportadas.",
    "Le registrazioni che accelerano o rallentano sono supportate."
  ],
  "Multitrack imports": ["Importar multipistas", "Importa multitraccia"],
  "Drop a ZIP from an Ableton or Logic session, or a bought pack. Tested with a real 430 MB project of 17 tracks.": [
    "Suelta un ZIP de una sesión de Ableton o Logic, o un pack comprado. Probado con un proyecto real de 430 MB y 17 pistas.",
    "Trascina uno ZIP da una sessione di Ableton o Logic, o un pacchetto acquistato. Testato con un progetto reale di 430 MB e 17 tracce."
  ],
  "Setlists": ["Setlists", "Setlist"],
  "Order the songs for a rehearsal or a show, and share them with a link.": [
    "Ordena las canciones para un ensayo o un concierto, y compártelas con un enlace.",
    "Ordina le canzoni per una prova o un concerto, e condividile con un link."
  ],
  "Separate outputs": ["Salidas separadas", "Uscite separate"],
  "Each track can leave through a different physical output of your audio interface. Desktop app only.": [
    "Cada pista puede salir por una salida física distinta de tu interfaz de audio. Solo en la app de escritorio.",
    "Ogni traccia può uscire da un'uscita fisica diversa della tua interfaccia audio. Solo nell'app desktop."
  ],
  "Sliding mixer": ["Mezclador deslizante", "Mixer scorrevole"],
  "With many tracks the desk slides instead of squeezing the channels.": [
    "Con muchas pistas la mesa se desliza en vez de apretar los canales.",
    "Con molte tracce il banco scorre invece di comprimere i canali."
  ],
  "Works offline": ["Funciona sin conexión", "Funziona offline"],
  "Once a song is downloaded it plays with no connection.": [
    "Una vez descargada, la canción suena sin conexión.",
    "Una volta scaricata, la canzone suona senza connessione."
  ],
  "Installs from the browser": ["Se instala desde el navegador", "Si installa dal browser"],
  "iPhone, Android, iPad, Mac and Windows. No store to go through.": [
    "iPhone, Android, iPad, Mac y Windows. Sin pasar por ninguna tienda.",
    "iPhone, Android, iPad, Mac e Windows. Senza passare da nessuno store."
  ],
  "Interface in 3 languages": ["Interfaz en 3 idiomas", "Interfaccia in 3 lingue"],
  "English, Italian and Spanish.": ["Inglés, italiano y español.", "Inglese, italiano e spagnolo."],
  "English, Italian and Spanish": ["Inglés, italiano y español", "Inglese, italiano e spagnolo"],

  // ——— chords
  "Chords, found for you": ["Acordes, detectados para ti", "Accordi, trovati per te"],
  "Every song arrives with its chords already on it.": [
    "Cada canción llega con sus acordes ya puestos.",
    "Ogni canzone arriva con i suoi accordi già sopra."
  ],
  "Not a guess pasted on top: the chords are placed over the beat map detected in your own recording, so each one sits on the bar and beat where it actually changes. Correct anything by hand — it's a starting point, not a verdict.": [
    "No es una suposición pegada encima: los acordes se colocan sobre el mapa de compases detectado en tu propia grabación, así cada uno cae en el compás y el tiempo donde realmente cambia. Corrige lo que quieras a mano — es un punto de partida, no un veredicto.",
    "Non è un'ipotesi incollata sopra: gli accordi sono posizionati sulla mappa delle battute rilevata nella tua registrazione, così ognuno cade sulla battuta e sul movimento in cui cambia davvero. Correggi ciò che vuoi a mano — è un punto di partenza, non un verdetto."
  ],
  "Placed on the beat": ["Colocados en el tiempo", "Posizionati sul movimento"],
  "Each chord is anchored to a bar and a beat, not to a stopwatch — so it stays right even when the tempo breathes.": [
    "Cada acorde está anclado a un compás y un tiempo, no a un cronómetro — así sigue bien aunque el tempo respire.",
    "Ogni accordo è ancorato a una battuta e a un movimento, non a un cronometro — così resta giusto anche quando il tempo respira."
  ],
  "Transposes with the song": ["Transpone con la canción", "Traspone con la canzone"],
  "Move the key and the whole sheet follows — the chords you read are the chords you're hearing.": [
    "Cambia el tono y la hoja entera lo sigue — los acordes que lees son los que estás oyendo.",
    "Cambia la tonalità e tutto il foglio la segue — gli accordi che leggi sono quelli che stai sentendo."
  ],
  "Yours to fix": ["Tuyos para corregir", "Tuoi da correggere"],
  "Edit any chord by hand and it stays edited. Key and BPM are detected too, and editable everywhere they appear.": [
    "Edita cualquier acorde a mano y así queda. La tonalidad y el BPM también se detectan, y se editan donde aparezcan.",
    "Modifica qualsiasi accordo a mano e resta così. Tonalità e BPM sono rilevati anche loro, e si modificano dove appaiono."
  ],
  "← All resources": ["← Todos los recursos", "← Tutte le risorse"],
  "Automatic Chords": ["Acordes automáticos", "Accordi automatici"],
  "your song": ["tu canción", "la tua canzone"],
  "Bar 25": ["Compás 25", "Battuta 25"],
  "8 BARS": ["8 COMPASES", "8 BATTUTE"],
  "Edit": ["Editar", "Modifica"],
  "BAR 24": ["C. 24", "B. 24"], "BAR 25": ["C. 25", "B. 25"], "BAR 26": ["C. 26", "B. 26"],
  "BAR 27": ["C. 27", "B. 27"], "BAR 28": ["C. 28", "B. 28"], "BAR 29": ["C. 29", "B. 29"],
  "BAR 30": ["C. 30", "B. 30"], "BAR 31": ["C. 31", "B. 31"],

  // ——— tools
  "The tools": ["Las herramientas", "Gli strumenti"],
  "Not only the separator.": ["No solo el separador.", "Non solo il separatore."],
  "It's where the tools you open every day keep landing.": [
    "Es donde van aterrizando las herramientas que abres cada día.",
    "È dove atterrano gli strumenti che apri ogni giorno."
  ],
  "Metronome": ["Metrónomo", "Metronomo"],
  "AVAILABLE": ["DISPONIBLE", "DISPONIBILE"],
  ", ten time signatures, subdivisions, tap tempo, and accents you set by tapping the beat. The light lands when the click reaches the speaker, not when the app schedules it.": [
    ", diez compases, subdivisiones, tap tempo y acentos que marcas tocando el tiempo. La luz cae cuando el clic llega al altavoz, no cuando la app lo programa.",
    ", dieci indicazioni di tempo, suddivisioni, tap tempo e accenti che imposti battendo il tempo. La luce arriva quando il click raggiunge l'altoparlante, non quando l'app lo programma."
  ],
  "Tuner": ["Afinador", "Accordatore"],
  "ON THE WAY": ["EN CAMINO", "IN ARRIVO"],
  "Chromatic for anything, with a per-instrument mode for strings. The headstock is drawn with the pegs where they actually sit, and each string turns green the moment it's in tune.": [
    "Cromático para cualquier cosa, con un modo por instrumento para las cuerdas. El clavijero se dibuja con las clavijas donde están de verdad, y cada cuerda se pone verde en el momento en que está afinada.",
    "Cromatico per qualsiasi cosa, con una modalità per strumento per gli archi. La paletta è disegnata con le meccaniche dove stanno davvero, e ogni corda diventa verde nel momento in cui è accordata."
  ],
  "And whatever comes next": ["Y lo que venga después", "E quello che verrà"],
  "MORE TOOLS ON THE WAY": ["MÁS HERRAMIENTAS EN CAMINO", "ALTRI STRUMENTI IN ARRIVO"],

  // ——— play live
  "The differentiator": ["La diferencia", "La differenza"],
  "One track, one physical output": ["Una pista, una salida física", "Una traccia, un'uscita fisica"],
  "The click to the drummer's ear on output 1. The band to the PA on 2–3. The choir on 5–6. Stereo pairs or mono, and you choose which outputs pair up.": [
    "El clic al oído del baterista por la salida 1. La banda al PA por 2–3. El coro por 5–6. Pares estéreo o mono, y tú eliges qué salidas se emparejan.",
    "Il click nell'orecchio del batterista sull'uscita 1. La band al PA su 2–3. Il coro su 5–6. Coppie stereo o mono, e scegli tu quali uscite si accoppiano."
  ],
  "Desktop app only, on Mac and Windows. It is not a bug: no browser sends more than two channels to the hardware — it's documented as a platform limitation in Chromium and WebKit. That's why the desktop app exists. In the browser and on mobile it's two channels, full stop.": [
    "Solo en la app de escritorio, en Mac y Windows. No es un bug: ningún navegador manda más de dos canales al hardware — está documentado como limitación de plataforma en Chromium y WebKit. Por eso existe la app de escritorio. En el navegador y en el móvil son dos canales, punto.",
    "Solo nell'app desktop, su Mac e Windows. Non è un bug: nessun browser manda più di due canali all'hardware — è documentato come limite di piattaforma in Chromium e WebKit. Per questo esiste l'app desktop. Nel browser e su mobile sono due canali, punto."
  ],
  "AUDIO INTERFACE": ["INTERFAZ DE AUDIO", "INTERFACCIA AUDIO"],
  "Click → drummer's in-ear": ["Clic → in-ear del baterista", "Click → in-ear del batterista"],
  "Band → PA": ["Banda → PA", "Band → PA"],
  "Bass → stage amp": ["Bajo → ampli del escenario", "Basso → ampli sul palco"],
  "Choir → monitors": ["Coro → monitores", "Coro → monitor"],

  // ——— straight talk
  "Straight talk": ["Hablando claro", "Parliamoci chiaro"],
  "What it doesn't do": ["Lo que no hace", "Cosa non fa"],
  "It isn't studio quality": ["No es calidad de estudio", "Non è qualità da studio"],
  "The separation is very good, but it's automatic. One instrument bleeds a little into another, especially in dense mixes.": [
    "La separación es muy buena, pero es automática. Un instrumento se filtra un poco en otro, sobre todo en mezclas densas.",
    "La separazione è molto buona, ma è automatica. Uno strumento sborda un po' in un altro, soprattutto nei mix densi."
  ],
  "It isn't tuned for every kind of music": ["No está ajustada a cualquier música", "Non è tarata su ogni tipo di musica"],
  "It's tested with modern band music. On orchestra, very dense electronic music or poor recordings the results are worse.": [
    "Está probada con música moderna de banda. En orquesta, electrónica muy densa o grabaciones pobres los resultados son peores.",
    "È testata con musica moderna suonata da una band. Su orchestra, elettronica molto densa o registrazioni scarse i risultati sono peggiori."
  ],
  "It isn't instant": ["No es instantáneo", "Non è istantaneo"],
  "About three minutes per song — and then it's yours forever.": [
    "Unos tres minutos por canción — y después es tuya para siempre.",
    "Circa tre minuti per canzone — e poi è tua per sempre."
  ],
  "There's no catalogue": ["No hay catálogo", "Non c'è un catalogo"],
  "You bring your own music, and you're responsible for having the right to use it. ZIP only for imports — RAR isn't supported.": [
    "Tú traes tu música, y eres responsable de tener derecho a usarla. Solo ZIP para importar — RAR no está soportado.",
    "La musica la porti tu, e sei responsabile di avere il diritto di usarla. Solo ZIP per le importazioni — RAR non è supportato."
  ],

  // ——— beta
  "The beta": ["La beta", "La beta"],
  "Open beta. Free while it lasts.": ["Beta abierta. Gratis mientras dure.", "Beta aperta. Gratis finché dura."],
  "No card, nothing to cancel, every feature unlocked. It's a beta, so things move — and when prices exist we'll say so before they do.": [
    "Sin tarjeta, nada que cancelar, todas las funciones abiertas. Es una beta, así que las cosas se mueven — y cuando haya precios lo diremos antes.",
    "Senza carta, niente da disdire, tutte le funzioni aperte. È una beta, quindi le cose si muovono — e quando ci saranno prezzi lo diremo prima."
  ],
  "The beta is closed for now.": ["La beta está cerrada por ahora.", "La beta è chiusa per ora."],
  "Leave your email and you get one message the day it opens again. Nothing else changes: still free while the beta runs, still every feature.": [
    "Deja tu correo y recibes un mensaje el día que vuelva a abrir. Nada más cambia: sigue gratis mientras dure la beta, con todas las funciones.",
    "Lascia la tua mail e ricevi un messaggio il giorno in cui riapre. Nient'altro cambia: resta gratis finché dura la beta, con tutte le funzioni."
  ],
  "Every feature unlocked, no card": ["Todas las funciones, sin tarjeta", "Tutte le funzioni, senza carta"],
  "Offline once the song is downloaded": ["Sin conexión una vez descargada la canción", "Offline una volta scaricata la canzone"],
  "Download for Mac": ["Descargar para Mac", "Scarica per Mac"],
  "Download for Windows": ["Descargar para Windows", "Scarica per Windows"],
  "Install from the browser": ["Instalar desde el navegador", "Installa dal browser"],
  "IOS · ANDROID · NO STORE": ["IOS · ANDROID · SIN TIENDA", "IOS · ANDROID · NIENTE STORE"],
  "MULTICHANNEL OUTPUT IS DESKTOP ONLY. EVERYTHING ELSE RUNS EVERYWHERE.": [
    "LA SALIDA MULTICANAL ES SOLO DE ESCRITORIO. TODO LO DEMÁS FUNCIONA EN TODAS PARTES.",
    "L'USCITA MULTICANALE È SOLO DESKTOP. TUTTO IL RESTO FUNZIONA DAPPERTUTTO."
  ],
  "Tell me when it opens": ["Avísame cuando abra", "Avvisami quando apre"],
  "ONE EMAIL, WHEN IT OPENS. NOTHING ELSE.": ["UN CORREO, CUANDO ABRA. NADA MÁS.", "UNA MAIL, QUANDO APRE. NIENT'ALTRO."],
  "YOU'RE ON THE LIST": ["ESTÁS EN LA LISTA", "SEI IN LISTA"],
  "One message when it opens, with the links for Mac, Windows and the browser install.": [
    "Un mensaje cuando abra, con los enlaces para Mac, Windows y la instalación desde el navegador.",
    "Un messaggio quando apre, con i link per Mac, Windows e l'installazione dal browser."
  ],

  // ——— footer
  "YOUR FILES": ["TUS ARCHIVOS", "I TUOI FILE"],
  "Private by architecture": ["Privado por arquitectura", "Privato per architettura"],
  "Why there's no catalogue": ["Por qué no hay catálogo", "Perché non c'è un catalogo"],
  "THE TECHNICAL SIDE": ["LA PARTE TÉCNICA", "LA PARTE TECNICA"],
  "Formats, bitrates and platforms": ["Formatos, bitrates y plataformas", "Formati, bitrate e piattaforme"],
  "What it isn't — the honest list": ["Lo que no es — la lista honesta", "Cosa non è — la lista onesta"],
  "THE PRODUCT": ["EL PRODUCTO", "IL PRODOTTO"],
  "Copyright and takedowns": ["Copyright y retiradas", "Copyright e rimozioni"],
  "Suonable doesn't supply music: every file in your account got there because you uploaded it, and you're responsible for holding the rights to do so. The tracks are for your own use — learning your part, rehearsing and playing — not for redistributing, publishing, selling or broadcasting them. Files are stored in the European Union, your audio doesn't train any model, and Suonable is in beta.": [
    "Suonable no proporciona música: cada archivo de tu cuenta está ahí porque tú lo subiste, y eres responsable de tener los derechos para hacerlo. Las pistas son para tu propio uso — aprender tu parte, ensayar y tocar — no para redistribuirlas, publicarlas, venderlas ni emitirlas. Los archivos se guardan en la Unión Europea, tu audio no entrena ningún modelo, y Suonable está en beta.",
    "Suonable non fornisce musica: ogni file nel tuo account è lì perché l'hai caricato tu, e sei responsabile di averne i diritti. Le tracce sono per uso personale — imparare la tua parte, provare e suonare — non per ridistribuirle, pubblicarle, venderle o trasmetterle. I file sono archiviati nell'Unione Europea, il tuo audio non addestra nessun modello, e Suonable è in beta."
  ],
  "HOW IT WORKS": ["CÓMO FUNCIONA", "COME FUNZIONA"],
  "PRIVACY & LEGAL": ["PRIVACIDAD Y LEGAL", "PRIVACY E LEGALE"],
  "WHAT IT ISN'T": ["LO QUE NO ES", "COSA NON È"],
  "SPECS": ["FICHA TÉCNICA", "SCHEDA TECNICA"],
  "CONTACT": ["CONTACTO", "CONTATTO"],
  "HOME": ["INICIO", "HOME"],
  "GET THE BETA": ["PROBAR LA BETA", "PROVA LA BETA"],
  "FROM": ["DE", "DA"],
  "— TO PLAY": ["— TOCAR", "— SUONARE"],
  "Data rights, legal requests, notices and takedowns": [
    "Derechos de datos, solicitudes legales, avisos y retiradas",
    "Diritti sui dati, richieste legali, segnalazioni e rimozioni"
  ],
  "THE DOCUMENTS · EN / IT / ES": ["LOS DOCUMENTOS · EN / IT / ES", "I DOCUMENTI · EN / IT / ES"],
  "Privacy policy": ["Política de privacidad", "Informativa privacy"],
  "Terms of use": ["Términos de uso", "Termini d'uso"],
  "Copyright policy and takedown route": ["Política de copyright y vía de retirada", "Politica sul copyright e procedura di rimozione"],
  "Copyright policy": ["Política de copyright", "Politica sul copyright"],
  "Your files are stored in the European Union and your audio doesn't train any model. Suonable is in beta.": [
    "Tus archivos se guardan en la Unión Europea y tu audio no entrena ningún modelo. Suonable está en beta.",
    "I tuoi file sono archiviati nell'Unione Europea e il tuo audio non addestra nessun modello. Suonable è in beta."
  ],
  "Suonable doesn't supply music. There's no catalogue and no library: every file in your account got there because you uploaded it, and you're responsible for holding the rights to do so.": [
    "Suonable no proporciona música. No hay catálogo ni biblioteca: cada archivo de tu cuenta está ahí porque tú lo subiste, y eres responsable de tener los derechos para hacerlo.",
    "Suonable non fornisce musica. Non c'è catalogo né libreria: ogni file nel tuo account è lì perché l'hai caricato tu, e sei responsabile di averne i diritti."
  ],
  "The tracks are for your own use — learning your part, rehearsing and playing — not for redistributing, publishing, selling or broadcasting them.": [
    "Las pistas son para tu propio uso — aprender tu parte, ensayar y tocar — no para redistribuirlas, publicarlas, venderlas ni emitirlas.",
    "Le tracce sono per uso personale — imparare la tua parte, provare e suonare — non per ridistribuirle, pubblicarle, venderle o trasmetterle."
  ],

  // ——— How it works page
  "From one file to a working desk in about three minutes.": [
    "De un archivo a una mesa lista en unos tres minutos.",
    "Da un file a un banco pronto in circa tre minuti."
  ],
  "Everything on this page is in the app today, except where it says otherwise. Where something only runs on desktop, or only comes out so-so, it says so.": [
    "Todo lo de esta página está hoy en la app, salvo donde dice lo contrario. Donde algo solo funciona en escritorio, o sale regular, lo dice.",
    "Tutto in questa pagina è già nell'app, tranne dove è indicato diversamente. Dove qualcosa gira solo su desktop, o viene così così, c'è scritto."
  ],
  "01 · SEPARATION": ["01 · SEPARACIÓN", "01 · SEPARAZIONE"],
  "Six or seven tracks out of one file": ["Seis o siete pistas de un solo archivo", "Sei o sette tracce da un solo file"],
  "Upload an audio file and it comes back as drums, bass, guitar, keys, other and lead vocal — and, when you ask for it, the backing vocals split from the lead. Each one with its own volume, mute and solo, all starting at the same instant with no drift.": [
    "Sube un archivo de audio y vuelve como batería, bajo, guitarra, teclados, otros y voz principal — y, si lo pides, los coros separados de la voz principal. Cada una con su volumen, mute y solo, todas arrancando en el mismo instante y sin desfase.",
    "Carica un file audio e torna come batteria, basso, chitarra, tastiere, altro e voce principale — e, se lo chiedi, i cori separati dalla voce principale. Ognuna con il suo volume, mute e solo, tutte che partono nello stesso istante senza sfasamenti."
  ],
  "You don't need anyone's official stems. It works with the recordings you already have, including your own band's rehearsal or an arrangement that exists nowhere else. There is no catalogue to pick from: every song on your desk is one you brought.": [
    "No necesitas los stems oficiales de nadie. Funciona con las grabaciones que ya tienes, incluido el ensayo de tu banda o un arreglo que no existe en ningún otro sitio. No hay catálogo del que elegir: cada canción de tu mesa la trajiste tú.",
    "Non ti servono gli stem ufficiali di nessuno. Funziona con le registrazioni che hai già, comprese le prove della tua band o un arrangiamento che non esiste da nessun'altra parte. Non c'è un catalogo da cui scegliere: ogni canzone sul tuo banco l'hai portata tu."
  ],
  "The separation is automatic and it's a statistical model, so we don't promise a result. On dense mixes an instrument bleeds a little into another. On orchestral material, very dense electronic music or poor recordings it comes out weaker — it's tuned for modern music played by a band.": [
    "La separación es automática y es un modelo estadístico, así que no prometemos un resultado. En mezclas densas un instrumento se filtra un poco en otro. En material orquestal, electrónica muy densa o grabaciones pobres sale más flojo — está ajustada a música moderna tocada por una banda.",
    "La separazione è automatica ed è un modello statistico, quindi non promettiamo un risultato. Nei mix densi uno strumento sborda un po' in un altro. Su materiale orchestrale, elettronica molto densa o registrazioni scarse viene più debole — è tarata sulla musica moderna suonata da una band."
  ],
  "FORMATS IN — 9": ["FORMATOS DE ENTRADA — 9", "FORMATI IN INGRESSO — 9"],
  "PER SONG": ["POR CANCIÓN", "PER CANZONE"],
  "KBPS OPUS FOR PLAYBACK": ["KBPS OPUS PARA REPRODUCIR", "KBPS OPUS PER LA RIPRODUZIONE"],
  "AND BACK OUT": ["Y DE VUELTA", "E IN USCITA"],
  "Download the tracks as a ZIP of MP3s — LAME VBR at V0,": [
    "Descarga las pistas como un ZIP de MP3 — LAME VBR en V0,",
    "Scarica le tracce come uno ZIP di MP3 — LAME VBR a V0,"
  ],
  "depending on the track — ready for your DAW.": [
    "según la pista — listas para tu DAW.",
    "a seconda della traccia — pronte per il tuo DAW."
  ],
  "02 · MULTITRACK IMPORT": ["02 · IMPORTAR MULTIPISTAS", "02 · IMPORTA MULTITRACCIA"],
  "Already have the stems? Drag in the ZIP.": ["¿Ya tienes los stems? Arrastra el ZIP.", "Hai già gli stem? Trascina lo ZIP."],
  "A multitrack package you already have lands as one song with all of its tracks — nothing gets separated, because it doesn't need to be. Tested with a real 430 MB project of 17 tracks.": [
    "Un paquete multipista que ya tienes entra como una canción con todas sus pistas — no se separa nada, porque no hace falta. Probado con un proyecto real de 430 MB y 17 pistas.",
    "Un pacchetto multitraccia che hai già entra come una canzone con tutte le sue tracce — non si separa niente, perché non serve. Testato con un progetto reale di 430 MB e 17 tracce."
  ],
  "Before anything uploads you see what's inside, with a name already proposed for each track. Rename, reorder, drop what you don't need. Anything that isn't audio is ignored. ZIP only — RAR isn't supported.": [
    "Antes de subir nada ves lo que hay dentro, con un nombre ya propuesto para cada pista. Renombra, reordena, quita lo que no necesites. Todo lo que no sea audio se ignora. Solo ZIP — RAR no está soportado.",
    "Prima di caricare qualsiasi cosa vedi cosa c'è dentro, con un nome già proposto per ogni traccia. Rinomina, riordina, togli quello che non ti serve. Tutto ciò che non è audio viene ignorato. Solo ZIP — RAR non è supportato."
  ],
  "430 MB · 17 TRACKS": ["430 MB · 17 PISTAS", "430 MB · 17 TRACCE"],
  "DRUMS": ["BATERÍA", "BATTERIA"],
  "BASS": ["BAJO", "BASSO"],
  "GUITAR": ["GUITARRA", "CHITARRA"],
  "KEYS": ["TECLADOS", "TASTIERE"],
  "IGNORED": ["IGNORADO", "IGNORATO"],
  "+ 12 MORE": ["+ 12 MÁS", "+ 12 ALTRE"],
  "03 · THE DESK": ["03 · LA MESA", "03 · IL BANCO"],
  "Volume, mute, solo, meter — per track": ["Volumen, mute, solo, medidor — por pista", "Volume, mute, solo, misuratore — per traccia"],
  "Silence your instrument and play over the band. Or solo it and learn the part note for note. With many tracks the desk slides sideways instead of squeezing everything into the screen.": [
    "Silencia tu instrumento y toca sobre la banda. O aíslalo y aprende la parte nota por nota. Con muchas pistas la mesa se desliza en lugar de apretar todo en la pantalla.",
    "Silenzia il tuo strumento e suona sopra la band. Oppure isolalo e impara la parte nota per nota. Con molte tracce il banco scorre invece di comprimere tutto nello schermo."
  ],
  "The beat map and the click": ["El mapa de compases y el clic", "La mappa delle battute e il click"],
  "It finds the tempo, the bar lines and where the one falls, even when the tempo moves. The click comes out of its own output, so pulling the band down to hear yourself doesn't take the count with it.": [
    "Encuentra el tempo, las líneas de compás y dónde cae el uno, incluso cuando el tempo se mueve. El clic sale por su propia salida, así que bajar la banda para oírte no se lleva la cuenta con ella.",
    "Trova il tempo, le stanghette e dove cade l'uno, anche quando il tempo si muove. Il click esce dalla sua uscita, così abbassare la band per sentirti non porta via il conteggio."
  ],
  "CLASSIC": ["CLÁSICO", "CLASSICO"],
  "SOFT BEEP": ["BEEP SUAVE", "BEEP MORBIDO"],
  "WOODBLOCK": ["CAJA CHINA", "WOODBLOCK"],
  "STICKS": ["BAQUETAS", "BACCHETTE"],
  "COWBELL": ["CENCERRO", "CAMPANACCIO"],
  "ACCENTS + SUBDIVISIONS": ["ACENTOS + SUBDIVISIONES", "ACCENTI + SUDDIVISIONI"],
  "Chords, key and BPM": ["Acordes, tonalidad y BPM", "Accordi, tonalità e BPM"],
  "It finds the chords and lays them over the beat map, ready to correct by hand. The key and the BPM are detected too, and editable everywhere they appear.": [
    "Encuentra los acordes y los coloca sobre el mapa de compases, listos para corregir a mano. La tonalidad y el BPM también se detectan, y se editan donde aparezcan.",
    "Trova gli accordi e li dispone sulla mappa delle battute, pronti da correggere a mano. Tonalità e BPM sono rilevati anche loro, e si modificano dove appaiono."
  ],
  "KEY OF D": ["TONALIDAD DE RE", "TONALITÀ DI RE"],
  "Pitch, without the speed": ["Tono, sin la velocidad", "Tonalità, senza la velocità"],
  "Move the key by semitones and the tempo stays where it was. The click and the drums are never transposed — it wouldn't make sense.": [
    "Cambia el tono por semitonos y el tempo se queda donde estaba. El clic y la batería nunca se transponen — no tendría sentido.",
    "Cambia la tonalità per semitoni e il tempo resta dov'era. Il click e la batteria non vengono mai trasposti — non avrebbe senso."
  ],
  "SAME TEMPO": ["MISMO TEMPO", "STESSO TEMPO"],
  "A–B loop": ["Bucle A–B", "Loop A–B"],
  "Mark A and B and repeat that stretch with sample precision. For hammering eight bars until they come out right.": [
    "Marca A y B y repite ese tramo con precisión de sample. Para machacar ocho compases hasta que salgan.",
    "Segna A e B e ripeti quel tratto con precisione al sample. Per martellare otto battute finché non vengono."
  ],
  "Live meters": ["Medidores en vivo", "Misuratori dal vivo"],
  "A real-time level meter on every channel, so you can see what's actually playing before you go looking for it in your ears.": [
    "Un medidor de nivel en tiempo real en cada canal, para ver qué está sonando de verdad antes de buscarlo en los oídos.",
    "Un misuratore di livello in tempo reale su ogni canale, per vedere cosa sta suonando davvero prima di cercarlo nelle orecchie."
  ],
  "04 · WHAT SITS NEXT TO THE SONG": ["04 · LO QUE VA JUNTO A LA CANCIÓN", "04 · COSA STA ACCANTO ALLA CANZONE"],
  "Lyrics, charts and a chord sheet that transposes": ["Letras, hojas y una hoja de acordes que transpone", "Testi, fogli e un foglio accordi che traspone"],
  "Lyrics, chord charts and PDFs live next to the song, not in another application — along with a photo of a score or a reference take.": [
    "Letras, hojas de acordes y PDFs viven junto a la canción, no en otra aplicación — además de la foto de una partitura o una toma de referencia.",
    "Testi, fogli accordi e PDF vivono accanto alla canzone, non in un'altra applicazione — insieme alla foto di uno spartito o a una take di riferimento."
  ],
  "The dynamic chord sheet puts the chords above the words in their exact position, transposes together with the song, and works in all three languages. Sections reorder by dragging.": [
    "La hoja de acordes dinámica pone los acordes sobre las palabras en su posición exacta, transpone junto con la canción y funciona en los tres idiomas. Las secciones se reordenan arrastrando.",
    "Il foglio accordi dinamico mette gli accordi sopra le parole nella loro posizione esatta, traspone insieme alla canzone e funziona in tutte tre le lingue. Le sezioni si riordinano trascinando."
  ],
  "Setlists put the songs in the order you'll play them, for a rehearsal or a show, and share with a link.": [
    "Las setlists ponen las canciones en el orden en que las vas a tocar, para un ensayo o un concierto, y se comparten con un enlace.",
    "Le setlist mettono le canzoni nell'ordine in cui le suonerai, per una prova o un concerto, e si condividono con un link."
  ],
  "CHORD SHEET · VERSE": ["HOJA DE ACORDES · ESTROFA", "FOGLIO ACCORDI · STROFA"],
  "the line the singer is on": ["la línea que canta el cantante", "la riga su cui è il cantante"],
  "and the one after that": ["y la que viene después", "e quella dopo"],
  "LYRICS": ["LETRAS", "TESTI"],
  "CHARTS": ["HOJAS", "FOGLI"],
  "PHOTOS": ["FOTOS", "FOTO"],
  "REFERENCE TAKE": ["TOMA DE REFERENCIA", "TAKE DI RIFERIMENTO"],
  "05 · MULTICHANNEL OUTPUT · DESKTOP ONLY": ["05 · SALIDA MULTICANAL · SOLO ESCRITORIO", "05 · USCITA MULTICANALE · SOLO DESKTOP"],
  "Each track to a physical output": ["Cada pista a una salida física", "Ogni traccia a un'uscita fisica"],
  "Click to the drummer's ear on output 1, band to the PA on 2–3, backing vocals on 5–6. Stereo pairs or mono, and you decide which outputs pair up.": [
    "El clic al oído del baterista por la salida 1, la banda al PA por 2–3, los coros por 5–6. Pares estéreo o mono, y tú decides qué salidas se emparejan.",
    "Il click nell'orecchio del batterista sull'uscita 1, la band al PA su 2–3, i cori su 5–6. Coppie stereo o mono, e decidi tu quali uscite si accoppiano."
  ],
  "Desktop app, Mac and Windows. It's the one thing a browser can't give: no browser sends more than two channels to the hardware, and that's the reason the desktop app exists.": [
    "App de escritorio, Mac y Windows. Es lo único que un navegador no puede dar: ningún navegador manda más de dos canales al hardware, y esa es la razón de que exista la app de escritorio.",
    "App desktop, Mac e Windows. È l'unica cosa che un browser non può dare: nessun browser manda più di due canali all'hardware, ed è per questo che esiste l'app desktop."
  ],
  "CLICK": ["CLIC", "CLICK"],
  "BAND MIX": ["MEZCLA BANDA", "MIX BAND"],
  "BACKING VOX": ["COROS", "CORI"],
  "MONO": ["MONO", "MONO"],
  "06 · THE TOOLS": ["06 · LAS HERRAMIENTAS", "06 · GLI STRUMENTI"],
  "The things you open every day, in the same place": ["Lo que abres cada día, en el mismo sitio", "Le cose che apri ogni giorno, nello stesso posto"],
  "Built as a list of data, not of screens: a new tool arrives as one more entry with its icon and its name, and nothing already in use moves.": [
    "Construido como una lista de datos, no de pantallas: una herramienta nueva llega como una entrada más con su icono y su nombre, y nada de lo que ya se usa se mueve.",
    "Costruito come una lista di dati, non di schermate: un nuovo strumento arriva come una voce in più con la sua icona e il suo nome, e niente di ciò che è già in uso si sposta."
  ],
  ", ten time signatures from 2/4 to 12/8, subdivision in eighths, triplets and sixteenths, tap tempo, and accents you set by tapping the beat. Keeps sounding with the screen off. The drawing is pinned to the audio clock with output latency subtracted, so the light lands when the click reaches the speaker.": [
    ", diez compases del 2/4 al 12/8, subdivisión en corcheas, tresillos y semicorcheas, tap tempo y acentos que marcas tocando el tiempo. Sigue sonando con la pantalla apagada. El dibujo va clavado al reloj de audio restando la latencia de salida, así la luz cae cuando el clic llega al altavoz.",
    ", dieci indicazioni di tempo dal 2/4 al 12/8, suddivisione in ottavi, terzine e sedicesimi, tap tempo e accenti che imposti battendo il tempo. Continua a suonare con lo schermo spento. Il disegno è agganciato all'orologio audio sottraendo la latenza di uscita, così la luce arriva quando il click raggiunge l'altoparlante."
  ],
  "FOUR BEATS · THE MARK": ["CUATRO TIEMPOS · LA MARCA", "QUATTRO MOVIMENTI · IL SEGNO"],
  "Chromatic for any instrument, with a per-instrument mode for strings: acoustic and electric guitar, bass, ukulele, violin, viola and cello. In those modes the headstock is drawn with the pegs where they actually sit, so you look at your instrument and the screen matches. Each string turns green the moment it's in tune.": [
    "Cromático para cualquier instrumento, con un modo por instrumento para las cuerdas: guitarra acústica y eléctrica, bajo, ukelele, violín, viola y cello. En esos modos el clavijero se dibuja con las clavijas donde están de verdad, así miras tu instrumento y la pantalla coincide. Cada cuerda se pone verde en el momento en que está afinada.",
    "Cromatico per qualsiasi strumento, con una modalità per strumento per gli archi: chitarra acustica ed elettrica, basso, ukulele, violino, viola e violoncello. In quelle modalità la paletta è disegnata con le meccaniche dove stanno davvero, così guardi il tuo strumento e lo schermo combacia. Ogni corda diventa verde nel momento in cui è accordata."
  ],
  "07 · WHERE IT RUNS": ["07 · DÓNDE FUNCIONA", "07 · DOVE GIRA"],
  "Installed from the browser, offline once downloaded": ["Se instala desde el navegador, sin conexión una vez descargada", "Si installa dal browser, offline una volta scaricata"],
  "NO APP STORE YET · INTERFACE IN EN / IT / ES · OFFLINE ONCE THE SONG IS DOWNLOADED · FILES STORED IN THE EU, PROCESSING PINNED TO THE EEA": [
    "TODAVÍA SIN TIENDA DE APPS · INTERFAZ EN EN / IT / ES · SIN CONEXIÓN UNA VEZ DESCARGADA LA CANCIÓN · ARCHIVOS EN LA UE, PROCESADO FIJADO AL EEE",
    "ANCORA NESSUNO STORE · INTERFACCIA IN EN / IT / ES · OFFLINE UNA VOLTA SCARICATA LA CANZONE · FILE ARCHIVIATI NELL'UE, ELABORAZIONE VINCOLATA AL SEE"
  ],
  "That's the whole product. It's in open beta.": ["Ese es todo el producto. Está en beta abierta.", "Questo è tutto il prodotto. È in beta aperta."],
  "Free while the beta runs, every feature unlocked, no card.": [
    "Gratis mientras dure la beta, todas las funciones abiertas, sin tarjeta.",
    "Gratis finché dura la beta, tutte le funzioni aperte, senza carta."
  ],

  // ——— Privacy and legal page
  "Privacy, limits and legal": ["Privacidad, límites y legal", "Privacy, limiti e legale"],
  "The long version, in one place.": ["La versión larga, en un solo sitio.", "La versione lunga, in un solo posto."],
  "What happens to your files, what the separation can and can't do, the technical numbers, and who operates this. Nothing here is a promise the terms of use don't already make.": [
    "Qué pasa con tus archivos, qué puede y qué no puede la separación, los números técnicos y quién opera esto. Nada de aquí es una promesa que los términos de uso no hagan ya.",
    "Cosa succede ai tuoi file, cosa può e cosa non può la separazione, i numeri tecnici e chi gestisce tutto questo. Niente qui è una promessa che i termini d'uso non facciano già."
  ],
  "01 · The line that holds everything else up": ["01 · La línea que sostiene todo lo demás", "01 · La riga che regge tutto il resto"],
  "Suonable doesn't supply music. There's no catalogue, no library to browse and nothing to stream. Every file in your account got there because you uploaded it, and you're responsible for holding the rights to do so.": [
    "Suonable no proporciona música. No hay catálogo, ni biblioteca que explorar, ni nada que reproducir en streaming. Cada archivo de tu cuenta está ahí porque tú lo subiste, y eres responsable de tener los derechos para hacerlo.",
    "Suonable non fornisce musica. Non c'è catalogo, né libreria da sfogliare, né niente da ascoltare in streaming. Ogni file nel tuo account è lì perché l'hai caricato tu, e sei responsabile di averne i diritti."
  ],
  "The tracks are for your own use — learning your part, rehearsing and playing them. Not for redistributing, publishing, selling or broadcasting them, and not as a service run on someone else's behalf or at volume.": [
    "Las pistas son para tu propio uso — aprender tu parte, ensayar y tocarlas. No para redistribuirlas, publicarlas, venderlas ni emitirlas, y no como un servicio prestado por cuenta de otros o a escala.",
    "Le tracce sono per uso personale — imparare la tua parte, provare e suonarle. Non per ridistribuirle, pubblicarle, venderle o trasmetterle, e non come servizio svolto per conto di altri o su larga scala."
  ],
  "02 · Your files": ["02 · Tus archivos", "02 · I tuoi file"],
  "Private by architecture, not by a setting.": ["Privado por arquitectura, no por un ajuste.", "Privato per architettura, non per un'impostazione."],
  "Each of these is a decision already made in the code, not an intention.": [
    "Cada una de estas es una decisión ya tomada en el código, no una intención.",
    "Ognuna di queste è una decisione già presa nel codice, non un'intenzione."
  ],
  "Your audio doesn't train our models": ["Tu audio no entrena nuestros modelos", "Il tuo audio non addestra i nostri modelli"],
  "The models are pretrained. They run over your file and forget it.": [
    "Los modelos están preentrenados. Pasan por tu archivo y lo olvidan.",
    "I modelli sono pre-addestrati. Passano sul tuo file e lo dimenticano."
  ],
  "Stored in the European Union": ["Guardados en la Unión Europea", "Archiviati nell'Unione Europea"],
  "And the processing is pinned to the European Economic Area. It costs measurable waiting time, and it stays that way.": [
    "Y el procesado está fijado al Espacio Económico Europeo. Cuesta tiempo de espera medible, y se queda así.",
    "E l'elaborazione è vincolata allo Spazio Economico Europeo. Costa tempo di attesa misurabile, e resta così."
  ],
  "One space per account": ["Un espacio por cuenta", "Uno spazio per account"],
  "Your files live in a space addressed by your own identifier, taken from the session and never from the request. There's no parameter anyone can change to reach someone else's content.": [
    "Tus archivos viven en un espacio direccionado por tu propio identificador, tomado de la sesión y nunca de la petición. No hay ningún parámetro que alguien pueda cambiar para llegar al contenido de otro.",
    "I tuoi file vivono in uno spazio indirizzato dal tuo identificatore, preso dalla sessione e mai dalla richiesta. Non c'è alcun parametro che qualcuno possa cambiare per raggiungere i contenuti di un altro."
  ],
  "Links expire in an hour": ["Los enlaces caducan en una hora", "I link scadono in un'ora"],
  "And they carry the owner inside the signature, so a leaked link still only reaches its owner's file.": [
    "Y llevan al propietario dentro de la firma, así que un enlace filtrado sigue llegando solo al archivo de su dueño.",
    "E portano il proprietario dentro la firma, così un link finito in giro raggiunge comunque solo il file del suo proprietario."
  ],
  "No ad trackers, no third-party analytics": ["Sin rastreadores publicitarios, sin analíticas de terceros", "Nessun tracker pubblicitario, nessuna analitica di terze parti"],
  "Nothing here is building a profile of you.": ["Aquí nada está construyendo un perfil de ti.", "Qui niente sta costruendo un profilo su di te."],
  "Delete it yourself": ["Bórralo tú mismo", "Cancella tu stesso"],
  "Your account and everything in it, from inside the app — not a request you have to send. Removing a song keeps it 60 days and then deletes it for real, and you can delete it outright before that.": [
    "Tu cuenta y todo lo que hay dentro, desde la propia app — no una solicitud que tengas que enviar. Al quitar una canción se guarda 60 días y luego se borra de verdad, y puedes borrarla del todo antes.",
    "Il tuo account e tutto ciò che contiene, dall'app stessa — non una richiesta da inviare. Rimuovendo una canzone resta 60 giorni e poi viene cancellata davvero, e puoi cancellarla del tutto anche prima."
  ],
  "03 · What it isn't": ["03 · Lo que no es", "03 · Cosa non è"],
  "The honest version, in full.": ["La versión honesta, completa.", "La versione onesta, per intero."],
  "The separation is automatic and it's good. It isn't a studio session, and we'd rather you knew that before you upload.": [
    "La separación es automática y es buena. No es una sesión de estudio, y preferimos que lo sepas antes de subir nada.",
    "La separazione è automatica ed è buona. Non è una sessione in studio, e preferiamo che lo sappia prima di caricare."
  ],
  "A CLEAN SPLIT EVERY TIME": ["UNA SEPARACIÓN LIMPIA SIEMPRE", "UNA SEPARAZIONE PULITA SEMPRE"],
  "It's a statistical model, so we don't promise a result. An instrument bleeds a little into another, most of all in dense mixes.": [
    "Es un modelo estadístico, así que no prometemos un resultado. Un instrumento se filtra un poco en otro, sobre todo en mezclas densas.",
    "È un modello statistico, quindi non promettiamo un risultato. Uno strumento sborda un po' in un altro, soprattutto nei mix densi."
  ],
  "GOOD WITH ANY MUSIC": ["BUENO CON CUALQUIER MÚSICA", "BUONO CON QUALSIASI MUSICA"],
  "Tuned and tested on modern music played by a band. Orchestral, very dense electronic and poor recordings come out worse.": [
    "Ajustada y probada con música moderna tocada por una banda. Lo orquestal, la electrónica muy densa y las grabaciones pobres salen peor.",
    "Tarata e testata su musica moderna suonata da una band. Orchestrale, elettronica molto densa e registrazioni scarse vengono peggio."
  ],
  "INSTANT": ["INSTANTÁNEO", "ISTANTANEO"],
  "About three minutes of processing per song, and a little more because the processing stays inside the EEA. Then it's yours offline.": [
    "Unos tres minutos de procesado por canción, y un poco más porque el procesado se queda dentro del EEE. Después es tuya sin conexión.",
    "Circa tre minuti di elaborazione per canzone, e un po' di più perché l'elaborazione resta dentro il SEE. Poi è tua offline."
  ],
  "MULTICHANNEL EVERYWHERE": ["MULTICANAL EN TODAS PARTES", "MULTICANALE DAPPERTUTTO"],
  "Desktop app only. In the browser and on mobile it's two channels, full stop.": [
    "Solo app de escritorio. En el navegador y en el móvil son dos canales, punto.",
    "Solo app desktop. Nel browser e su mobile sono due canali, punto."
  ],
  "A PLACE TO FIND MUSIC": ["UN SITIO PARA ENCONTRAR MÚSICA", "UN POSTO PER TROVARE MUSICA"],
  "There's nothing to browse and nothing to stream. You bring the files, and you're responsible for having the right to.": [
    "No hay nada que explorar ni nada que reproducir en streaming. Tú traes los archivos, y eres responsable de tener derecho a ello.",
    "Non c'è niente da sfogliare e niente da ascoltare in streaming. I file li porti tu, e sei responsabile di averne il diritto."
  ],
  "FINISHED · IN THE STORES · RAR": ["TERMINADO · EN LAS TIENDAS · RAR", "FINITO · NEGLI STORE · RAR"],
  "It's in open beta. Not in the stores yet — it installs from the browser. Multitrack packages come in as ZIP; RAR isn't supported.": [
    "Está en beta abierta. Todavía no en las tiendas — se instala desde el navegador. Los paquetes multipista entran como ZIP; RAR no está soportado.",
    "È in beta aperta. Non ancora negli store — si installa dal browser. I pacchetti multitraccia entrano come ZIP; RAR non è supportato."
  ],
  "03 · The technical data": ["04 · Los datos técnicos", "04 · I dati tecnici"],
  "For when somebody asks.": ["Para cuando alguien pregunte.", "Per quando qualcuno chiede."],
  "Tracks per song": ["Pistas por canción", "Tracce per canzone"],
  "6, or 7 with the backing vocals split from the lead": [
    "6, o 7 con los coros separados de la voz principal",
    "6, o 7 con i cori separati dalla voce principale"
  ],
  "Playback format": ["Formato de reproducción", "Formato di riproduzione"],
  "Opus at": ["Opus a", "Opus a"],
  "— reads in every browser": ["— se lee en todos los navegadores", "— si legge in ogni browser"],
  "Download format": ["Formato de descarga", "Formato di download"],
  "depending on the track)": ["según la pista)", "a seconda della traccia)"],
  "Metronome range": ["Rango del metrónomo", "Range del metronomo"],
  "· ten time signatures from 2/4 to 12/8": ["· diez compases del 2/4 al 12/8", "· dieci indicazioni di tempo dal 2/4 al 12/8"],
  "Languages": ["Idiomas", "Lingue"],
  "Platforms": ["Plataformas", "Piattaforme"],
  "Installable web; desktop on Mac and Windows with multichannel output": [
    "Web instalable; escritorio en Mac y Windows con salida multicanal",
    "Web installabile; desktop su Mac e Windows con uscita multicanale"
  ],
  "Where the audio lives": ["Dónde vive el audio", "Dove vive l'audio"],
  "European Union. Processing pinned to the EEA": ["Unión Europea. Procesado fijado al EEE", "Unione Europea. Elaborazione vincolata al SEE"],
  "When you remove a song": ["Cuando quitas una canción", "Quando rimuovi una canzone"],
  "Recoverable for": ["Recuperable durante", "Recuperabile per"],
  "days, then deleted": ["días, después se borra", "giorni, poi cancellata"],
  "Status": ["Estado", "Stato"],
  "Open beta, free": ["Beta abierta, gratis", "Beta aperta, gratis"],
  "04 · If something has to come down": ["05 · Si algo tiene que bajarse", "05 · Se qualcosa deve essere rimosso"],
  "There's a written route, and here's the door.": ["Hay una vía escrita, y esta es la puerta.", "C'è una procedura scritta, ed ecco la porta."],
  "The copyright policy sets out what a notice has to contain — identify the work, where it is, why it's unlawful, a name and an address that works — what we do with it, and how a restriction is contested. Repeat infringers lose their accounts. The audio is never scanned or fingerprinted.": [
    "La política de copyright establece qué debe contener un aviso — identificar la obra, dónde está, por qué es ilícita, un nombre y una dirección que funcione —, qué hacemos con él y cómo se impugna una restricción. Los infractores reincidentes pierden su cuenta. El audio nunca se escanea ni se le hace fingerprinting.",
    "La politica sul copyright stabilisce cosa deve contenere una segnalazione — identificare l'opera, dov'è, perché è illecita, un nome e un indirizzo che funzioni —, cosa ne facciamo e come si contesta una restrizione. I recidivi perdono l'account. L'audio non viene mai scansionato né sottoposto a fingerprinting."
  ],
  "SEND NOTICES TO": ["ENVÍA LOS AVISOS A", "INVIA LE SEGNALAZIONI A"],
  "It's a monitored address, and it's the same one for abuse reports.": [
    "Es una dirección monitorizada, y es la misma para reportes de abuso.",
    "È un indirizzo monitorato, ed è lo stesso per le segnalazioni di abuso."
  ],
  "Read the copyright policy": ["Leer la política de copyright", "Leggi la politica sul copyright"],
  "05 · Getting in touch": ["06 · Cómo contactar", "06 · Come contattarci"],
  "Version beta-1, 3 September 2026.": ["Versión beta-1, 3 de septiembre de 2026.", "Versione beta-1, 3 settembre 2026."]
};

const origin = new WeakMap();
const KEY = "suonable.lang";

function readLang() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "EN" || v === "ES" || v === "IT") return v;
  } catch (e) {}
  return "EN";
}

function saveLang(lang) {
  try { localStorage.setItem(KEY, lang); } catch (e) {}
}

function textNodes() {
  const out = [];
  if (typeof document === "undefined") return out;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      const tag = p.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEMPLATE" || tag === "CANVAS") return NodeFilter.FILTER_REJECT;
      if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let n;
  while ((n = walker.nextNode())) out.push(n);
  return out;
}

function applyLang(lang) {
  saveLang(lang);
  const i = lang === "ES" ? 0 : 1;
  textNodes().forEach((node) => {
    if (!origin.has(node)) origin.set(node, node.nodeValue);
    const en = origin.get(node);
    if (lang === "EN") {
      if (node.nodeValue !== en) node.nodeValue = en;
      return;
    }
    const key = en.trim();
    const hit = dict[key];
    if (hit && hit[i]) {
      const next = en.replace(key, hit[i]);
      if (node.nodeValue !== next) node.nodeValue = next;
    } else if (node.nodeValue !== en) {
      node.nodeValue = en;
    }
  });
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", lang.toLowerCase());
    const mail = document.querySelector('input[type="email"]');
    if (mail) mail.placeholder = lang === "EN" ? "you@band.com" : lang === "ES" ? "tu@banda.com" : "tu@band.com";
  }
}

window.SuonableI18n = { dict: dict, applyLang: applyLang, readLang: readLang, saveLang: saveLang };

})();
