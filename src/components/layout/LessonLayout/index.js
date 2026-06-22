import styled from "styled-components";
import Navigatio from "../../molecules/Navigatio";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0px;
    width: 100%;
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