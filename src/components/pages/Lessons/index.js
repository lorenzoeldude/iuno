import { Fragment, useEffect, useState } from "react";
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

    font-size: 34px;

`;

function Lessons() {
    const navigate = useNavigate();

    const [lessons, setLessons] = useState([]);

    // const unlockedLesson = 1;

    useEffect(() => {
        async function fetchLessons() {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/lessons`
                );

                if (!response.ok) {
                    throw new Error("Failed to load lessons");
                }

                const data = await response.json();
                setLessons(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchLessons();
    }, []);

    if (lessons.length === 0) {
        return (
            <Wrapper>
                <Container>Loading...</Container>
            </Wrapper>
        );
    }

    const displayedLessons = [
        ...lessons,
        {
            id: lessons.length + 1,
            title: "Coming Soon",
            comingSoon: true,
        },
    ];

    return (
        <Wrapper>
            <Container>
                {displayedLessons.map((lesson, index) => {
                    const lessonNumber = lesson.id;
                    const locked = lesson.comingSoon || !lesson.is_published;

                    return (
                        <Fragment key={lesson.id}>
                            <CardWrapper>
                                <LockedCardWrapper locked={locked}>
                                    {locked && <LockIcon />}

                                    <Card
                                        title={lessonNumber}
                                        size="small"
                                        onClick={() => {
                                            if (!locked) {
                                                navigate(
                                                    `/lessons/${lesson.id}`
                                                );
                                            }
                                        }}
                                    >
                                        <Title>{lesson.title}</Title>
                                    </Card>
                                </LockedCardWrapper>
                            </CardWrapper>

                            {index < displayedLessons.length - 1 && (
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