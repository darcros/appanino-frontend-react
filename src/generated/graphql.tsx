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

export type EmailUpdateInput = {
  newEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Returns a jwt to use for authentication */
  login: Scalars['String'];
  /** creates a new user */
  registerUser: User;
  /** Update data on the current user */
  updateSelf: User;
  /** Update the email of the current user */
  updateEmail: User;
  /** Update the password of the current user */
  updatePassword: User;
  placeOrder: Order;
  /** Cancel an order */
  cancelOrder: Order;
  /** Change the status of an order */
  advanceOrderStatus: Order;
  /** Creates a new product */
  addProduct: Product;
  /** Show or hide a product */
  updateProductVisibility: Product;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationRegisterUserArgs = {
  userRegistrationData: UserRegistrationInput;
};

export type MutationUpdateSelfArgs = {
  updateData: UserUpdateInput;
};

export type MutationUpdateEmailArgs = {
  updateData: EmailUpdateInput;
};

export type MutationUpdatePasswordArgs = {
  updateData: PasswordUpdateInput;
};

export type MutationPlaceOrderArgs = {
  orderData: OrderInput;
};

export type MutationCancelOrderArgs = {
  id: Scalars['ID'];
};

export type MutationAdvanceOrderStatusArgs = {
  id: Scalars['ID'];
};

export type MutationAddProductArgs = {
  newProductData: NewProductInput;
};

export type MutationUpdateProductVisibilityArgs = {
  updateVisibilityData: UpdateVisibilityInput;
};

export type NewProductInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  schoolIds: Array<Scalars['ID']>;
  categoryId: Scalars['ID'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  status: OrderStatus;
  items: Array<OrderItem>;
  user: User;
  total: Scalars['Float'];
};

export type OrderInput = {
  items: Array<OrderItemInput>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  product: Product;
  subtotal: Scalars['Float'];
};

export type OrderItemInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

/** Current status of the order */
export enum OrderStatus {
  Waiting = 'Waiting',
  Preparing = 'Preparing',
  Ready = 'Ready',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
}

export type PasswordUpdateInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  hidden: Scalars['Boolean'];
  schools: Array<School>;
  category: Category;
};

export type Query = {
  __typename?: 'Query';
  self?: Maybe<User>;
  categories: Array<Category>;
  orders: Array<Order>;
  /** Returns all products */
  products: Array<Product>;
  /** Returns a product given its ID */
  product?: Maybe<Product>;
  schools: Array<School>;
  users: Array<User>;
};

export type QueryProductArgs = {
  id: Scalars['ID'];
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

export type UpdateVisibilityInput = {
  productId: Scalars['ID'];
  visible: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  role: Role;
  school: School;
  orders: Array<Order>;
};

export type UserRegistrationInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  schoolId: Scalars['ID'];
};

export type UserUpdateInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  schoolId?: Maybe<Scalars['ID']>;
};
export type DoLoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DoLoginMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'login'>;

export type DoPasswordUpdateMutationVariables = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type DoPasswordUpdateMutation = { __typename?: 'Mutation' } & {
  updatePassword: { __typename?: 'User' } & Pick<User, 'id'>;
};

export type DoUserInfoUpdateMutationVariables = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  schoolId?: Maybe<Scalars['ID']>;
};

export type DoUserInfoUpdateMutation = { __typename?: 'Mutation' } & {
  updateSelf: { __typename?: 'User' } & Pick<User, 'id' | 'firstname' | 'lastname'> & {
      school: { __typename?: 'School' } & Pick<School, 'id' | 'name'>;
    };
};

export type DoEmailUpdateMutationVariables = {
  newEmail: Scalars['String'];
};

export type DoEmailUpdateMutation = { __typename?: 'Mutation' } & {
  updateEmail: { __typename?: 'User' } & Pick<User, 'id' | 'email'>;
};

export type RegisterAndLoginMutationVariables = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  schoolId: Scalars['ID'];
};

