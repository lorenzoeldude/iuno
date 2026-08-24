import styled from "styled-components";

import ParagraphBlockEditor from "./ParagraphBlockEditor";
import GrammarDiagramBlockEditor from "./GrammarDiagramBlockEditor";
import SentenceBlockEditor from "./SentenceBlockEditor";
import QuestionBlockEditor from "./QuestionBlockEditor";
import SentenceQuestionBlockEditor from "./SentenceQuestionBlockEditor";
import QuizBlockEditor from "./QuizBlockEditor";

const Page = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing.xxl};
	padding: ${({ theme }) => theme.spacing.xl};

	border: 1px solid ${({ theme }) => theme.colors.text};

    // background-color: rgba(116, 116, 116, 0.12);

`;

const PageHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	gap: ${({ theme }) => theme.spacing.md};

	margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PageTitle = styled.h2`
	margin: 0;

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.xxxl};
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

const Label = styled.label`
	display: block;
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.lg};
	font-weight: ${({ theme }) => theme.fontWeights.bold};

	color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
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

const Block = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing.xl};
	padding-bottom: ${({ theme }) => theme.spacing.xl};

	border-bottom: 1px solid
		${({ theme }) => theme.colors.border};
`;

const BlockHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	gap: ${({ theme }) => theme.spacing.md};

	margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BlockNumber = styled.span`
	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.lg};
	font-weight: ${({ theme }) => theme.fontWeights.bold};

	color: ${({ theme }) => theme.colors.text};
`;

const ButtonRow = styled.div`
	display: flex;
	flex-wrap: wrap;

	gap: ${({ theme }) => theme.spacing.sm};

	margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Button = styled.button`
	padding: ${({ theme }) => theme.spacing.sm}
		${({ theme }) => theme.spacing.lg};

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

const blockTypes = [
	{
		value: "paragraph",
		label: "Paragraph",
	},
	{
		value: "grammarDiagram",
		label: "Grammar Diagram",
	},
	{
		value: "sentence",
		label: "Sentence",
	},
	{
		value: "question",
		label: "Question",
	},
	{
		value: "sentenceQuestion",
		label: "Sentence Question",
	},
	{
		value: "quizEnding",
		label: "Ending Quiz",
	},
	{
		value: "quizWord",
		label: "Word Quiz",
	},
];

const createBlock = (type) => {
	switch (type) {
		case "paragraph":
			return {
				type: "paragraph",
				text: "",
			};

		case "grammarDiagram":
			return {
				type: "grammarDiagram",
				words: [
					{
						word: "",
						case: "",
						color: "blue",
					},
				],
				explanations: [""],
			};

		case "sentence":
			return {
				type: "sentence",
				text: "",
			};

		case "question":
			return {
				type: "question",
				question: "",
				correct: "",
				options: ["", "", "", ""],
			};

		case "sentenceQuestion":
			return {
				type: "sentenceQuestion",
				sentence: "",
				question: "",
				correct: "",
				options: ["", "", "", ""],
			};

		case "quizEnding":
			return {
				type: "quizEnding",
				sentenceBefore: "",
				correct: "",
				options: ["", "", "", ""],
				ending: "",
			};

		case "quizWord":
			return {
				type: "quizWord",
				sentenceBefore: "",
				correct: "",
				options: ["", "", "", ""],
				ending: "",
			};

		default:
			return {
				type: "paragraph",
				text: "",
			};
	}
};

