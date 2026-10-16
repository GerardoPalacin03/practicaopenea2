import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Rejects text made only of whitespace.
 *
 * @summary Complements Validators.required, which accepts a string of spaces.
 * @author Gerardo Palacin
 */
export const notBlank: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.length > 0 && control.value.trim().length === 0
    ? { blank: true }
    : null;

/**
 * Accepts only whole numbers.
 *
 * @summary Participants cannot be fractional.
 * @author Gerardo Palacin
 */
export const wholeNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  control.value === null || control.value === '' || Number.isInteger(Number(control.value)) ? null : { integer: true };

/**
 * Rejects a number of participants greater than the available capacity.
 *
 * @summary The capacity is read when validating, so it follows the selected camp.
 * @author Gerardo Palacin
 * @param available - Function that returns the available capacity, or null when no camp is selected.
 */
export const withinCapacity =
  (available: () => number | null): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const capacity = available();
    return capacity !== null && typeof control.value === 'number' && control.value > capacity
      ? { capacity: { available: capacity } }
      : null;
  };
