import * as Yup from 'yup'

export const yupProductValidation = Yup.object().shape({
  name: Yup.string().max(255).required(),
  category: Yup.string().max(255).required(),
  description: Yup.string().max(5000),
  price: Yup.number().min(1).required(),
  salePrice: Yup.number().min(1),
  quantity: Yup.number().min(0).required(),
  taxSettings: Yup.object()
    .shape({
      includesTaxes: Yup.bool(),
      isTaxable: Yup.bool()
    })
    .test('one of tax settings', 'product either includes taxes or is taxable', value => {
      const { includesTaxes, isTaxable } = value
      return includesTaxes !== isTaxable
    })
    .required(),
  productSku: Yup.string().max(255).required()
})
