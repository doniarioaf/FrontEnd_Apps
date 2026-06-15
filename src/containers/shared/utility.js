export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

/**
 * @param {number} a         - Angka pertama
 * @param {string} op        - Operator: '+' | '-' | '*' | '/'
 * @param {number} b         - Angka kedua
 * @param {Object} [options]
 * @param {number} [options.decimals]         - Jumlah digit desimal output
 * @param {'round'|'floor'|'ceil'|'truncate'} [options.rounding='round']
 *   round    → pembulatan normal  (4.5 → 5,  4.4 → 4)
 *   ceil     → selalu ke atas     (4.1 → 5)
 *   floor    → selalu ke bawah    (4.9 → 4)
 *   truncate → potong saja        (10.2192, decimals:1 → 10.2)
 * 
 * // ── Tanpa opsi → hasil penuh, bebas floating error ──────────
    calc(1.7,  '+', 1.1)                              // → 2.8
    calc(10,   '/', 3)                               // → 3.3333333333

    // ── truncate: potong saja, tidak dibulatkan ──────────────────
    calc(10.2192, '+', 0, { decimals: 1, rounding: 'truncate' })  // → 10.2
    calc(4.999,  '+', 0, { decimals: 2, rounding: 'truncate' })  // → 4.99
    calc(10,     '/', 3, { decimals: 2, rounding: 'truncate' })  // → 3.33

    // ── round: pembulatan normal ─────────────────────────────────
    calc(1.7, '+', 1.15, { decimals: 1, rounding: 'round' })     // → 2.9
    calc(10,  '/', 3,    { decimals: 2, rounding: 'round' })     // → 3.33

    // ── ceil: selalu ke atas ─────────────────────────────────────
    calc(4.01, '+', 0, { decimals: 0, rounding: 'ceil' })        // → 5
    calc(10,   '/', 3, { decimals: 1, rounding: 'ceil' })        // → 3.4

    // ── floor: selalu ke bawah ───────────────────────────────────
    calc(4.99, '+', 0, { decimals: 0, rounding: 'floor' })       // → 4
    calc(10,   '/', 3, { decimals: 1, rounding: 'floor' })       // → 3.3
 */
export const calcUtility = (a, op, b, options = {}) => {
  const { decimals, rounding = 'round' } = options;
  const precision = 10;
  const f = Math.pow(10, precision);

  const ia = Math.round(a * f);
  const ib = Math.round(b * f);

  let result;
  switch (op) {
    case '+': result = (ia + ib) / f; break;
    case '-': result = (ia - ib) / f; break;
    case '*': result = (ia * ib) / (f * f); break;
    case '/':
      if (ib === 0) throw new Error('Tidak bisa dibagi 0');
      result = ia / ib; break;
    default: throw new Error(`Operator tidak dikenal: ${op}`);
  }

  // Bersihkan floating noise dulu sebelum apply rounding
  result = Math.round(result * f) / f;

  // Jika decimals tidak diset, kembalikan as-is
  if (decimals === undefined) return result;

  const d = Math.pow(10, decimals);
  switch (rounding) {
    case 'round'   : return Math.round(result * d) / d;
    case 'ceil'    : return Math.ceil (result * d) / d;
    case 'floor'   : return Math.floor(result * d) / d;
    case 'truncate': return Math.trunc(result * d) / d;
    default: throw new Error(`Rounding tidak dikenal: ${rounding}`);
  }
}