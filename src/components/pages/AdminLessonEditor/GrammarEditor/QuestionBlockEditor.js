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

function QuestionBlockEditor({
	block,
	onChange,
}) {
	const options = block.options || [];

	const updateOption = (
		index,
		value
	) => {
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
			<Label>Question</Label>

			<Input
				value={block.question || ""}
				onChange={(e) =>
					onChange({
						question:
							e.target.value,
					})
				}
				placeholder="Which case receives something?"
			/>

			<Label>Correct Answer</Label>

			<Input
				value={block.correct || ""}
				onChange={(e) =>
					onChange({
						correct:
							e.target.value,
					})
				}
				placeholder="Dative"
			/>

			<Label>Options</Label>

			{options.map((option, index) => (
				<div
					key={index}
					style={{
						display: "flex",
						gap: "12px",
						marginBottom: "8px",
					}}
				>
					<Input
						value={option}
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

					<button
						type="button"
						onClick={() =>
							deleteOption(
								index
							)
						}
					>
						Delete
					</button>
				</div>
			))}

			<button
				type="button"
				onClick={addOption}
			>
				Add Option
			</button>

			<Label>Explanation (optional)</Label>

			<TextArea
				value={block.explanation || ""}
				onChange={(e) =>
					onChange({
						explanation:
							e.target.value,
					})
				}
				placeholder="Explain why this answer is correct..."
			/>
		</>
	);
}

export default QuestionBlockEditor;