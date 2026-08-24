import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

import useSoundEffects from "../../../hooks/useSoundEffects";

import { API_URL } from "../../../config";

const Wrapper = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 0 auto;

	display: flex;
	flex-direction: column;

	flex: 1;
`;

const Content = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
`;

const Title = styled.h1`
	width: 100%;

	font-family: "Cormorant Garamond", serif;
	font-weight: 800;
	font-size: clamp(28px, 4vw, 42px);

	text-decoration: underline;
	text-align: left;

	margin: 0 0 40px;
`;

const Text = styled.div`
	width: 100%;

	font-size: 30px;
	line-height: 1.3;
	text-align: left;

	margin: 12px 0;

	white-space: pre-line;

	strong {
		font-weight: 900;
	}

	.blue {
		color: #4a78c2;
	}

	.red {
		color: #d64545;
	}

	.green {
		color: #3a9d5d;
	}

	.orange {
		color: #d9822b;
	}

	.purple {
		color: #9b59b6;
	}

	.grammar {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		gap: 10px;

		width: 100%;

		font-size: 36px;
		font-weight: 800;
	}

	.grammar-word {
		display: flex;
		flex-direction: column;
		align-items: center;

		flex-shrink: 0;
	}

	.grammar-case {
		margin-top: 5px;

		font-size: 14px;
		font-weight: 600;
		line-height: 1;
	}
`;

const Block = styled.div`
	width: 100%;

	margin-bottom: 32px;

	&:last-child {
		margin-bottom: 0;
	}
`;

const SentenceQuestion = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	margin-bottom: 20px;
`;

const Sentence = styled.div`
	width: 100%;

	font-family: "Cormorant Garamond", serif;
	font-size: clamp(30px, 4vw, 44px);
	font-weight: 600;
	line-height: 1.3;

	text-align: center;

	margin-bottom: 14px;

	padding-bottom: 14px;
`;

const Question = styled.div`
	width: 100%;

	font-size: clamp(22px, 3vw, 30px);
	font-weight: 600;
	line-height: 1.4;

	text-align: center;

	color: ${({ theme }) => theme.colors.textSecondary};
`;

const QuizOptions = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 280px;

	margin: 30px auto 0;
`;

const ArrowDiv = styled.div`
	position: fixed;

	left: 50%;
	bottom: 30px;

	transform: translateX(-50%);

	display: flex;
	gap: 20px;
`;

