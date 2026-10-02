(() => {
	const initializeReveals = () => {
		const sections = document.querySelectorAll(
			'.main > div:not(footer), .sidebar .wrapper > div'
		);

		if (!sections.length) return;

		document.documentElement.classList.add('js-enabled');

		const revealAll = () => {
			sections.forEach((section) => section.classList.add('is-visible'));
		};

		if (
			window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
			!('IntersectionObserver' in window)
		) {
			revealAll();
			return;
		}

		const observer = new IntersectionObserver(
			(entries, currentObserver) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					entry.target.classList.add('is-visible');
					currentObserver.unobserve(entry.target);
				});
			},
			{ rootMargin: '0px 0px -36px 0px', threshold: 0.12 }
		);

		sections.forEach((section) => observer.observe(section));
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeReveals, { once: true });
	} else {
		initializeReveals();
	}
})();