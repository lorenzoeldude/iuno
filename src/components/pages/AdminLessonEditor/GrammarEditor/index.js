import styled from "styled-components";
import BlockEditor from "./BlockEditor";

const Section = styled.section`
	width: 100%;
`;

const Button = styled.button`
	margin-top: ${({ theme }) => theme.spacing.xs};
	margin-bottom: ${({ theme }) => theme.spacing.xs};

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

const initialParagraphBlock = () => ({
	text: "",
});

const initialPage = () => ({
	title: "",
	blocks: [initialParagraphBlock()],
});

function GrammarEditor({ grammar, setGrammar }) {
	const updatePage = (pageIndex, changes) => {
		setGrammar((current) =>
			current.map((page, index) =>
				index === pageIndex
					? {
							...page,
							...changes,
						}
					: page
			)
		);
	};

	const updatePageTitle = (
		pageIndex,
		title
	) => {
		updatePage(pageIndex, { title });
	};

	const updateBlocks = (
		pageIndex,
		blocks
	) => {
		updatePage(pageIndex, { blocks });
	};

	const addPage = () => {
		setGrammar((current) => [
			...current,
			initialPage(),
		]);
	};

	const deletePage = (pageIndex) => {
		setGrammar((current) => {
			if (current.length === 1) {
				return current;
			}

			return current.filter(
				(_, index) =>
					index !== pageIndex
			);
		});
	};

	const movePage = (
		pageIndex,
		direction
	) => {
		setGrammar((current) => {
			const newIndex =
				pageIndex + direction;

			if (
				newIndex < 0 ||
				newIndex >= current.length
			) {
				return current;
			}

			const updated = [...current];

			[
				updated[pageIndex],
				updated[newIndex],
			] = [
				updated[newIndex],
				updated[pageIndex],
			];

			return updated;
		});
	};

	return (
		<Section>

			{grammar.map((page, pageIndex) => (
				<BlockEditor
					key={pageIndex}
					page={page}
					pageIndex={pageIndex}
					pageCount={grammar.length}
					onTitleChange={(title) =>
						updatePageTitle(
							pageIndex,
							title
						)
					}
					onBlocksChange={(blocks) =>
						updateBlocks(
							pageIndex,
							blocks
						)
					}
					onDeletePage={() =>
						deletePage(pageIndex)
					}
					onMovePage={(
						direction
					) =>
						movePage(
							pageIndex,
							direction
						)
					}
				/>
			))}

			<Button
				type="button"
				onClick={addPage}
			>
				Add Grammar Page
			</Button>
		</Section>
	);
}

export default GrammarEditor;