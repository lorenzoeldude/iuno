import styled from "styled-components";
import Navigatio from "../../molecules/Navigatio";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 70vh;
    overflow: hidden;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex: 1;
    min-height: 0;
`;

function LessonLayout({ children, active }) {

    return (
        <Wrapper>

            <Navigatio active={active} />

            <ContentWrapper>
                {children}
            </ContentWrapper>

        </Wrapper>
    );
}

export default LessonLayout;