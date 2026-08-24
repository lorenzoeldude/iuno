import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import GrammarEditor from "./GrammarEditor";
import ExamEditor from "./ExamEditor";

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
		border-bottom-color: ${({ theme }) =>
			theme.colors.primary};
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

// =====================================================
// INITIAL VALUES
// =====================================================

const createInitialGrammarPage = () => ({
	title: "",
	blocks: [
		{
			type: "paragraph",
			text: "",
		},
	],
});

const initialExamQuestion = {
	type: "question",
	question: "",
	correct: "",
	optionsText: "",
};

function AdminLessonEditor() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [introduction, setIntroduction] = useState("");
	const [isPublished, setIsPublished] = useState(false);

	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");

	const [textPages, setTextPages] = useState([
		{ text: "" },
	]);

	const [vocabulary, setVocabulary] = useState("");

	const [grammar, setGrammar] = useState([
		createInitialGrammarPage(),
	]);

	const [exam, setExam] = useState([
		{ ...initialExamQuestion },
	]);

	// =====================================================
	// LOAD LESSON
	// =====================================================

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
				setIntroduction(
					lesson.introduction || ""
				);
				setIsPublished(
					lesson.is_published || false
				);

				// =================================================
				// TEXT
				// =================================================

				setTextPages(
					lesson.text &&
						lesson.text.length > 0
						? lesson.text
						: [{ text: "" }]
				);

				// =================================================
				// GRAMMAR
				// =================================================

				setGrammar(
					lesson.grammar &&
						lesson.grammar.length > 0
						? lesson.grammar
						: [createInitialGrammarPage()]
				);

				// =================================================
				// EXAM
				// =================================================

				setExam(
					(lesson.exam || []).length > 0
						? lesson.exam.map((q) => ({
								...q,
								optionsText: (
									q.options || []
								).join("\n"),
							}))
						: [{ ...initialExamQuestion }]
				);

				// =================================================
				// VOCABULARY
				// =================================================

				const vocabResponse = await fetch(
					`${process.env.REACT_APP_API_URL}/api/admin/lessons/${id}/vocabulary`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (vocabResponse.ok) {
					const data =
						await vocabResponse.json();

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

	// =====================================================
	// SAVE LESSON
	// =====================================================

	const handleSubmit = async () => {
		setLoading(true);
		setStatus("");

		const token = localStorage.getItem("token");

		try {
			// Convert the editor-friendly optionsText
			// back into the API format.
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
					: `${process.env.REACT_APP_API_URL}/api/admin/lessons/`,
				{
					method: id ? "PUT" : "POST",

					headers: {
						"Content-Type":
							"application/json",
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

			// =================================================
			// SAVE VOCABULARY
			// =================================================

			const vocabularyResponse = await fetch(
				`${process.env.REACT_APP_API_URL}/api/admin/lessons/${lessonID}/vocabulary`,
				{
					method: "PUT",

					headers: {
						"Content-Type":
							"application/json",
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

			if (!vocabularyResponse.ok) {
				setStatus(
					"Lesson saved, but vocabulary failed to save."
				);
				setLoading(false);
				return;
			}

			// =================================================
			// NEW LESSON
			// =================================================

			if (!id) {
				navigate(
					`/admin/lessons/${lesson.id}`
				);
				return;
			}

			setStatus("Lesson saved.");
		} catch (err) {
			console.error(err);
			setStatus("Failed to save lesson.");
		}

		setLoading(false);
	};

	// =====================================================
	// TEXT PAGE HELPERS
	// =====================================================

	const updateTextPage = (index, value) => {
		setTextPages((current) =>
			current.map((page, i) =>
				i === index
					? {
							...page,
							text: value,
						}
					: page
			)
		);
	};

	const addTextPage = () => {
		setTextPages((current) => [
			...current,
			{ text: "" },
		]);
	};

	const deleteTextPage = (index) => {
		if (textPages.length === 1) return;

		setTextPages((current) =>
			current.filter((_, i) => i !== index)
		);
	};

	// =====================================================
	// RENDER
	// =====================================================

	return (
		<Page>
			<Heading>
				{id ? "Edit Lesson" : "Create Lesson"}
			</Heading>

			{/* =====================================================
				BASIC INFORMATION
			===================================================== */}

			<Label>Title</Label>

			<Input
				value={title}
				onChange={(e) =>
					setTitle(e.target.value)
				}
			/>

			<Label>Image</Label>

			<Input
				value={image}
				onChange={(e) =>
					setImage(e.target.value)
				}
				placeholder="/images/lesson1.webp"
			/>

			<Label>Introduction</Label>

			<TextArea
				value={introduction}
				onChange={(e) =>
					setIntroduction(e.target.value)
				}
				placeholder="Write the lesson introduction..."
			/>

			{/* =====================================================
				TEXT
			===================================================== */}

			{textPages.map((page, index) => (
				<div key={index}>
					<Label>
						Text Page {index + 1}
					</Label>

					<TextArea
						value={page.text}
						onChange={(e) =>
							updateTextPage(
								index,
								e.target.value
							)
						}
						placeholder="Write the Latin text..."
					/>

					<Button
						type="button"
						onClick={() =>
							deleteTextPage(index)
						}
					>
						Delete Page
					</Button>
				</div>
			))}

			<Button
				type="button"
				onClick={addTextPage}
			>
				Add Page
			</Button>

			{/* =====================================================
				VOCABULARY
			===================================================== */}

			<Label>Vocabulary</Label>

			<TextArea
				value={vocabulary}
				onChange={(e) =>
					setVocabulary(e.target.value)
				}
				placeholder={`Rōma
Italia
urbs
vir
fēmina`}
			/>

			{/* =====================================================
				GRAMMAR
			===================================================== */}

			<GrammarEditor
				grammar={grammar}
				setGrammar={setGrammar}
			/>

			{/* =====================================================
				EXAM
			===================================================== */}

			<ExamEditor
				exam={exam}
				setExam={setExam}
			/>

			{/* =====================================================
				PUBLISHED
			===================================================== */}

			<CheckboxRow>
				<input
					type="checkbox"
					checked={isPublished}
					onChange={(e) =>
						setIsPublished(
							e.target.checked
						)
					}
				/>

				Published
			</CheckboxRow>

			{/* =====================================================
				SAVE
			===================================================== */}

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