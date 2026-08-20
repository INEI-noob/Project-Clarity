// src/i18n.js
// Lightweight i18n for Project Clarity — covers all 12 official South African languages.
// Scope: UI chrome (nav, footer, welcome overlay, page headings). Full guide bodies
// remain in English; more content languages arrive incrementally.
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export const LOCALES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa' },
  { code: 'nso', name: 'Sepedi', nativeName: 'Sepedi' },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho' },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga' },
  { code: 'ss', name: 'Swati', nativeName: 'siSwati' },
  { code: 've', name: 'Venda', nativeName: 'Tshivenda' },
  { code: 'nr', name: 'Ndebele', nativeName: 'isiNdebele' },
];

const STORAGE_KEY = 'clarity_locale';
export const DEFAULT_LOCALE = 'en';

const STRINGS = {
  'nav.home': {
    en: 'Home', af: 'Tuis', zu: 'Ikhaya', xh: 'Ikhaya', nso: 'Lapa', tn: 'Lelwapa', st: 'Lehae',
    ts: 'Kaya', ss: 'Likhaya', ve: 'Muḓi', nr: 'Ikhaya',
  },
  'nav.guides': {
    en: 'Guides', af: 'Gidse', zu: 'Imihlahlandlela', xh: 'Izikhokelo', nso: 'Ditlhahlobi', tn: 'Dikaelo',
    st: 'Litaelo', ts: 'Swiletelo', ss: 'Tincenyele', ve: 'Miṱandavho', nr: 'Imihlahlandlela',
  },
  'nav.resources': {
    en: 'Resources', af: 'Hulpbronne', zu: 'Izinsiza', xh: 'Izibonelelo', nso: 'Methopo', tn: 'Didiriswa',
    st: 'Lisebelisoa', ts: 'Swikongomelo', ss: 'Ema-resource', ve: 'Zwiko', nr: 'Imithombo',
  },
  'nav.connect': {
    en: 'Connect', af: 'Kontak', zu: 'Xhumana', xh: 'Nxibelelana', nso: 'Gokaganyana', tn: 'Ikgolaganye',
    st: 'Kopana', ts: 'Hlangana', ss: 'Xhumana', ve: 'Khuvhanganya', nr: 'Thintana',
  },
  'nav.about': {
    en: 'About', af: 'Oor ons', zu: 'Ngathi', xh: 'Ngathi', nso: 'Ka rena', tn: 'Ka ga rona',
    st: 'Ka rona', ts: 'Hi ta hina', ss: 'Ngatsi', ve: 'Zwa riṋe', nr: 'Ngathi',
  },
  'nav.pulse': {
    en: 'The Pulse', af: 'Die Puls', zu: 'I-Pulse', xh: 'I-Pulse', nso: 'Pulse', tn: 'Pulse',
    st: 'Pulse', ts: 'Pulse', ss: 'Pulse', ve: 'Pulse', nr: 'Pulse',
  },
  'nav.crisis': {
    en: 'In Crisis?', af: 'In Krisis?', zu: 'Usengozini?', xh: 'Usengxakini?', nso: 'O kotsing?',
    tn: 'A o mo kotsing?', st: 'O kotsing?', ts: 'U le khombyeni?', ss: 'Usengotini?', ve: 'U khagala?',
    nr: 'Usengcupheni?',
  },
  'nav.language': {
    en: 'Language', af: 'Taal', zu: 'Ulimi', xh: 'Ulwimi', nso: 'Polelo', tn: 'Puo',
    st: 'Puo', ts: 'Ririmi', ss: 'Lulwimi', ve: 'Luambo', nr: 'Ilwimi',
  },

  'common.explore': {
    en: 'Explore', af: 'Verken', zu: 'Hlola', xh: 'Phonononga', nso: 'Hlahloba', tn: 'Batlisisa',
    st: 'Hlahloba', ts: 'Pfula', ss: 'Hlola', ve: 'Ṱolisa', nr: 'Hlola',
  },
  'common.readMore': {
    en: 'Read More', af: 'Lees meer', zu: 'Funda kabanzi', xh: 'Funda ngakumbi', nso: 'Bala go feta',
    tn: 'Bala go feta', st: 'Bala haholoanyane', ts: 'Hlaya swin\'wana', ss: 'Fundza kabanti',
    ve: 'Vhala zwiṅwe', nr: 'Funda ngokwengeziwe',
  },
  'common.learnMore': {
    en: 'Learn More', af: 'Leer meer', zu: 'Funda kabanzi', xh: 'Funda ngakumbi', nso: 'Ithute go feta',
    tn: 'Ithute go feta', st: 'Ithute haholoanyane', ts: 'Dyondza swin\'wana', ss: 'Fundza kabanti',
    ve: 'Guda zwiṅwe', nr: 'Funda ngokwengeziwe',
  },
  'common.search': {
    en: 'Search', af: 'Soek', zu: 'Sesha', xh: 'Khangela', nso: 'Nyakišiša', tn: 'Batla',
    st: 'Batla', ts: 'Lavisisa', ss: 'Sesha', ve: 'Todoula', nr: 'Sesha',
  },
  'common.back': {
    en: 'Back', af: 'Terug', zu: 'Emuva', xh: 'Buyela umva', nso: 'Boela morago', tn: 'Boela morago',
    st: 'Khutlela morao', ts: 'Vuya endzhaku', ss: 'Buyela emuva', ve: 'Vhuelela murahu', nr: 'Buyela emuva',
  },
  'common.open': {
    en: 'Open', af: 'Maak oop', zu: 'Vula', xh: 'Vula', nso: 'Bula', tn: 'Bula',
    st: 'Bula', ts: 'Pfula', ss: 'Vula', ve: 'Vula', nr: 'Vula',
  },
  'common.remove': {
    en: 'Remove', af: 'Verwyder', zu: 'Susa', xh: 'Susa', nso: 'Tloša', tn: 'Tlosa',
    st: 'Tlosa', ts: 'Susa', ss: 'Susa', ve: 'Bvisa', nr: 'Susa',
  },
  'common.save': {
    en: 'Save', af: 'Stoor', zu: 'Gcina', xh: 'Gcina', nso: 'Boloka', tn: 'Boloka',
    st: 'Boloka', ts: 'Hlayisa', ss: 'Gcina', ve: 'Vhulunga', nr: 'Gcina',
  },
  'common.saved': {
    en: 'Saved', af: 'Gestoor', zu: 'Kugciniwe', xh: 'Kugciniwe', nso: 'E bolokilwe', tn: 'E bolokilwe',
    st: 'E bolokiloe', ts: 'Swi hlayisiwile', ss: 'Kugciniwe', ve: 'Zwo vhulungwa', nr: 'Kugciniwe',
  },
  'common.share': {
    en: 'Share', af: 'Deel', zu: 'Yabelana', xh: 'Yabelana', nso: 'Abela', tn: 'Abelana',
    st: 'Abelana', ts: 'Avelana', ss: 'Yabelana', ve: 'Khethekanya', nr: 'Yabelana',
  },
  'common.contact': {
    en: 'Contact Us', af: 'Kontak ons', zu: 'Xhumana nathi', xh: 'Qhagamshelana nathi',
    nso: 'Gokaganya le rena', tn: 'Ikgolaganye le rona', st: 'Ikopanye le rona', ts: 'Hlangana na hina',
    ss: 'Xhumana natsi', ve: 'Khuvhanganya na riṋe', nr: 'Thintana nathi',
  },
  'common.close': {
    en: 'Close', af: 'Maak toe', zu: 'Vala', xh: 'Vala', nso: 'Tswala', tn: 'Tswala',
    st: 'Koala', ts: 'Pfala', ss: 'Vala', ve: 'Vala', nr: 'Vala',
  },

  'footer.tagline': {
    en: 'A digital sanctuary for the LGBTQIA+ community of South Africa — safe, private, and judgment-free.',
    af: '\'n Digitale toevlugsoord vir die LGBTQIA+-gemeenskap van Suid-Afrika — veilig, privaat en sonder oordeel.',
    zu: 'Indawo yokuphephela yedijithali yomphakathi we-LGBTQIA+ waseNingizimu Afrika — ephephile, eyimfihlo, engahluleli.',
    xh: 'Indawo ekhuselekileyo yedijithali yoluntu lwe-LGBTQIA+ laseMzantsi Afrika — ikhuselekile, iyimfihlo, ayigwebi.',
    nso: 'Legae la dijithale la pholoso la setšhaba sa LGBTQIA+ sa Afrika Borwa — le šireletšego, le sephiri, le se sa ahlola.',
    tn: 'Legae la dijithale le le sireletsegileng la setšhaba sa LGBTQIA+ sa Aforika Borwa — le sireletsegile, sephiri, ga le atlhola.',
    st: 'Sebaka se sireletsehileng sa dijithale bakeng sa sechaba sa LGBTQIA+ sa Afrika Boroa — se sireletsehile, se patiloe, ha se ahlole.',
    ts: 'Ndzaku wa dijithali wa xirhendzevutani xa LGBTQIA+ xa Afrika-Dzonga — wo hlayiseka, wa xihundla, wa kungatlangi.',
    ss: 'Indzawo lephephile yedijithali yemphakatsi we-LGBTQIA+ waseNingizimu Afrika — iphephile, imfihlo, ayilahli.',
    ve: 'Fhethu ha dijithale ho shumiswaho lushaka lwa LGBTQIA+ lwa Afrika Tshipembe — ho londa, tshiphiri, a huli.',
    nr: 'Indawo ekhululekileyo yedijithali yomphakathi we-LGBTQIA+ waseNingizimu Afrika — ikhululekile, iyimfihlo, ayigwebi.',
  },
  'footer.explore': {
    en: 'Navigate', af: 'Navigeer', zu: 'Zulazula', xh: 'Jikeleza', nso: 'Tsamaya', tn: 'Tsamaya',
    st: 'Tsamaea', ts: 'Endla ndlela', ss: 'Hlola', ve: 'Ralo', nr: 'Hamba',
  },
  'footer.support': {
    en: 'Resources', af: 'Hulpbronne', zu: 'Izinsiza', xh: 'Izibonelelo', nso: 'Methopo', tn: 'Didiriswa',
    st: 'Lisebelisoa', ts: 'Swikongomelo', ss: 'Ema-resource', ve: 'Zwiko', nr: 'Imithombo',
  },
  'footer.connect': {
    en: 'Connect', af: 'Kontak', zu: 'Xhumana', xh: 'Nxibelelana', nso: 'Gokaganyana', tn: 'Ikgolaganye',
    st: 'Kopana', ts: 'Hlangana', ss: 'Xhumana', ve: 'Khuvhanganya', nr: 'Thintana',
  },
  'footer.crisisLine': {
    en: 'Crisis Hotline', af: 'Krisishulplyn', zu: 'Ucingo lwezimo eziphuthumayo', xh: 'Umnxeba ongxamisekileyo',
    nso: 'Thelefou ya maemo a tšohle', tn: 'Nakana ya kotsi', st: 'Mohala oa tšohanyetso',
    ts: 'Nomboro ya tindlela ta xihatla', ss: 'Inombolo yesimo lesiphutfumako', ve: 'Tshumba ya vhudavhidzani ha tshiimo',
    nr: 'Umcingo wezimo eziphuthumayo',
  },
  'footer.safety': {
    en: 'Safety Guidelines', af: 'Veiligheidsriglyne', zu: 'Imithetho yokuphepha', xh: 'Izikhokelo zokhuseleko',
    nso: 'Ditlhahlobi tša polokego', tn: 'Dikaelo tsa polokesego', st: 'Litaelo tsa tšireletso',
    ts: 'Swiletelo swa vuhlayiseki', ss: 'Tincenyele tekuphepha', ve: 'Miṱandavho ya vhulondedzi', nr: 'Imihlahlandlela yokuphepha',
  },
  'footer.privacy': {
    en: 'Privacy Promise', af: 'Privaatheidsbelofte', zu: 'Isithembiso semfihlo', xh: 'Isithembiso semifihlelo',
    nso: 'Tshepišo ya sephiri', tn: 'Tshepiso ya sephiri', st: 'Tšepiso ea lekunutu',
    ts: 'Xitshembiso xa xihundla', ss: 'Setsembiso sekutfola imfihlo', ve: 'Vhulaimbi ha tshiphiri', nr: 'Isithembiso semfihlo',
  },
  'footer.guidelines': {
    en: 'Community Guidelines', af: 'Gemeenskapsriglyne', zu: 'Imithetho yomphakathi', xh: 'Imigaqo yoluntu',
    nso: 'Melao ya setšhaba', tn: 'Dikaelo tsa setšhaba', st: 'Litaelo tsa sechaba',
    ts: 'Milawu ya xirhendzevutani', ss: 'Imitsetfo yemphakatsi', ve: 'Milayo ya lushaka', nr: 'Imithetho yomphakathi',
  },
  'footer.safeSpace': {
    en: 'Safe Space', af: 'Veilige ruimte', zu: 'Indawo ephephile', xh: 'Indawo ekhuselekileyo',
    nso: 'Lefelo le le šireletšego', tn: 'Lefelo le le sireletsegileng', st: 'Sebaka se sireletsehileng',
    ts: 'Ndhawu yo hlayiseka', ss: 'Indzawo lephephile', ve: 'Fhethu ho londaho', nr: 'Indawo ekhululekileyo',
  },
  'footer.private': {
    en: 'Private', af: 'Privaat', zu: 'Imfihlo', xh: 'Imfihlo', nso: 'Sephiri', tn: 'Sephiri',
    st: 'Lekunutu', ts: 'Xihundla', ss: 'Imfihlo', ve: 'Tshiphiri', nr: 'Imfihlo',
  },
  'footer.newsletter': {
    en: 'Letters from the Sanctuary', af: 'Briewe uit die Toevlugsoord', zu: 'Izincwadi ezivela endaweni yokuphephela',
    xh: 'Iileta ezivela kwindawo ekhuselekileyo', nso: 'Mangwalo a tšwago legaeng la pholoso',
    tn: 'Dikwalo tse di tswang legaeng le le sireletsegileng', st: 'Mangolo a tsoang sebakeng se sireletsehileng',
    ts: 'Mapapila ya humaka eka ndzaku wo hlayiseka', ss: 'Tincwadzi letivela endzaweni lephephile',
    ve: 'Muvhala wa fhethu ho shumiswaho', nr: 'Izincwadi ezivela endaweni ekhululekileyo',
  },
  'footer.newsletterSub': {
    en: 'Occasional updates, new guides, and community events. No spam, no rainbow-washing — just the good stuff. Unsubscribe anytime.',
    af: 'Af en toe opdaterings, nuwe gidse en gemeenskapsgeleenthede. Geen strooipos nie — net die goeie goed. Teken enige tyd uit.',
    zu: 'Izibuyekezo ngezikhathi ezithile, imihlahlandlela emisha, nemicimbi yomphakathi. Akukho ugaxekile — okuhle kuphela. Ungayeka noma nini.',
    xh: 'Izibuyekezo ngamaxesha athile, izikhokelo ezintsha, neziganeko zoluntu. Akukho spam — into entle kuphela. Ungayeka nanini na.',
    nso: 'Dikgafo ka dinako, ditlhahlobi tše difsa, le ditlwaelo tša setšhaba. Ga go na spam — e botse feela. E tlogela neng kapa neng.',
    tn: 'Dintlafatso ka dinako tse dingwe, dikaelo tse dišwa, le dikgang tsa setšhaba. Ga go na spam — tse di siameng fela. O ka tlogela nako le nngwe.',
    st: 'Litlhahlobo ka linako tse ling, litaelo tse ncha, le liketsahalo tsa sechaba. Ha ho na spam — lintho tse ntle feela. U ka itokolla neng kapa neng.',
    ts: 'Tihundzulo hi mikarhi yin\'wana, swiletelo swintshwa, na mintlangu ya xirhendzevutani. A ku na spam — swinene ntsena. U nga tshika nkarhi wihi.',
    ss: 'Tibuyeketo ngetikhatsi letinye, tincenyele letinsha, nemicimbi yemphakatsi. Akukho spam — lokuhle kuphela. Ungayeka noma nini.',
    ve: 'Vhudzulutshedzo nga tshifhinga tshiṅwe, miṱandavho ntswa, na zwiitwa zwa lushaka. A huna spam — zwi pfaneleaho fhedzi. Nga u tenda u nga thikwa tshifhinga tshiṅwe na tshiṅwe.',
    nr: 'Izibuyekezo ngezikhathi ezithile, imihlahlandlela emisha, nemicimbi yomphakathi. Akukho spam — okuhle kuphela. Ungayeka noma nini.',
  },
  'footer.subscribe': {
    en: 'Subscribe', af: 'Teken in', zu: 'Bhalisa', xh: 'Bhalisa', nso: 'Ngwadiša', tn: 'Ngwadisetsa',
    st: 'Ngolisa', ts: 'Tsarisa', ss: 'Bhalisa', ve: 'Ṅwalisa', nr: 'Bhalisa',
  },
  'footer.madeWith': {
    en: 'By the community, for the community', af: 'Deur die gemeenskap, vir die gemeenskap',
    zu: 'Ngomphakathi, womphakathi', xh: 'Luluntu, loluntu', nso: 'Ka setšhaba, bakeng sa setšhaba',
    tn: 'Ke setšhaba, sa setšhaba', st: 'Ke sechaba, bakeng sa sechaba', ts: 'Hi xirhendzevutani, eka xirhendzevutani',
    ss: 'Ngemphakatsi, wemphakatsi', ve: 'Nga lushaka, lwa lushaka', nr: 'Ngomphakathi, womphakathi',
  },
  'footer.backToTop': {
    en: 'Back to Top', af: 'Terug boontoe', zu: 'Buyela phezulu', xh: 'Buyela phezulu',
    nso: 'Boela godimo', tn: 'Boela kwa godimo', st: 'Khutlela holimo', ts: 'Vuya ehenhla',
    ss: 'Buyela phezulu', ve: 'Vhuelela murahu hafhu', nr: 'Buyela phezulu',
  },
  'footer.systemActive': {
    en: 'System Active', af: 'Stelsel Aktief', zu: 'Isistimu isebenza', xh: 'Inkqubo iyasebenza',
    nso: 'Sestema e šomago', tn: 'Sesteme e a šoma', st: 'Tsamaiso e sebetsa', ts: 'Sisteme yi tirha',
    ss: 'Isistimu iyasebenta', ve: 'Sisiteme i khou shuma', nr: 'Isistimu iyasebenza',
  },

  'welcome.title': {
    en: 'Welcome to the Sanctuary', af: 'Welkom by die Toevlugsoord', zu: 'Siyakwamukela endaweni yokuphephela',
    xh: 'Wamkelekile kwindawo ekhuselekileyo', nso: 'O amogetšwe legaeng la pholoso',
    tn: 'O amogelesegile legaeng le le sireletsegileng', st: 'U amohelehile sebakeng se sireletsehileng',
    ts: 'U amukeriwe eka ndzaku wo hlayiseka', ss: 'Wemukelekile endzaweni lephephile',
    ve: 'O tanganedzwa fhethuni ha shumiswaho', nr: 'Wamukelwe endaweni ekhululekileyo',
  },
  'welcome.intro': {
    en: 'Before you explore — three things you should know. This space is built to keep you safe and private.',
    af: 'Voordat jy verken — drie dinge wat jy moet weet. Hierdie ruimte is gebou om jou veilig en privaat te hou.',
    zu: 'Ngaphambi kokuba uhlole — izinto ezintathu okufanele uzazi. Le ndawo yakhelwe ukukugcina uphephile futhi uyimfihlo.',
    xh: 'Phambi kokuba uphonononge — izinto ezintathu ekufuneka uzazi. Le ndawo yakhelwe ukukugcina ukhuselekile nongaziwa.',
    nso: 'Pele o hlahloba — dilo tše tharo tšeo o swanetšego go di tseba. Lefelo le le agetšwe go go šireletša le go go boloka o le sephiri.',
    tn: 'Pele o batlisisa — dilo tse tharo tse o tshwanetseng go di itse. Lefelo le le agilwe go go sireletsa le go go boloka sephiri.',
    st: 'Pele u hlahloba — lintho tse tharo tseo u lokelang ho li tseba. Sebaka sena se hahiloe ho u boloka u sireletsehile le u patiloe.',
    ts: 'Phambi ka loko u pfula — swilo swinharhu leswi u faneleke ku swi tiva. Ndhawu leyi yi endliwe ku ku hlayisa u ri karhi u hlayisekile na ku nga tiviwa.',
    ss: 'Ngaphambi kwekutsi uhlole — tintfo letintsatfu lokufanele utati. Lendzawo yakhelwe kukugcina uphephile ngesikhatsi ungatiwa.',
    ve: 'Fhano huna u ṱola — zwiṱa vhuraru zwine na tea u zwi ḓivha. Ha fhethu huno ho itwa u dzudza u tshi londa na u sa divhea.',
    nr: 'Ngaphambi kokuba uhlole — izinto ezintathu okufanele uzazi. Le ndawo yakhelwe ukukugcina ukhululekile nongaziwa.',
  },
  'welcome.anonTitle': {
    en: "You're anonymous", af: 'Jy is anoniem', zu: 'Awaziwa', xh: 'Awaziwa',
    nso: 'Ga o tsebege', tn: 'Ga o itsege', st: 'Ha u tsejoe', ts: 'A wu tiviwi',
    ss: 'Awutatiwa', ve: 'A u divhei', nr: 'Awaziwa',
  },
  'welcome.anonBody': {
    en: 'No accounts, no names, no sign-ups. Nothing you do here is tied to you.',
    af: 'Geen rekeninge, geen name, geen registrasies nie. Niks wat jy hier doen is aan jou gekoppel nie.',
    zu: 'Akukho ama-akhawunti, akukho amagama, akukho ukubhalisa. Akukho nto oyenzayo lapha eboshelwe kuwe.',
    xh: 'Akukho ii-akhawunti, akukho magama, akukho ukubhalisa. Akukho nto uyenzayo apha ebotshelelwe kuwe.',
    nso: 'Ga go na diakhaonto, ga go na maina, ga go na go ngwadiša. Ga go na selo seo o se dirago mo se swaragantšwego le wena.',
    tn: 'Ga go na diakhaonto, ga go na maina, ga go na go ngwadisetsa. Ga go na sepe se o se dirang fa se golagantswe le wena.',
    st: 'Ha ho na li-account, ha ho na mabitso, ha ho na ho ngolisa. Ha ho letho leo u le etsang mona le amanang le uena.',
    ts: 'A ku na ti-akhawunti, a ku na mavito, a ku na ku tsarisa. A ku na nchumu lowu u wu endlaka laha lowu tlangana na wena.',
    ss: 'Akukho tikhawunti, akukho emabito, akukho kubhalisa. Akukho loko lokwentako lapha lokuhlanganiswe nawe.',
    ve: 'A huna diakhaunti, a huna madzina, a huna u ṅwalisa. A huna tshithu tshe na ita afha tshi no vha na u vha na inwi.',
    nr: 'Akukho ama-akhawunti, akukho amagama, akukho ukubhalisa. Akukho nto oyenzayo lapha eboshelwe kuwe.',
  },
  'welcome.privacyTitle': {
    en: 'Private by design', af: 'Ontwerp om privaat te wees', zu: 'Imfihlo ngokwemvelo',
    xh: 'Imfihlo ngokuyila', nso: 'Sephiri ka mokgwa wa tshepedišo', tn: 'Sephiri ka tshimoloso',
    st: 'Lekunutu ka moralo', ts: 'Xihundla hi ndlela ya ku endliwa', ss: 'Imfihlo ngekuyenta',
    ve: 'Tshiphiri nga u itwa', nr: 'Imfihlo ngokwenzakalayo',
  },
  'welcome.privacyBody': {
    en: 'We use privacy-friendly analytics that never identify you — no cookies, no profiles, no tracking across sites.',
    af: 'Ons gebruik privaatheidvriendelike ontleding wat jou nooit identifiseer nie — geen koekies, geen profiele nie.',
    zu: 'Sisebenzisa ukuhlaziywa okuhambisana nemfihlo okungakuhlonzi — akukho amakhukhi, akukho amaphrofayili.',
    xh: 'Sisebenzisa uhlalutyo oluhambelana nemfihlo olungakuchongi — akukho iicookies, akukho iiprofayili.',
    nso: 'Re šomiša tshekatsheko yeo e lego mmogo le sephiri yeo e sa go lemogego — ga go na dikhukhi, ga go na diphofaele.',
    tn: 'Re dirisa tshekatsheko e e amanang le sephiri e e sa go itseng — ga go na dikhuki, ga go na diphrofaele.',
    st: 'Re sebelisa tlhahlobo e lumellanang le lekunutu e sa u tsebeng — ha ho na likuki, ha ho na liprofaele.',
    ts: 'Hi tirhisa nxopaxopo lowu fambelanaka na xihundla lowu nga ka wu ku tiviki — a ku na tikhuki, a ku na tiprofayili.',
    ss: 'Sisebentisa kuhlaziya lokuhambisana nekutfola imfihlo lokungakutati — akukho tikhukhi, akukho tiphrofayili.',
    ve: 'Ri shumisa nyanyiso i no vha na tshiphiri ine ya sa ḓivhi — a huna khokhi, a huna phurofayili.',
    nr: 'Sisebenzisa ukuhlaziya okuhambelana nemfihlo okungakuhlonzi — akukho amakhukhi, akukho amaphrofayili.',
  },
  'welcome.exitTitle': {
    en: 'Quick Exit, always on', af: 'Vinnige Uitgang, altyd aan', zu: 'Ukuphuma Okusheshayo, kuhlale kuvuliwe',
    xh: 'Ukuphuma Okukhawulezileyo, kuhlala kuvuliwe', nso: 'Tšwa ka Potlako, e šomago ka mehla',
    tn: 'Tswelela ka Bonako, e a šoma ka metlha', st: 'Ho Tsoa ka Potlako, ho lula ho bulehile',
    ts: 'Ku Suka Hi Ku Hatlisa, ku lula ku pfuliwile', ss: 'Kuphuma Ngco, kuhlale kuvuliwe',
    ve: 'U Bva Nga U Ṱavhanya, hu tshi dzhena tshifhinga tshoṱhe', nr: 'Ukuphuma Okusheshayo, kuhlale kuvuliwe',
  },
  'welcome.exitBody': {
    en: 'Press {esc} three times (or tap the Quick Exit button) to instantly leave for Google.',
    af: 'Druk {esc} drie keer (of tik die Vinnige Uitgang-knoppie) om onmiddellik na Google te vertrek.',
    zu: 'Cindezela {esc} kathathu (noma uthephe inkinobho yokuphuma okusheshayo) ukuze ushiye ngokushesha uye kuGoogle.',
    xh: 'Cofa i-{esc} kathathu (okanye ucofe iqhosha lokuphuma okukhawulezileyo) ukuze uhambe ngokukhawuleza uye kuGoogle.',
    nso: 'Tobetsa {esc} gabaro (goba o letše konopo ya go tšwa ka potlako) go tšwa ka potlako o ya Google.',
    tn: 'Tobetsa {esc} ga tharo (kgotsa o tobetsa konopo ya go tswelela ka bonako) go tsamaya ka bonako o ya Google.',
    st: 'Tobetsa {esc} hararo (kapa ho tobetsa konopo ea ho tsoa ka potlako) ho tloha hang-hang ho ea ho Google.',
    ts: 'Boha {esc} ka nharhu (kumbe ku tsanisa konopu ya ku suka hi ku hatlisa) ku suka hi ku hatlisa ku ya eGoogle.',
    ss: 'Cindzetela {esc} katsatfu (noma ucindzetela inkinobho yekuphuma ngco) kuphume ngaleso sikhathi uye kuGoogle.',
    ve: 'Dzhiela {esc} ka raru (kana u dzhiela khandidzi ya u bva nga u ṱavhanya) u bva nga u ṱavhanya u ya Google.',
    nr: 'Cindezela i-{esc} kathathu (noma uthephe inkinobho yokuphuma okusheshayo) ukuze ushiye ngokushesha uye kuGoogle.',
  },
  'welcome.enter': {
    en: 'Enter the Sanctuary', af: 'Betree die Toevlugsoord', zu: 'Ngena endaweni yokuphephela',
    xh: 'Ngena kwindawo ekhuselekileyo', nso: 'Tsena legaeng la pholoso', tn: 'Tsena legaeng le le sireletsegileng',
    st: 'Kena sebakeng se sireletsehileng', ts: 'Nghena eka ndzaku wo hlayiseka',
    ss: 'Ngena endzaweni lephephile', ve: 'Dzhena fhethuni ha shumiswaho', nr: 'Ngena endaweni ekhululekileyo',
  },

  'home.hero': {
    en: 'You are not alone.', af: 'Jy is nie alleen nie.', zu: 'Awuwedwa.', xh: 'Awuwedwa.',
    nso: 'Ga se o no o le noši.', tn: 'Ga o a leleng.', st: 'Ha u mong.', ts: 'A wu ri wo xanisa.',
    ss: 'Awuwedvwa.', ve: 'A si u oṱhe.', nr: 'Awuwedwa.',
  },
  'home.heroSub': {
    en: 'Guides, resources, and community for the LGBTQIA+ community of South Africa — anonymous and safe.',
    af: 'Gidse, hulpbronne en gemeenskap vir die LGBTQIA+-gemeenskap van Suid-Afrika — anoniem en veilig.',
    zu: 'Imihlahlandlela, izinsiza nomphakathi womphakathi we-LGBTQIA+ waseNingizimu Afrika — ngokungaziwa nangokuphephile.',
    xh: 'Izikhokelo, izibonelelo noluntu lwe-LGBTQIA+ eMzantsi Afrika — ngokungaziwa nangokhuseleko.',
    nso: 'Ditlhahlobi, methopo le setšhaba sa LGBTQIA+ Afrika Borwa — ka go se tsebege le ka go šireletšega.',
    tn: 'Dikaelo, didiriswa le setšhaba sa LGBTQIA+ sa Aforika Borwa — ka go se iponagatse le ka go sireletsega.',
    st: 'Litaelo, lisebelisoa le sechaba sa LGBTQIA+ sa Afrika Boroa — ka ho ipata le ka tšireletso.',
    ts: 'Swiletelo, swikongomelo na xirhendzevutani xa LGBTQIA+ xa Afrika-Dzonga — hi ku nga tiviwa na ku hlayiseka.',
    ss: 'Tincenyele, ema-resource nemphakatsi we-LGBTQIA+ waseNingizimu Afrika — ngekutatiwa nekuphepha.',
    ve: 'Miṱandavho, zwiko na lushaka lwa LGBTQIA+ lwa Afrika Tshipembe — u sa divhea na u londa.',
    nr: 'Imihlahlandlela, imithombo nomphakathi we-LGBTQIA+ waseNingizimu Afrika — ngokungaziwa nangokukhululeka.',
  },
  'home.crisisBanner': {
    en: 'In crisis? Call SADAG free now', af: 'In krisis? Bel SADAG nou gratis', zu: 'Usengozini? Shaya uSADAG mahhala manje',
    xh: 'Usengxakini? Tsalela uSADAG umnxeba simahla ngoku', nso: 'O kotsing? Leletša SADAG mahala bjale',
    tn: 'A o mo kotsing? Bitsa SADAG mahala jaanong', st: 'O kotsing? Letsetsa SADAG mahala hona joale',
    ts: 'U le khombyeni? Fona SADAG mahala sweswi', ss: 'Usengotini? Shaya SADAG mahhala nyalo',
    ve: 'U khagala? Fhona SADAG mahala zwino', nr: 'Usengcupheni? Shayela uSADAG umnxeba mahala manje',
  },

  'guides.title': {
    en: 'Guides', af: 'Gidse', zu: 'Imihlahlandlela', xh: 'Izikhokelo', nso: 'Ditlhahlobi', tn: 'Dikaelo',
    st: 'Litaelo', ts: 'Swiletelo', ss: 'Tincenyele', ve: 'Miṱandavho', nr: 'Imihlahlandlela',
  },
  'guides.subtitle': {
    en: 'Honest, practical, written by people who have lived it.',
    af: 'Eerlik, prakties, geskryf deur mense wat dit beleef het.',
    zu: 'Uqotho, okusebenzayo, kubhalwe ngabantu abake bakuzwa ngokoqobo.',
    xh: 'Ukunyaniseka, ukusebenza, kubhalwe ngabantu abakhe bakuhlala.',
    nso: 'Tše di tšepagalago, tše di šomago, di ngwadilwe ke batho bao ba di phetšego.',
    tn: 'Tse di tshepagalang, tse di thusang, di kwadilwe ke batho ba ba di phetseng.',
    st: 'Tšepehang, tse thusang, li ngotsoe ke batho ba li phetseng.',
    ts: 'Swinene, swa matirhisele, swi tsariwile hi vanhu lava swi hanyeke.',
    ss: 'Kucotfo, kusebenta, kubhalwe ngabantfu labake bakubona.',
    ve: 'Zwo ralo, zwi shumaho, zwo ṅwalwa nga vhathu vhe vha zwi vhona.',
    nr: 'Uqobo, okusebenzayo, kubhalwe ngabantu abake bakubona.',
  },
  'guides.languageNote': {
    en: 'Full guides are in English. More languages coming soon.',
    af: 'Volle gidse is in Engels. Meer tale kom binnekort.',
    zu: 'Imihlahlandlela egcwele isiNgisini. Ezinye izilimi ziyofika maduze.',
    xh: 'Izikhokelo ezipheleleyo zisesiNgesini. Ezinye iilwimi ziza kufika kungekudala.',
    nso: 'Ditlhahlobi ka botlalo di ka Seisemane. Maleme a mangwe a tla tla go sa le gole.',
    tn: 'Dikaelo tse di feletseng di ka Sekgowa. Dipuo tse dingwe di tla tla ka nako.',
    st: 'Litaelo tse felletseng li ka Senyesemane. Lipuo tse ling li tla tla haufinyane.',
    ts: 'Swiletelo swa hinkwaswo swi le Xinghezi. Tindzimi tin\'wana ti ta fika ku nga ri khale.',
    ss: 'Tincenyele letiphelele tiselingisi. Letinye tilwimi titawufika madvutsana.',
    ve: 'Miṱandavho yo fhelelaho i tshi ḽuambo lwa tshiEnḡiḽishi. Dziṅwe nyambo dzi ḓo ḓa matshino.',
    nr: 'Imihlahlandlela epheleleyo isiNgisini. Ezinye izilimi zizofika maduze.',
  },

  'resources.title': {
    en: 'Resource Hub', af: 'Hulpbronkern', zu: 'Isizinda sezinsiza', xh: 'Iziko lezibonelelo',
    nso: 'Sethopo sa methopo', tn: 'Senthara ya didiriswa', st: 'Sethopo sa lisebelisoa',
    ts: 'Xikombo xa swikongomelo', ss: 'Sihloko sema-resource', ve: 'Tsiko la zwiko', nr: 'Isizinda semithombo',
  },
  'resources.subtitle': {
    en: 'Verified services and support across South Africa.',
    af: 'Geverifieerde dienste en ondersteuning regoor Suid-Afrika.',
    zu: 'Izinsiza ezisebenzayo nokusekwa kulo lonke elaseNingizimu Afrika.',
    xh: 'Iinkonzo eziqinisekisiweyo nenkxaso kulo lonke elaseMzantsi Afrika.',
    nso: 'Ditirelo tše di netefaditšwego le thekgo go ralala Afrika Borwa.',
    tn: 'Ditirelo tse di netefaditsweng le thekgo mo Aforika Borwa yotlhe.',
    st: 'Litšebeletso tse netefalitsoeng le tšehetso ho pholletsa le Afrika Boroa.',
    ts: 'Tia xikongomelo ti tiyisisiwe na nseketo eka Afrika-Dzonga hinkwayo.',
    ss: 'Tinkonzo letitfolelwako lulwazi ngekusekwa kuwo wonkhe eNingizimu Afrika.',
    ve: 'Tshumelo dzo ṋekeledzwaho na thikhedzo Afrika Tshipembe hoṱhe.',
    nr: 'Izinsizakalo eziqinisekisiweyo nokusekwa kulo lonke elaseNingizimu Afrika.',
  },
  'resources.searchPlaceholder': {
    en: 'Search organizations, services, or locations...',
    af: 'Soek organisasies, dienste of plekke...',
    zu: 'Sesha izinhlangano, izinsiza noma izindawo...',
    xh: 'Khangela imibutho, iinkonzo okanye iindawo...',
    nso: 'Nyakišiša mekgatlo, ditirelo goba mafelo...',
    tn: 'Batla mekgatlho, ditirelo kgotsa mafelo...',
    st: 'Batla mekhatlo, litšebeletso kapa libaka...',
    ts: 'Lavisisa mintlawa, tia ntirho kumbe tindhawu...',
    ss: 'Sesha tinhlangano, tinkonzo noma tindzawo...',
    ve: 'Todoula madzangano, tshumelo kana fhethu...',
    nr: 'Sesha izinhlangano, izinsizakalo noma izindawo...',
  },

  'connect.title': {
    en: 'Find Your People', af: 'Vind Jou Mense', zu: 'Thola Abantu Bakho', xh: 'Fumana Abantu Bakho',
    nso: 'Hwetša Batho Ba Gago', tn: 'Batla Batho Ba Gago', st: 'Fumana Batho Ba Hau',
    ts: 'Kuma Vanhu Va Wena', ss: 'Tfola Bantfu Bakho', ve: 'Wana Vhathu Vhau', nr: 'Thola Abantu Bakho',
  },
  'connect.subtitle': {
    en: 'Safe spaces and communities across South Africa.',
    af: 'Veilige ruimtes en gemeenskappe regoor Suid-Afrika.',
    zu: 'Izindawo eziphephile nemiphakathi kulo lonke elaseNingizimu Afrika.',
    xh: 'Iindawo ezikhuselekileyo noluntu kulo lonke elaseMzantsi Afrika.',
    nso: 'Mafelo a šireletšegilego le ditšhaba go ralala Afrika Borwa.',
    tn: 'Mafelo a sireletsegileng le ditšhaba mo Aforika Borwa yotlhe.',
    st: 'Libaka tse sireletsehileng le lichaba ho pholletsa le Afrika Boroa.',
    ts: 'Tindhawu to hlayiseka na mintlawa eka Afrika-Dzonga hinkwayo.',
    ss: 'Tindzawo letiphephile nemiphakatsi kuwo wonkhe eNingizimu Afrika.',
    ve: 'Fhethu ho shumiswaho na mashaka Afrika Tshipembe hoṱhe.',
    nr: 'Izindawo ezikhululekileyo nomphakathi kulo lonke elaseNingizimu Afrika.',
  },

  'about.title': {
    en: 'About Project Clarity', af: 'Oor Project Clarity', zu: 'Mayelana ne-Project Clarity',
    xh: 'Malunga neProject Clarity', nso: 'Ka ga Project Clarity', tn: 'Ka ga Project Clarity',
    st: 'Ka Project Clarity', ts: 'Hi ta Project Clarity', ss: 'Mayelana neProject Clarity',
    ve: 'Zwa Project Clarity', nr: 'Mayelana neProject Clarity',
  },

  'crisis.title': {
    en: 'You Matter', af: 'Jy Maak Saak', zu: 'Ubalulekile', xh: 'Ubalulekile', nso: 'O Bohlokwa',
    tn: 'O Botlhokwa', st: 'Ua Bohlokoa', ts: 'U Faneleka', ss: 'Ubalulekile', ve: 'U Kha Vhuimo',
    nr: 'Ubalulekile',
  },
};

export function getStoredLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && LOCALES.some((l) => l.code === stored) ? stored : DEFAULT_LOCALE;
}

export function translate(key, locale) {
  const entry = STRINGS[key];
  if (!entry) return key;
  return entry[locale] || entry[DEFAULT_LOCALE] || key;
}

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(getStoredLocale);

  const setLocale = useCallback((code) => {
    setLocaleState(code);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, code);
    }
  }, []);

  const t = useCallback((key) => translate(key, locale), [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (ctx) return ctx;
  return {
    locale: DEFAULT_LOCALE,
    setLocale: () => {},
    t: (key) => translate(key, DEFAULT_LOCALE),
  };
}