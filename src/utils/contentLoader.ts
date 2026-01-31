import yaml from "js-yaml";

export interface AboutContent {
    name: string;
    titles: string[];
    location: {
        country: string;
        city: string;
    };
    bio: {
        intro: string;
        details: string;
    };
    tools: string[];
    social: {
        github: string;
        linkedin: string;
        scholar: string;
        email: string;
    };
    image: {
        src: string;
        alt: string;
    };
}

export interface EducationDegree {
    institution: string;
    degree: string;
    field: string;
    period: string;
    grade?: string;
    logo: string;
    details: Array<{
        label: string;
        value: string;
    }>;
}

export interface EducationContent {
    degrees: EducationDegree[];
}

export interface ExperiencePosition {
    title: string;
    company: string;
    location: string;
    period: string;
    logo: string;
    responsibilities: string[];
}

export interface ExperienceContent {
    positions: ExperiencePosition[];
}

export interface Publication {
    title: string;
    url: string;
    venue: string;
    type: "journal" | "conference" | "workshop";
}

export interface PublicationsContent {
    publications: Publication[];
}

export interface ContactLink {
    type: string;
    label: string;
    url: string;
}

export interface ContactContent {
    heading: string;
    message: string;
    links: ContactLink[];
    footer: {
        text: string;
    };
}

async function fetchYaml<T>(filename: string): Promise<T> {
    const res = await fetch(`/content/${filename}`);
    if (!res.ok) {
        throw new Error(
            `Failed to load /content/${filename} (HTTP ${res.status})`,
        );
    }
    const text = await res.text();
    return yaml.load(text) as T;
}

export function loadAbout(): Promise<AboutContent> {
    return fetchYaml<AboutContent>("about.yaml");
}

export function loadEducation(): Promise<EducationContent> {
    return fetchYaml<EducationContent>("education.yaml");
}

export function loadExperience(): Promise<ExperienceContent> {
    return fetchYaml<ExperienceContent>("experience.yaml");
}

export function loadPublications(): Promise<PublicationsContent> {
    return fetchYaml<PublicationsContent>("publications.yaml");
}

export function loadContact(): Promise<ContactContent> {
    return fetchYaml<ContactContent>("contact.yaml");
}
