const productCategoryValidator = (category) => {
    if (category.length <= 0 || category.length > 50) {
        throw new Error('A descrição da categoria do produto não pode conter 0 ou mais de 50 caracteres.');
    }
};

module.exports = {
    productCategoryValidator
};
