import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    const errors = {};

    if (!attributes.targetPrice) {
      errors.targetPrice = ['cannot be blank'];
    }

    if (!attributes.symbol) {
      errors.symbol = ['cannot be blank'];
    }

    if (!attributes.action) {
      errors.action = ['cannot be blank'];
    }

    if (Object.keys(errors).length < 1) {
      return false
    }

    return errors;
  }, // validate
}) // Order

export default Order


// validate(attributes){
//     const errors = {}
//       if (!attributes.title) {
//         errors.title = ['cannot be blank'];
//       }
//
//       if (!attributes.author) {
//         errors.author = ['cannot be blank'];
//       }
//
//       if (!attributes.publication_year) {
//         errors.publication_year = ['cannot be blank'];
//       } else if (attributes.publication_year < 1000 || attributes.publication_year > (new Date()).getFullYear() ) {
//         errors.publication_year = ['must be between 100 and the current year']
//       }
//
//       if (Object.keys(errors).length < 1) {
//         return false
//       }
//
//       return errors;
//     }
