import data from "../assets/words.json";

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  if (hash < 0) return hash * -1;
  return hash;
}

export function getWordForToday() {
  const wordList = data.words;
  const numWords = wordList.length;
  const today = new Date().toDateString();

  return wordList[hashCode(today) % numWords];
}
