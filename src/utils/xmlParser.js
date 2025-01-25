const parseXMLBooks = async (page = 1, batchSize = 100) => {
    try {
        console.log(`Loading page ${page}, batch size ${batchSize}`);
        const start = (page - 1) * batchSize;
        const fileNumbers = Array.from(
            { length: batchSize }, 
            (_, i) => start + i + 1
        );

        const booksPromises = fileNumbers.map(async (num) => {
            try {
                console.log(`Fetching book ${num}.xml`);
                const response = await fetch(`/data/books/${num}.xml`);
                
                if (!response.ok) {
                    console.warn(`Book ${num}.xml not found: ${response.status}`);
                    return null;
                }
                
                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                
                const bookElement = xmlDoc.getElementsByTagName('book')[0];
                if (!bookElement) {
                    console.warn(`No book element in ${num}.xml`);
                    return null;
                }

                const book = {
                    id: bookElement.getElementsByTagName('id')[0]?.textContent,
                    title: bookElement.getElementsByTagName('title')[0]?.textContent.replace(/<!\[CDATA\[|\]\]>/g, ''),
                    isbn: bookElement.getElementsByTagName('isbn')[0]?.textContent.replace(/<!\[CDATA\[|\]\]>/g, ''),
                    year: bookElement.getElementsByTagName('publication_year')[0]?.textContent,
                    publisher: bookElement.getElementsByTagName('publisher')[0]?.textContent,
                    description: bookElement.getElementsByTagName('description')[0]?.textContent
                        .replace(/<!\[CDATA\[|\]\]>/g, '')
                        .replace(/<br \/>--scholastic\.com$/, ''),
                    cover: bookElement.getElementsByTagName('image_url')[0]?.textContent,
                    language: bookElement.getElementsByTagName('language_code')[0]?.textContent
                };

                console.log(`Successfully loaded book ${num}`);
                return book;
            } catch (err) {
                console.error(`Error loading book ${num}:`, err);
                return null;
            }
        });

        const books = (await Promise.all(booksPromises)).filter(book => book !== null);
        console.log(`Total books loaded: ${books.length}`);
        
        if (books.length === 0) {
            throw new Error('No books loaded. Check file paths and XML structure.');
        }

        return books;
    } catch (error) {
        console.error('Error parsing XML books:', error);
        throw error;
    }
};

export default parseXMLBooks;