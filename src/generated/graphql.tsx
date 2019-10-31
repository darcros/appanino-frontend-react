import gql from 'graphql-tag';
import * as ReactApollo from 'react-apollo';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../graphql/client/context.interface';
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

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  product: Product;
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
  saveToken: Maybe<Scalars['Boolean']>;
  logOut: Maybe<Scalars['Boolean']>;
  updateCartQuantity: Maybe<Scalars['Boolean']>;
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

export type MutationSaveTokenArgs = {
  token: Scalars['String'];
};

export type MutationUpdateCartQuantityArgs = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
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
  self: Maybe<User>;
  categories: Array<Category>;
  orders: Array<Order>;
  /** Returns all products */
  products: Array<Product>;
  /** Returns a product given its ID */
  product: Maybe<Product>;
  schools: Array<School>;
  users: Array<User>;
  cart: Array<CartItem>;
  productQuantityInCart: Scalars['Int'];
};

export type QueryProductArgs = {
  id: Scalars['ID'];
};

export type QueryProductQuantityInCartArgs = {
  productId: Scalars['ID'];
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
  firstname: Maybe<Scalars['String']>;
  lastname: Maybe<Scalars['String']>;
  schoolId: Maybe<Scalars['ID']>;
};
export type DoLoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DoLoginMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'login'>;

export type DoSaveTokenMutationVariables = {
  token: Scalars['String'];
};

export type DoSaveTokenMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'saveToken'>;

export type DoPasswordUpdateMutationVariables = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type DoPasswordUpdateMutation = { __typename?: 'Mutation' } & {
  updatePassword: { __typename?: 'User' } & Pick<User, 'id'>;
};

export type DoLogoutMutationVariables = {};

export type DoLogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logOut'>;

export type DoUserInfoUpdateMutationVariables = {
  firstname: Maybe<Scalars['String']>;
  lastname: Maybe<Scalars['String']>;
  schoolId: Maybe<Scalars['ID']>;
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

export type UpdateCartQuantityMutationVariables = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type UpdateCartQuantityMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'updateCartQuantity'>;

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

export type CartQueryVariables = {};

export type CartQuery = { __typename?: 'Query' } & {
  cart: Array<
    { __typename?: 'CartItem' } & Pick<CartItem, 'id' | 'quantity'> & {
        product: { __typename?: 'Product' } & Pick<Product, 'id' | 'name' | 'price'>;
      }
  >;
};

export type ProductQuantityQueryVariables = {
  productId: Scalars['ID'];
};

export type ProductQuantityQuery = { __typename?: 'Query' } & { quantity: Query['productQuantityInCart'] };

export type Resolver_CartQueryVariables = {};

export type Resolver_CartQuery = { __typename?: 'Query' } & {
  cart: Array<
    { __typename?: 'CartItem' } & Pick<CartItem, 'id' | 'quantity'> & {
        product: { __typename?: 'Product' } & Pick<Product, 'id'>;
      }
  >;
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
export const DoSaveTokenDocument = gql`
  mutation DoSaveToken($token: String!) {
    saveToken(token: $token) @client
  }
`;
export type DoSaveTokenMutationFn = ReactApollo.MutationFn<DoSaveTokenMutation, DoSaveTokenMutationVariables>;
export type DoSaveTokenComponentProps = Omit<
  ReactApollo.MutationProps<DoSaveTokenMutation, DoSaveTokenMutationVariables>,
  'mutation'
>;

export const DoSaveTokenComponent = (props: DoSaveTokenComponentProps) => (
  <ReactApollo.Mutation<DoSaveTokenMutation, DoSaveTokenMutationVariables> mutation={DoSaveTokenDocument} {...props} />
);

export function useDoSaveTokenMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoSaveTokenMutation, DoSaveTokenMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoSaveTokenMutation, DoSaveTokenMutationVariables>(
    DoSaveTokenDocument,
    baseOptions,
  );
}
export type DoSaveTokenMutationHookResult = ReturnType<typeof useDoSaveTokenMutation>;
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
export const DoLogoutDocument = gql`
  mutation DoLogout {
    logOut @client
  }
`;
export type DoLogoutMutationFn = ReactApollo.MutationFn<DoLogoutMutation, DoLogoutMutationVariables>;
export type DoLogoutComponentProps = Omit<
  ReactApollo.MutationProps<DoLogoutMutation, DoLogoutMutationVariables>,
  'mutation'
>;

export const DoLogoutComponent = (props: DoLogoutComponentProps) => (
  <ReactApollo.Mutation<DoLogoutMutation, DoLogoutMutationVariables> mutation={DoLogoutDocument} {...props} />
);

export function useDoLogoutMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoLogoutMutation, DoLogoutMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoLogoutMutation, DoLogoutMutationVariables>(DoLogoutDocument, baseOptions);
}
export type DoLogoutMutationHookResult = ReturnType<typeof useDoLogoutMutation>;
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
export const UpdateCartQuantityDocument = gql`
  mutation UpdateCartQuantity($productId: ID!, $quantity: Int!) {
    updateCartQuantity(productId: $productId, quantity: $quantity) @client
  }
`;
export type UpdateCartQuantityMutationFn = ReactApollo.MutationFn<
  UpdateCartQuantityMutation,
  UpdateCartQuantityMutationVariables
