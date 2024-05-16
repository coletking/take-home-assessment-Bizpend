export const getRandomId = (size = 50, chars:string) => {
    const result = [];
    const possibleCharacters = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charSize = possibleCharacters.length;
  
    for (let i = 0; i < size; i++) {
      result.push(
        possibleCharacters.charAt(Math.floor(Math.random() * charSize))
      );
    }
  
    return result.join('');
  }