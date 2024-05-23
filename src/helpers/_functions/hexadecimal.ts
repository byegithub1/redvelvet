'use client'

const hexDump = (hash: string): string | false => {
  try {
    const buffer: Uint8Array = new Uint8Array(hash.match(/[\da-f]{2}/gi)!.map((hex: string) => parseInt(hex, 16)))
    const formattedHex: string[] = []

    for (let i = 0; i < buffer.length; i += 16) {
      const chunk = buffer.slice(i, i + 16)
      const hexStr = Array.from(chunk, (byte) => byte.toString(16).padStart(2, '0')).join(' ')
      const printableChars = Array.from(chunk, (byte) =>
        byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.'
      ).join('')
      const line = `${i.toString(16).padStart(4, '0')}: ${hexStr.padEnd(48)}  ${printableChars}\n`
      formattedHex.push(line)
    }

    return formattedHex.join('')
  } catch (error) {
    return false
  }
}

const reverseHexDump = (dump: string): string | false => {
  try {
    const lines: string[] = dump.split('\n').filter(Boolean)
    const separateValues = (str: string) => str.match(/[\da-f]{2}/gi)!.join(' ')
    const hex: string = lines
      .map((line: string) => {
        const parts = line.split(':')
        const hexValue = parts[1].trim()
        const index = hexValue.indexOf('  ')
        const valueToProcess = index !== -1 ? hexValue.slice(0, index) : hexValue

        return separateValues(valueToProcess)
      })
      .join('\n')
      .replace(/\n/g, '')
      .replace(/\s/g, '')

    return hex
  } catch (error) {
    return false
  }
}

const hexToBytes = (hex: string): number[] => {
  const bytes: number[] = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16))
  }
  return bytes
}

const hexToUint8Array = (hex: string): Uint8Array => {
  const byteArray = hexToBytes(hex)
  return new Uint8Array(byteArray)
}

export { hexDump, reverseHexDump, hexToBytes, hexToUint8Array }
