import styled from "styled-components";

const TableWrapper = styled.div`
	width: 100%;
	overflow-x: auto;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const Cell = styled.td`
	padding: ${({ theme }) => theme.spacing.sm};

	border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Input = styled.input`
	width: 100%;
	box-sizing: border-box;

	padding: ${({ theme }) => theme.spacing.sm};

	background: transparent;
	color: ${({ theme }) => theme.colors.text};

	border: none;

	font-family: ${({ theme }) => theme.fonts.body};
	font-size: ${({ theme }) => theme.fontSizes.md};

	&:focus {
		outline: none;
		background: ${({ theme }) =>
			theme.colors.background};
	}
`;

const ButtonRow = styled.div`
	display: flex;
	flex-wrap: wrap;

	gap: ${({ theme }) => theme.spacing.sm};

	margin-top: ${({ theme }) => theme.spacing.md};
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
		background: ${({ theme }) =>
			theme.colors.danger};
	}
`;

function TableBlockEditor({
	block,
	onChange,
}) {
	const columns = block.columns || [];
	const rows = block.rows || [];

	const updateColumn = (
		columnIndex,
		value
	) => {
		const updatedColumns =
			columns.map(
				(column, index) =>
					index === columnIndex
						? value
						: column
			);

		onChange({
			columns: updatedColumns,
		});
	};

	const updateCell = (
		rowIndex,
		columnIndex,
		value
	) => {
		const updatedRows = rows.map(
			(row, currentRowIndex) =>
				currentRowIndex ===
				rowIndex
					? row.map(
							(
								cell,
								currentColumnIndex
							) =>
								currentColumnIndex ===
								columnIndex
									? value
									: cell
						)
					: row
		);

		onChange({
			rows: updatedRows,
		});
	};

	const addColumn = () => {
		onChange({
			columns: [
				...columns,
				"",
			],
			rows: rows.map((row) => [
				...row,
				"",
			]),
		});
	};

	const deleteColumn = () => {
		if (columns.length <= 1) {
			return;
		}

		onChange({
			columns: columns.slice(0, -1),
			rows: rows.map((row) =>
				row.slice(0, -1)
			),
		});
	};

	const addRow = () => {
		onChange({
			rows: [
				...rows,
				columns.map(() => ""),
			],
		});
	};

	const deleteRow = () => {
		if (rows.length <= 1) {
			return;
		}

		onChange({
			rows: rows.slice(0, -1),
		});
	};

	return (
		<>
			<TableWrapper>
				<Table>
					<thead>
						<tr>
							{columns.map(
								(
									column,
									columnIndex
								) => (
									<Cell
										as="th"
										key={
											columnIndex
										}
									>
										<Input
											value={
												column
											}
											onChange={(
												e
											) =>
												updateColumn(
													columnIndex,
													e
														.target
														.value
												)
											}
											placeholder={`Column ${
												columnIndex +
												1
											}`}
										/>
									</Cell>
								)
							)}
						</tr>
					</thead>

					<tbody>
						{rows.map(
							(
								row,
								rowIndex
							) => (
								<tr
									key={
										rowIndex
									}
								>
									{columns.map(
										(
											_,
											columnIndex
										) => (
											<Cell
												key={
													columnIndex
												}
											>
												<Input
													value={
														row[
															columnIndex
														] ||
														""
													}
													onChange={(
														e
													) =>
														updateCell(
															rowIndex,
															columnIndex,
															e
																.target
																.value
														)
													}
												/>
											</Cell>
										)
									)}
								</tr>
							)
						)}
					</tbody>
				</Table>
			</TableWrapper>

			<ButtonRow>
				<Button
					type="button"
					onClick={
						addColumn
					}
				>
					Add Column
				</Button>

				<Button
					type="button"
					onClick={
						deleteColumn
					}
					disabled={
						columns.length <=
						1
					}
				>
					Delete Column
				</Button>

				<Button
					type="button"
					onClick={addRow}
				>
					Add Row
				</Button>

				<Button
					type="button"
					onClick={
						deleteRow
					}
					disabled={
						rows.length <= 1
					}
				>
					Delete Row
				</Button>
			</ButtonRow>
		</>
	);
}

export default TableBlockEditor;