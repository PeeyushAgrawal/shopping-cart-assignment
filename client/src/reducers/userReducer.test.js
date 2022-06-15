import reducers, {authActions} from './UserReducer';
test('should return the initial state', () => {
  const initialState = {
    users: [],
    loggedInUser: {},
    error: null,
    status: null,
  };
  expect(reducers(initialState, {})).toEqual({"error": null, "loggedInUser": {}, "status": null, "users": []});
});

test('should return that user does not exist', () => {
  const initialState = {
    users: [],
    loggedInUser: {},
    error: null,
    status: null,
  };
expect(reducers(initialState, authActions.loginUser({email:'test@test.com'}))).toEqual({
    "error": 'Email associated with test@test.com does not exist. Go To Register', "loggedInUser": {}, "status": "failure", "users": []});
});

test('should return that user does not exist', () => {
  const initialState = {
    users: [],
    loggedInUser: {},
    error: null,
    status: null,
  };
expect(reducers(initialState, authActions.registerUser({firstName:'test', lastName:'test', email:'test@test.com'}))).toMatchObject({"status": "success"});
});

test('should return that user does not exist', () => {
  const initialState = {
    users: [{"email": "test@test.com", "firstName": "test", "lastName": "test"}],
    loggedInUser: {},
    error: null,
    status: null,
  };
expect(reducers(initialState, authActions.loginUser({email:'test@test.com'}))).toMatchObject({"status": "success"});
});
