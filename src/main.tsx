import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global pointer tracking for ambient gradient (rAF throttled)
let rafId: number | null = null;
let pendingX = 0;
let pendingY = 0;
const updateVars = () => {
	document.documentElement.style.setProperty('--gmx', pendingX + 'px');
	document.documentElement.style.setProperty('--gmy', pendingY + 'px');
	rafId = null;
};
window.addEventListener('pointermove', (e) => {
	pendingX = e.clientX;
	pendingY = e.clientY;
	if (rafId == null) {
		rafId = requestAnimationFrame(updateVars);
	}
});

createRoot(document.getElementById("root")!).render(<App />);
