import styled from "styled-components";

const Label = styled.label`
	display: block;
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.lg};
	font-weight: ${({ theme }) => theme.fontWeights.bold};

	color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
	width: 100%;

	padding: ${({ theme }) => theme.spacing.sm} 0;

	background: transparent;
	color: ${({ theme }) => theme.colors.text};

	border: none;
	border-bottom: 1px solid
		${({ theme }) => theme.colors.border};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.xl};

	&:focus {
		outline: none;
		border-bottom-color: ${({ theme }) =>
			theme.colors.primary};
	}
`;

function SentenceBlockEditor({
	block,
	onChange,
}) {
	return (
		<>
			<Label>Sentence</Label>

			<Input
				type="text"
				value={block.text || ""}
				onChange={(e) =>
					onChange({
						text: e.target.value,
					})
				}
				placeholder="Līvia Fidō olīvam dat."
			/>
		</>
	);
}

export default SentenceBlockEditor;