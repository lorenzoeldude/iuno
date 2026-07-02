import { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowDown } from "react-icons/fa";
import Card from "../../atoms/Card";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40px 20px;
    box-sizing: border-box;
`;

const Container = styled.div`
    width: 100%;
    max-width: 560px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardWrapper = styled.div`
    width: 100%;
`;

const LockedCardWrapper = styled.div`
    position: relative;
    width: 100%;
    opacity: ${({ locked }) => (locked ? 0.5 : 1)};
    cursor: ${({ locked }) => (locked ? "not-allowed" : "pointer")};
`;

const LockIcon = styled(FaLock)`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 20px;
    z-index: 10;
`;

const ArrowWrapper = styled.div`
    padding: 16px 0;
    display: flex;
    justify-content: center;

    font-size: 28px;
    opacity: 0.45;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 500;
    margin: 0;
    text-align: center;
    line-height: 1.05;

    ${({ children }) => {
        const len = String(children).length;

        if (len > 20) return "font-size:22px;";
        if (len > 14) return "font-size:26px;";
        if (len > 8) return "font-size:32px;";

        return "font-size:40px;";
    }}
`;

function Lessons() {
    const navigate = useNavigate();

    const unlockedLesson = 1;

    const lessons = [
        { title: "Roma" },
        { title: "Coming Soon" },
        { title: "Coming Soon" },
        { title: "Coming Soon" },
        { title: "Coming Soon" },
        { title: "Coming Soon" },
        { title: "Coming Soon" },
        { title: "Coming Soon" },
        { title: "Coming Soon" },
    ];

    return (
        <Wrapper>
            <Container>
                {lessons.map((lesson, index) => {
                    const lessonNumber = index + 1;
                    const locked = lessonNumber > unlockedLesson;

                    return (
                        <Fragment key={lessonNumber}>
                            <CardWrapper>
                                <LockedCardWrapper locked={locked}>
                                    {locked && <LockIcon />}

                                    <Card
                                        title={lessonNumber}
                                        size="small"
                                        onClick={() => {
                                            if (!locked) {
                                                navigate(
                                                    `/lesson/${lessonNumber}/textus`
                                                );
                                            }
                                        }}
                                    >
                                        <Title>{lesson.title}</Title>
                                    </Card>
                                </LockedCardWrapper>
                            </CardWrapper>

                            {lessonNumber < lessons.length && (
                                <ArrowWrapper>
                                    <FaArrowDown />
                                </ArrowWrapper>
                            )}
                        </Fragment>
                    );
                })}
            </Container>
        </Wrapper>
    );
}

export default Lessons;