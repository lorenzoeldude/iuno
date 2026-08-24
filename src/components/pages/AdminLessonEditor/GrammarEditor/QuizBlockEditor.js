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

const OptionRow = styled.div`
	display: flex;
	align-items: center;

	gap: ${({ theme }) => theme.spacing.sm};

	margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Button = styled.button`
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
`;

function QuizBlockEditor({
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
			<Label>Quiz Type</Label>

			<Input
				value={
					block.type === "quizWord"
						? "Word Quiz"
						: "Ending Quiz"
				}
				readOnly
			/>

			<Label>Sentence Before</Label>

			<Input
				value={block.sentenceBefore || ""}
				onChange={(e) =>
					onChange({
						sentenceBefore:
							e.target.value,
					})
				}
				placeholder="Līvia Fidō"
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
				placeholder={
					block.type === "quizWord"
						? "olīvam"
						: "dat"
				}
			/>

			<Label>Options</Label>

			{options.map((option, index) => (
				<OptionRow key={index}>
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

					<Button
						type="button"
						onClick={() =>
							deleteOption(
								index
							)
						}
					>
						Delete
					</Button>
				</OptionRow>
			))}

			<AddButton
				type="button"
				onClick={addOption}
			>
				Add Option
			</AddButton>

			<Label>Ending</Label>

			<Input
				value={block.ending || ""}
				onChange={(e) =>
					onChange({
						ending: e.target.value,
					})
				}
				placeholder="dat."
			/>
		</>
	);
}

export default QuizBlockEditor;