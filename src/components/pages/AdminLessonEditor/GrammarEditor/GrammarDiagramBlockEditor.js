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
	font-size: ${({ theme }) => theme.fontSizes.lg};

	&:focus {
		outline: none;
		border-bottom-color: ${({ theme }) =>
			theme.colors.primary};
	}
`;

const Row = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 160px auto;

	gap: ${({ theme }) => theme.spacing.sm};

	align-items: end;

	margin-bottom: ${({ theme }) => theme.spacing.md};

	@media (max-width: 800px) {
		grid-template-columns: 1fr;
	}
`;

const WordGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

const SmallLabel = styled.label`
	display: block;
	margin-bottom: ${({ theme }) => theme.spacing.xs};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.sm};

	color: ${({ theme }) =>
		theme.colors.textSecondary};
`;

const Select = styled.select`
	width: 100%;

	padding: ${({ theme }) => theme.spacing.sm};

	background: transparent;
	color: ${({ theme }) => theme.colors.text};

	border: 1px solid
		${({ theme }) => theme.colors.border};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.md};

	&:focus {
		outline: none;
		border-color: ${({ theme }) =>
			theme.colors.primary};
	}
`;

const Button = styled.button`
	padding: ${({ theme }) => theme.spacing.sm}
		${({ theme }) => theme.spacing.md};

	background: ${({ theme }) => theme.colors.warning};
	color: white;

	border: none;

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.md};
	font-weight: ${({ theme }) => theme.fontWeights.semibold};

	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.colors.danger};
	}
`;

const colors = [
	"blue",
	"green",
	"orange",
	"primary",
];

function GrammarDiagramBlockEditor({
	block,
	onChange,
}) {
	const words = block.words || [];

	const updateWord = (
		index,
		changes
	) => {
		const updated = words.map(
			(word, wordIndex) =>
				wordIndex === index
					? {
							...word,
							...changes,
						}
					: word
		);

		onChange({
			words: updated,
		});
	};

	const addWord = () => {
		onChange({
			words: [
				...words,
				{
					word: "",
					case: "",
					color: "blue",
				},
			],
		});
	};

	const deleteWord = (index) => {
		onChange({
			words: words.filter(
				(_, wordIndex) =>
					wordIndex !== index
			),
		});
	};

	return (
		<>
			<Label>Grammar Diagram</Label>

			{words.map((word, index) => (
				<Row key={index}>
					<WordGroup>
						<SmallLabel>
							Word
						</SmallLabel>

						<Input
							value={
								word.word || ""
							}
							onChange={(e) =>
								updateWord(
									index,
									{
										word: e
											.target
											.value,
									}
								)
							}
							placeholder="Gāius"
						/>
					</WordGroup>

					<WordGroup>
						<SmallLabel>
							Case / Role
						</SmallLabel>

						<Input
							value={
								word.case || ""
							}
							onChange={(e) =>
								updateWord(
									index,
									{
										case: e
											.target
											.value,
									}
								)
							}
							placeholder="Nominative"
						/>
					</WordGroup>

					<WordGroup>
						<SmallLabel>
							Color
						</SmallLabel>

						<Select
							value={
								word.color ||
								"blue"
							}
							onChange={(e) =>
								updateWord(
									index,
									{
										color: e
											.target
											.value,
									}
								)
							}
						>
							{colors.map(
								(color) => (
									<option
										key={
											color
										}
										value={
											color
										}
									>
										{
											color
										}
									</option>
								)
							)}
						</Select>
					</WordGroup>

					<Button
						type="button"
						onClick={() =>
							deleteWord(index)
						}
					>
						Delete
					</Button>
				</Row>
			))}

			<Button
				type="button"
				onClick={addWord}
			>
				Add Word
			</Button>
		</>
	);
}

export default GrammarDiagramBlockEditor;