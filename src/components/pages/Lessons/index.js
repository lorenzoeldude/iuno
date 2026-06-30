import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
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

const LockedCardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    cursor: not-allowed;
`;

const LockIcon = styled(FaLock)`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 20px;
    z-index: 2;
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
    margin: 0;
    text-align: center;
    line-height: 1.05;

    font-size: ${({ children }) => {
        const len = children.length;
        if (len > 20) return "22px";
        if (len > 14) return "26px";
        if (len > 8) return "32px";
        return "40px";
    }};
`;

function Lessons() {
    const navigate = useNavigate();

    const unlockedLesson = 3;

    const lessons = [
        "Roma",
        "In Urbs",
        "Via Longa",
        "Coming Soon",
        "Coming Soon",
        "Coming Soon",
        "Coming Soon",
        "Coming Soon",
        "Coming Soon"
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
                                {row.map((lesson, index) => {
                                    const lessonNumber = rowIndex * 3 + index + 1;
                                    const locked = lessonNumber > unlockedLesson;

                                    return (
                                        <CardWrapper key={lesson}>
                                            <LockedCardWrapper
                                                style={{
                                                    opacity: locked ? 0.5 : 1,
                                                    cursor: locked ? "not-allowed" : "pointer",
                                                }}
                                            >
                                                {locked && <LockIcon />}

                                                <Card
                                                    title={lessonNumber}
                                                    size="small"
                                                    onClick={() => {
                                                        if (!locked) {
                                                            navigate(`/lesson/${lessonNumber}/textus`);
                                                        }
                                                    }}
                                                >
                                                    <Title>{lesson}</Title>
                                                </Card>
                                            </LockedCardWrapper>
                                        </CardWrapper>
                                    );
                                })}

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
                                    <Arrow>↓</Arrow>
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