import React, { useRef, useCallback } from 'react';
import { Input, FormGroup, Label, FormFeedback, FormText } from 'reactstrap';


/**
 * How To Used
 * 
 * import InputText from 'components/InputText';
 * 
    Basic
    <InputText
      id="code"
      name="code"
      label="Kode"
      value={values.code}
      onChange={(val) => setFieldValue('code', val)}
      onBlur={handleBlur}
    />

    Formik validation
    <InputText
    id="code"
    name="code"
    label="Kode"
    value={values.code}
    onChange={(val) => setFieldValue('code', val)}
    onBlur={handleBlur}
    touched={touched.code}
    errorMessage={errors.code}
    required
  />

   character counter
    <InputText
    id="notes"
    name="notes"
    label="Catatan"
    value={values.notes}
    onChange={(val) => setFieldValue('notes', val)}
    onBlur={handleBlur}
    maxLength={200}
    showCharCount
    helpText="Maksimal 200 karakter"
  />
 */



/**
 * InputText - Global reusable text input component
 *
 * Props:
 * @param {string}   id             - Input id (required for label association)
 * @param {string}   name           - Input name
 * @param {string}   label          - Label text (optional)
 * @param {string}   value          - Controlled value
 * @param {function} onChange       - Callback (receives raw string value)
 * @param {function} onBlur         - Blur handler (receives event)
 * @param {string}   type           - Input type (default: 'text')
 * @param {string}   placeholder    - Placeholder text
 * @param {boolean}  disabled       - Disabled state
 * @param {boolean}  readOnly       - Read-only state
 * @param {string}   errorMessage   - Validation error message (Formik: errors.field)
 * @param {boolean}  touched        - Whether field was touched (Formik: touched.field)
 * @param {string}   helpText       - Helper text below input
 * @param {string}   className      - Additional className for Input
 * @param {string}   wrapperClass   - Additional className for FormGroup wrapper
 * @param {boolean}  required       - Mark field as required
 * @param {number}   maxLength      - Max character length
 * @param {boolean}  showCharCount  - Show character counter
 * @param {object}   inputProps     - Any additional props passed to reactstrap Input
 */
const InputText = ({
  id,
  name,
  label,
  value = '',
  onChange,
  onBlur,
  type = 'text',
  placeholder = '',
  disabled = false,
  readOnly = false,
  errorMessage,
  touched,
  helpText,
  className = '',
  wrapperClass = '',
  required = false,
  maxLength,
  showCharCount = false,
  ...inputProps
}) => {
  const inputRef = useRef(null);
  const cursorPosRef = useRef(null);

  // Preserve cursor position on every change to prevent cursor jumping
  const handleChange = useCallback(
    (e) => {
      cursorPosRef.current = e.target.selectionStart;
      const val = e.target.value;

      // Restore cursor after React re-render
      requestAnimationFrame(() => {
        if (inputRef.current && cursorPosRef.current !== null) {
          inputRef.current.selectionStart = cursorPosRef.current;
          inputRef.current.selectionEnd = cursorPosRef.current;
        }
      });

      if (onChange) onChange(val);
    },
    [onChange]
  );

  const isInvalid = Boolean(touched && errorMessage);
  const isValid = Boolean(touched && !errorMessage);

  const inputClassName = [className].filter(Boolean).join(' ');

  return (
    <FormGroup className={wrapperClass}>
      {label && (
        <Label for={id}>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Label>
      )}

      <Input
        innerRef={inputRef}        // reactstrap uses innerRef (not ref) to access DOM node
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={handleChange}
        onBlur={onBlur}
        invalid={isInvalid}
        valid={isValid}
        className={inputClassName}
        {...inputProps}
      />

      {/* Character counter */}
      {showCharCount && maxLength && (
        <div className="text-end">
          <small className={value.length >= maxLength ? 'text-danger' : 'text-muted'}>
            {value.length}/{maxLength}
          </small>
        </div>
      )}

      {/* Validation error */}
      {isInvalid && <FormFeedback>{errorMessage}</FormFeedback>}

      {/* Helper text */}
      {helpText && !isInvalid && <FormText>{helpText}</FormText>}
    </FormGroup>
  );
};

export default InputText;
