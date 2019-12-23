/// <reference types="react-scripts" />

interface Resource {
    articles: Article[];
    videos: Video[];
    blogposts: Blogpost;
    books: Book[];
}

interface Video {
    url: string;
    author: string;
    title: string;
    id: number;
    comment: string;
    related: string;
}

interface Blogpost {
    id: number;
    author: string;
    title: string;
    url: string;
    tags: string;
    related: string;
}

interface Article {
    id: number;
    author: string;
    title: string;
    date: string;
    publisher: string;
    tags: string;
    related: string;
}

interface Book {
    id: number;
    author: string;
    title: string;
    isbn: string;
    tags: string;
    related: string;
    year: number;
}