export type RegisterAndLoginMutation = { __typename?: 'Mutation' } & { token: Mutation['login'] } & {
  registerUser: { __typename?: 'User' } & Pick<User, 'id' | 'firstname' | 'lastname' | 'email' | 'role'> & {
      school: { __typename?: 'School' } & Pick<School, 'id' | 'name'>;
    };
};

export type PlaceOrderMutationVariables = {
  items: Array<OrderItemInput>;
};

export type PlaceOrderMutation = { __typename?: 'Mutation' } & {
  placeOrder: { __typename?: 'Order' } & Pick<Order, 'id'>;
};

export type UserRoleQueryVariables = {};

export type UserRoleQuery = { __typename?: 'Query' } & {
  self: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'role'>>;
};

export type GetShopProductsQueryVariables = {};

export type GetShopProductsQuery = { __typename?: 'Query' } & {
  self: Maybe<
    { __typename?: 'User' } & Pick<User, 'id'> & {
        school: { __typename?: 'School' } & Pick<School, 'id'> & {
            products: Array<
              { __typename?: 'Product' } & Pick<Product, 'id' | 'name' | 'price'> & {
                  category: { __typename?: 'Category' } & Pick<Category, 'id' | 'name'>;
                }
            >;
          };
      }
  >;
};

export type UserSettingsQueryVariables = {};

export type UserSettingsQuery = { __typename?: 'Query' } & {
  self: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'firstname' | 'lastname'> & {
        school: { __typename?: 'School' } & Pick<School, 'id' | 'name'>;
      }
  >;
  schools: Array<{ __typename?: 'School' } & Pick<School, 'id' | 'name'>>;
};

export type SchoolsQueryVariables = {};

export type SchoolsQuery = { __typename?: 'Query' } & {
  schools: Array<{ __typename?: 'School' } & Pick<School, 'id' | 'name'>>;
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
export const DoPasswordUpdateDocument = gql`
  mutation DoPasswordUpdate($oldPassword: String!, $newPassword: String!) {
    updatePassword(updateData: { oldPassword: $oldPassword, newPassword: $newPassword }) {
      id
    }
  }
`;
export type DoPasswordUpdateMutationFn = ReactApollo.MutationFn<
  DoPasswordUpdateMutation,
  DoPasswordUpdateMutationVariables
>;
export type DoPasswordUpdateComponentProps = Omit<
  ReactApollo.MutationProps<DoPasswordUpdateMutation, DoPasswordUpdateMutationVariables>,
  'mutation'
>;

export const DoPasswordUpdateComponent = (props: DoPasswordUpdateComponentProps) => (
  <ReactApollo.Mutation<DoPasswordUpdateMutation, DoPasswordUpdateMutationVariables>
    mutation={DoPasswordUpdateDocument}
    {...props}
  />
);

export function useDoPasswordUpdateMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoPasswordUpdateMutation, DoPasswordUpdateMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoPasswordUpdateMutation, DoPasswordUpdateMutationVariables>(
    DoPasswordUpdateDocument,
    baseOptions,
  );
}
export type DoPasswordUpdateMutationHookResult = ReturnType<typeof useDoPasswordUpdateMutation>;
export const DoUserInfoUpdateDocument = gql`
  mutation DoUserInfoUpdate($firstname: String, $lastname: String, $schoolId: ID) {
    updateSelf(updateData: { firstname: $firstname, lastname: $lastname, schoolId: $schoolId }) {
      id
      firstname
      lastname
      school {
        id
        name
      }
    }
  }
`;
export type DoUserInfoUpdateMutationFn = ReactApollo.MutationFn<
  DoUserInfoUpdateMutation,
  DoUserInfoUpdateMutationVariables
>;
export type DoUserInfoUpdateComponentProps = Omit<
  ReactApollo.MutationProps<DoUserInfoUpdateMutation, DoUserInfoUpdateMutationVariables>,
  'mutation'
