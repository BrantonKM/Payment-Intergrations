// csv.js
// Tiny helper to convert an array of objects to CSV string.
// fields: array of { key, label } to control order.

function escapeCell(value){
  if (value === null || value === undefined) return '';
  const s = String(value);
  if (s.includes('"') || s.includes(',') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function toCSV(rows = [], fields = []) {
  if (!Array.isArray(rows)) throw new Error('rows must be array');
  if (!fields || fields.length === 0) {
    // auto fields (keys of first row)
    const keys = rows[0] ? Object.keys(rows[0]) : [];
    fields = keys.map(k => ({ key: k, label: k }));
  }
  const header = fields.map(f => escapeCell(f.label)).join(',');
  const lines = rows.map(row => {
    return fields.map(f => escapeCell(row[f.key])).join(',');
  });
  return [header].concat(lines).join('\n');
}

module.exports = { toCSV };
