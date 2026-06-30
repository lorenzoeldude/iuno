import styled from "styled-components";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    width: 72%;
    max-width: 700px;
    margin: 0 auto;
    padding: 60px 0 100px 0;
`;

const Title = styled.h1`
    font-size: 48px;
    margin-bottom: 40px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 22px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 16px;
    opacity: 0.7;
`;

const Input = styled.input`
    padding: 16px;
    border: 1px solid rgba(0,0,0,0.12);
    font-size: 18px;
    outline: none;

    &:focus {
        border-color: rgba(0,0,0,0.4);
    }
`;

const SaveButton = styled.button`
    margin-top: 15px;
    padding: 16px;
    border: none;
    border-radius: 14px;
    font-size: 18px;
    cursor: pointer;
    background: black;
    color: white;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const DeleteSection = styled.div`
    margin-top: 80px;
    padding-top: 30px;
    border-top: 1px solid rgba(0,0,0,0.12);
`;

const DeleteTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
`;

const DeleteText = styled.p`
    opacity: 0.7;
    margin-bottom: 20px;
`;

const DeleteButton = styled.button`
    padding: 16px;
    border: none;
    border-radius: 14px;
    font-size: 18px;
    cursor: pointer;
    background: #c0392b;
    color: white;

    &:hover {
        opacity: 0.9;
    }
`;

const Message = styled.p`
    margin-top: 20px;
    font-size: 17px;
    color: ${(props) =>
        props.error ? "#c0392b" : "#27ae60"};
`;


// =====================================================
// DELETE MODAL
// =====================================================

const Overlay = styled.div`
    position: fixed;
    color: black;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
    background: white;
    width: 90%;
    max-width: 450px;
    padding: 35px;
    border-radius: 18px;
`;

const ModalTitle = styled.h2`
    margin-bottom: 15px;
`;

const ModalText = styled.p`
    opacity: 0.7;
    margin-bottom: 20px;
`;

const ModalInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.2);
    font-size: 18px;
    margin-bottom: 20px;
`;

const ModalButtons = styled.div`
    display: flex;
    gap: 15px;
`;

const CancelButton = styled.button`
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: #ddd;
`;

const ConfirmDeleteButton = styled.button`
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: #c0392b;
    color: white;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;



function UserSettings() {

    const token = localStorage.getItem("token");


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [deleting, setDeleting] = useState(false);



    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) return;

        setUsername(user.username || "");
        setEmail(user.email || "");

    }, []);



    async function handleSubmit(e) {

        e.preventDefault();

        setSaving(true);
        setMessage("");

        try {

            const res = await fetch(
                "http://localhost:8080/api/settings",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );


            const text = await res.text();


            if (!res.ok) {
                throw new Error(text);
            }


            const oldUser = JSON.parse(
                localStorage.getItem("user")
            );


            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...oldUser,
                    username,
                    email,
                })
            );


            setPassword("");

            setError(false);
            setMessage("Settings updated.");


        } catch (err) {

            setError(true);
            setMessage(err.message);

        }


        setSaving(false);
    }




    async function handleDeleteAccount() {

        setDeleting(true);


        try {

            const res = await fetch(
                "http://localhost:8080/api/account",
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (!res.ok) {
                throw new Error(
                    "Failed to delete account"
                );
            }


            localStorage.removeItem("token");
            localStorage.removeItem("user");


            window.location.href = "/login";


        } catch (err) {

            setError(true);
            setMessage(err.message);

        }


        setDeleting(false);
    }



    return (

        <Wrapper>

            <Title>
                Settings
            </Title>


            <Form onSubmit={handleSubmit}>


                <Field>
                    <Label>
                        Username
                    </Label>

                    <Input
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </Field>



                <Field>
                    <Label>
                        Email
                    </Label>

                    <Input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </Field>



                <Field>
                    <Label>
                        New Password
                    </Label>

                    <Input
                        type="password"
                        placeholder="Leave empty to keep current password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </Field>



                <SaveButton disabled={saving}>
                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </SaveButton>


            </Form>



            {message && (
                <Message error={error}>
                    {message}
                </Message>
            )}



            <DeleteSection>

                <DeleteTitle>
                    Danger Zone
                </DeleteTitle>


                <DeleteText>
                    This permanently deletes your account,
                    progress, word lists, and saved data.
                </DeleteText>


                <DeleteButton
                    onClick={() =>
                        setShowDeleteModal(true)
                    }
                >
                    Delete Account
                </DeleteButton>


            </DeleteSection>




            {showDeleteModal && (

                <Overlay>

                    <Modal>

                        <ModalTitle>
                            Delete Account?
                        </ModalTitle>


                        <ModalText>
                            This action cannot be undone.
                            Type DELETE to confirm.
                        </ModalText>


                        <ModalInput
                            value={deleteConfirmation}
                            onChange={(e) =>
                                setDeleteConfirmation(
                                    e.target.value
                                )
                            }
                            placeholder="DELETE"
                        />



                        <ModalButtons>

                            <CancelButton
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteConfirmation("");
                                }}
                            >
                                Cancel
                            </CancelButton>



                            <ConfirmDeleteButton
                                disabled={
                                    deleteConfirmation !== "DELETE"
                                    || deleting
                                }
                                onClick={handleDeleteAccount}
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete Forever"}
                            </ConfirmDeleteButton>


                        </ModalButtons>


                    </Modal>

                </Overlay>

            )}


        </Wrapper>
    );
}


export default UserSettings;