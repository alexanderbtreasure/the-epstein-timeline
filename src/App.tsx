import './App.css';
import { useState, useEffect } from 'react';

interface Milestone {
  date: string;
  description: string;
  headline: string;
  img?: string;
  info?: {
    description: string;
    note: string;
    source: string;
  }[];
  sources: string[];
  tags: string[];
  type: string;
}

const imageModules = import.meta.glob<{ default: string }>(
  './assets/images/*',
  { eager: true }
);

const getImageUrl = (imageName: string): string => {
  if (!imageName) return '';
  const modulePath = `./assets/images/${imageName}`;
  return imageModules[modulePath]?.default ?? '';
};

const getProductionUrl = (url: string): string => {
  if (import.meta.env.PROD && url) {
    return url.replace('http://localhost:5173', 'https://epsteintimeline.org');
  }
  return url;
};

const localeModules: Record<string, Record<string, { default: Milestone[] }>> = {
  'en-US': import.meta.glob<{ default: Milestone[] }>(
    '../data/milestones/en-US/*.json',
    { eager: true }
  ),
};

const loadLocalizedMilestones = (): Milestone[] => {
  const browserLocale = navigator.language || 'en-US';
  console.log('Browser locale:', browserLocale);
  const locales = [browserLocale, browserLocale.split('-')[0], 'en-US'];

  for (const locale of locales) {
    const modules = localeModules[locale];
    if (!modules) continue;

    const allMilestones: Milestone[] = Object.values(modules)
      .filter(module => Array.isArray(module.default))
      .flatMap(module => module.default);

    if (allMilestones.length > 0) {
      console.log(`Loaded ${allMilestones.length} milestones for locale: ${locale}`);
      return allMilestones;
    }
  }

  console.warn('No milestones loaded');
  return [];
};

const App = () => {
  const [milestones] = useState<Milestone[]>(() => loadLocalizedMilestones());
  const [searchTag, setSearchTag] = useState<string>('');
  const [hasConsented, setHasConsented] = useState<boolean>(() => {
    // Check localStorage for previous consent
    const stored = localStorage.getItem('ageVerificationConsent');
    return stored === 'true';
  });

  const handleConsent = (consented: boolean) => {
    if (consented) {
      localStorage.setItem('ageVerificationConsent', 'true');
      setHasConsented(true);
    } else {
      // Redirect to a safe page (e.g., Google)
      window.location.href = 'https://www.google.com';
    }
  };

  // Extract all unique tags for autocomplete
  const allTags = [...new Set(milestones.flatMap(m => m.tags))].sort();

  const sorted = [...milestones].sort((a, b) => {
    const dateA = a.date || '';
    const dateB = b.date || '';
    return dateB.localeCompare(dateA);
  });

  // Filter milestones based on search tag
  const filtered = searchTag
    ? sorted.filter(milestone =>
        milestone.tags.some(tag => tag.toLowerCase().includes(searchTag.toLowerCase()))
      )
    : sorted;

  const grouped = filtered.reduce<Record<string, Milestone[]>>((acc, milestone) => {
    const year = milestone.date ? milestone.date.slice(0, 4) : 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(milestone);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  // Show consent modal if user hasn't consented
  if (!hasConsented) {
    return (
      <div className="modal modal-open">
        <div className="modal-box max-w-2xl">
          <h2 className="font-bold text-2xl mb-4">Content Warning & Age Verification</h2>
          <div className="py-4">
            <p className="mb-4">
              This website contains detailed information about sensitive topics including allegations of sexual abuse, trafficking, and other disturbing content related to the Jeffrey Epstein case.
            </p>
            <p className="mb-4">
              The timeline presented here is compiled from public court documents, news reports, and other publicly available sources. This content is intended for educational and informational purposes.
            </p>
            <p className="mb-4 font-semibold">
              By proceeding, you confirm that:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>You are 18 years of age or older</li>
              <li>You understand this content may be disturbing</li>
              <li>You wish to view this material for informational purposes</li>
            </ul>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-error text-white"
              onClick={() => handleConsent(false)}
            >
              No, Take Me Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleConsent(true)}
            >
              Yes, I Understand and Wish to Proceed
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar w-full bg-base-300 shadow-sm">
        <div className="px-4 flex-1">The Epstein Timeline</div>
        <div className="flex-none flex gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search by tag..."
              className="input input-bordered w-full max-w-xs"
              list="tags-datalist"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
            />
            <datalist id="tags-datalist">
              {allTags.map((tag) => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
          </div>
          <ThemeController />
        </div>
      </nav>
      {years.map((year) => (
        <section key={year} style={{ marginBottom: 28 }}>
          <h2 style={{ textAlign: "center" }}>{year}</h2>
          <ul className="timeline timeline-vertical" style={{ textAlign: "left" }}>
            {grouped[year].map((milestone, idx) => (
              <li key={`${milestone.date}-${idx}`} style={{ gridTemplateColumns: "10% 2% 88%" }}>
                {idx !== 0 && <hr />}
                <div className="timeline-start">{milestone.date}</div>
                <TimelineBullet />
                <div
                  className="timeline-end timeline-box card lg:card-side shadow-xl"
                  style={{ width: "95%", opacity: milestone.type === "major" ? 1 : 0.75 }}
                >
                  {milestone.img && (
                    <figure>
                      <img
                        src={getImageUrl(milestone.img)}
                        alt={milestone.headline}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </figure>
                  )}
                  <div className="card-body">
                    <h2 id={milestone.date} className="card-title">{milestone.headline}</h2>
                    <p style={{ whiteSpace: "pre-wrap" }}>{milestone.description}</p>
                    <hr />
                    <ul>
                      {milestone.info?.map((item, itemIdx) => (
                        <div key={itemIdx}>
                          <br />
                          <li>
                            {item.description}
                            <br />
                            <em>
                              <a
                                href={getProductionUrl(item.source)}
                                target={item.source && !item.source.startsWith("http://localhost") ? "_blank" : "_self"}
                                rel={item.source && !item.source.startsWith("http://localhost") ? "noopener noreferrer" : undefined}
                                style={{ whiteSpace: "pre-wrap" }}
                              >
                                {item.note}
                              </a>
                            </em>
                          </li>
                        </div>
                      ))}
                    </ul>
                    <h3>Primary sources:</h3>
                    <div className="card-actions">
                      <ul className="menu bg-base-200 rounded-box">
                        {milestone.sources?.map((source, sourceIdx) => (
                          <li key={sourceIdx}>
                            <a
                              href={getProductionUrl(source)}
                              target={source && !source.startsWith("http://localhost") ? "_blank" : "_self"}
                              rel={source && !source.startsWith("http://localhost") ? "noopener noreferrer" : undefined}
                            >
                              {getProductionUrl(source)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {idx !== grouped[year].length - 1 && <hr />}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Footer />
    </div>
  );
};

const ThemeController = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  // Set initial theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />

      {/* sun icon */}
      <svg
        className="swap-off h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path
          d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      {/* moon icon */}
      <svg
        className="swap-on h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path
          d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  );
};

const TimelineBullet = () => {
  return (
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Website copyright © 2026 <a className="link link-hover" href="https://alexanderbtreasure.github.io/" target="_blank">Alexander Treasure</a>. All images used are procured from public government sources and are therefore public domain, or are otherwise used with permission. Website code/content made available under <a className="link link-hover" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">CC BY-NC-ND</a>.
        </p>
      </aside>
    </footer>
  );
};

export default App;
