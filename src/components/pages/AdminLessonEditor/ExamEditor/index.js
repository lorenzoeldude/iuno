import styled from "styled-components";

const Section = styled.section`
	width: 100%;
`;

const Label = styled.label`
	display: block;
	margin-top: ${({ theme }) => theme.spacing.xl};
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.xxl};
	font-weight: ${({ theme }) => theme.fontWeights.bold};

	color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
	width: 100%;

	padding: ${({ theme }) => theme.spacing.sm} 0;

	background: transparent;
	color: ${({ theme }) => theme.colors.text};

	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.xl};

	&:focus {
		outline: none;
		border-bottom-color: ${({ theme }) => theme.colors.primary};
	}
`;

const TextArea = styled.textarea`
	width: 100%;
	min-height: 180px;

	padding: ${({ theme }) => theme.spacing.md};

	background: transparent;
	color: ${({ theme }) => theme.colors.text};

	border: 1px solid ${({ theme }) => theme.colors.border};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.lg};

	resize: vertical;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary};
	}
`;

const QuestionHeader = styled.div`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.spacing.md};

	margin-top: ${({ theme }) => theme.spacing.xl};
	margin-bottom: ${({ theme }) => theme.spacing.md};
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

const Block = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing.xl};

    border: 1px solid ${({ theme }) => theme.colors.text};

`;

const Select = styled.select`
	padding: ${({ theme }) => theme.spacing.sm};

	background: transparent;
	color: ${({ theme }) => theme.colors.text};

	border: 1px solid ${({ theme }) => theme.colors.border};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.md};
`;

const initialQuestion = () => ({
	type: "question",
	question: "",
	correct: "",
	optionsText: "",
});

const initialSentenceQuestion = () => ({
	type: "sentenceQuestion",
	sentence: "",
	question: "",
	correct: "",
	optionsText: "",
});

const initialWordOrEnding = (type) => ({
	type,
	before: "",
	after: "",
	correct: "",
	optionsText: "",
});

function ExamEditor({ exam, setExam }) {
	const updateExamQuestion = (index, changes) => {
		setExam((current) =>
			current.map((question, i) =>
				i === index
					? { ...question, ...changes }
					: question
			)
		);
	};

	const changeQuestionType = (index, type) => {
		let newQuestion;

		switch (type) {
			case "question":
				newQuestion = initialQuestion();
				break;

			case "sentenceQuestion":
				newQuestion =
					initialSentenceQuestion();
				break;

			case "word":
			case "ending":
				newQuestion =
					initialWordOrEnding(type);
				break;

			default:
				return;
		}

		setExam((current) =>
			current.map((question, i) =>
				i === index
					? newQuestion
					: question
			)
		);
	};

	const deleteQuestion = (index) => {
		if (exam.length === 1) return;

		setExam((current) =>
			current.filter((_, i) => i !== index)
		);
	};

	const addQuestion = () => {
		setExam((current) => [
			...current,
			initialQuestion(),
		]);
	};

	return (
		<Section>
			<Label>Exam</Label>

			{exam.map((question, index) => (
				<Block key={index}>
					<QuestionHeader>
                        <Label>
                            #{index + 1}
                        </Label>

                        <Select
                            value={question.type}
                            onChange={(e) =>
                                changeQuestionType(
                                    index,
                                    e.target.value
                                )
                            }
                        >
                            <option value="question">
                                Question
                            </option>

                            <option value="sentenceQuestion">
                                Sentence Question
                            </option>

                            <option value="word">
                                Word
                            </option>

                            <option value="ending">
                                Ending
                            </option>
                        </Select>
                    </QuestionHeader>

					{/* =================================================
						SENTENCE QUESTION
					================================================= */}

					{question.type ===
					"sentenceQuestion" ? (
						<>
							<Label>
								Sentence
							</Label>

							<Input
								value={
									question.sentence ||
									""
								}
								onChange={(e) =>
									updateExamQuestion(
										index,
										{
											sentence:
												e
													.target
													.value,
										}
									)
								}
								placeholder="Līvia Fidō olīvam dat."
							/>

							<Label>
								Question
							</Label>

							<Input
								value={
									question.question ||
									""
								}
								onChange={(e) =>
									updateExamQuestion(
										index,
										{
											question:
												e
													.target
													.value,
										}
									)
								}
								placeholder="Which case is olīvam in?"
							/>
						</>
					) : question.type ===
							"word" ||
						question.type ===
							"ending" ? (
						<>
							<Label>
								Sentence Before
							</Label>

							<Input
								value={
									question.before ||
									""
								}
								onChange={(e) =>
									updateExamQuestion(
										index,
										{
											before:
												e
													.target
													.value,
										}
									)
								}
								placeholder="Sentence before"
							/>

							<Label>
								Sentence After
							</Label>

							<Input
								value={
									question.after ||
									""
								}
								onChange={(e) =>
									updateExamQuestion(
										index,
										{
											after:
												e
													.target
													.value,
										}
									)
								}
								placeholder="Sentence after"
							/>
						</>
					) : (
						<Label>
							Question
							<Input
								value={
									question.question ||
									""
								}
								onChange={(e) =>
									updateExamQuestion(
										index,
										{
											question:
												e
													.target
													.value,
										}
									)
								}
								placeholder="Question"
							/>
						</Label>
					)}

					{/* =================================================
						CORRECT ANSWER
					================================================= */}

					<Label>
						Correct Answer
					</Label>

					<Input
						value={
							question.correct || ""
						}
						onChange={(e) =>
							updateExamQuestion(
								index,
								{
									correct:
										e.target.value,
								}
							)
						}
						placeholder="Correct answer"
					/>

					{/* =================================================
						OPTIONS
					================================================= */}

					<Label>Options</Label>

					<TextArea
						value={
							question.optionsText ||
							""
						}
						onChange={(e) =>
							updateExamQuestion(
								index,
								{
									optionsText:
										e.target.value,
								}
							)
						}
						placeholder={`Option 1
Option 2
Option 3
Option 4`}
					/>

					{/* =================================================
						DELETE
					================================================= */}

					<Button
						type="button"
						onClick={() =>
							deleteQuestion(index)
						}
					>
						Delete Question
					</Button>
				</Block>
			))}

			<Button
				type="button"
				onClick={addQuestion}
			>
				Add Question
			</Button>
		</Section>
	);
}

export default ExamEditor;