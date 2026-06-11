import React, { useState, useCallback } from 'react';
import { Input } from 'reactstrap';

/**
 * Mengubah nilai number ke format currency Indonesia
 * Contoh: 1500000.5 => "1.500.000,50"
 */
const formatToDisplay = (value, decimalPlaces = 2) => {
  if (value === '' || value === null || value === undefined) return '';

  const str = String(value);
  const [intPart, decPart] = str.split('.');

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (decPart !== undefined) {
    return `${formattedInt},${decPart}`;
  }

  return formattedInt;
};

/**
 * InputAmount - Global component untuk input nilai uang/amount
 *
 * Props khusus InputAmount:
 * @param {number|string} value          - Nilai numerik murni (tanpa format)
 * @param {function}      onChange        - Callback (rawValue: string) => void
 * @param {number}        decimalPlaces   - Jumlah digit desimal (default: 2)
 * @param {string}        prefix          - Prefix tampilan, misal "Rp " (opsional)
 * @param {boolean}       allowNegative   - Izinkan nilai negatif (default: false)
 * @param {number}        maxValue        - Batas nilai maksimum (opsional, misal 100 untuk persen)
 *
 * Semua props Reactstrap <Input> diteruskan langsung, antara lain:
 * @param {'sm'|'lg'}     size            - Ukuran input Reactstrap
 * @param {object}        style           - Inline style bebas
 * @param {string}        className       - CSS class tambahan
 * @param {string}        placeholder     - Placeholder teks
 * @param {boolean}       disabled        - Nonaktifkan input
 * @param {boolean}       readOnly        - Read-only
 * @param {string}        id              - HTML id
 * @param {string}        name            - HTML name
 * @param {boolean}       invalid         - State invalid (Reactstrap FormFeedback)
 * @param {boolean}       valid           - State valid (Reactstrap FormFeedback)
 */
