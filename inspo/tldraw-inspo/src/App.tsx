import { Tldraw, type Editor } from 'tldraw'
import { seedBoard } from './seedBoard'

function App() {
	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw
				persistenceKey="dispatch-board-v1"
				onMount={(editor: Editor) => {
					seedBoard(editor)
					// Expose editor on window so Chrome DevTools MCP (evaluate_script) can drive
					// the board from outside the React tree. Also a console helper for reseeding.
					const w = window as unknown as { editor?: Editor; __reseed?: () => void }
					w.editor = editor
					w.__reseed = () => {
						const ids = editor.getCurrentPageShapeIds()
						editor.deleteShapes([...ids])
						seedBoard(editor)
					}
				}}
			/>
		</div>
	)
}

export default App