>;
export type UpdateCartQuantityComponentProps = Omit<
  ReactApollo.MutationProps<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>,
  'mutation'
>;

export const UpdateCartQuantityComponent = (props: UpdateCartQuantityComponentProps) => (
  <ReactApollo.Mutation<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>
    mutation={UpdateCartQuantityDocument}
    {...props}
  />
);

export function useUpdateCartQuantityMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>,
) {
  return ReactApolloHooks.useMutation<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>(
    UpdateCartQuantityDocument,
    baseOptions,
  );
}
export type UpdateCartQuantityMutationHookResult = ReturnType<typeof useUpdateCartQuantityMutation>;
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
export const CartDocument = gql`
  query Cart {
    cart @client {
      id
      quantity
      product {
        id
        name
        price
      }
    }
  }
`;
export type CartComponentProps = Omit<ReactApollo.QueryProps<CartQuery, CartQueryVariables>, 'query'>;

export const CartComponent = (props: CartComponentProps) => (
  <ReactApollo.Query<CartQuery, CartQueryVariables> query={CartDocument} {...props} />
);

export function useCartQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<CartQueryVariables>) {
  return ReactApolloHooks.useQuery<CartQuery, CartQueryVariables>(CartDocument, baseOptions);
}
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export const ProductQuantityDocument = gql`
  query ProductQuantity($productId: ID!) {
    quantity: productQuantityInCart(productId: $productId) @client
  }
`;
export type ProductQuantityComponentProps = Omit<
  ReactApollo.QueryProps<ProductQuantityQuery, ProductQuantityQueryVariables>,
  'query'
> &
  ({ variables: ProductQuantityQueryVariables; skip?: false } | { skip: true });

export const ProductQuantityComponent = (props: ProductQuantityComponentProps) => (
  <ReactApollo.Query<ProductQuantityQuery, ProductQuantityQueryVariables> query={ProductQuantityDocument} {...props} />
);

export function useProductQuantityQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ProductQuantityQueryVariables>,
) {
  return ReactApolloHooks.useQuery<ProductQuantityQuery, ProductQuantityQueryVariables>(
    ProductQuantityDocument,
    baseOptions,
  );
}
export type ProductQuantityQueryHookResult = ReturnType<typeof useProductQuantityQuery>;
export const Resolver_CartDocument = gql`
  query Resolver_Cart {
    cart @client {
      id
      quantity
      product {
        id
      }
    }
  }
`;
export type Resolver_CartComponentProps = Omit<
  ReactApollo.QueryProps<Resolver_CartQuery, Resolver_CartQueryVariables>,
  'query'
>;

export const Resolver_CartComponent = (props: Resolver_CartComponentProps) => (
  <ReactApollo.Query<Resolver_CartQuery, Resolver_CartQueryVariables> query={Resolver_CartDocument} {...props} />
);

