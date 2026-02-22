document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Header scroll background
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Animation Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Initial Hero Animation Trigger
    setTimeout(() => {
        document.querySelectorAll('.slide-up, .slide-up-delay-1, .slide-up-delay-2, .slide-up-delay-3, .slide-up-delay-4').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Smooth Scroll for Hash Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = Array.from(track.children);

    // Calculate the width to scroll
    const updateScrollAmount = () => {
        if (slides.length === 0) return 0;
        const slideWidth = slides[0].getBoundingClientRect().width;
        // gap is var(--space-lg) which is 2rem (32px typically)
        const gap = 32;
        return slideWidth + gap;
    };

    if (track && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            const scrollAmount = updateScrollAmount();
            // Wrap to start if at the end
            if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        prevBtn.addEventListener('click', () => {
            const scrollAmount = updateScrollAmount();
            // Wrap to end if at the start
            if (track.scrollLeft <= 0) {
                track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    }

    // Role Cycler
    const roles = [
        "Senior Systems Analyst",
        "Java Developer",
        "Solutionist",
        "Software Engineer"
    ];
    let roleIndex = 0;
    const roleElement = document.querySelector('.hero-role');
    const badgeRoleElement = document.getElementById('badge-role');

    if (roleElement) {
        roleElement.style.transition = 'opacity 0.3s ease-in-out';
        setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleElement.style.opacity = 0;

            if (badgeRoleElement) {
                badgeRoleElement.classList.add('glitch-anim');
            }

            setTimeout(() => {
                const newRole = roles[roleIndex];
                roleElement.textContent = newRole;
                roleElement.style.opacity = 1;

                if (badgeRoleElement) {
                    badgeRoleElement.textContent = newRole;
                    setTimeout(() => badgeRoleElement.classList.remove('glitch-anim'), 200);
                }
            }, 300);
        }, 2000);
    }

    // Terminal Mode Logic
    const terminalToggleBtn = document.getElementById('terminal-toggle-btn');
    const exitTerminalBtn = document.getElementById('exit-terminal-btn');
    const terminalMode = document.getElementById('terminal-mode');
    const guiContent = document.getElementById('gui-content');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    // Portfolio Data
    const portfolioData = {
        about: [
            "Solutions-driven Systems Analyst with over 4 years of experience in the South African financial services sector, Specializing in bridging the gap between complex business requirements and robust technical execution.",
            "Skilled in the full SDLC, from requirements gathering and clarity-driven documentation (BRS/SRS/FRS) to API design and system modernization.",
            "Proficient in BPMN, UML, and Camunda, with a proven track record of leading high-stakes decommissioning projects and designing intelligent referral engines that directly drive revenue growth."
        ],
        skills: [
            "Documentation: Business Requirements Specifications (BRS), System Requirements Specifications (SRS), Functional Requirements Specifications (FRS)",
            "Technical Stack: Java (Spring Boot), HTML, CSS, JavaScript, React, REST APIs (Swagger/OpenAPI), Git/GitHub/Bitbucket, Object Oriented Programming",
            "Analysis and Design: Business & Systems Analysis, Gap Analysis, Process Mapping, Stakeholder Management, Project Coordination",
            "Workflows & BPMN: BPMN, UML,Use Case Diagrams, User Stories and Camunda workflow automation",
            "Methodology: Agile, Scrum"
        ],
        experience: [
            '<span class="cmd-highlight-green"> Senior Systems Analyst - FNB </span>',
            '<span class="cmd-highlight-green"> August 2023 - Present </span>',
            " * High-Stakes Decommissioning - Led the technical analysis and functional sunsetting of a mission-critical legacy platform handling Mandate Registration, Collections, and Loan Fulfilment.",
            " * Intelligent Referral Engines - Provided technical analysis and design for a strategic referral workflow for credit products to optimize lead conversion for non-standard applications which directly contributed to increased sales volume by recovering previously rejected applications through optimized decisioning path.",
            " * Business-to-Tech Translation - the primary mediator between business and tech teams to resolve conflicting requirements regarding Feature vs. Stability trade-offs, ensuring decommissioning deadlines were met without compromising system integrity.",
            " * Data Migration & Gap Analysis - Conducted extensive data mapping and gap analysis to migrate complex business logic to a modern microservices architecture without operational downtime.",
            '<span class="cmd-highlight-green"> Intermediate Systems Analyst - FNB </span>',
            '<span class="cmd-highlight-green"> April 2022 - August 2023 </span>',
            " * Requirements gathering & Documentation - Translated high-level business requirements into detailed Technical Requirement Specifications (TRS) for the technical team.",
            " * Cross-Functional Collaboration - Collaborated with cross-functional teams to ensure alignment between business objectives and technical solutions.",
            " * Workflow Automation - Utilized Camunda and BPMN to map and automate internal workflows, resulting in a 15% increase in project delivery clarity.",
            " * System Design - Designed and documented systems to optimize lead generation.",
            '<span class="cmd-highlight-green"> Graduate Junior Systems Analyst - FNB </span>',
            '<span class="cmd-highlight-green"> January 2021 - April 2022 </span>',
            " * Executed a thorough competitive analysis of digital banking features, resulting in a 74% approval rating from stakeholders for proposed improvements.",
            " * Partnered with the Learning & Development team to implement a training measurement framework, improving ROI visibility and employee performance metrics by 30%.",
            '<span class="cmd-highlight-green"> Computer Science tutor - University of Kwazulu-Natal </span>',
            '<span class="cmd-highlight-green"> April 2021 - June 2021 </span>',
            " * Tutored undergraduate students in Computer Science, providing academic support and guidance.",
            " * Managed coding workshops for 50 students to reinforce object-oriented programming principles."
        ],
        projects: [
            "AI-Enhanced Budget Planner - Java, Spring Boot, OpenAI API. Automates personal finance management and categorizes transactions."
        ],
        education: [
            "Bachelor of Science in Computer Science - University of Kwazulu-Natal - class of 2021",
        ]
    };

    const toggleTerminalMode = () => {
        const headerElement = document.querySelector('.header');

        if (terminalMode.classList.contains('hidden')) {
            terminalMode.classList.remove('hidden');
            guiContent.classList.add('hidden');
            if (headerElement) headerElement.classList.add('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling in terminal mode
            terminalInput.focus();
        } else {
            terminalMode.classList.add('hidden');
            guiContent.classList.remove('hidden');
            if (headerElement) headerElement.classList.remove('hidden');
            document.body.style.overflow = '';
        }
    };

    // Initialize: The terminal the default view.
    document.body.style.overflow = 'hidden';

    if (terminalToggleBtn && exitTerminalBtn) {
        terminalToggleBtn.addEventListener('click', toggleTerminalMode);
        exitTerminalBtn.addEventListener('click', toggleTerminalMode);
    }

    // Keep focus on input when clicking terminal
    if (terminalMode) {
        terminalMode.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    const appendToTerminal = (text, className = '', animate = false) => {
        return new Promise((resolve) => {
            const line = document.createElement('div');
            if (className) line.className = `terminal-line ${className}`;
            else line.className = 'terminal-line';
            terminalOutput.appendChild(line);
            terminalMode.scrollTop = terminalMode.scrollHeight;

            if (!animate) {
                line.innerHTML = text;
                terminalMode.scrollTop = terminalMode.scrollHeight;
                resolve();
                return;
            }

            let currentHTML = "";
            let i = 0;
            terminalInput.disabled = true;

            const typeChar = () => {
                if (i < text.length) {
                    if (text[i] === '<') {
                        let tag = "";
                        while (text[i] !== '>' && i < text.length) {
                            tag += text[i];
                            i++;
                        }
                        tag += '>';
                        currentHTML += tag;
                        typeChar();
                    } else {
                        currentHTML += text[i];
                        line.innerHTML = currentHTML;
                        terminalMode.scrollTop = terminalMode.scrollHeight;
                        i++;
                        setTimeout(typeChar, 10);
                    }
                } else {
                    terminalInput.disabled = false;
                    terminalInput.focus();
                    resolve();
                }
            };
            typeChar();
        });
    };

    const processCommand = async (cmd) => {
        const command = cmd.trim().toLowerCase();
        switch (command) {
            case 'help':
                await appendToTerminal('Available commands:', '', true);
                await appendToTerminal('- <span class="cmd-highlight"> about </span> : Display profile summary', '', true);
                await appendToTerminal('- <span class="cmd-highlight"> skills </span> : Display core capabilities', '', true);
                await appendToTerminal('- <span class="cmd-highlight"> experience </span> : Display key impact and timeline', '', true);
                await appendToTerminal('- <span class="cmd-highlight"> education </span> : Display key educational background', '', true);
                await appendToTerminal('- <span class="cmd-highlight"> projects </span> : Display technical projects', '', true);
                await appendToTerminal('- <span class="cmd-highlight"> clear </span> : Clear terminal output', '', true);
                await appendToTerminal('- <span class="cmd-highlight"> gui </span> : Exit terminal and return to standard website', '', true);
                break;
            case 'about':
                for (const item of portfolioData.about) {
                    await appendToTerminal(`> ${item}`, '', true);
                }
                break;
            case 'skills':
                for (const item of portfolioData.skills) {
                    await appendToTerminal(`> ${item}`, '', true);
                }
                break;
            case 'experience':
                for (const item of portfolioData.experience) {
                    await appendToTerminal(`> ${item}`, '', true);
                }
                break;
            case 'education':
                for (const item of portfolioData.education) {
                    await appendToTerminal(`> ${item}`, '', true);
                }
                break;
            case 'projects':
                for (const item of portfolioData.projects) {
                    await appendToTerminal(`> ${item}`, '', true);
                }
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                break;
            case 'gui':
                toggleTerminalMode();
                appendToTerminal('Exiting terminal mode...', 'system-msg', false);
                break;
            case '':
                // Do nothing on empty enter
                break;
            default:
                await appendToTerminal(`Command not found: ${command}. Type <span class="cmd-highlight">help</span> for a list of commands.`, 'system-msg', true);
        }
    };

    if (terminalInput) {
        terminalInput.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && !terminalInput.disabled) {
                const cmd = terminalInput.value;
                terminalInput.value = '';
                await appendToTerminal(`<span class="prompt">C:\\visitor\\prompt:~$</span> ${cmd}`, '', false);
                await processCommand(cmd);
            }
        });
    }
});