function BlockEditor({
	page,
	pageIndex,
	pageCount,
	onTitleChange,
	onBlocksChange,
	onDeletePage,
	onMovePage,
}) {
	const blocks = page.blocks || [];

	const updateBlock = (index, changes) => {
		const updated = blocks.map(
			(block, blockIndex) =>
				blockIndex === index
					? {
							...block,
							...changes,
						}
					: block
		);

		onBlocksChange(updated);
	};

	const changeBlockType = (
		index,
		type
	) => {
		const updated = blocks.map(
			(block, blockIndex) =>
				blockIndex === index
					? createBlock(type)
					: block
		);

		onBlocksChange(updated);
	};

	const addBlock = () => {
		onBlocksChange([
			...blocks,
			createBlock("paragraph"),
		]);
	};

	const insertBlock = (index) => {
		const updated = [...blocks];

		updated.splice(
			index + 1,
			0,
			createBlock("paragraph")
		);

		onBlocksChange(updated);
	};

	const deleteBlock = (index) => {
		if (blocks.length === 1) {
			return;
		}

		onBlocksChange(
			blocks.filter(
				(_, blockIndex) =>
					blockIndex !== index
			)
		);
	};

	const moveBlock = (
		index,
		direction
	) => {
		const newIndex = index + direction;

		if (
			newIndex < 0 ||
			newIndex >= blocks.length
		) {
			return;
		}

		const updated = [...blocks];

		[
			updated[index],
			updated[newIndex],
		] = [
			updated[newIndex],
			updated[index],
		];

		onBlocksChange(updated);
	};

	const renderBlockEditor = (
		block,
		index
	) => {
		const onChange = (changes) =>
			updateBlock(index, changes);

		switch (block.type) {
			case "paragraph":
				return (
					<ParagraphBlockEditor
						block={block}
						onChange={onChange}
					/>
				);

			case "grammarDiagram":
				return (
					<GrammarDiagramBlockEditor
						block={block}
						onChange={onChange}
					/>
				);

			case "sentence":
				return (
					<SentenceBlockEditor
						block={block}
						onChange={onChange}
					/>
				);

			case "question":
				return (
					<QuestionBlockEditor
						block={block}
						onChange={onChange}
					/>
				);

			case "sentenceQuestion":
				return (
					<SentenceQuestionBlockEditor
						block={block}
						onChange={onChange}
					/>
				);

			case "quizEnding":
			case "quizWord":
				return (
					<QuizBlockEditor
						block={block}
						onChange={onChange}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<Page>
			<PageHeader>
				<PageTitle>
					#{pageIndex + 1}
				</PageTitle>

				<ButtonRow>
					<Button
						type="button"
						onClick={() =>
							onMovePage(-1)
						}
						disabled={
							pageIndex === 0
						}
					>
						Move Up
					</Button>

					<Button
						type="button"
						onClick={() =>
							onMovePage(1)
						}
						disabled={
							pageIndex ===
							pageCount - 1
						}
					>
						Move Down
					</Button>

					<Button
						type="button"
						onClick={onDeletePage}
						disabled={
							pageCount === 1
						}
					>
						Delete Page
					</Button>
				</ButtonRow>
			</PageHeader>

			<Label>Page Title</Label>

			<Input
				value={page.title || ""}
				onChange={(e) =>
					onTitleChange(
						e.target.value
					)
				}
				placeholder="Datīvus"
			/>

			{blocks.map((block, index) => (
				<Block key={index}>
					<BlockHeader>
						<BlockNumber>
							Block {index + 1}
						</BlockNumber>

						<Select
							value={block.type}
							onChange={(e) =>
								changeBlockType(
									index,
									e.target.value
								)
							}
						>
							{blockTypes.map(
								(type) => (
									<option
										key={
											type.value
										}
										value={
											type.value
										}
									>
										{
											type.label
										}
									</option>
								)
							)}
						</Select>
					</BlockHeader>

					{renderBlockEditor(
						block,
						index
					)}

					<ButtonRow>
						<Button
							type="button"
							onClick={() =>
								moveBlock(
									index,
									-1
								)
							}
							disabled={
								index === 0
							}
						>
							Move Up
						</Button>

						<Button
							type="button"
							onClick={() =>
								moveBlock(
									index,
									1
								)
							}
							disabled={
								index ===
								blocks.length - 1
							}
						>
							Move Down
						</Button>

						<Button
							type="button"
							onClick={() =>
								insertBlock(
									index
								)
							}
						>
							Add Block Below
						</Button>

						<Button
							type="button"
							onClick={() =>
								deleteBlock(
									index
								)
							}
							disabled={
								blocks.length ===
								1
							}
						>
							Delete Block
						</Button>
					</ButtonRow>
				</Block>
			))}

			<Button
				type="button"
				onClick={addBlock}
			>
				Add Block
			</Button>
		</Page>
	);
}

export default BlockEditor;