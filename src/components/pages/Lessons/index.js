import styled from "styled-components";
import Card from "../../atoms/Card";


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40px 0;
`;

const Container = styled.div`
    width: 900px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: ${(props) =>
        props.reverse ? "row-reverse" : "row"};
`;

const CardWrapper = styled.div`
    width: 260px;
    height: 180px;

    display: flex;
    flex-shrink: 0;

    & > * {
        width: 100%;
        height: 100%;
    }
`;

const ArrowRow = styled.div`
    height: 50px;

    display: flex;
    align-items: center;

    justify-content: ${(props) =>
        props.reverse ? "flex-start" : "flex-end"};

    padding-right: ${(props) =>
        props.reverse ? "0" : "130px"};

    padding-left: ${(props) =>
        props.reverse ? "130px" : "0"};
`;

const Arrow = styled.div`
    font-size: 35px;
    opacity: 0.5;
`;

const HorizontalArrow = styled.div`
    position: absolute;
    font-size: 35px;
    opacity: 0.5;
`;

const CardRow = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: ${(props) =>
        props.reverse ? "row-reverse" : "row"};

    width: 100%;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 500;
    font-size: 40px;
    margin: 0;

    text-align: center;
`;


function Lessons() {

    const lessons = [
        "Familia Romana",
        "In Urbs",
        "Via Longa",
        "Roma",
        "Graecia",
        "Italia",
        "Bellum",
        "Imperium",
        "Aeneas"
        // "Finalis"
    ];


    const rows = [];

    for (let i = 0; i < lessons.length; i += 3) {
        rows.push(lessons.slice(i, i + 3));
    }


    return (
        <Wrapper>

            <Container>

                {rows.map((row, rowIndex) => {

                    const reverse = rowIndex % 2 === 1;

                    return (
                        <div key={rowIndex}>

                            <CardRow reverse={reverse}>

                                {row.map((lesson, index) => (

                                    <CardWrapper key={lesson}>

                                        <Card
                                            href="/lesson/1/textus"
                                            title={rowIndex * 3 + index + 1}
                                            size="small"
                                        >
                                            <Title>
                                                {lesson}
                                            </Title>

                                        </Card>

                                    </CardWrapper>

                                ))}


                                {row.length === 3 && (
                                    <>
                                        <HorizontalArrow
                                            style={{
                                                left: "32%",
                                                top: "70px"
                                            }}
                                        >
                                            {reverse ? "←" : "→"}
                                        </HorizontalArrow>

                                        <HorizontalArrow
                                            style={{
                                                left: "65%",
                                                top: "70px"
                                            }}
                                        >
                                            {reverse ? "←" : "→"}
                                        </HorizontalArrow>
                                    </>
                                )}

                            </CardRow>


                            {rowIndex !== rows.length - 1 && (

                                <ArrowRow reverse={reverse}>

                                    <Arrow>
                                        ↓
                                    </Arrow>

                                </ArrowRow>

                            )}

                        </div>
                    );

                })}

            </Container>

        </Wrapper>
    );
}

export default Lessons;