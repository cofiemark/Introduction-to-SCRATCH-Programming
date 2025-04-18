// Interactive elements for Scratch Programming Course Website

document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Initialize collapsible sections
    initCollapsibleSections();
    
    // Initialize code block highlighting
    initCodeBlocks();
    
    // Initialize quiz elements
    initQuizzes();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize tooltips for Scratch blocks
    initBlockTooltips();
});

// Function to highlight the current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.style.backgroundColor = '#4D97FF';
            link.style.fontWeight = 'bold';
        }
    });
}

// Function to initialize collapsible sections
function initCollapsibleSections() {
    // Add collapsible functionality to sections with class 'collapsible'
    const collapsibles = document.querySelectorAll('.collapsible-header');
    
    collapsibles.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Toggle the content visibility
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// Function to enhance code blocks with copy functionality
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.block-container');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        
        // Add copy functionality
        copyButton.addEventListener('click', function() {
            const codeText = block.textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                // Change button text temporarily
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            });
        });
        
        // Add button to code block
        block.appendChild(copyButton);
    });
}

// Function to initialize interactive quizzes
function initQuizzes() {
    const quizzes = document.querySelectorAll('.quiz-container');
    
    quizzes.forEach(quiz => {
        const questions = quiz.querySelectorAll('.quiz-question');
        const submitButton = quiz.querySelector('.quiz-submit');
        
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                let score = 0;
                let totalQuestions = questions.length;
                
                questions.forEach(question => {
                    const options = question.querySelectorAll('input[type="radio"]');
                    const correctOption = question.querySelector('input[data-correct="true"]');
                    const feedback = question.querySelector('.question-feedback');
                    
                    let answered = false;
                    options.forEach(option => {
                        if (option.checked) {
                            answered = true;
                            if (option === correctOption) {
                                score++;
                                feedback.textContent = "Correct!";
                                feedback.className = "question-feedback correct";
                            } else {
                                feedback.textContent = "Incorrect. Try again!";
                                feedback.className = "question-feedback incorrect";
                            }
                            feedback.style.display = "block";
                        }
                    });
                    
                    if (!answered && feedback) {
                        feedback.textContent = "Please select an answer.";
                        feedback.className = "question-feedback";
                        feedback.style.display = "block";
                    }
                });
                
                const resultDisplay = quiz.querySelector('.quiz-result');
                if (resultDisplay) {
                    resultDisplay.textContent = `Your score: ${score}/${totalQuestions}`;
                    resultDisplay.style.display = "block";
                }
            });
        }
    });
}

// Function to initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to add tooltips to Scratch blocks
function initBlockTooltips() {
    const blocks = document.querySelectorAll('.motion-block, .looks-block, .sound-block, .events-block, .control-block, .sensing-block, .operators-block, .variables-block, .my-blocks-block');
    
    blocks.forEach(block => {
        // Get the block category from its class
        const classes = block.className.split(' ');
        let category = '';
        
        for (const cls of classes) {
            if (cls.endsWith('-block')) {
                category = cls.replace('-block', '');
                break;
            }
        }
        
        // Create tooltip with category information
        const tooltip = document.createElement('div');
        tooltip.className = 'block-tooltip';
        tooltip.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Block`;
        
        // Add tooltip to block
        block.appendChild(tooltip);
        
        // Show tooltip on hover
        block.addEventListener('mouseenter', function() {
            tooltip.style.display = 'block';
        });
        
        block.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });
}

// Function to create interactive demonstrations
function createInteractiveDemos() {
    const demoContainers = document.querySelectorAll('.interactive-demo');
    
    demoContainers.forEach(container => {
        const demoType = container.getAttribute('data-demo-type');
        
        switch(demoType) {
            case 'loop':
                createLoopDemo(container);
                break;
            case 'conditional':
                createConditionalDemo(container);
                break;
            case 'variables':
                createVariablesDemo(container);
                break;
            // Add more demo types as needed
        }
    });
}

// Example of a specific demo creation function
function createLoopDemo(container) {
    // Create loop demonstration UI
    const controls = document.createElement('div');
    controls.className = 'demo-controls';
    
    const iterationInput = document.createElement('input');
    iterationInput.type = 'range';
    iterationInput.min = '1';
    iterationInput.max = '10';
    iterationInput.value = '4';
    
    const runButton = document.createElement('button');
    runButton.className = 'button';
    runButton.textContent = 'Run Loop';
    
    const output = document.createElement('div');
    output.className = 'demo-output';
    
    controls.appendChild(document.createTextNode('Iterations: '));
    controls.appendChild(iterationInput);
    controls.appendChild(runButton);
    
    container.appendChild(controls);
    container.appendChild(output);
    
    // Add functionality
    runButton.addEventListener('click', function() {
        const iterations = parseInt(iterationInput.value);
        output.innerHTML = '';
        
        for (let i = 0; i < iterations; i++) {
            setTimeout(() => {
                const step = document.createElement('div');
                step.textContent = `Loop iteration ${i + 1}`;
                step.className = 'demo-step';
                output.appendChild(step);
            }, i * 500);
        }
    });
}