const InputAmount = ({
  value,
  onChange,
  decimalPlaces = 2,
  prefix = '',
  allowNegative = false,
  maxValue,
  onBlur,
  onFocus,
  ...rest
}) => {
  const [displayValue, setDisplayValue] = useState(() => formatToDisplay(value, decimalPlaces));
  const [isFocused, setIsFocused] = useState(false);

  React.useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatToDisplay(value, decimalPlaces));
    } else {
      // Mode focused: bandingkan nilai lama vs baru
      // Kalau parent melakukan clamp → paksa update display
      const currentNumeric = parseFloat(displayValue.replace(/\./g, '').replace(',', '.')) || 0;
      const incomingNumeric = parseFloat(value) || 0;
      if (incomingNumeric !== currentNumeric) {
        setDisplayValue(formatToDisplay(value, decimalPlaces));
      }
    }
  }, [value, isFocused, decimalPlaces]);

  const handleChange = useCallback(
    (e) => {
      let raw = e.target.value;

      // Strip prefix
      if (prefix && raw.startsWith(prefix)) {
        raw = raw.slice(prefix.length);
      }

      // Tangkap tanda negatif sebelum sanitasi
      const negSign = allowNegative && raw.startsWith('-') ? '-' : '';

      // Hanya izinkan angka, titik (pemisah ribuan), dan koma (desimal)
      raw = raw.replace(/[^0-9.,]/g, '');

      // Jika decimalPlaces = 0, buang koma/titik desimal
      if (decimalPlaces === 0) {
        raw = raw.replace(/[.,]/g, '');
      }

      // Pastikan hanya satu koma (desimal)
      const commaParts = raw.split(',');
      if (commaParts.length > 2) {
        raw = commaParts[0] + ',' + commaParts.slice(1).join('');
      }

      // Batasi digit desimal
      const commaIdx = raw.indexOf(',');
      if (commaIdx !== -1) {
        const decStr = raw.slice(commaIdx + 1);
        if (decStr.length > decimalPlaces) {
          raw = raw.slice(0, commaIdx + 1) + decStr.slice(0, decimalPlaces);
        }
      }

      // Ekstrak bagian integer (buang titik pemisah ribuan) dan desimal
      const splitByComma = raw.split(',');
      let intRaw = (splitByComma[0] || '').replace(/\./g, ''); // angka integer murni
      const decPart = splitByComma[1] !== undefined ? splitByComma[1] : null;

      // ── Auto-replace leading zero ──────────────────────────────────────────
      // Jika integer dimulai "0x" (misal "05"), buang leading zero-nya → "5"
      // Tapi biarkan "0," (user mau ketik 0,5) — itu valid
      if (intRaw.length > 1 && intRaw.startsWith('0')) {
        intRaw = intRaw.replace(/^0+/, '') || '0';
      }
      // ──────────────────────────────────────────────────────────────────────

      // Validasi maxValue
      if (maxValue !== undefined && maxValue !== null) {
        const numericCheck = parseFloat(intRaw + (decPart !== null ? '.' + decPart : '')) || 0;
        if (numericCheck > maxValue) return;
      }

      // Format tampilan dengan pemisah ribuan
      const formattedInt = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const newDisplay = negSign + formattedInt + (decPart !== null ? ',' + decPart : '');
      setDisplayValue(newDisplay);

      // Raw value numerik yang dikirim ke onChange: gunakan titik sebagai desimal
      const numericRaw = negSign + intRaw + (decPart !== null ? '.' + decPart : '');
      if (onChange) {
        onChange(numericRaw);
      }
    },
    [onChange, decimalPlaces, prefix, allowNegative, maxValue]
  );

  const handleFocus = useCallback(
    (e) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e) => {
      setIsFocused(false);
      const cleaned = displayValue.replace(/,$/, '');
      setDisplayValue(cleaned || '');
      if (onBlur) onBlur(e);
    },
    [onBlur, displayValue]
  );

  return (
    <Input
      type="text"
      inputMode="decimal"
      {...rest}
      value={prefix && displayValue ? prefix + displayValue : displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default InputAmount;


// ─────────────────────────────────────────────
// SHORTHAND COMPONENTS
// ─────────────────────────────────────────────

/**
 * InputAmountIDR - Shorthand khusus Rupiah dengan prefix "Rp "
 *
 * @param {boolean} allowDecimal  - true → izinkan desimal (default: false / integer only)
 * @param {number}  decimalPlaces - jumlah digit desimal jika allowDecimal=true (default: 2)
 *
 * Contoh:
 *
 * // Integer only (default) — harga jual tanpa sen
 * <InputAmountIDR value={harga} onChange={(raw) => setHarga(raw)} />
 *
 * // Dengan desimal — harga beli / HPP
 * <InputAmountIDR allowDecimal value={harga} onChange={(raw) => setHarga(raw)} />
 *
 * // Override jumlah desimal
 * <InputAmountIDR allowDecimal decimalPlaces={4} value={harga} onChange={(raw) => setHarga(raw)} />
 */
export const InputAmountIDR = ({ allowDecimal = false, decimalPlaces, ...props }) => (
  <InputAmount
    // prefix="Rp "
    decimalPlaces={allowDecimal ? (decimalPlaces ?? 2) : 0}
    {...props}
  />
);

/**
 * InputAmountUSD - Shorthand khusus USD (prefix "$ ", 2 desimal)
 */
export const InputAmountUSD = (props) => (
  <InputAmount prefix="$ " decimalPlaces={2} {...props} />
);

/**
 * InputPercent - Input persentase dengan batas maksimal 100
 *
 * @param {number}  decimalPlaces - jumlah digit desimal (default: 2, bisa di-override)
 * @param {number}  maxValue      - batas maksimum (default: 100, bisa di-override)
 *
 * Contoh:
 *
 * // Default: 0–100, 2 desimal
 * <InputPercent value={diskon} onChange={(raw) => setDiskon(raw)} />
 *
 * // 0 desimal (integer only)
 * <InputPercent decimalPlaces={0} value={pajak} onChange={(raw) => setPajak(raw)} />
 *
 * // 4 desimal
 * <InputPercent decimalPlaces={4} value={rate} onChange={(raw) => setRate(raw)} />
 *
 * // Tanpa batas maksimal (override maxValue)
 * <InputPercent maxValue={undefined} value={markup} onChange={(raw) => setMarkup(raw)} />
 *
 * // Batas custom, misal markup bisa > 100%
 * <InputPercent maxValue={999} decimalPlaces={2} value={markup} onChange={(raw) => setMarkup(raw)} />
 */
export const InputPercent = ({ decimalPlaces = 2, maxValue = 100, ...props }) => (
  <InputAmount
    decimalPlaces={decimalPlaces}
    maxValue={maxValue}
    {...props}
  />
);

/**
 * InputNumeric - Input angka murni tanpa pemisah ribuan (titik)
 *
 * Cocok untuk: kode angka, kuantitas sederhana, nomor urut, tahun,
 * atau field apapun yang butuh angka bersih tanpa format ribuan.
 *
 * @param {number|string} value          - Nilai numerik murni
 * @param {function}      onChange        - Callback (rawValue: string) => void
 * @param {number}        decimalPlaces   - Jumlah digit desimal (default: 0 / integer only)
 * @param {boolean}       allowNegative   - Izinkan nilai negatif (default: false)
 * @param {number}        maxValue        - Batas nilai maksimum (opsional)
 *
 * Contoh:
 *
 * // Integer only — kuantitas, kode, tahun
 * <InputNumeric value={qty} onChange={(raw) => setQty(raw)} />
 *
 * // Dengan desimal — berat, koordinat, dsb
 * <InputNumeric decimalPlaces={3} value={berat} onChange={(raw) => setBerat(raw)} />
 *
 * // Dengan nilai negatif
 * <InputNumeric allowNegative value={suhu} onChange={(raw) => setSuhu(raw)} />
 */
export const InputNumeric = ({
  value,
  onChange,
  decimalPlaces = 0,
  allowNegative = false,
  maxValue,
  onBlur,
  onFocus,
  ...rest
}) => {
  // Format untuk display: tidak ada pemisah ribuan, titik desimal → koma
  const formatNumeric = (val) => {
    if (val === '' || val === null || val === undefined) return '';
    const str = String(val);
    const [intPart, decPart] = str.split('.');
    return decPart !== undefined ? `${intPart},${decPart}` : intPart;
  };

  const [displayValue, setDisplayValue] = useState(() => formatNumeric(value));
  const [isFocused, setIsFocused] = useState(false);

  React.useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatNumeric(value));
    } else {
      const currentNumeric = parseFloat(displayValue.replace(',', '.')) || 0;
      const incomingNumeric = parseFloat(value) || 0;
      if (incomingNumeric !== currentNumeric) {
        setDisplayValue(formatNumeric(value));
      }
    }
  }, [value, isFocused, decimalPlaces]);

  const handleChange = useCallback(
    (e) => {
      let raw = e.target.value;

      // Tangkap tanda negatif sebelum sanitasi
      const negSign = allowNegative && raw.startsWith('-') ? '-' : '';

      // Hanya izinkan angka dan koma (desimal) — tidak ada titik sama sekali
      raw = raw.replace(/[^0-9,]/g, '');

      // Jika decimalPlaces = 0, buang koma
      if (decimalPlaces === 0) {
        raw = raw.replace(/,/g, '');
      }

      // Pastikan hanya satu koma
      const commaParts = raw.split(',');
      if (commaParts.length > 2) {
        raw = commaParts[0] + ',' + commaParts.slice(1).join('');
      }

      // Batasi digit desimal
      const commaIdx = raw.indexOf(',');
      if (commaIdx !== -1) {
        const decStr = raw.slice(commaIdx + 1);
        if (decStr.length > decimalPlaces) {
          raw = raw.slice(0, commaIdx + 1) + decStr.slice(0, decimalPlaces);
        }
      }

      // Ekstrak integer dan desimal
      const splitByComma = raw.split(',');
      let intRaw = splitByComma[0] || '';
      const decPart = splitByComma[1] !== undefined ? splitByComma[1] : null;

      // ── Auto-replace leading zero ──────────────────────────────────────────
      // "05" → "5", tapi "0," tetap "0" (valid untuk 0,5)
      if (intRaw.length > 1 && intRaw.startsWith('0')) {
        intRaw = intRaw.replace(/^0+/, '') || '0';
      }
      // ──────────────────────────────────────────────────────────────────────

      // Validasi maxValue
      if (maxValue !== undefined && maxValue !== null) {
        const numericCheck = parseFloat(intRaw + (decPart !== null ? '.' + decPart : '')) || 0;
        if (numericCheck > maxValue) return;
      }

      // Display: tidak ada pemisah ribuan
      const newDisplay = negSign + intRaw + (decPart !== null ? ',' + decPart : '');
      setDisplayValue(newDisplay);

      // Raw numerik ke onChange: titik sebagai desimal, tidak ada pemisah ribuan
      const numericRaw = negSign + intRaw + (decPart !== null ? '.' + decPart : '');
      if (onChange) {
        onChange(numericRaw);
      }
    },
    [onChange, decimalPlaces, allowNegative, maxValue]
  );

  const handleFocus = useCallback(
    (e) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e) => {
      setIsFocused(false);
      const cleaned = displayValue.replace(/,$/, '');
      setDisplayValue(cleaned || '');
      if (onBlur) onBlur(e);
    },
    [onBlur, displayValue]
  );

  return (
    <Input
      type="text"
      inputMode="numeric"
      {...rest}
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