function Grammatica() {
	const { id } = useParams();
	const navigate = useNavigate();

	const sounds = useSoundEffects();

	const [pages, setPages] = useState([]);
	const [step, setStep] = useState(0);
	const [selected, setSelected] = useState(null);

	// =====================================================
	// FETCH LESSON
	// =====================================================

	useEffect(() => {
		async function fetchLesson() {
			try {
				const response = await fetch(
					`${API_URL}/api/lessons/${id}`
				);

				if (!response.ok) {
					throw new Error(
						"Failed to fetch lesson"
					);
				}

				const lesson = await response.json();

				setPages(
					lesson.grammar || []
				);
			} catch (error) {
				console.error(
					"Error loading grammar:",
					error
				);
			}
		}

		fetchLesson();
	}, [id]);

	// =====================================================
	// COMPLETE GRAMMAR SECTION
	// =====================================================

	async function completeGrammar() {
		const token = localStorage.getItem("token");

		if (!token) {
			console.warn(
				"No auth token. Grammar progress will not be saved."
			);

			return;
		}

		try {
			const response = await fetch(
				`${API_URL}/api/lessons/${id}/progress`,
				{
					method: "PUT",

					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},

					body: JSON.stringify({
						section: "grammar",
					}),
				}
			);

			if (!response.ok) {
				console.error(
					"Failed to update grammar progress:",
					response.status
				);
			}
		} catch (error) {
			console.error(
				"GRAMMAR PROGRESS ERROR:",
				error
			);
		}
	}

	// =====================================================
	// NEXT
	// =====================================================

	async function Next() {
		if (step < pages.length - 1) {
			setStep(step + 1);
			setSelected(null);
			return;
		}

		await completeGrammar();

		navigate(
			`/lessons/${id}/examinatio`
		);
	}

	// =====================================================
	// BACK
	// =====================================================

	function Back() {
		if (step > 0) {
			setStep(step - 1);
			setSelected(null);
		}
	}

	// =====================================================
	// MARKDOWN TEXT
	// =====================================================

	function renderMarkdownText(text) {
		if (!text) {
			return null;
		}

		const parts = text.split(
			/(\*\*[^*]+\*\*)/g
		);

		return parts.map((part, index) => {
			if (
				part.startsWith("**") &&
				part.endsWith("**")
			) {
				return (
					<strong key={index}>
						{part.slice(2, -2)}
					</strong>
				);
			}

			return (
				<span key={index}>
					{part}
				</span>
			);
		});
	}

	// =====================================================
	// RENDER BLOCK
	// =====================================================

	function renderBlock(block, index) {
		if (!block) {
			return null;
		}

		// =================================================
		// PARAGRAPH
		// =================================================

		if (block.type === "paragraph") {
			return (
				<Block key={index}>
					<Text>
						{renderMarkdownText(
							block.text || ""
						)}
					</Text>
				</Block>
			);
		}

		// =================================================
		// EMPHASIS
		// =================================================

		if (block.type === "emphasis") {
			return (
				<Block key={index}>
					<Text>
						<strong>
							{block.text}
						</strong>
					</Text>
				</Block>
			);
		}

		// =================================================
		// GRAMMAR DIAGRAM
		// =================================================

		if (
			block.type ===
			"grammarDiagram"
		) {
			return (
				<Block key={index}>
					<Text>
						<div className="grammar">
							{(
								block.words ||
								[]
							).map(
								(
									word,
									wordIndex
								) => (
									<div
										className="grammar-word"
										key={
											wordIndex
										}
									>
										<div
											className={
												word.color ||
												"blue"
											}
										>
											{
												word.word
											}
										</div>

										<div className="grammar-case">
											{
												word.case
											}
										</div>
									</div>
								)
							)}
						</div>

						{(
							block.explanations ||
							[]
						).map(
							(
								explanation,
								explanationIndex
							) => (
								<div
									key={
										explanationIndex
									}
									style={{
										marginTop:
											"8px",
										fontSize:
											"20px",
									}}
								>
									{
										renderMarkdownText(
											explanation
										)
									}
								</div>
							)
						)}
					</Text>
				</Block>
			);
		}

		// =================================================
		// SENTENCE
		// =================================================

		if (block.type === "sentence") {
			return (
				<Block key={index}>
					<Sentence>
						{renderMarkdownText(
							block.text || ""
						)}
					</Sentence>
				</Block>
			);
		}

		// =================================================
		// QUESTION
		// =================================================

		if (block.type === "question") {
			return (
				<Block key={index}>
					<Question>
						{renderMarkdownText(
							block.question || ""
						)}
					</Question>

					<QuizOptions>
						{(
							block.options ||
							[]
						).map(
							(
								option
							) => (
								<AnswerButton
									key={
										option
									}
									index={
										option
									}
									correct={
										block.correct
									}
									selected={
										selected
									}
									setSelected={
										setSelected
									}
									sounds={
										sounds
									}
								>
									{
										option
									}
								</AnswerButton>
							)
						)}
					</QuizOptions>
				</Block>
			);
		}

		// =================================================
		// SENTENCE QUESTION
		// =================================================

		if (
			block.type ===
			"sentenceQuestion"
		) {
			return (
				<Block key={index}>
					<SentenceQuestion>
						<Sentence>
							{renderMarkdownText(
								block.sentence ||
									""
							)}
						</Sentence>

						<Question>
							{renderMarkdownText(
								block.question ||
									""
							)}
						</Question>
					</SentenceQuestion>

					<QuizOptions>
						{(
							block.options ||
							[]
						).map(
							(
								option
							) => (
								<AnswerButton
									key={
										option
									}
									index={
										option
									}
									correct={
										block.correct
									}
									selected={
										selected
									}
									setSelected={
										setSelected
									}
									sounds={
										sounds
									}
								>
									{
										option
									}
								</AnswerButton>
							)
						)}
					</QuizOptions>
				</Block>
			);
		}

		// =================================================
		// ENDING QUIZ
		// =================================================

		if (
			block.type ===
			"quizEnding"
		) {
			return (
				<Block key={index}>
					<Question>
						{
							block.sentenceBefore
						}

						<span
							style={{
								textDecoration:
									"underline",
								marginLeft:
									"8px",
								marginRight:
									"8px",
							}}
						>
							{selected ===
							null
								? "_"
								: block.correct}
						</span>

						{
							block.ending
						}
					</Question>

					<QuizOptions>
						{(
							block.options ||
							[]
						).map(
							(
								option
							) => (
								<AnswerButton
									key={
										option
									}
									index={
										option
									}
									correct={
										block.correct
									}
									selected={
										selected
									}
									setSelected={
										setSelected
									}
									sounds={
										sounds
									}
								>
									{`-${option}`}
								</AnswerButton>
							)
						)}
					</QuizOptions>
				</Block>
			);
		}

		// =================================================
		// WORD QUIZ
		// =================================================

		if (
			block.type ===
			"quizWord"
		) {
			return (
				<Block key={index}>
					<Question>
						{
							block.sentenceBefore
						}

						<span
							style={{
								textDecoration:
									"underline",
								marginLeft:
									"8px",
								marginRight:
									"8px",
							}}
						>
							{selected ===
							null
								? "_"
								: block.correct}
						</span>

						{
							block.ending
						}
					</Question>

					<QuizOptions>
						{(
							block.options ||
							[]
						).map(
							(
								option
							) => (
								<AnswerButton
									key={
										option
									}
									index={
										option
									}
									correct={
										block.correct
									}
									selected={
										selected
									}
									setSelected={
										setSelected
									}
									sounds={
										sounds
									}
								>
									{
										option
									}
								</AnswerButton>
							)
						)}
					</QuizOptions>
				</Block>
			);
		}

		return null;
	}

	// =====================================================
	// LOADING
	// =====================================================

	if (pages.length === 0) {
		return (
			<LessonLayout
				active="grammatica"
				completed={[
					"textus",
					"vocabula",
				]}
				progress={0}
			>
				Loading...
			</LessonLayout>
		);
	}

	// =====================================================
	// CURRENT PAGE
	// =====================================================

	const current = pages[step];

	const blocks = current.blocks || [];

	const progress =
		pages.length > 1
			? (step / (pages.length - 1)) *
				100
			: 100;

	// =====================================================
	// RENDER
	// =====================================================

	return (
		<LessonLayout
			active="grammatica"
			completed={[
				"textus",
				"vocabula",
			]}
			progress={progress}
		>
			<Wrapper>
				<Content>
					{/* =================================================
						PAGE TITLE
					================================================= */}

					{current.title && (
						<Title>
							{
								current.title
							}
						</Title>
					)}

					{/* =================================================
						PAGE BLOCKS
					================================================= */}

					{blocks.map(
						(block, index) =>
							renderBlock(
								block,
								index
							)
					)}
				</Content>
			</Wrapper>

			{/* =====================================================
				NAVIGATION
			===================================================== */}

			{(blocks.every(
				(block) =>
					block.type !==
						"question" &&
					block.type !==
						"sentenceQuestion" &&
					block.type !==
						"quizEnding" &&
					block.type !==
						"quizWord"
			) ||
				selected !== null) && (
				<ArrowDiv>
					{step > 0 && (
						<ArrowButton
							onClick={
								Back
							}
						>
							{"<"}
						</ArrowButton>
					)}

					<ArrowButton
						onClick={Next}
					>
						{">"}
					</ArrowButton>
				</ArrowDiv>
			)}
		</LessonLayout>
	);
}

export default Grammatica;