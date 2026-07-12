import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../../config";

const Wrapper = styled.div`
    max-width: 1000px;
    width: 60%;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 800;
    font-size: 48px;
    margin-bottom: 0;
`;

const Author = styled.div`
    font-size: 20px;
    opacity: 0.7;
    margin-bottom: 24px;
`;

const Description = styled.p`
    font-size: 20px;
    line-height: 1.6;
    margin-bottom: 40px;
`;

const Sections = styled.div`
    margin-top: 40px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px 0;

    border-bottom: 0.2px solid ${({ theme }) => theme.colors.border};

    color: inherit;
    text-decoration: none;

    transition: color 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const SectionTitle = styled.span`
    font-family: "Cormorant Garamond", serif;
    font-size: 30px;
    letter-spacing: 0.02em;
`;

function Text() {
    const { author, title } = useParams();

    const [text, setText] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(
            `${API_URL}/api/text/${author}/${title}`
        )
            .then(res => {
                if (!res.ok) {
                    throw new Error("Text not found");
                }

                return res.json();
            })
            .then(data => {
                setText(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

    }, [author, title]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!text) {
        return null;
    }

    return (
        <Wrapper>
            <Title>{text.title}</Title>

            <Author>{text.author}</Author>

            {text.description && (
                <Description>
                    {text.description}
                </Description>
            )}

            <Sections>
                {text.sections.map((section, index) => (
                    <SectionLink
                        key={section.id}
                        to={`/read/${encodeURIComponent(
                            text.author
                        )}/${encodeURIComponent(
                            text.title
                        )}/${section.position}`}
                    >
                        <SectionTitle>
                            {section.title}
                        </SectionTitle>
                    </SectionLink>
                ))}
            </Sections>
        </Wrapper>
    );
}

export default Text;