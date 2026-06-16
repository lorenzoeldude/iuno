import { useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 800;
    font-size: 30px;
`;

const Text = styled.p`
    font-size: 30px;
    line-height: 1.8;

    &::first-letter {
        color: red;
        font-size: 2em;
        font-weight: bold;
    }
`;

const Word = styled.span`
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.15s;

    &:hover {
        background: rgba(255, 255, 0, 0.3);
    }
`;

const Popup = styled.div`
    position: absolute;
    z-index: 1000;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    min-width: 250px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
    float: right;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
`;

const TEXT = `Arma virumque canō, Trōiae quī prīmus ab ōrīsĪtaliam, fātō profugus, Lāvīniaque vēnitlītora, multum ille et terrīs iactātus et altōvī superum saevae memorem Iūnōnis ob īram;multa quoque et bellō passus, dum conderet urbem, inferretque deōs Latiō, genus unde Latīnum,Albānīque patrēs, atque altae moenia Rōmae.
Mūsa, mihī causās memorā, quō nūmine laesō,quidve dolēns, rēgīna deum tot volvere cāsūsīnsīgnem pietāte virum, tot adīre labōrēsimpulerit. Tantaene animīs caelestibus īrae?
Urbs antīqua fuit, Tyriī tenuēre colōnī,Karthāgō, Ītaliam contrā Tiberīnaque longēōstia, dīves opum studiīsque asperrima bellī,quam Iūnō fertur terrīs magis omnibus ūnamposthabitā coluisse Samō; hīc illius arma,hīc currus fuit; hōc rēgnum dea gentibus esse,sī quā Fāta sinant, iam tum tenditque fovetque.Prōgeniem sed enim Trōiānō ā sanguine dūcīaudierat, Tyriās olim quae verteret arcēs;hinc populum lātē regem bellōque superbumventūrum excidiō Libyae: sīc volvere Parcās.Id metuēns, veterisque memor Sāturnia bellī,prīma quod ad Trōiam prō cārīs gesserat Argīs—necdum etiam causae īrārum saevīque dolōrēsexciderant animō: manet altā mente repostumiūdicium Paridis sprētaeque iniūria fōrmae,et genus invīsum, et raptī Ganymēdis honōrēs.Hīs accēnsa super, iactātōs aequore tōtōTrōas, rēliquiās Danaum atque immītis Achillī,arcēbat longē Latiō, multōsque per annōserrābant, āctī Fātīs, maria omnia circum.Tantae mōlis erat Rōmānam condere gentem!
Vix e conspectu Siculae telluris in altumvela dabant laeti, et spumas salis aere ruebant,cum Iuno, aeternum servans sub pectore volnus,haec secum: ‘Mene incepto desistere victam,nec posse Italia Teucrorum avertere regem?Quippe vetor fatis. Pallasne exurere classemArgivom atque ipsos potuit submergere ponto,unius ob noxam et furias Aiacis Oilei?Ipsa, Iovis rapidum iaculata e nubibus ignem,disiecitque rates evertitque aequora ventis,illum expirantem transfixo pectore flammasturbine corripuit scopuloque infixit acuto.Ast ego, quae divom incedo regina, Iovisqueet soror et coniunx, una cum gente tot annosbella gero! Et quisquam numen Iunonis adoretpraeterea, aut supplex aris imponet honorem?’
Talia flammato secum dea corde volutansnimborum in patriam, loca feta furentibus austris,Aeoliam venit. Hic vasto rex Aeolus antroluctantes ventos tempestatesque sonorasimperio premit ac vinclis et carcere frenat.Illi indignantes magno cum murmure montiscircum claustra fremunt; celsa sedet Aeolus arcesceptra tenens, mollitque animos et temperat iras.Ni faciat, maria ac terras caelumque profundumquippe ferant rapidi secum verrantque per auras.Sed pater omnipotens speluncis abdidit atris,hoc metuens, molemque et montis insuper altosimposuit, regemque dedit, qui foedere certoet premere et laxas sciret dare iussus habenas.Ad quem tum Iuno supplex his vocibus usa est:
‘Aeole, namque tibi divom pater atque hominum rexet mulcere dedit fluctus et tollere vento,gens inimica mihi Tyrrhenum navigat aequor,Ilium in Italiam portans victosque Penates:incute vim ventis submersasque obrue puppes,aut age diversos et disiice corpora ponto.Sunt mihi bis septem praestanti corpore nymphae,quarum quae forma pulcherrima Deiopea,conubio iungam stabili propriamque dicabo,omnis ut tecum meritis pro talibus annosexigat, et pulchra faciat te prole parentem.’
Aeolus haec contra: ‘Tuus, O regina, quid optesexplorare labor; mihi iussa capessere fas est.Tu mihi, quodcumque hoc regni, tu sceptra Iovemqueconcilias, tu das epulis accumbere divom,nimborumque facis tempestatumque potentem.’
Haec ubi dicta, cavum conversa cuspide montemimpulit in latus: ac venti, velut agmine facto,qua data porta, ruunt et terras turbine perflant.Incubuere mari, totumque a sedibus imisuna Eurusque Notusque ruunt creberque procellisAfricus, et vastos volvunt ad litora fluctus.Insequitur clamorque virum stridorque rudentum.Eripiunt subito nubes caelumque diemqueTeucrorum ex oculis; ponto nox incubat atra.Intonuere poli, et crebris micat ignibus aether,praesentemque viris intentant omnia mortem.
Extemplo Aeneae solvuntur frigore membra:ingemit, et duplicis tendens ad sidera palmastalia voce refert: ‘O terque quaterque beati,quis ante ora patrum Troiae sub moenibus altiscontigit oppetere! O Danaum fortissime gentisTydide! Mene Iliacis occumbere campisnon potuisse, tuaque animam hanc effundere dextra,saevus ubi Aeacidae telo iacet Hector, ubi ingensSarpedon, ubi tot Simois correpta sub undisscuta virum galeasque et fortia corpora volvit?’
Talia iactanti stridens Aquilone procellavelum adversa ferit, fluctusque ad sidera tollit.Franguntur remi; tum prora avertit, et undisdat latus; insequitur cumulo praeruptus aquae mons.Hi summo in fluctu pendent; his unda dehiscensterram inter fluctus aperit; furit aestus harenis.Tris Notus abreptas in saxa latentia torquet—saxa vocant Itali mediis quae in fluctibus aras—dorsum immane mari summo; tris Eurus ab altoin brevia et Syrtis urget, miserabile visu,inliditque vadis atque aggere cingit harenae.Unam, quae Lycios fidumque vehebat Oronten,ipsius ante oculos ingens a vertice pontusin puppim ferit: excutitur pronusque magister volvitur in caput; ast illam ter fluctus ibidemtorquet agens circum, et rapidus vorat aequore vortex.Adparent rari nantes in gurgite vasto,arma virum, tabulaeque, et Troia gaza per undas.Iam validam Ilionei navem, iam fortis Achati,et qua vectus Abas, et qua grandaevus Aletes,vicit hiems; laxis laterum compagibus omnes`;

function normalizeLatin(word) {
    return word
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
}

function Aeneis() {
    const wrapperRef = useRef(null);

    const [popup, setPopup] = useState(null);
    const [entry, setEntry] = useState(null);

    async function lookupWord(word, event) {
        const wordRect = event.currentTarget.getBoundingClientRect();
        const wrapperRect = wrapperRef.current.getBoundingClientRect();

        setPopup({
            word,
            x: wordRect.left - wrapperRect.left,
            y: wordRect.bottom - wrapperRect.top + 6,
        });

        setEntry(null);

        try {
            const normalized = normalizeLatin(word);

            const response = await fetch(
                `http://localhost:8080/api/search?q=${encodeURIComponent(
                    normalized
                )}`
            );

            if (!response.ok) {
                setEntry([]);
                return;
            }

            const data = await response.json();
            setEntry(data || []);
        } catch (err) {
            console.error(err);
            setEntry([]);
        }
    }

    function renderText(text) {
        return text.split(/(\s+)/).map((token, index) => {
            if (/^\s+$/.test(token)) {
                return token;
            }

            const cleanWord = token.replace(/[.,;:!?'"()[\]—-]/g, "");

            if (!cleanWord) {
                return token;
            }

            return (
                <Word
                    key={index}
                    onClick={(e) => lookupWord(cleanWord, e)}
                >
                    {token}
                </Word>
            );
        });
    }

    return (
        <Wrapper ref={wrapperRef}>
            <Title>Aeneis</Title>

            <Text>{renderText(TEXT)}</Text>

            {popup && (
                <Popup
                    style={{
                        left: popup.x,
                        top: popup.y,
                    }}
                >
                    <CloseButton
                        onClick={() => {
                            setPopup(null);
                            setEntry(null);
                        }}
                    >
                        ×
                    </CloseButton>

                    {entry === null ? (
                        <p>Loading...</p>
                    ) : entry.length > 0 ? (
                        <>
                            <p>
                                <strong>{entry[0].form}</strong>
                            </p>

                            <p>{entry[0].meaning}</p>
                        </>
                    ) : (
                        <p>Not found.</p>
                    )}
                </Popup>
            )}
        </Wrapper>
    );
}

export default Aeneis;