export function useResolver_CartQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<Resolver_CartQueryVariables>) {
  return ReactApolloHooks.useQuery<Resolver_CartQuery, Resolver_CartQueryVariables>(Resolver_CartDocument, baseOptions);
}
export type Resolver_CartQueryHookResult = ReturnType<typeof useResolver_CartQuery>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Role: Role;
  School: ResolverTypeWrapper<School>;
  Product: ResolverTypeWrapper<Product>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Order: ResolverTypeWrapper<Order>;
  OrderStatus: OrderStatus;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CartItem: ResolverTypeWrapper<CartItem>;
  Mutation: ResolverTypeWrapper<{}>;
  UserRegistrationInput: UserRegistrationInput;
  UserUpdateInput: UserUpdateInput;
  EmailUpdateInput: EmailUpdateInput;
  PasswordUpdateInput: PasswordUpdateInput;
  OrderInput: OrderInput;
  OrderItemInput: OrderItemInput;
  NewProductInput: NewProductInput;
  UpdateVisibilityInput: UpdateVisibilityInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Role: Role;
  School: School;
  Product: Product;
  Float: Scalars['Float'];
  Boolean: Scalars['Boolean'];
  Category: Category;
  Order: Order;
  OrderStatus: OrderStatus;
  OrderItem: OrderItem;
  Int: Scalars['Int'];
  CartItem: CartItem;
  Mutation: {};
  UserRegistrationInput: UserRegistrationInput;
  UserUpdateInput: UserUpdateInput;
  EmailUpdateInput: EmailUpdateInput;
  PasswordUpdateInput: PasswordUpdateInput;
  OrderInput: OrderInput;
  OrderItemInput: OrderItemInput;
  NewProductInput: NewProductInput;
  UpdateVisibilityInput: UpdateVisibilityInput;
};

export type CartItemResolvers<ContextType = Context, ParentType = ResolversParentTypes['CartItem']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = Context, ParentType = ResolversParentTypes['Category']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType = ResolversParentTypes['Mutation']> = {
  login: Resolver<ResolversTypes['String'], ParentType, ContextType, MutationLoginArgs>;
  registerUser: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationRegisterUserArgs>;
  updateSelf: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationUpdateSelfArgs>;
  updateEmail: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationUpdateEmailArgs>;
  updatePassword: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationUpdatePasswordArgs>;
  placeOrder: Resolver<ResolversTypes['Order'], ParentType, ContextType, MutationPlaceOrderArgs>;
  cancelOrder: Resolver<ResolversTypes['Order'], ParentType, ContextType, MutationCancelOrderArgs>;
  advanceOrderStatus: Resolver<ResolversTypes['Order'], ParentType, ContextType, MutationAdvanceOrderStatusArgs>;
  addProduct: Resolver<ResolversTypes['Product'], ParentType, ContextType, MutationAddProductArgs>;
  updateProductVisibility: Resolver<
    ResolversTypes['Product'],
    ParentType,
    ContextType,
    MutationUpdateProductVisibilityArgs
  >;
  saveToken: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationSaveTokenArgs>;
  logOut: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updateCartQuantity: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    MutationUpdateCartQuantityArgs
  >;
};

export type OrderResolvers<ContextType = Context, ParentType = ResolversParentTypes['Order']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  items: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  total: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = Context, ParentType = ResolversParentTypes['OrderItem']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  subtotal: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = Context, ParentType = ResolversParentTypes['Product']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  hidden: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  schools: Resolver<Array<ResolversTypes['School']>, ParentType, ContextType>;
  category: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType = ResolversParentTypes['Query']> = {
  self: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  categories: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  orders: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  products: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  product: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, QueryProductArgs>;
  schools: Resolver<Array<ResolversTypes['School']>, ParentType, ContextType>;
  users: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  cart: Resolver<Array<ResolversTypes['CartItem']>, ParentType, ContextType>;
  productQuantityInCart: Resolver<ResolversTypes['Int'], ParentType, ContextType, QueryProductQuantityInCartArgs>;
};

export type SchoolResolvers<ContextType = Context, ParentType = ResolversParentTypes['School']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  products: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType = ResolversParentTypes['User']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  school: Resolver<ResolversTypes['School'], ParentType, ContextType>;
  orders: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  CartItem: CartItemResolvers<ContextType>;
  Category: CategoryResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Order: OrderResolvers<ContextType>;
  OrderItem: OrderItemResolvers<ContextType>;
  Product: ProductResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  School: SchoolResolvers<ContextType>;
  User: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
