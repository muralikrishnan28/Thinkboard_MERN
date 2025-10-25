
export function FullDateConverstion(fullDate) {
    const dateObj = new Date(fullDate);
    const month = String(dateObj.getMonth()+1).padStart(2, '0');
    const date = String(dateObj.getDate()).padStart(2,'0');
    const year = dateObj.getFullYear();
    return `${month}/${date}/${year}`;

}
