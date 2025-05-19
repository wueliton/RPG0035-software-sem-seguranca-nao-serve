function queryParse(query: string) {
  return query
    .replace(/'/g, "\\'") // Dobra aspas simples
    .replace(/"/g, '\\"'); // Escapa aspas duplas
}

export default queryParse;
