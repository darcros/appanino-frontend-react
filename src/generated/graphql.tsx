import gql from 'graphql-tag';
import * as ReactApollo from 'react-apollo';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};

export type JwtSchool = {
  __typename?: 'JwtSchool';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type JwtUserInfo = {
  __typename?: 'JwtUserInfo';
  id: Scalars['Int'];
  role: Role;
  school: JwtSchool;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Returns a jwt to use for authentication */
  login: Scalars['String'];
  /** creates a new user */
  register: Scalars['Boolean'];
  /** Creates a new product */
  addProduct: Product;
  /** Deletes a products given its ID */
  deleteProduct: Scalars['Boolean'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationRegisterArgs = {
  userRegistrationData: UserRegistrationDataInput;
};

export type MutationAddProductArgs = {
  newProductData: NewProductDataInput;
};

export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};

export type NewProductDataInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  schoolIds: Array<Scalars['ID']>;
  categoryId: Scalars['ID'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  totalPrice: Scalars['Float'];
  userId: Scalars['ID'];
  user: User;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  schools: Array<School>;
  category: Category;
};

export type Query = {
  __typename?: 'Query';
  self: User;
  categories: Array<Category>;
  orders: Array<Order>;
  /** Returns a list of products */
  products: Array<Product>;
  /** Returns a product given its ID */
  product?: Maybe<Product>;
  schools: Array<School>;
  users: Array<User>;
  isLoggedIn: Scalars['Boolean'];
  userInfo?: Maybe<JwtUserInfo>;
};

export type QueryProductsArgs = {
  getAll?: Maybe<Scalars['Boolean']>;
};

export type QueryProductArgs = {
  id: Scalars['Float'];
};

export enum Role {
  User = 'User',
  SchoolAdmin = 'SchoolAdmin',
  Admin = 'Admin',
}

export type School = {
  __typename?: 'School';
  id: Scalars['ID'];
  name: Scalars['String'];
  users: Array<User>;
  products: Array<Product>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  role: Role;
  schoolId: Scalars['ID'];
  school: School;
  orders: Array<Order>;
};

export type UserRegistrationDataInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  schoolId: Scalars['ID'];
};
export type DoLoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DoLoginMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'login'>;

export type IsLoggedInQueryVariables = {};

export type IsLoggedInQuery = { __typename?: 'Query' } & Pick<Query, 'isLoggedIn'>;

export type GetUserRoleQueryVariables = {};

export type GetUserRoleQuery = { __typename?: 'Query' } & {
  userInfo: Maybe<{ __typename?: 'JwtUserInfo' } & Pick<JwtUserInfo, 'role'>>;
};

export const DoLoginDocument = gql`
  mutation DoLogin($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export type DoLoginMutationFn = ReactApollo.MutationFn<DoLoginMutation, DoLoginMutationVariables>;
export type DoLoginComponentProps = Omit<
  ReactApollo.MutationProps<DoLoginMutation, DoLoginMutationVariables>,
  'mutation'
>;

export const DoLoginComponent = (props: DoLoginComponentProps) => (
  <ReactApollo.Mutation<DoLoginMutation, DoLoginMutationVariables> mutation={DoLoginDocument} {...props} />
);

export function useDoLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoLoginMutation, DoLoginMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoLoginMutation, DoLoginMutationVariables>(DoLoginDocument, baseOptions);
}
export type DoLoginMutationHookResult = ReturnType<typeof useDoLoginMutation>;
export const IsLoggedInDocument = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;
export type IsLoggedInComponentProps = Omit<ReactApollo.QueryProps<IsLoggedInQuery, IsLoggedInQueryVariables>, 'query'>;

export const IsLoggedInComponent = (props: IsLoggedInComponentProps) => (
  <ReactApollo.Query<IsLoggedInQuery, IsLoggedInQueryVariables> query={IsLoggedInDocument} {...props} />
);

export function useIsLoggedInQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<IsLoggedInQueryVariables>) {
  return ReactApolloHooks.useQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(IsLoggedInDocument, baseOptions);
}
export type IsLoggedInQueryHookResult = ReturnType<typeof useIsLoggedInQuery>;
export const GetUserRoleDocument = gql`
  query GetUserRole {
    userInfo @client {
      role
    }
  }
`;
export type GetUserRoleComponentProps = Omit<
  ReactApollo.QueryProps<GetUserRoleQuery, GetUserRoleQueryVariables>,
  'query'
>;

export const GetUserRoleComponent = (props: GetUserRoleComponentProps) => (
  <ReactApollo.Query<GetUserRoleQuery, GetUserRoleQueryVariables> query={GetUserRoleDocument} {...props} />
);

export function useGetUserRoleQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<GetUserRoleQueryVariables>) {
  return ReactApolloHooks.useQuery<GetUserRoleQuery, GetUserRoleQueryVariables>(GetUserRoleDocument, baseOptions);
}
export type GetUserRoleQueryHookResult = ReturnType<typeof useGetUserRoleQuery>;