>;

export const DoUserInfoUpdateComponent = (props: DoUserInfoUpdateComponentProps) => (
  <ReactApollo.Mutation<DoUserInfoUpdateMutation, DoUserInfoUpdateMutationVariables>
    mutation={DoUserInfoUpdateDocument}
    {...props}
  />
);

export function useDoUserInfoUpdateMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoUserInfoUpdateMutation, DoUserInfoUpdateMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoUserInfoUpdateMutation, DoUserInfoUpdateMutationVariables>(
    DoUserInfoUpdateDocument,
    baseOptions,
  );
}
export type DoUserInfoUpdateMutationHookResult = ReturnType<typeof useDoUserInfoUpdateMutation>;
export const DoEmailUpdateDocument = gql`
  mutation DoEmailUpdate($newEmail: String!) {
    updateEmail(updateData: { newEmail: $newEmail }) {
      id
      email
    }
  }
`;
export type DoEmailUpdateMutationFn = ReactApollo.MutationFn<DoEmailUpdateMutation, DoEmailUpdateMutationVariables>;
export type DoEmailUpdateComponentProps = Omit<
  ReactApollo.MutationProps<DoEmailUpdateMutation, DoEmailUpdateMutationVariables>,
  'mutation'
>;

export const DoEmailUpdateComponent = (props: DoEmailUpdateComponentProps) => (
  <ReactApollo.Mutation<DoEmailUpdateMutation, DoEmailUpdateMutationVariables>
    mutation={DoEmailUpdateDocument}
    {...props}
  />
);

export function useDoEmailUpdateMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoEmailUpdateMutation, DoEmailUpdateMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoEmailUpdateMutation, DoEmailUpdateMutationVariables>(
    DoEmailUpdateDocument,
    baseOptions,
  );
}
export type DoEmailUpdateMutationHookResult = ReturnType<typeof useDoEmailUpdateMutation>;
export const RegisterAndLoginDocument = gql`
  mutation RegisterAndLogin(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $schoolId: ID!
  ) {
    registerUser(
      userRegistrationData: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        schoolId: $schoolId
      }
    ) {
      id
      firstname
      lastname
      email
      role
      school {
        id
        name
      }
    }
    token: login(email: $email, password: $password)
  }
`;
export type RegisterAndLoginMutationFn = ReactApollo.MutationFn<
  RegisterAndLoginMutation,
  RegisterAndLoginMutationVariables
>;
export type RegisterAndLoginComponentProps = Omit<
  ReactApollo.MutationProps<RegisterAndLoginMutation, RegisterAndLoginMutationVariables>,
  'mutation'
>;

export const RegisterAndLoginComponent = (props: RegisterAndLoginComponentProps) => (
  <ReactApollo.Mutation<RegisterAndLoginMutation, RegisterAndLoginMutationVariables>
    mutation={RegisterAndLoginDocument}
    {...props}
  />
);

export function useRegisterAndLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<RegisterAndLoginMutation, RegisterAndLoginMutationVariables>,
) {
  return ReactApolloHooks.useMutation<RegisterAndLoginMutation, RegisterAndLoginMutationVariables>(
    RegisterAndLoginDocument,
    baseOptions,
  );
}
export type RegisterAndLoginMutationHookResult = ReturnType<typeof useRegisterAndLoginMutation>;
export const PlaceOrderDocument = gql`
  mutation PlaceOrder($items: [OrderItemInput!]!) {
    placeOrder(orderData: { items: $items }) {
      id
    }
  }
`;
export type PlaceOrderMutationFn = ReactApollo.MutationFn<PlaceOrderMutation, PlaceOrderMutationVariables>;
export type PlaceOrderComponentProps = Omit<
  ReactApollo.MutationProps<PlaceOrderMutation, PlaceOrderMutationVariables>,
  'mutation'
>;

