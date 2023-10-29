

import Ajv from "ajv"

const ajv = new Ajv({allErrors: true})

const schema = {
  type: "object",
  properties: {
    foo: {type: "integer"},
    bar: {type: "string"},
    jar: {type: "string"},
  },
  required: ["foo"],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

const data = {
  foo: "123",
  bar: 123,
}

function parseErrors(validationErrors) {
    let errors = [];
    validationErrors.forEach(error => {
      errors.push({
        param: error.instancePath,   //error.params["missingProperty"],
        key: error.keyword,
        message: error.message,
        property: (function() {
          return error.dataPath  // error.keyword === 'minimum' ? error.dataPath : undefined
        })() 
      });
    });

    return errors;
}

const valid = validate(data);
console.log(validate({foo:123}));
console.log(validate({foo:"123"}));
// if (!valid) {
//    const errors = parseErrors(validate.errors);
//    throw errors;
// }
