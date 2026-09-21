import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// =====================================================
// PAGE
// =====================================================

const Page = styled.div`
	width: 90%;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing.xl}
		${({ theme }) => theme.spacing.xxl};
`;

// =====================================================
// HEADER
// =====================================================

const Header = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;

	gap: ${({ theme }) => theme.spacing.xl};

	margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Heading = styled.h1`
	margin: 0;

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.xxxl};
	font-weight: ${({ theme }) => theme.fontWeights.bold};

	color: ${({ theme }) => theme.colors.text};
`;

const Count = styled.span`
	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.md};

	color: ${({ theme }) => theme.colors.textSecondary};
`;

// =====================================================
// FILTERS
// =====================================================

const Filters = styled.div`
	display: flex;
	align-items: center;

	gap: ${({ theme }) => theme.spacing.sm};

	margin-bottom: ${({ theme }) => theme.spacing.xl};

	padding-bottom: ${({ theme }) => theme.spacing.lg};

	border-bottom: 1px solid
		${({ theme }) => theme.colors.border};
`;

const FilterButton = styled.button`
	padding: ${({ theme }) => theme.spacing.sm}
		${({ theme }) => theme.spacing.lg};

	background: ${({ active, theme }) =>
		active
			? theme.colors.primary
			: "transparent"};

	color: ${({ active, theme }) =>
		active
			? "white"
			: theme.colors.text};

	border: 1px solid
		${({ active, theme }) =>
			active
				? theme.colors.primary
				: theme.colors.border};

	border-radius: 0;

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.md};
	font-weight: ${({ theme }) => theme.fontWeights.semibold};

	cursor: pointer;

	&:hover {
		border-color: ${({ theme }) =>
			theme.colors.primary};
	}
`;

// =====================================================
// TABLE
// =====================================================

const TableWrapper = styled.div`
	width: 100%;

	overflow-x: auto;

	border: 1px solid
		${({ theme }) => theme.colors.border};
`;

const Table = styled.table`
	width: 100%;

	border-collapse: collapse;

	font-family: ${({ theme }) => theme.fonts.body};
`;

const Thead = styled.thead`
	background: ${({ theme }) =>
		`${theme.colors.primary}12`};
`;

const Th = styled.th`
	padding: ${({ theme }) => theme.spacing.md}
		${({ theme }) => theme.spacing.lg};

	border-bottom: 1px solid
		${({ theme }) => theme.colors.border};

	color: ${({ theme }) => theme.colors.text};

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.lg};
	font-weight: ${({ theme }) => theme.fontWeights.bold};

	text-align: left;

	white-space: nowrap;
`;

const Td = styled.td`
	padding: ${({ theme }) => theme.spacing.lg};

	border-bottom: 1px solid
		${({ theme }) => theme.colors.border};

	color: ${({ theme }) => theme.colors.text};

	font-size: ${({ theme }) => theme.fontSizes.md};

	vertical-align: top;

	&:last-child {
		white-space: nowrap;
	}
`;

const Row = styled.tr`
	&:last-child td {
		border-bottom: none;
	}

	&:hover {
		background: ${({ theme }) =>
			`${theme.colors.primary}08`};
	}
`;

// =====================================================
// ID
// =====================================================

const ReportID = styled.span`
	color: ${({ theme }) =>
		theme.colors.textSecondary};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.sm};
`;

// =====================================================
// USER
// =====================================================

const Username = styled.span`
	font-weight: ${({ theme }) =>
		theme.fontWeights.semibold};

	color: ${({ theme }) => theme.colors.text};
`;

// =====================================================
// LEMMA
// =====================================================

const LemmaButton = styled.button`
	padding: 0;

	background: transparent;
	color: ${({ theme }) => theme.colors.primary};

	border: none;

	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: ${({ theme }) => theme.fontSizes.lg};
	font-weight: ${({ theme }) => theme.fontWeights.semibold};

	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

const LemmaID = styled.div`
	margin-top: ${({ theme }) => theme.spacing.xs};

	color: ${({ theme }) =>
		theme.colors.textSecondary};

	font-size: ${({ theme }) => theme.fontSizes.xs};
`;

// =====================================================
// MESSAGE
// =====================================================

const Message = styled.div`
	max-width: 420px;

	line-height: 1.5;

	white-space: pre-wrap;
	word-break: break-word;
`;

// =====================================================
// PLATFORM
// =====================================================

const Platform = styled.span`
	text-transform: capitalize;

	color: ${({ theme }) =>
		theme.colors.textSecondary};
`;

// =====================================================
// STATUS
// =====================================================

const StatusBadge = styled.span`
	display: inline-block;

	padding: ${({ theme }) => theme.spacing.xs}
		${({ theme }) => theme.spacing.sm};

	background: ${({ status, theme }) => {
		if (status === "resolved") {
			return `${theme.colors.success}18`;
		}

		if (status === "rejected") {
			return `${theme.colors.danger}18`;
		}

		return `${theme.colors.warning}18`;
	}};

	color: ${({ status, theme }) => {
		if (status === "resolved") {
			return theme.colors.success;
		}

		if (status === "rejected") {
			return theme.colors.danger;
		}

		return theme.colors.warning;
	}};

	border: 1px solid
		${({ status, theme }) => {
			if (status === "resolved") {
				return `${theme.colors.success}40`;
			}

			if (status === "rejected") {
				return `${theme.colors.danger}40`;
			}

			return `${theme.colors.warning}40`;
		}};

	font-size: ${({ theme }) => theme.fontSizes.sm};
	font-weight: ${({ theme }) => theme.fontWeights.semibold};

	text-transform: capitalize;
