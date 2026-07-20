import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../atoms/ProgressBar";
import Navigatio from "../../molecules/Navigatio";

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
`;

const ProgressWrapper = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 200;
`;

const Inner = styled.div`
    width: min(1000px, 92vw);
    min-height: calc(100vh - 8px);

    display: flex;
    flex-direction: column;

    margin: 0 auto;
    padding: 20px 0 40px;

    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 95vw;
        padding: 16px 0 32px;
    }
`;

const TopBar = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 24px;
`;

const ExitButton = styled.button`
    position: fixed;
    top: 20px;
    left: 20px;

    width: 48px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 50%;

    background: none;
    color: ${({ theme }) => theme.colors.text};

    font-size: 40px;
    cursor: pointer;

    transition: transform 0.15s ease, box-shadow 0.15s ease;

    z-index: 300;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        top: 10px;
        left: 10px;

        width: 42px;
        height: 42px;
    }
`;

const NavigationWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const ContentWrapper = styled.div`
    flex: 1;

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 24px;

    @media (max-width: 768px) {
        padding-top: 20px;
    }
`;

function LessonLayout({
    children,
    active,
    progress = 0,
    completed = [],
}) {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <ProgressWrapper>
                <ProgressBar progress={progress} />
            </ProgressWrapper>

            <Inner>
                <TopBar>
                    <ExitButton onClick={() => navigate("/lessons/1")}>
                        ×
                    </ExitButton>

                    <NavigationWrapper>
                        <Navigatio
                            active={active}
                            completed={completed}
                        />
                    </NavigationWrapper>
                </TopBar>

                <ContentWrapper>
                    {children}
                </ContentWrapper>
            </Inner>
        </Wrapper>
    );
}

export default LessonLayout;