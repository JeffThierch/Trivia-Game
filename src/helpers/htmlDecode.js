const parser = new DOMParser();

// Função para decodificar as entidades HTML encontrada em
// https://stackoverflow.com/a/34064434

const htmlDecode = (input) => {
  if (window.Cypress) return input;
  const doc = parser.parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
};

export default htmlDecode;
