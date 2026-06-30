import styled from "styled-components";

const Bar = styled.div`
    width: 100%;
    height: 5px;
    background: ${({ theme }) => theme.colors.background};
    overflow: hidden;
    margin: 10px 0;
`;

const Progress = styled.div`
    height: 100%;
    background: #b7dfb7;
`;

function ProgressBar({ progress }) {

    return (
        <Bar>
            <Progress
                style={{
                    width: `${progress}%`
                }}
            />
        </Bar>
    );
}

export default ProgressBar;