import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { DOMParser } from '@xmldom/xmldom';

const parseXMLBooks = async (page = 1, batchSize = 100) => {
    try {
        const start = (page - 1) * batchSize;
        const fileNumbers = Array.from(
            { length: batchSize }, 
            (_, i) => start + i + 1
        );

        const booksPromises = fileNumbers.map(async (num) => {
            try {
                const response = await fetch(`/data/books/${num}.xml`);
                if (!response.ok) return null;
                
                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                
                const bookElement = xmlDoc.getElementsByTagName('book')[0];
                if (!bookElement) return null;

                return {
                    id: bookElement.getElementsByTagName('id')[0]?.textContent,
                    title: bookElement.getElementsByTagName('title')[0]?.textContent.replace(/<!\[CDATA\[|\]\]>/g, ''),
                    author: '', // Add author parsing if available
                    year: bookElement.getElementsByTagName('publication_year')[0]?.textContent,
                    description: bookElement.getElementsByTagName('description')[0]?.textContent.replace(/<!\[CDATA\[|\]\]>/g, ''),
                    rating: bookElement.getElementsByTagName('average_rating')?.[0]?.textContent || '0',
                    cover: bookElement.getElementsByTagName('image_url')[0]?.textContent,
                    isbn: bookElement.getElementsByTagName('isbn')[0]?.textContent.replace(/<!\[CDATA\[|\]\]>/g, ''),
                    publisher: bookElement.getElementsByTagName('publisher')[0]?.textContent
                };
            } catch (err) {
                console.error(`Error loading book ${num}:`, err);
                return null;
            }
        });

        const books = (await Promise.all(booksPromises)).filter(book => book !== null);
        return books;
    } catch (error) {
        console.error('Error parsing XML books:', error);
        throw error;
    }
};

export default parseXMLBooks;