export default {
  name: 'productSettings',
  type: 'object',
  title: 'Product Settings',
  fields: [
    {
      name: 'contactText',
      type: 'string',
      title: 'Contact Button Text',
      description: "If blank, this will default to 'Contact Us'"
    },
    {
      name: 'tearSheetText',
      type: 'string',
      title: 'Tear Sheet Download Button Text',
      description: "If blank, this will default to 'Download Tear Sheet'",
    },
    {
      name: 'materialsLabel',
      type: 'string',
      title: 'Materials Section Label',
      description: "If blank, this will default to 'Materials'",
    },
    {
      name: 'optionsLabel',
      type: 'string',
      title: 'Options Section Label',
      description: "If blank, this will default to 'Options'",
    },
    {
      name: 'dimensionsLabel',
      type: 'string',
        title: 'Dimensions Section Label',
        description: "If blank, this will default to 'Dimensions'",
    }
  ]
}
