import styled from "styled-components";

const Label = styled.label`
	display: block;
	margin-top: ${({ theme }) => theme.spacing.lg};
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

const OptionRow = styled.div`
	display: flex;
	align-items: center;

	gap: ${({ theme }) => theme.spacing.sm};

	margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DeleteButton = styled.button`
	padding: ${({ theme }) => theme.spacing.sm}
		${({ theme }) => theme.spacing.md};

	background: ${({ theme }) => theme.colors.warning};
	color: white;

	border: none;

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.sm};
	font-weight: ${({ theme }) => theme.fontWeights.semibold};

	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.colors.danger};
	}
`;

const AddButton = styled.button`
	margin-top: ${({ theme }) => theme.spacing.sm};

	padding: ${({ theme }) => theme.spacing.sm}
		${({ theme }) => theme.spacing.md};

	background: ${({ theme }) => theme.colors.primary};
	color: white;

	border: none;

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.md};
	font-weight: ${({ theme }) => theme.fontWeights.semibold};

	cursor: pointer;

	&:hover {
		opacity: 0.9;
	}
`;

function SentenceQuestionBlockEditor({
	block,
	onChange,
}) {
	const options = block.options || [];

	const updateOption = (index, value) => {
		const updated = [...options];

		updated[index] = value;

		onChange({
			options: updated,
		});
	};

	const addOption = () => {
		onChange({
			options: [...options, ""],
		});
	};

	const deleteOption = (index) => {
		onChange({
			options: options.filter(
				(_, optionIndex) =>
					optionIndex !== index
			),
		});
	};

	return (
		<>
			<Label>Sentence</Label>

			<Input
				type="text"
				value={block.sentence || ""}
				onChange={(e) =>
					onChange({
						sentence: e.target.value,
					})
				}
				placeholder="Līvia Fidō olīvam dat."
			/>

			<Label>Question</Label>

			<Input
				type="text"
				value={block.question || ""}
				onChange={(e) =>
					onChange({
						question: e.target.value,
					})
				}
				placeholder="Which case is olīvam in?"
			/>

			<Label>Correct Answer</Label>

			<Input
				type="text"
				value={block.correct || ""}
				onChange={(e) =>
					onChange({
						correct: e.target.value,
					})
				}
				placeholder="Accusative"
			/>

			<Label>Options</Label>

			{options.map((option, index) => (
				<OptionRow key={index}>
					<Input
						type="text"
						value={option || ""}
						onChange={(e) =>
							updateOption(
								index,
								e.target.value
							)
						}
						placeholder={`Option ${
							index + 1
						}`}
					/>

					<DeleteButton
						type="button"
						onClick={() =>
							deleteOption(index)
						}
					>
						Delete
					</DeleteButton>
				</OptionRow>
			))}

			<AddButton
				type="button"
				onClick={addOption}
			>
				Add Option
			</AddButton>

			<Label>Explanation (optional)</Label>

			<TextArea
				value={block.explanation || ""}
				onChange={(e) =>
					onChange({
						explanation:
							e.target.value,
					})
				}
				placeholder="Explain the answer..."
			/>
		</>
	);
}

export default SentenceQuestionBlockEditor;