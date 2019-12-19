/// <reference types="react-scripts" />

interface Resource {
    articles: Article[];
    videos: Video[];
    blogposts: Blogpost[];
    books: Book[];
}

interface Video {
    url: string;
    author: string;
    title: string;
    id: number;
    comment: string;
    relatedCourses: string[];
}

interface Blogpost {
    id: number;
    author: string;
    title: string;
    url: string;
    tagit: string[];
    relatedCourses: string[];
}

interface Article {
    id: number;
    author: string;
    title: string;
    date: string;
    publisher: string;
    localDate: string;
    tagit: string[];
    related: string[];
}

interface Book {
    id: number;
    author: string;
    title: string;
    isbn: string;
    tagit: string[];
    related: string[];
    year: number;
}