`;

// =====================================================
// DATE
// =====================================================

const DateText = styled.span`
	color: ${({ theme }) =>
		theme.colors.textSecondary};

	white-space: nowrap;
`;

// =====================================================
// STATES
// =====================================================

const State = styled.div`
	padding: ${({ theme }) => theme.spacing.xxl} 0;

	color: ${({ theme }) =>
		theme.colors.textSecondary};

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.lg};

	text-align: center;
`;

const ErrorState = styled(State)`
	color: ${({ theme }) => theme.colors.danger};
`;

// =====================================================
// DATE FORMATTER
// =====================================================

const formatDate = (value) => {
	if (!value) return "—";

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat(
		undefined,
		{
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}
	).format(date);
};

// =====================================================
// COMPONENT
// =====================================================

function AdminReports() {
	const navigate = useNavigate();

	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [filter, setFilter] = useState(
		"all"
	);

	// =====================================================
	// LOAD REPORTS
	// =====================================================

	useEffect(() => {
		const loadReports = async () => {
			setLoading(true);
			setError("");

			const token =
				localStorage.getItem("token");

			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/api/admin/dictionary-reports`,
					{
						method: "GET",

						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error(
						"Failed to load reports."
					);
				}

				const data =
					await response.json();

				setReports(
					Array.isArray(data)
						? data
						: []
				);
			} catch (err) {
				console.error(
					"ADMIN REPORTS ERROR:",
					err
				);

				setError(
					"Failed to load reports."
				);
			} finally {
				setLoading(false);
			}
		};

		loadReports();
	}, []);

	// =====================================================
	// FILTER REPORTS
	// =====================================================

	const filteredReports =
		filter === "all"
			? reports
			: reports.filter(
					(report) =>
						report.status ===
						filter
				);

	// =====================================================
	// COUNTS
	// =====================================================

	const pendingCount =
		reports.filter(
			(report) =>
				report.status === "pending"
		).length;

	const resolvedCount =
		reports.filter(
			(report) =>
				report.status === "resolved"
		).length;

	// =====================================================
	// RENDER
	// =====================================================

	return (
		<Page>
			<Header>
				<div>
					<Heading>
						Reports
					</Heading>

					<Count>
						{reports.length}{" "}
						{reports.length === 1
							? "report"
							: "reports"}
					</Count>
				</div>
			</Header>

			<Filters>
				<FilterButton
					type="button"
					active={filter === "all"}
					onClick={() =>
						setFilter("all")
					}
				>
					All
				</FilterButton>

				<FilterButton
					type="button"
					active={
						filter === "pending"
					}
					onClick={() =>
						setFilter(
							"pending"
						)
					}
				>
					Pending
					{pendingCount > 0 &&
						` (${pendingCount})`}
				</FilterButton>

				<FilterButton
					type="button"
					active={
						filter === "resolved"
					}
					onClick={() =>
						setFilter(
							"resolved"
						)
					}
				>
					Resolved
					{resolvedCount > 0 &&
						` (${resolvedCount})`}
				</FilterButton>
			</Filters>

			{loading && (
				<State>
					Loading reports...
				</State>
			)}

			{!loading && error && (
				<ErrorState>
					{error}
				</ErrorState>
			)}

			{!loading &&
				!error &&
				filteredReports.length ===
					0 && (
					<State>
						{filter === "all"
							? "No reports yet."
							: `No ${filter} reports.`}
					</State>
				)}

			{!loading &&
				!error &&
				filteredReports.length >
					0 && (
					<TableWrapper>
						<Table>
							<Thead>
								<tr>
									<Th>
										ID
									</Th>

									<Th>
										User
									</Th>

									<Th>
										Lemma
									</Th>

									<Th>
										Message
									</Th>

									<Th>
										Platform
									</Th>

									<Th>
										Status
									</Th>

									<Th>
										Created
									</Th>
								</tr>
							</Thead>

							<tbody>
								{filteredReports.map(
									(
										report
									) => (
										<Row
											key={
												report.id
											}
										>
											<Td>
												<ReportID>
													#
													{
														report.id
													}
												</ReportID>
											</Td>

											<Td>
												<Username>
													{
														report.username
													}
												</Username>
											</Td>

											<Td>
												<LemmaButton
													type="button"
													onClick={() =>
														navigate(
															`/admin/editor/${report.lemmaId}`
														)
													}
												>
													{
														report.lemma
													}
												</LemmaButton>

												<LemmaID>
													ID{" "}
													{
														report.lemmaId
													}
												</LemmaID>
											</Td>

											<Td>
												<Message>
													{
														report.message
													}
												</Message>
											</Td>

											<Td>
												<Platform>
													{
														report.platform
													}
												</Platform>
											</Td>

											<Td>
												<StatusBadge
													status={
														report.status
													}
												>
													{
														report.status
													}
												</StatusBadge>
											</Td>

											<Td>
												<DateText>
													{formatDate(
														report.createdAt
													)}
												</DateText>
											</Td>
										</Row>
									)
								)}
							</tbody>
						</Table>
					</TableWrapper>
				)}
		</Page>
	);
}

export default AdminReports;