export const PlaceOrderComponent = (props: PlaceOrderComponentProps) => (
  <ReactApollo.Mutation<PlaceOrderMutation, PlaceOrderMutationVariables> mutation={PlaceOrderDocument} {...props} />
);

export function usePlaceOrderMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<PlaceOrderMutation, PlaceOrderMutationVariables>,
) {
  return ReactApolloHooks.useMutation<PlaceOrderMutation, PlaceOrderMutationVariables>(PlaceOrderDocument, baseOptions);
}
export type PlaceOrderMutationHookResult = ReturnType<typeof usePlaceOrderMutation>;
export const UserRoleDocument = gql`
  query UserRole {
    self {
      id
      role
    }
  }
`;
export type UserRoleComponentProps = Omit<ReactApollo.QueryProps<UserRoleQuery, UserRoleQueryVariables>, 'query'>;

export const UserRoleComponent = (props: UserRoleComponentProps) => (
  <ReactApollo.Query<UserRoleQuery, UserRoleQueryVariables> query={UserRoleDocument} {...props} />
);

export function useUserRoleQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<UserRoleQueryVariables>) {
  return ReactApolloHooks.useQuery<UserRoleQuery, UserRoleQueryVariables>(UserRoleDocument, baseOptions);
}
export type UserRoleQueryHookResult = ReturnType<typeof useUserRoleQuery>;
export const GetShopProductsDocument = gql`
  query GetShopProducts {
    self {
      id
      school {
        id
        products {
          id
          name
          price
          category {
            id
            name
          }
        }
      }
    }
  }
`;
export type GetShopProductsComponentProps = Omit<
  ReactApollo.QueryProps<GetShopProductsQuery, GetShopProductsQueryVariables>,
  'query'
>;

export const GetShopProductsComponent = (props: GetShopProductsComponentProps) => (
  <ReactApollo.Query<GetShopProductsQuery, GetShopProductsQueryVariables> query={GetShopProductsDocument} {...props} />
);

export function useGetShopProductsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetShopProductsQueryVariables>,
) {
  return ReactApolloHooks.useQuery<GetShopProductsQuery, GetShopProductsQueryVariables>(
    GetShopProductsDocument,
    baseOptions,
  );
}
export type GetShopProductsQueryHookResult = ReturnType<typeof useGetShopProductsQuery>;
export const UserSettingsDocument = gql`
  query UserSettings {
    self {
      id
      firstname
      lastname
      school {
        id
        name
      }
    }
    schools {
      id
      name
    }
  }
`;
export type UserSettingsComponentProps = Omit<
  ReactApollo.QueryProps<UserSettingsQuery, UserSettingsQueryVariables>,
  'query'
>;

export const UserSettingsComponent = (props: UserSettingsComponentProps) => (
  <ReactApollo.Query<UserSettingsQuery, UserSettingsQueryVariables> query={UserSettingsDocument} {...props} />
);

export function useUserSettingsQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<UserSettingsQueryVariables>) {
  return ReactApolloHooks.useQuery<UserSettingsQuery, UserSettingsQueryVariables>(UserSettingsDocument, baseOptions);
}
export type UserSettingsQueryHookResult = ReturnType<typeof useUserSettingsQuery>;
export const SchoolsDocument = gql`
  query Schools {
    schools {
      id
      name
    }
  }
`;
export type SchoolsComponentProps = Omit<ReactApollo.QueryProps<SchoolsQuery, SchoolsQueryVariables>, 'query'>;

export const SchoolsComponent = (props: SchoolsComponentProps) => (
  <ReactApollo.Query<SchoolsQuery, SchoolsQueryVariables> query={SchoolsDocument} {...props} />
);

export function useSchoolsQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<SchoolsQueryVariables>) {
  return ReactApolloHooks.useQuery<SchoolsQuery, SchoolsQueryVariables>(SchoolsDocument, baseOptions);
}
export type SchoolsQueryHookResult = ReturnType<typeof useSchoolsQuery>;
