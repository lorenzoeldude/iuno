import styled, { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

import searchIcon from "../../../assets/icons/search.svg";
import searchDarkIcon from "../../../assets/icons/search_dark.svg";

import lessonIcon from "../../../assets/icons/lesson.svg";
import lessonDarkIcon from "../../../assets/icons/lesson_dark.svg";

import trainerIcon from "../../../assets/icons/trainer.svg";
import trainerDarkIcon from "../../../assets/icons/trainer_dark.svg";

import readIcon from "../../../assets/icons/read.svg";
import readDarkIcon from "../../../assets/icons/read_dark.svg";

import profileIcon from "../../../assets/icons/profile.svg";
import profileDarkIcon from "../../../assets/icons/profile_dark.svg";

import logoImage from "../../../assets/icons/black_transparent.png";

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;

    width: 68px;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 14px 0;

    z-index: 1000;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        left: 0;
        right: 0;
        bottom: 0;
        top: auto;

        width: auto;

        flex-direction: row;
        justify-content: center;

        background: ${({ theme }) => theme.colors.background};
        border-top: 1px solid ${({ theme }) => theme.colors.border};

        padding: 8px 0;
    }
`;

const LogoButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    padding: 0;
    border: none;
    background: none;

    cursor: pointer;

    img {
        width: 30px;
        height: 30px;
        display: block;
        object-fit: contain;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: none;
    }
`;

const Navigation = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    flex: 1;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex: none;

        flex-direction: row;
        justify-content: space-evenly;

        width: 100%;
    }
`;

const ListItem = styled.li`
    margin: 4px 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: 0;
    }
`;

const NavButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    padding: 0;
    border: none;
    background: none;

    cursor: pointer;

    img {
        width: 48px;
        height: 48px;
        display: block;

        transition: transform ${({ theme }) => theme.transition.fast};
    }

    &:hover img {
        transform: rotate(5deg) scale(1.05);
    }
`;

function Sidebar() {
    const navigate = useNavigate();
    const theme = useTheme();

    const isDark = theme.mode === "dark";

    return (
        <Wrapper>

            <LogoButton onClick={() => navigate("/")}>
                <img src={logoImage} alt="IUNONI" />
            </LogoButton>

            {/* Navigation */}
            <Navigation>

                <ListItem>
                    <NavButton onClick={() => navigate("/lessons")}>
                        <img
                            src={isDark ? lessonDarkIcon : lessonIcon}
                            alt="Lessons"
                        />
                    </NavButton>
                </ListItem>

                <ListItem>
                    <NavButton onClick={() => navigate("/trainer")}>
                        <img
                            src={isDark ? trainerDarkIcon : trainerIcon}
                            alt="Trainer"
                        />
                    </NavButton>
                </ListItem>

                <ListItem>
                    <NavButton
                        onClick={() =>
                            navigate("/search", {
                                state: { autoFocus: true },
                            })
                        }
                    >
                        <img
                            src={isDark ? searchDarkIcon : searchIcon}
                            alt="Search"
                        />
                    </NavButton>
                </ListItem>

                <ListItem>
                    <NavButton onClick={() => navigate("/read")}>
                        <img
                            src={isDark ? readDarkIcon : readIcon}
                            alt="Read"
                        />
                    </NavButton>
                </ListItem>

                <ListItem>
                    <NavButton onClick={() => navigate("/user")}>
                        <img
                            src={isDark ? profileDarkIcon : profileIcon}
                            alt="Profile"
                        />
                    </NavButton>
                </ListItem>

            </Navigation>

        </Wrapper>
    );
}

export default Sidebar;