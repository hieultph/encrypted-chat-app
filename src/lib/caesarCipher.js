// Caesar cipher encryption function
export function encryptCaesar(plaintext, shift) {
    return plaintext
      .split('')
      .map(char => {
        // Check if character is a letter
        if (char.match(/[a-zA-Z]/)) {
          const base = char.charCodeAt(0) <= 90 ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        } else {
          return char;
        }
      })
      .join('');
  }
  
  // Caesar cipher decryption function
  export function decryptCaesar(ciphertext, shift) {
    return encryptCaesar(ciphertext, 26 - shift);
  }
  