import reducers, {cartActions} from './CartReducer';
test('should return the initial state', () => {
  expect(reducers(undefined, {})).toEqual([]);
});
test('should handle a product being added to an empty cart list', () => {
  const previousState = []
  expect(reducers(previousState, cartActions.addToCart({
    id: '5b6c6a7f01a7c38429530883',
    category: "5b6899953d1a866534f516e2",
    name: "Fresho Kiwi - Green, 3 pcs",
    imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
    price: 87,
  }))).toEqual([
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:1
    }
  ])
});
test('should handle a product being updated to an existing cart list', () => {
  const previousState = [
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:1
    }
  ]
  expect(reducers(previousState, cartActions.addToCart({
    id: '5b6c6a7f01a7c38429530883',
    category: "5b6899953d1a866534f516e2",
    name: "Fresho Kiwi - Green, 3 pcs",
    imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
    price: 87,
  }))).toEqual([
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:2
    }
  ])
});
test('should handle a product being added to an existing cart list', () => {
  const previousState = [
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:2
    }
  ]
  expect(reducers(previousState, cartActions.addToCart({
    name: "Apple - Washington, Regular, 4 pcs",
    imageURL: "/static/images/products/fruit-n-veg/apple.jpg",
    price: 187,
    category: "5b6899953d1a866534f516e2",
    id: "5b6c6aeb01a7c38429530884"
  }))).toEqual([
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:2
    },
    {
      name: "Apple - Washington, Regular, 4 pcs",
      imageURL: "/static/images/products/fruit-n-veg/apple.jpg",
      price: 187,
      category: "5b6899953d1a866534f516e2",
      id: "5b6c6aeb01a7c38429530884",
      qty:1
    }
  ])
});
test('should handle a product quantity being increased to an existing cart list', () => {
  const previousState = [
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:2
    }
  ]
  expect(reducers(previousState, cartActions.addCartItemQty(
   "5b6c6a7f01a7c38429530883"
  ))).toEqual([
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:3
    }
  ])
});
test('should handle a product quantity being decreased to an existing cart list', () => {
  const previousState = [
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:2
    }
  ]
  expect(reducers(previousState, cartActions.decreaseCartItemQty(
   "5b6c6a7f01a7c38429530883"
  ))).toEqual([
    {
      id: '5b6c6a7f01a7c38429530883',
      category: "5b6899953d1a866534f516e2",
      name: "Fresho Kiwi - Green, 3 pcs",
      imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
      price: 87,
      qty:1
    }
  ])
});