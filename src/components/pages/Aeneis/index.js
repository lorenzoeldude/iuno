import styled from "styled-components";

const Wrapper = styled.div`

`;


const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
    font-size: 30px;
`;

const Text = styled.p`
    font-size: 30px;

    &::first-letter {
    color: red;
    font-size: 2em;
    font-weight: bold;
  }
`;

function Aeneis () {
    return (
        <Wrapper>
            <Title>Aeneis</Title>
            <Text> Arma virumque canō, Trōiae quī prīmus ab ōrīs<br/>
Ītaliam, fātō profugus, Lāvīniaque vēnit<br/>
lītora, multum ille et terrīs iactātus et altō<br/>
vī superum saevae memorem Iūnōnis ob īram;<br/>
multa quoque et bellō passus, dum conderet urbem,<br/>
inferretque deōs Latiō, genus unde Latīnum,<br/>
Albānīque patrēs, atque altae moenia Rōmae.<br/><br/>

Mūsa, mihī causās memorā, quō nūmine laesō,<br/>
quidve dolēns, rēgīna deum tot volvere cāsūs<br/>
īnsīgnem pietāte virum, tot adīre labōrēs<br/>
impulerit. Tantaene animīs caelestibus īrae?<br/><br/>

Urbs antīqua fuit, Tyriī tenuēre colōnī,<br/>
Karthāgō, Ītaliam contrā Tiberīnaque longē<br/>
ōstia, dīves opum studiīsque asperrima bellī,<br/>
quam Iūnō fertur terrīs magis omnibus ūnam<br/>
posthabitā coluisse Samō; hīc illius arma,<br/>
hīc currus fuit; hōc rēgnum dea gentibus esse,<br/>
sī quā Fāta sinant, iam tum tenditque fovetque.<br/>
Prōgeniem sed enim Trōiānō ā sanguine dūcī<br/>
audierat, Tyriās olim quae verteret arcēs;<br/>
hinc populum lātē regem bellōque superbum<br/>
ventūrum excidiō Libyae: sīc volvere Parcās.<br/>
Id metuēns, veterisque memor Sāturnia bellī,<br/>
prīma quod ad Trōiam prō cārīs gesserat Argīs—<br/>
necdum etiam causae īrārum saevīque dolōrēs<br/>
exciderant animō: manet altā mente repostum<br/>
iūdicium Paridis sprētaeque iniūria fōrmae,<br/>
et genus invīsum, et raptī Ganymēdis honōrēs.<br/>
Hīs accēnsa super, iactātōs aequore tōtō<br/>
Trōas, rēliquiās Danaum atque immītis Achillī,<br/>
arcēbat longē Latiō, multōsque per annōs<br/>
errābant, āctī Fātīs, maria omnia circum.<br/>
Tantae mōlis erat Rōmānam condere gentem!<br/><br/>

Vix e conspectu Siculae telluris in altum<br/>
vela dabant laeti, et spumas salis aere ruebant,<br/>
cum Iuno, aeternum servans sub pectore volnus,<br/>
haec secum: 'Mene incepto desistere victam,<br/>
nec posse Italia Teucrorum avertere regem?<br/>
Quippe vetor fatis. Pallasne exurere classem<br/>
Argivom atque ipsos potuit submergere ponto,<br/>
unius ob noxam et furias Aiacis Oilei?<br/>
Ipsa, Iovis rapidum iaculata e nubibus ignem,<br/>
disiecitque rates evertitque aequora ventis,<br/>
illum expirantem transfixo pectore flammas<br/>
turbine corripuit scopuloque infixit acuto.<br/>
Ast ego, quae divom incedo regina, Iovisque<br/>
et soror et coniunx, una cum gente tot annos<br/>
bella gero! Et quisquam numen Iunonis adoret<br/>
praeterea, aut supplex aris imponet honorem?'</Text>
        </Wrapper>
    );
}

export default Aeneis;