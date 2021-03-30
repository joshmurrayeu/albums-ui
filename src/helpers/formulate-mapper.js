/*
Usage:

let person = {
  name: "Harrison",
  age: 200,
  address: {
    street: "12345 Street",
    zip: "abcde"
  },
  favouriteThings: [
    {
      name: "Reading",
      metadata: {
        yearsDoing: 10
      }
    }
  ]
}

// outputs
{
  name: 'Harrison',
  age: 200,
  address: [
    {
      street: '12345 Street',
      zip: 'abcde'
    }
  ],
  favouriteThings: [
    { name: 'Reading',
    metadata: [
      { yearsDoing: 10 }
    ]
  }],
}

This assumes a structure in Formulate like this (using psuedocode):

Form
  name: input
  age: input
  address: group (non-repeatable)
    street: input
    zip: input
  favouriteThings: group (repeatable)
    name: input
    metadata: group (non-repeatable)
      yearsDoing: input
*/

/**
 * Converts all Objects, including Objects nested in arrays, into arrays containing themselves.
 *
 * If the value found at obj[key]:
 *
 * - is not an Object or Array, then no action is taken.
 * - is an Object, then recurse over all it's child properties
 * - is an Array, then loop over the Array items, and Arrayify each child object
 *
 * @param {any} obj The parent value to use
 * @param {string} key The of the child value to check
 */
function handleArrayify(obj, key) {
    // For each item in the array, we need to loop over each item and arrayify
    if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => {
            const keys = Object.keys(item)

            keys.forEach((k) => {
                handleArrayify(item, k)
            })
        })

        // Inspect the Objects properties.  If any arrays or nested Objects are present,
        // then they require arrayifying.  Once nested properties are converted, we can then
        // set the current object to an array containing itself.
    } else if (typeof obj[key] === 'object') {
        const keys = Object.keys(obj[key])

        const requiresArrayify = keys.filter(
            (k) => Array.isArray(obj[key][k]) || typeof obj[key][k] === 'object'
        )

        // Recurse on the children of this object that require arraifying
        if (requiresArrayify.length > 0) {
            requiresArrayify.forEach((value) => handleArrayify(obj[key], value))
        }

        // When finished, all child elements will be valid Formulate structures
        obj[key] = [obj[key]]
    }
}

/**
 * Handles reading an object, and producing a Formulate compatible input.
 * Note: Your Formulate schema must exactly match your object schema.
 *
 * - For Objects, use a Group with repeatable: false
 * - For arrays, use a Group with repeatable: true
 *
 * All groups need to have a `name` that exactly matches the parent property name,
 * and all properties contained in them need to have a `name` that exactly matches their
 * property name
 *
 * @param {Object} obj An object to convert into Formulate style
 */
function parse(obj) {
    const duped = JSON.parse(JSON.stringify(obj))
    const keys = Object.keys(duped)

    keys.forEach((key) => handleArrayify(duped, key))

    return duped
}

export const FormulateMapper = parse