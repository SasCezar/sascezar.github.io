import { useState, useEffect } from "react";
import {
    Menu,
    X,
    Github,
    Linkedin,
    Mail,
    GraduationCap,
    ArrowUp,
    Award,
    BookOpen,
} from "lucide-react";

import { TypewriterText } from "./components/TypewriterText";

import {
    loadAbout,
    loadEducation,
    loadExperience,
    loadPublications,
    loadContact,
    type AboutContent,
    type EducationContent,
    type ExperienceContent,
    type PublicationsContent,
    type ContactContent,
} from "./utils/contentLoader";

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const [content, setContent] = useState<{
        about: AboutContent | null;
        education: EducationContent | null;
        experience: ExperienceContent | null;
        publications: PublicationsContent | null;
        contact: ContactContent | null;
    }>({
        about: null,
        education: null,
        experience: null,
        publications: null,
        contact: null,
    });

    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const [about, education, experience, publications, contact] =
                    await Promise.all([
                        loadAbout(),
                        loadEducation(),
                        loadExperience(),
                        loadPublications(),
                        loadContact(),
                    ]);

                if (!cancelled) {
                    setContent({
                        about,
                        education,
                        experience,
                        publications,
                        contact,
                    });
                }
            } catch (error) {
                console.error("Error loading content:", error);
                if (!cancelled) {
                    setLoadError(
                        error instanceof Error
                            ? error.message
                            : "Failed to load content",
                    );
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progress =
                totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(progress);
            setShowBackToTop(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loadError) {
        return (
            <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center px-6">
                <div className="max-w-md text-center space-y-4">
                    <h1 className="text-2xl font-bold text-red-600">
                        Error Loading Content
                    </h1>
                    <p className="text-neutral-700">{loadError}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-cyan-600 text-white rounded-sm hover:bg-cyan-700 transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        );
    }

    if (
        !content.about ||
        !content.education ||
        !content.experience ||
        !content.publications ||
        !content.contact
    ) {
        return (
            <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-neutral-700 font-medium">
                        Loading content...
                    </p>
                </div>
            </div>
        );
    }

    const { about, education, experience, publications, contact } = content;

    return (
        <div className="min-h-screen bg-[#f5f3ef]">
            {/* Scroll progress bar */}
            <div className="fixed top-0 w-full h-1 bg-neutral-200 z-50">
                <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-1 w-full bg-[#f5f3ef]/95 backdrop-blur-md z-50 border-b border-neutral-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-20">
                        <div className="text-2xl font-light tracking-wide text-neutral-900">
                            {about.name.split(" ")[0]}{" "}
                            <span className="font-semibold">
                                {about.name.split(" ")[1]}
                            </span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a
                                href="#home"
                                className="text-neutral-700 hover:text-cyan-600 transition-all text-sm font-medium relative group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a
                                href="#about"
                                className="text-neutral-700 hover:text-cyan-600 transition-all text-sm font-medium relative group"
                            >
                                About me
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a
                                href="#experience"
                                className="text-neutral-700 hover:text-cyan-600 transition-all text-sm font-medium relative group"
                            >
                                Experience
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a
                                href="#education"
                                className="text-neutral-700 hover:text-cyan-600 transition-all text-sm font-medium relative group"
                            >
                                Education
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a
                                href="#portfolio"
                                className="text-neutral-700 hover:text-cyan-600 transition-all text-sm font-medium relative group"
                            >
                                Portfolio
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a
                                href="#contact"
                                className="text-neutral-700 hover:text-cyan-600 transition-all text-sm font-medium relative group"
                            >
                                Contact Me
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </div>

                        <button
                            className="md:hidden text-neutral-900"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-[#f5f3ef] border-t border-neutral-200">
                        <div className="px-6 py-4 space-y-3">
                            <a
                                href="#home"
                                onClick={closeMenu}
                                className="block text-neutral-700 hover:text-cyan-600 text-sm font-medium"
                            >
                                Home
                            </a>
                            <a
                                href="#about"
                                onClick={closeMenu}
                                className="block text-neutral-700 hover:text-cyan-600 text-sm font-medium"
                            >
                                About me
                            </a>
                            <a
                                href="#experience"
                                onClick={closeMenu}
                                className="block text-neutral-700 hover:text-cyan-600 text-sm font-medium"
                            >
                                Experience
                            </a>
                            <a
                                href="#education"
                                onClick={closeMenu}
                                className="block text-neutral-700 hover:text-cyan-600 text-sm font-medium"
                            >
                                Education
                            </a>
                            <a
                                href="#portfolio"
                                onClick={closeMenu}
                                className="block text-neutral-700 hover:text-cyan-600 text-sm font-medium"
                            >
                                Portfolio
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMenu}
                                className="block text-neutral-700 hover:text-cyan-600 text-sm font-medium"
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* HOME */}
            <section
                id="home"
                className="min-h-screen flex items-center relative overflow-hidden pt-20 max-[480px]:pt-[80px] pb-12 lg:pb-16"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-stone-100"></div>

                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 40%),
                           radial-gradient(circle at 80% 70%, rgba(0,0,0,0.03) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 0%, transparent 60%)`,
                    }}
                ></div>

                <div
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)`,
                        backgroundSize: "50px 50px",
                    }}
                ></div>

                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `radial-gradient(ellipse at 40% 40%, transparent 30%, rgba(0,0,0,0.02) 31%, transparent 32%),
                           radial-gradient(ellipse at 65% 55%, transparent 25%, rgba(0,0,0,0.015) 26%, transparent 27%),
                           radial-gradient(ellipse at 30% 70%, transparent 20%, rgba(0,0,0,0.02) 21%, transparent 22%)`,
                        backgroundSize: "200px 200px",
                    }}
                ></div>

                <div
                    className="absolute inset-0"
                    style={{
                        boxShadow:
                            "inset 0 20px 60px rgba(0,0,0,0.03), inset 0 -20px 60px rgba(255,255,255,0.5)",
                    }}
                ></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-[480px]:gap-8">
                        <div className="space-y-6 relative z-10 max-[480px]:space-y-4 lg:order-1 order-2">
                            <div className="space-y-2">
                                <p className="text-xs sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-neutral-700 uppercase font-semibold text-center sm:text-left">
                                    Welcome to my website
                                </p>
                                <h1 className="text-[23px] leading-[1.3] xs:text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 text-center sm:text-left">
                                    Hi, I'm {about.name.split(" ")[0]}
                                    <br className="hidden sm:block" />
                                    <span className="text-neutral-700 block sm:inline">
                                        I'm a{" "}
                                        <TypewriterText titles={about.titles} />
                                    </span>
                                </h1>
                            </div>

                            <div className="flex items-center gap-3 text-xs sm:text-sm justify-center sm:justify-start">
                                <div className="flex flex-col text-center sm:text-left">
                                    <span className="font-semibold text-neutral-900">
                                        {about.location.country}
                                    </span>
                                    <span className="text-neutral-600">
                                        {about.location.city}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4 flex-wrap justify-center sm:justify-start max-[480px]:pt-2">
                                <a
                                    href="#experience"
                                    className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-sm"
                                >
                                    View Resume
                                </a>
                                <a
                                    href="#contact"
                                    className="inline-block border-2 border-cyan-600 text-cyan-700 px-6 sm:px-8 py-3 text-xs sm:text-sm font-medium hover:bg-cyan-50 hover:scale-105 transition-all duration-300 rounded-sm"
                                >
                                    Contact Me
                                </a>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center lg:order-2 order-1">
                            <div className="relative w-full max-w-[500px] aspect-square">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-[5px] border-slate-300/70 shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                                        <img
                                            src={about.image.src}
                                            alt={about.image.alt}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-40">
                    <a
                        href={about.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-cyan-600 hover:scale-125 transition-all duration-300"
                        aria-label="GitHub Profile"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={about.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-cyan-600 hover:scale-125 transition-all duration-300"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href={about.social.scholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-cyan-600 hover:scale-125 transition-all duration-300"
                        aria-label="Google Scholar Profile"
                    >
                        <GraduationCap size={20} />
                    </a>
                    <div className="w-px h-20 bg-gradient-to-b from-cyan-400 to-blue-600 mx-auto"></div>
                </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-neutral-900">
                                About Me
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                        </div>

                        <div className="space-y-6 text-neutral-700 leading-relaxed">
                            <p className="text-lg">{about.bio.intro}</p>
                            <p>{about.bio.details}</p>

                            <div className="pt-6">
                                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                                    Tools & Frameworks
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {about.tools.map((tech, index) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-900 text-sm font-medium border border-cyan-200 hover:border-cyan-400 hover:shadow-md hover:scale-105 transition-all duration-300 rounded-sm cursor-default"
                                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="py-24 bg-[#f5f3ef]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-neutral-900">
                                Experience
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                        </div>

                        <div className="space-y-12">
                            {experience.positions.map((position, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 border border-neutral-200 hover:border-cyan-300 hover:shadow-xl transition-all duration-300 rounded-sm group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                        <div className="flex items-start gap-4 pl-0 group-hover:pl-2 transition-all duration-300 flex-1">
                                            <img
                                                src={position.logo}
                                                alt={`${position.company} Logo`}
                                                className="w-16 h-16 object-contain rounded-sm"
                                                loading="lazy"
                                            />
                                            <div>
                                                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-cyan-700 transition-colors">
                                                    {position.title}
                                                </h3>
                                                <p className="text-neutral-600 font-medium">
                                                    {position.company}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-neutral-500 flex-shrink-0">
                                            {position.period}
                                        </p>
                                    </div>

                                    <p className="text-neutral-700 leading-relaxed mb-4">
                                        {position.location}
                                    </p>

                                    <ul className="space-y-2 text-neutral-700">
                                        {position.responsibilities.map(
                                            (responsibility, respIndex) => (
                                                <li
                                                    key={respIndex}
                                                    className="flex gap-3"
                                                >
                                                    <span className="text-cyan-500 mt-2">
                                                        •
                                                    </span>
                                                    <span>
                                                        {responsibility}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EDUCATION */}
            <section id="education" className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-neutral-900">
                                Education
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                        </div>

                        <div className="space-y-8">
                            {education.degrees.map((degree, index) => (
                                <div
                                    key={index}
                                    className="bg-[#f5f3ef] p-8 border border-neutral-200 hover:border-cyan-300 hover:shadow-xl transition-all duration-300 rounded-sm group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                                    <div className="flex items-start gap-4 pl-0 group-hover:pl-2 transition-all duration-300 mb-4">
                                        <img
                                            src={degree.logo}
                                            alt={`${degree.institution} Logo`}
                                            className="w-16 h-16 object-contain rounded-sm flex-shrink-0"
                                            loading="lazy"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-cyan-700 transition-colors">
                                                {degree.degree}
                                            </h3>
                                            <p className="text-neutral-600 font-medium">
                                                {degree.institution}
                                            </p>
                                            <p className="text-neutral-500 text-sm">
                                                {degree.field} • {degree.period}
                                                {degree.grade
                                                    ? ` • Grade: ${degree.grade}`
                                                    : ""}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-neutral-700">
                                        {degree.details.map(
                                            (detail, detailIndex) => (
                                                <p
                                                    key={detailIndex}
                                                    className="text-sm"
                                                >
                                                    <span className="font-semibold text-cyan-700">
                                                        {detail.label}:
                                                    </span>{" "}
                                                    {detail.value}
                                                </p>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PUBLICATIONS */}
            <section id="portfolio" className="py-24 bg-[#f5f3ef]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-neutral-900">
                                Publications
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {publications.publications.map((pub, index) => (
                                <a
                                    key={index}
                                    href={pub.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-white p-6 border border-[#E5E5E5] hover:border-cyan-400 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] group rounded-sm"
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        {pub.type === "journal" ? (
                                            <Award
                                                className="text-cyan-600 flex-shrink-0 mt-1"
                                                size={18}
                                            />
                                        ) : (
                                            <BookOpen
                                                className="text-blue-600 flex-shrink-0 mt-1"
                                                size={18}
                                            />
                                        )}

                                        <div className="flex-1">
                                            <p className="text-neutral-800 font-semibold leading-relaxed group-hover:text-cyan-700 transition-colors mb-2">
                                                {pub.title}
                                            </p>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${
                                                        pub.type === "journal"
                                                            ? "bg-cyan-100 text-cyan-700"
                                                            : pub.type ===
                                                                "conference"
                                                              ? "bg-blue-100 text-blue-700"
                                                              : "bg-teal-100 text-teal-700"
                                                    }`}
                                                >
                                                    {pub.type}
                                                </span>
                                                <p className="text-neutral-500 text-xs">
                                                    {pub.venue}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-cyan-600 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                        View Publication
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            →
                                        </span>
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section
                id="contact"
                className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-cyan-950 text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                </div>

                <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold">
                                {contact.heading}
                            </h2>
                            <p className="text-neutral-300 leading-relaxed text-lg">
                                {contact.message}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            {contact.links.map((link, index) => {
                                const IconComponent =
                                    link.type === "email"
                                        ? Mail
                                        : link.type === "github"
                                          ? Github
                                          : link.type === "linkedin"
                                            ? Linkedin
                                            : GraduationCap;

                                return (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target={
                                            link.type !== "email"
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            link.type !== "email"
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-sm transition-all duration-300 hover:scale-105 group"
                                    >
                                        <IconComponent
                                            size={20}
                                            className="text-cyan-400 group-hover:scale-110 transition-transform"
                                        />
                                        <span className="text-neutral-300 group-hover:text-cyan-400 transition-colors">
                                            {link.label}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-black text-neutral-400 py-8">
                <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center text-sm">
                    <p>{contact.footer.text}</p>
                </div>
            </footer>

            {/* BACK TO TOP */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-40"
                    aria-label="Back to top"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </div>
    );
}

export default App;
