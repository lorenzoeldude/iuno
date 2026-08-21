import styled, { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

import lessonIcon from "../../../assets/icons/lesson.svg";
import lessonDarkIcon from "../../../assets/icons/lesson_dark.svg";

import trainerIcon from "../../../assets/icons/trainer.svg";
import trainerDarkIcon from "../../../assets/icons/trainer_dark.svg";

import readIcon from "../../../assets/icons/read.svg";
import readDarkIcon from "../../../assets/icons/read_dark.svg";

import profileIcon from "../../../assets/icons/profile.svg";
import profileDarkIcon from "../../../assets/icons/profile_dark.svg";

const Wrapper = styled.div`
    position: fixed;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        left: 0;
        right: 0;
        bottom: 0;
        top: auto;
        transform: none;

        background: ${({ theme }) => theme.colors.background};
        border-top: 1px solid ${({ theme }) => theme.colors.border};
        padding: 8px 0;
        z-index: 1000;
    }
`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
`;

const ListItem = styled.li`
    margin: 8px 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: 0;
    }
`;

const Link = styled.button`
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
            <List>
                <ListItem>
                    <Link onClick={() => navigate("/lessons")}>
                        <img
                            src={isDark ? lessonDarkIcon : lessonIcon}
                            alt="Lessons"
                        />
                    </Link>
                </ListItem>

                <ListItem>
                    <Link onClick={() => navigate("/trainer")}>
                        <img
                            src={isDark ? trainerDarkIcon : trainerIcon}
                            alt="Trainer"
                        />
                    </Link>
                </ListItem>

                <ListItem>
                    <Link onClick={() => navigate("/read")}>
                        <img
                            src={isDark ? readDarkIcon : readIcon}
                            alt="Read"
                        />
                    </Link>
                </ListItem>

                <ListItem>
                    <Link onClick={() => navigate("/user")}>
                        <img
                            src={isDark ? profileDarkIcon : profileIcon}
                            alt="Profile"
                        />
                    </Link>
                </ListItem>
            </List>
        </Wrapper>
    );
}

export default Sidebar;