import styled from "styled-components";


const Wrapper = styled.div`
    width: 70%;
    padding: 60px 0;
    line-height: 1.7;
`;


const Title = styled.h1`
    margin-bottom: 30px;
`;


const Section = styled.section`
    margin-bottom: 35px;
`;


const Heading = styled.h2`
    margin-bottom: 10px;
`;



function Impressum() {

    return (

        <Wrapper>


            <Title>
                Impressum
            </Title>



            <Section>

                <Heading>
                    Angaben gemäß § 5 TMG
                </Heading>

                <p>
                    [Your Full Name / Company Name]
                    <br />
                    [Street and House Number]
                    <br />
                    [Postal Code and City]
                    <br />
                    [Country]
                </p>

            </Section>




            <Section>

                <Heading>
                    Kontakt
                </Heading>

                <p>
                    E-Mail:
                    <br />
                    [your-email@example.com]
                </p>

            </Section>




            <Section>

                <Heading>
                    Verantwortlich für den Inhalt
                </Heading>

                <p>
                    [Your Full Name]
                    <br />
                    [Address]
                </p>

            </Section>




            <Section>

                <Heading>
                    Haftung für Inhalte
                </Heading>

                <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG
                    für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
                    10 TMG sind wir jedoch nicht verpflichtet,
                    übermittelte oder gespeicherte fremde Informationen
                    zu überwachen oder nach Umständen zu forschen, die
                    auf eine rechtswidrige Tätigkeit hinweisen.
                </p>

                <p>
                    Verpflichtungen zur Entfernung oder Sperrung der
                    Nutzung von Informationen nach den allgemeinen
                    Gesetzen bleiben hiervon unberührt. Eine Haftung
                    diesbezüglich ist jedoch erst ab dem Zeitpunkt der
                    Kenntnis einer konkreten Rechtsverletzung möglich.
                </p>

            </Section>




            <Section>

                <Heading>
                    Haftung für Links
                </Heading>

                <p>
                    Unser Angebot enthält gegebenenfalls Links zu
                    externen Webseiten Dritter, auf deren Inhalte wir
                    keinen Einfluss haben. Deshalb können wir für diese
                    fremden Inhalte auch keine Gewähr übernehmen.
                </p>

                <p>
                    Für die Inhalte der verlinkten Seiten ist stets der
                    jeweilige Anbieter oder Betreiber der Seiten
                    verantwortlich.
                </p>

            </Section>




            <Section>

                <Heading>
                    Urheberrecht
                </Heading>

                <p>
                    Die durch die Seitenbetreiber erstellten Inhalte
                    und Werke auf diesen Seiten unterliegen dem
                    deutschen Urheberrecht. Die Vervielfältigung,
                    Bearbeitung, Verbreitung und jede Art der
                    Verwertung außerhalb der Grenzen des Urheberrechtes
                    bedürfen der schriftlichen Zustimmung des jeweiligen
                    Autors bzw. Erstellers.
                </p>

            </Section>



        </Wrapper>

    );

}


export default Impressum;