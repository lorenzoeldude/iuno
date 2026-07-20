import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
	width: 80%;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing.xl}
		${({ theme }) => theme.spacing.xxl};
`;

const Heading = styled.h1`
	margin: 0 0 ${({ theme }) => theme.spacing.xl};

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.xxxl};
	font-weight: ${({ theme }) => theme.fontWeights.bold};

	color: ${({ theme }) => theme.colors.text};
`;

const Label = styled.label`
	display: block;
	margin-top: ${({ theme }) => theme.spacing.xl};
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.xxl};

	color: ${({ theme }) => theme.colors.text};

	font-family: ${({ theme }) => theme.fonts.heading};
	font-weight: ${({ theme }) => theme.fontWeights.bold};
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

const CheckboxRow = styled.label`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.spacing.sm};

	margin-top: ${({ theme }) => theme.spacing.xl};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.md};

	color: ${({ theme }) => theme.colors.text};
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

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

const Status = styled.p`
	margin-top: ${({ theme }) => theme.spacing.lg};

	font-family: ${({ theme }) => theme.fonts.body};

	color: ${({ theme }) => theme.colors.textSecondary};
`;

function AdminLessonEditor() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [introduction, setIntroduction] = useState("");
	const [isPublished, setIsPublished] = useState(false);

	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");

	const [textPages, setTextPages] = useState([{ text: "" }]);
	const [vocabulary, setVocabulary] = useState("");

	const [grammar, setGrammar] = useState([
		{
			type: "explanation",
			title: "",
			text: [""],
		},
	]);

	const [exam, setExam] = useState([
		{
			type: "vocab",
			question: "",
			correct: "",
			optionsText: "",
		},
	]);

	useEffect(() => {
		if (!id) return;

		const loadLesson = async () => {
			const token = localStorage.getItem("token");

			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/api/admin/lessons/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					setStatus("Failed to load lesson.");
					return;
				}

				const lesson = await response.json();

				setTitle(lesson.title || "");
				setImage(lesson.image || "");
				setIntroduction(lesson.introduction || "");
				setIsPublished(lesson.is_published || false);
				setTextPages(
					lesson.text && lesson.text.length > 0
						? lesson.text
						: [{ text: "" }]
				);
				setGrammar(
					lesson.grammar && lesson.grammar.length > 0
						? lesson.grammar
						: [
							{
								type: "explanation",
								title: "",
								text: [""],
							},
						]
				);
				setExam(
					(lesson.exam || []).map((q) => ({
						...q,
						optionsText: (q.options || []).join("\n"),
					}))
				);
				const vocabResponse = await fetch(
					`${process.env.REACT_APP_API_URL}/api/admin/lessons/${id}/vocabulary`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (vocabResponse.ok) {
					const data = await vocabResponse.json();

					setVocabulary(
						(data.vocabulary || []).join("\n")
					);
				}
			} catch (err) {
				console.error(err);
				setStatus("Failed to load lesson.");
			}
		};

		loadLesson();
	}, [id]);

	const handleSubmit = async () => {
		setLoading(true);
		setStatus("");

		const token = localStorage.getItem("token");

		try {
			const examToSave = exam.map((q) => ({
				...q,
				options: (q.optionsText || "")
					.split("\n")
					.map((o) => o.trim())
					.filter(Boolean),
			}));
			const response = await fetch(
				id
					? `${process.env.REACT_APP_API_URL}/api/admin/lessons/${id}`
					: `${process.env.REACT_APP_API_URL}/api/admin/lessons`,
				{
					method: id ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						title,
						image,
						introduction,
						text: textPages,
						grammar,
						exam: examToSave,
						is_published: isPublished,
					}),
				}
			);

			if (!response.ok) {
				setStatus("Failed to save lesson.");
				setLoading(false);
				return;
			}

			const lesson = await response.json();

			const lessonID = id || lesson.id;

			await fetch(
				`${process.env.REACT_APP_API_URL}/api/admin/lessons/${lessonID}/vocabulary`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						vocabulary: vocabulary
							.split("\n")
							.map((v) => v.trim())
							.filter(Boolean),
					}),
				}
			);

			if (!id) {
				navigate(`/admin/lessons/${lesson.id}`);
				return;
			}

			setStatus("Lesson saved.");
		} catch (err) {
			console.error(err);
			setStatus("Failed to save lesson.");
		}

		setLoading(false);
	};

	return (
		<Page>
			<Heading>
				{id ? "Edit Lesson" : "Create Lesson"}
			</Heading>

			<Label>Title</Label>
			<Input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<Label>Image</Label>
			<Input
				value={image}
				onChange={(e) => setImage(e.target.value)}
				placeholder="/images/lesson1.webp"
			/>

			<Label>Introduction</Label>
			<TextArea
				value={introduction}
				onChange={(e) => setIntroduction(e.target.value)}
				placeholder="Write the lesson introduction..."
			/>

			{textPages.map((page, index) => (
				<div key={index}>
					<Label>Text Page {index + 1}</Label>

					<TextArea
						value={page.text}
						onChange={(e) => {
							const updated = [...textPages];
							updated[index].text = e.target.value;
							setTextPages(updated);
						}}
						placeholder="Write the Latin text..."
					/>
					<Button
						type="button"
						onClick={() => {
							if (textPages.length === 1) return;

							setTextPages(
								textPages.filter((_, i) => i !== index)
							);
						}}
					>
						Delete Page
					</Button>
				</div>
			))}

			<Button
				type="button"
				onClick={() =>
					setTextPages([
						...textPages,
						{
							text: "",
						},
					])
				}
			>
				Add Page
			</Button>

			<Label>Vocabulary</Label>

			<TextArea
				value={vocabulary}
				onChange={(e) => setVocabulary(e.target.value)}
				placeholder={`Rōma
			Italia
			urbs
			vir
			fēmina`}
			/>

			<Label>Grammar</Label>

			{grammar.map((block, index) => (
				<div key={index}>

					<Label>
						Grammar Block {index + 1}
					</Label>

					<select
						value={block.type}
						onChange={(e) => {
							const updated = [...grammar];

							updated[index].type = e.target.value;

							if (e.target.value === "explanation") {
								updated[index] = {
									type: "explanation",
									title: "",
									text: [""],
								};
							}

							if (e.target.value === "quiz") {
								updated[index] = {
									type: "quiz",
									sentenceBefore: "",
									correct: "",
									options: ["", ""],
									ending: "",
								};
							}

							setGrammar(updated);
						}}
					>
						<option value="explanation">
							Explanation
						</option>

						<option value="quiz">
							Quiz
						</option>
					</select>


					{block.type === "explanation" && (
						<>
							<Label>Title</Label>

							<Input
								value={block.title}
								onChange={(e) => {
									const updated = [...grammar];
									updated[index].title = e.target.value;
									setGrammar(updated);
								}}
							/>


							<Label>Text</Label>

							<TextArea
								value={block.text.join("\n")}
								onChange={(e) => {
									const updated = [...grammar];

									updated[index].text =
										e.target.value.split("\n");

									setGrammar(updated);
								}}
								placeholder="One explanation line per row..."
							/>
						</>
					)}


					{block.type === "quiz" && (
						<>
							<Label>Sentence Before</Label>

							<Input
								value={block.sentenceBefore}
								onChange={(e) => {
									const updated = [...grammar];
									updated[index].sentenceBefore =
										e.target.value;
									setGrammar(updated);
								}}
							/>


							<Label>Correct Answer</Label>

							<Input
								value={block.correct}
								onChange={(e) => {
									const updated = [...grammar];
									updated[index].correct =
										e.target.value;
									setGrammar(updated);
								}}
							/>


							<Label>Options</Label>

							<Input
								value={block.options.join(",")}
								onChange={(e) => {
									const updated = [...grammar];

									updated[index].options =
										e.target.value
											.split(",");

									setGrammar(updated);
								}}
							/>


							<Label>Ending</Label>

							<Input
								value={block.ending}
								onChange={(e) => {
									const updated = [...grammar];
									updated[index].ending =
										e.target.value;
									setGrammar(updated);
								}}
							/>
						</>
					)}


					<Button
						type="button"
						onClick={() => {
							setGrammar(
								grammar.filter(
									(_, i) => i !== index
								)
							);
						}}
					>
						Delete Block
					</Button>

				</div>
			))}


			<Button
				type="button"
				onClick={() =>
					setGrammar([
						...grammar,
						{
							type: "explanation",
							title: "",
							text: [""],
						},
					])
				}
			>
				Add Grammar Block
			</Button>

			<Label>Exam</Label>

			{exam.map((question, index) => (
				<div key={index}>
					<Label>Question {index + 1}</Label>

					<Input
						value={question.type}
						onChange={(e) => {
							const updated = [...exam];
							updated[index].type = e.target.value;
							setExam(updated);
						}}
						placeholder="vocab, grammar or text"
					/>

					{question.type === "grammar" ? (
						<>
							<Input
								value={question.before || ""}
								onChange={(e) => {
									const updated = [...exam];
									updated[index].before = e.target.value;
									setExam(updated);
								}}
								placeholder="Sentence before"
							/>

							<Input
								value={question.after || ""}
								onChange={(e) => {
									const updated = [...exam];
									updated[index].after = e.target.value;
									setExam(updated);
								}}
								placeholder="Sentence after"
							/>
						</>
					) : (
						<Input
							value={question.question || ""}
							onChange={(e) => {
								const updated = [...exam];
								updated[index].question = e.target.value;
								setExam(updated);
							}}
							placeholder="Question"
						/>
					)}

					<Input
						value={question.correct || ""}
						onChange={(e) => {
							const updated = [...exam];
							updated[index].correct = e.target.value;
							setExam(updated);
						}}
						placeholder="Correct answer"
					/>

					<TextArea
						value={question.optionsText || ""}
						onChange={(e) => {
							const updated = [...exam];
							updated[index].optionsText = e.target.value;
							setExam(updated);
						}}
						placeholder={`Option 1
					Option 2
					Option 3`}
					/>

					<Button
						type="button"
						onClick={() => {
							if (exam.length === 1) return;

							setExam(exam.filter((_, i) => i !== index));
						}}
					>
						Delete Question
					</Button>
				</div>
			))}

			<Button
				type="button"
				onClick={() =>
					setExam([
						...exam,
						{
							type: "vocab",
							question: "",
							options: [],
							correct: "",
						},
					])
				}
			>
				Add Question
			</Button>

			<CheckboxRow>
				<input
					type="checkbox"
					checked={isPublished}
					onChange={(e) => setIsPublished(e.target.checked)}
				/>
				Published
			</CheckboxRow>

			<Button
				onClick={handleSubmit}
				disabled={loading}
			>
				{loading
					? "Saving..."
					: id
					? "Save Lesson"
					: "Create Lesson"}
			</Button>

			{status && <Status>{status}</Status>}
		</Page>
	);
}

export default AdminLessonEditor;