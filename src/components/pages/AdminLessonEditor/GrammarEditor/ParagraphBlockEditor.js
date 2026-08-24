import styled from "styled-components";

const Label = styled.label`
	display: block;
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.lg};
	font-weight: ${({ theme }) => theme.fontWeights.bold};

	color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
	width: 100%;
	min-height: 140px;

	padding: ${({ theme }) => theme.spacing.md};

	background: transparent;
	color: ${({ theme }) => theme.colors.text};

	border: 1px solid
		${({ theme }) => theme.colors.border};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.lg};

	resize: vertical;

	&:focus {
		outline: none;
		border-color: ${({ theme }) =>
			theme.colors.primary};
	}
`;

function ParagraphBlockEditor({
	block,
	onChange,
}) {
	return (
		<>
			<Label>Paragraph</Label>

			<TextArea
				value={block.text || ""}
				onChange={(e) =>
					onChange({
						text: e.target.value,
					})
				}
				placeholder="Write the paragraph..."
			/>
		</>
	);
}

export default ParagraphBlockEditor;