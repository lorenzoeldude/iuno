import styled from "styled-components";
import Navigatio from "../../molecules/Navigatio";

const Wrapper = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 100px;
    width: 100%;
`;

function LessonLayout({ children, active }) {

    return (
        <Wrapper>

            <ContentWrapper>
                {children}
            </ContentWrapper>

            <Navigatio active={active} />

        </Wrapper>
    );
}

export default LessonLayout;