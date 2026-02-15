// ============================================
// DIGITAL TYPEWRITER - TYPING ENGINE
// ============================================

// Global state
let characters = []; // Array of character objects: { char: "a", struck: false }
let mode = "vintage"; // Current mode: "vintage" or "minimal"

// DOM elements
const paper = document.getElementById("paper");
const modeInputs = document.querySelectorAll('input[name="mode"]');

// ============================================
// INITIALIZATION
// ============================================

// Set up event listeners when page loads
function init() {
    // Focus the paper so it can receive keyboard events
    paper.setAttribute("tabindex", "0");
    paper.focus();

    // Listen for keyboard input
    paper.addEventListener("keydown", handleKeyDown);

    // Listen for mode changes
    modeInputs.forEach(input => {
        input.addEventListener("change", handleModeChange);
    });

    // Initial render
    render();
}

// ============================================
// EVENT HANDLERS
// ============================================

// Handle mode toggle changes
function handleModeChange(event) {
    mode = event.target.value;
}

// Handle keyboard input
function handleKeyDown(event) {
    // Prevent default browser behavior for all keys
    event.preventDefault();

    const key = event.key;

    // Handle Backspace
    if (key === "Backspace") {
        handleBackspace();
        render();
        return;
    }

    // Handle Enter (new line)
    if (key === "Enter") {
        characters.push({ char: "\n", struck: false });
        render();
        return;
    }

    // Handle normal printable characters
    // Ignore special keys like Shift, Control, Alt, etc.
    if (key.length === 1) {
        characters.push({ char: key, struck: false });
        render();
        return;
    }
}

// ============================================
// BACKSPACE LOGIC
// ============================================

function handleBackspace() {
    if (characters.length === 0) {
        return; // Nothing to delete
    }

    if (mode === "vintage") {
        // Vintage mode: Mark last non-struck character as struck
        // Loop backwards to find the last non-struck character
        for (let i = characters.length - 1; i >= 0; i--) {
            if (!characters[i].struck) {
                characters[i].struck = true;
                break; // Only strike one character per backspace
            }
        }
    } else if (mode === "minimal") {
        // Minimal mode: Remove the last character from array
        characters.pop();
    }
}

// ============================================
// RENDER FUNCTION
// ============================================

function render() {
    // Clear the paper container
    paper.innerHTML = "";

    // Loop through all characters and create spans
    characters.forEach(charObj => {
        const span = document.createElement("span");
        span.className = "char";
        
        // Set text content (preserve newlines and spaces)
        span.textContent = charObj.char;
        
        // Apply struck styling if needed
        if (charObj.struck) {
            span.classList.add("struck");
        }
        
        paper.appendChild(span);
    });

    // Add blinking cursor at the end
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    paper.appendChild(cursor);
}

// ============================================
// START THE APPLICATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
