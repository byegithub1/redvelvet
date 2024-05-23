'use client'

class Aes256 {
  // Define a delimiter for hex strings.
  private static readonly DELIMITER: string = process.env.NEXT_PUBLIC_CIPHER_DELIMITER!

  // Define a function to handle encryption.
  static async encrypt(message: string, sharedKey: string): Promise<string> {
    try {
      // Convert the shared key to bytes.
      const rawKeyData: ArrayBuffer = this.hexToUint8Array(sharedKey).buffer

      // Define the encryption algorithm and key type.
      const importAlgorithm: AesKeyAlgorithm = {
        name: 'AES-GCM',
        length: 256
      }
      const keyType: KeyFormat = 'raw'

      // Import the derived key.
      const importedKey: CryptoKey = await window.crypto.subtle.importKey(keyType, rawKeyData, importAlgorithm, true, [
        'encrypt',
        'decrypt'
      ])

      // Encode the client message and generate a random initialization vector (IV).
      const encoded: Uint8Array = new TextEncoder().encode(message)
      const iv: Uint8Array = window.crypto.getRandomValues(new Uint8Array(12))

      // Encrypt the message.
      const ciphertext: ArrayBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv, tagLength: 128 },
        importedKey,
        encoded
      )

      // Extract the tag from the ciphertext.
      const tag: Uint8Array = new Uint8Array(ciphertext.slice(-16))
      const ciphertextWithoutTag: Uint8Array = new Uint8Array(ciphertext.slice(0, -16))

      // Convert various data to hexadecimal strings and format the encrypted message.
      const ivHex: string = this.uint8ArrayToHex(iv)
      const ciphertextHex: string = this.uint8ArrayToHex(ciphertextWithoutTag)
      const tagHex: string = this.uint8ArrayToHex(tag)

      return `${ivHex}${this.DELIMITER}${ciphertextHex}${this.DELIMITER}${tagHex}`
    } catch (error: any) {
      throw new Error(`Encryption failed: ${error.message}`)
    }
  }

  // Define a function to handle decryption.
  static async decrypt(cipher: string, sharedKey: string): Promise<string> {
    try {
      // Convert the shared key to bytes.
      const rawKeyData: ArrayBuffer = this.hexToUint8Array(sharedKey).buffer

      // Split the cipher into IV, ciphertext, and tag.
      const [ivHex, ciphertextHex, tagHex]: string[] = cipher.split(this.DELIMITER)

      // Convert hexadecimal IV, ciphertext, and tag to Uint8Arrays.
      const iv: Uint8Array = this.hexToUint8Array(ivHex)
      const ciphertext: Uint8Array = this.hexToUint8Array(ciphertextHex)
      const tag: Uint8Array = this.hexToUint8Array(tagHex)

      // Combine ciphertext and tag
      const encryptedData: Uint8Array = new Uint8Array([...ciphertext, ...tag])

      // Define the encryption algorithm and key type.
      const importAlgorithm: AesGcmParams = {
        name: 'AES-GCM',
        iv
      }

      // Import the derived key and decrypt the message.
      const importedKey: CryptoKey = await window.crypto.subtle.importKey('raw', rawKeyData, importAlgorithm, true, [
        'encrypt',
        'decrypt'
      ])

      // Decrypt the message.
      const response: ArrayBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv, tagLength: 128 },
        importedKey,
        encryptedData
      )

      // Convert the response data to a string.
      return new TextDecoder().decode(response)
    } catch (error: any) {
      throw new Error(`Decryption failed: ${error.message}`)
    }
  }

  // Utility function to convert hexadecimal string to Uint8Array.
  private static hexToUint8Array(hex: string): Uint8Array {
    return new Uint8Array(hex.match(/[\da-f]{2}/gi)!.map((hex) => parseInt(hex, 16)))
  }

  // Utility function to convert Uint8Array to hexadecimal string.
  private static uint8ArrayToHex(uint8Array: Uint8Array): string {
    return Array.from(uint8Array, (byte) => byte.toString(16).padStart(2, '0')).join('')
  }
}

export default Aes256
